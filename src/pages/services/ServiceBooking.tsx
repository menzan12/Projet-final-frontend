import React, { useEffect, useState } from "react";
import { Clock, MapPin, HelpCircle, ArrowRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import api from "../../api/axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import Calendar from "../../components/ServiceBooking/Calendar";
import Breadcrumbs from "../../components/ServiceBooking/Breadcrumbs";

const morningSlots = ["08:00", "09:00", "10:00", "11:00"];
const afternoonSlots = ["14:00", "15:00", "16:00", "17:00"];

const ServiceBooking: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  //const navigate = useNavigate();

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("10:00");

  useEffect(() => {
    const fetchService = async () => {
      try {
        if (!id) return;
        const res = await api.get(`/services/${id}`);
        setService(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Erreur chargement service");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleConfirmBooking = async () => {
    try {
      if (!user) {
        alert("Veuillez vous connecter pour réserver");
        return;
      }

      if (!selectedDate) {
        alert("Veuillez sélectionner une date");
        return;
      }

      // 🔹 CONSTRUCTION SÉCURISÉE DE LA DATE
      // On récupère les heures et minutes du créneau choisi
      const [hours, minutes] = selectedTime.split(":").map(Number);

      // On crée un nouvel objet Date basé sur la date du calendrier
      const finalBookingDate = new Date(selectedDate);
      finalBookingDate.setHours(hours, minutes, 0, 0);

      const vendorId =
        typeof service.vendor === "string"
          ? service.vendor
          : service.vendor?._id;

      if (!service._id || !vendorId) {
        alert("Données du service incomplètes");
        return;
      }

      const bookingData = {
        serviceId: String(service._id),
        vendorId: vendorId,
        bookingDate: finalBookingDate.toISOString(),
        notes: "",
      };

      await api.post("/bookings", bookingData);
      setBookingConfirmed(true);

      // Optionnel : Rediriger après 2 secondes
      // setTimeout(() => navigate("/dashboard/bookings"), 2000);
    } catch (error: any) {
      alert(error.response?.data?.message || "Erreur lors de la réservation");
    }
  };

  if (loading)
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </>
    );
  if (error || !service)
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-red-500">
          {error || "Service introuvable"}
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <main className="max-w-6xl mx-auto py-10 px-6">
          <Breadcrumbs service={service} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* GAUCHE : SÉLECTION */}
            <div className="lg:col-span-8 space-y-8">
              <header>
                <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight uppercase">
                  Réserver un créneau
                </h1>
                <p className="text-slate-500 font-medium">
                  Service :{" "}
                  <span className="text-blue-600">{service.title}</span>
                </p>
              </header>

              <Calendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />

              <div className="space-y-6">
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest">
                  Horaires disponibles
                </h3>

                {/* MATIN */}
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Clock size={14} /> Matin
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {morningSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-4 rounded-2xl border-2 font-bold transition-all ${
                          selectedTime === time
                            ? "border-blue-600 bg-blue-50 text-blue-600 shadow-lg shadow-blue-100"
                            : "bg-white border-slate-100 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* APRES-MIDI */}
                <div className="pt-4">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Clock size={14} /> Après-midi
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {afternoonSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-4 rounded-2xl border-2 font-bold transition-all ${
                          selectedTime === time
                            ? "border-blue-600 bg-blue-50 text-blue-600 shadow-lg shadow-blue-100"
                            : "bg-white border-slate-100 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* DROITE : RÉCAPITULATIF */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-slate-100 overflow-hidden sticky top-10">
                <div className="relative h-44">
                  <img
                    src={
                      service.images?.[0] ||
                      "https://images.unsplash.com/photo-1581578731548-c64695cc6958?w=800"
                    }
                    className="w-full h-full object-cover"
                    alt={service.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <h3 className="absolute bottom-6 left-6 text-white font-black text-xl">
                    {service.title}
                  </h3>
                </div>

                <div className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Date & Heure
                        </p>
                        <p className="font-bold text-slate-800 text-sm">
                          {selectedDate?.toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                          })}{" "}
                          à {selectedTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Lieu
                        </p>
                        <p className="font-bold text-slate-800 text-sm">
                          {service.city || "À définir"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-dashed border-slate-100 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Prestation</span>
                      <span className="font-bold">
                        {service.price?.toLocaleString()} FCFA
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Frais</span>
                      <span className="font-bold">1 000 FCFA</span>
                    </div>
                    <div className="flex justify-between items-end pt-2">
                      <span className="text-lg font-black uppercase italic">
                        Total
                      </span>
                      <span className="text-3xl font-black text-blue-600 tracking-tighter italic">
                        {(service.price + 1000).toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmBooking}
                    disabled={bookingConfirmed}
                    className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 ${
                      bookingConfirmed
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-xl shadow-blue-200"
                    }`}
                  >
                    {bookingConfirmed ? (
                      "Réservation confirmée ✓"
                    ) : (
                      <>
                        Confirmer <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex items-center gap-4">
                <HelpCircle className="text-blue-600" />
                <div className="text-xs">
                  <p className="font-black text-slate-800 uppercase">
                    Besoin d'aide ?
                  </p>
                  <p className="text-slate-500">+225 01 03 13 10 76</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ServiceBooking;
