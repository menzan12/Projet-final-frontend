import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import api from "../../api/axios";
import Navbar from "../../Components/Navbar";
import { toast } from "react-toastify";

export default function BookingPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Récupération dynamique des paramètres d'URL
  const day = searchParams.get("day");
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  // Sécurité : redirection si données manquantes
  useEffect(() => {
    if (!day || !date || !time) {
      toast.error("Informations de réservation manquantes.");
      navigate(`/services/detail/${id}`);
    }
  }, [day, date, time, navigate, id]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await api.get(`/services/detail/${id}`);
        setService(data);
      } catch (err) {
        toast.error("Impossible de charger les détails du service.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchService();
  }, [id]);

  const handleFinalConfirm = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading("Création de votre réservation...");

    try {
      // APPEL API RÉEL : Adaptez l'URL et le body selon votre backend
      await api.post("/bookings/create", {
        serviceId: id,
        slot: {
          day,
          date,
          time,
        },
        totalAmount: service?.price,
      });

      toast.update(toastId, {
        render: "Réservation confirmée ! Un email vous a été envoyé.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      // Redirection après succès
      setTimeout(() => {
        navigate("/myBooking");
      }, 2000);
    } catch (error: any) {
      toast.update(toastId, {
        render:
          error.response?.data?.message ||
          "Erreur lors de la réservation. Veuillez réessayer.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-blue-600"></span>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
            Chargement du résumé...
          </p>
        </div>
      </div>
    );

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans antialiased">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-sm mb-8 transition-all group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          RETOUR AU CALENDRIER
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SECTION RÉCAPITULATIF */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-slate-900 leading-tight">
                    Presque fini !
                  </h1>
                  <p className="text-slate-500 font-medium">
                    Vérifiez vos informations avant de confirmer.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-6">
                  <div className="flex items-center gap-3 mb-3 text-blue-600">
                    <Calendar size={20} />
                    <span className="text-xs font-black uppercase tracking-widest">
                      Date choisie
                    </span>
                  </div>
                  <p className="text-xl font-black text-slate-900">
                    {day}, {date} Octobre
                  </p>
                </div>

                <div className="bg-purple-50/50 border border-purple-100 rounded-3xl p-6">
                  <div className="flex items-center gap-3 mb-3 text-purple-600">
                    <Clock size={20} />
                    <span className="text-xs font-black uppercase tracking-widest">
                      Heure locale
                    </span>
                  </div>
                  <p className="text-xl font-black text-slate-900">
                    {time} (Abidjan GMT)
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4">
                <AlertCircle className="text-amber-600 shrink-0" size={24} />
                <div className="text-sm text-amber-800 font-medium leading-relaxed">
                  <p className="font-bold mb-1">Politique d'annulation</p>
                  Vous pouvez annuler ou reporter cette séance sans frais
                  jusqu'à 24h avant le début du rendez-vous.
                </div>
              </div>
            </section>
          </div>

          {/* ASIDE : PAIEMENT */}
          <aside>
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden sticky top-8">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/30 rounded-full blur-3xl"></div>

              <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-8">
                Détails du paiement
              </h3>

              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <img
                    src={service?.vendor?.avatar || "https://i.pravatar.cc/150"}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-700 shadow-lg"
                    alt="Vendor"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                </div>
                <div>
                  <p className="font-black text-lg leading-tight">
                    {service?.name}
                  </p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                    Expert: {service?.vendor?.name}
                  </p>
                </div>
              </div>

              <div className="space-y-4 border-t border-slate-800 pt-8 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-medium text-sm italic">
                    Session individuelle
                  </span>
                  <span className="font-bold">{service?.price}€</span>
                </div>
                <div className="flex justify-between items-center text-green-400">
                  <span className="font-medium text-sm italic">
                    Frais de plateforme
                  </span>
                  <span className="font-bold text-xs uppercase tracking-widest">
                    Offerts
                  </span>
                </div>
                <div className="flex justify-between items-end pt-6 border-t border-slate-800">
                  <span className="text-lg font-bold">À payer</span>
                  <span className="text-4xl font-black text-blue-400 leading-none">
                    {service?.price}€
                  </span>
                </div>
              </div>

              <button
                onClick={handleFinalConfirm}
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:shadow-xl hover:shadow-blue-900/40 active:scale-95"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  <>
                    Confirmer la réservation <ChevronRight size={20} />
                  </>
                )}
              </button>

              <div className="flex flex-col items-center gap-3 mt-8 opacity-40">
                <div className="flex gap-4">
                  <ShieldCheck size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Secured by Stripe
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
