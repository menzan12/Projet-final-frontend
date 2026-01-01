import React, { useEffect, useState } from "react";
import { Clock, MapPin, HelpCircle, ArrowRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import api from "../../api/axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import Calendar from "../../components/ServiceBooking/Calendar";
import Breadcrumbs from "../../components/ServiceBooking/Breadcrumbs";

// 🔹 Définition des créneaux horaires
const morningSlots = ["08:00", "09:00", "10:00", "11:00"];
const afternoonSlots = ["14:00", "15:00", "16:00", "17:00"];

const ServiceBooking: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("10:00");

  // 🔹 Charger le service
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

  // 🔹 Sécurité avant affichage
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <p className="text-slate-600">Chargement...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <p className="text-red-600">{error}</p>
        </div>
      </>
    );
  }

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <p className="text-slate-600">Service introuvable</p>
        </div>
      </>
    );
  }

  // 🔹 Confirmer réservation
  const handleConfirmBooking = async () => {
    try {
      if (!user) {
        alert("Veuillez vous connecter");
        return;
      }

      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate).padStart(2, "0");

      const bookingDate = new Date(
        `${year}-${month}-${day}T${selectedTime}:00`
      );

      // 🔹 Extraction sécurisée du vendor ID
      const vendorId =
        typeof service.vendor === "string"
          ? service.vendor
          : service.vendor?._id;

      // 🔹 Vérification des IDs avant envoi
      if (!service._id || !vendorId) {
        alert("Erreur: Données du service incomplètes");
        console.error("Service ID:", service._id, "Vendor ID:", vendorId);
        return;
      }
      const bookingData = {
        serviceId: String(service._id),
        bookingDate: bookingDate.toISOString(),
        notes: "", // Champ optionnel
      };
      await api.post("/bookings", bookingData);
      setBookingConfirmed(true);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Erreur lors de la réservation";

      alert(errorMessage);
    }
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <main className="max-w-6xl mx-auto py-10 px-6">
          <Breadcrumbs service={service} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Colonne de gauche : Calendrier et créneaux horaires */}
            <div className="lg:col-span-8 space-y-8">
              <header>
                <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
                  Sélectionnez une date et une heure
                </h1>
                <p className="text-slate-500 font-medium">
                  Choisissez un créneau horaire qui vous convient pour votre{" "}
                  {service.title || service.name} service.
                </p>
              </header>

              {/* Carte de calendrier */}
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
              {/* Section Créneaux */}
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <h3 className="text-lg font-black text-slate-800 tracking-tight">
                    Jeudi 1er octobre {selectedDate?.toLocaleDateString()}th
                  </h3>
                  <span className="text-xs text-slate-400 font-medium tracking-tight">
                    Fuseau horaire : Europe/Paris (CET)
                  </span>
                </div>

                {/* Matin */}
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" />
                    </svg>
                    Matin
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {morningSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-4 rounded-2xl border-2 font-bold transition-all text-sm
                        ${
                          selectedTime === time
                            ? "border-blue-600 bg-blue-50 text-blue-600 ring-4 ring-blue-50/50"
                            : "bg-white border-slate-100 text-slate-600 hover:border-slate-200"
                        }
                      `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Après-midin */}
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M12 10V2m0 20v-4m10-6h-4M6 12H2m15.07-7.07l-2.83 2.83M7.76 16.24l-2.83 2.83m14.14 0l-2.83-2.83M7.76 7.76L4.93 4.93" />
                    </svg>
                    Après-midi
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {afternoonSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-4 rounded-2xl border-2 font-bold transition-all text-sm
                        ${
                          selectedTime === time
                            ? "border-blue-600 bg-blue-50 text-blue-600 ring-4 ring-blue-50/50"
                            : "bg-white border-slate-100 text-slate-600 hover:border-slate-200"
                        }
                      `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne de droite : Récapitulatif de la commande*/}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-slate-100 overflow-hidden">
                <div className="relative h-44 group">
                  <img
                    src={
                      service.image ||
                      "https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=800"
                    }
                    className="w-full h-full object-cover"
                    alt={service.name}
                  />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors"></div>
                  <h3 className="absolute bottom-6 left-6 text-white font-black text-xl tracking-tight">
                    {service.title || service.name}
                  </h3>
                </div>

                <div className="p-8 space-y-8">
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 shadow-sm">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
                          Date et heure
                        </p>
                        <p className="font-bold text-slate-800 text-sm">
                          Oct {selectedDate?.toLocaleDateString()}, 2023 at{" "}
                          {selectedTime}
                        </p>
                        <p className="text-xs text-slate-400 font-medium">
                          Durée: {service.duration || "2 hours"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 shadow-sm">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
                          Lieu
                        </p>
                        <p className="font-bold text-slate-800 text-sm">
                          {service.location || "123 Rue de la Paix"}
                        </p>
                        <p className="text-xs text-slate-400 font-medium">
                          75001 Paris, France
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-dashed border-slate-100 space-y-3">
                    <div className="flex justify-between text-sm text-slate-500 font-medium">
                      <span>Prix de base</span>
                      <span className="text-slate-900 font-bold">
                        €{service.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500 font-medium">
                      <span>Frais de service</span>
                      <span className="text-slate-900 font-bold">€5.00</span>
                    </div>
                    <div className="flex justify-between items-end pt-4">
                      <span className="text-xl font-black text-slate-900 italic tracking-tighter">
                        Total
                      </span>
                      <span className="text-3xl font-black text-blue-600 tracking-tighter italic">
                        €{(service.price + 5).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmBooking}
                    disabled={bookingConfirmed}
                    className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-2 ${
                      bookingConfirmed
                        ? "bg-green-600 text-white shadow-green-200 cursor-not-allowed"
                        : "bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700 hover:translate-y-[-2px] active:translate-y-[0px]"
                    }`}
                  >
                    {bookingConfirmed ? (
                      <>Réservation confirmée ✓</>
                    ) : (
                      <>
                        Confirmer la réservation <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Annulation gratuite jusqu'à 24 h avant.
                  </p>
                </div>
              </div>

              {/*Carte d'assistance
Besoin d'aide ? */}
              <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex items-center gap-4 group cursor-pointer hover:bg-blue-50 transition-colors">
                <div className="bg-white p-3 rounded-2xl text-blue-600 shadow-sm">
                  <HelpCircle size={24} />
                </div>
                <div>
                  <h4 className="font-black text-slate-800 text-sm tracking-tight mb-0.5">
                    Besoin d'aide ?
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Appelez notre équipe d'assistance au{" "}
                    <span className="text-blue-600 font-bold tracking-tight">
                      +225 01 03 13 10 76
                    </span>
                  </p>
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
