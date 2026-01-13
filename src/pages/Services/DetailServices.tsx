import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react"; // Pour la modal d'auth
import api from "../../api/axios";
import { useAuthStore } from "../../stores/useAuthStore";
import Navbar from "../../Components/Navbar";
import InfoVendor from "../../Components/Services/InfoVendor";
import ServiceScheduler from "../../Components/Services/ServiceScheduler";

export default function DetailServices() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthStore();

  const [service, setService] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!user;

  useEffect(() => {
    const fetchService = async () => {
      if (!id) return;
      try {
        const { data } = await api.get(`/services/detail/${id}`);
        setService(data);
      } catch (err) {
        console.error("Erreur API lors de la récupération du service", err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  /**
   * Cette fonction est passée au ServiceScheduler.
   * Elle reçoit le créneau sélectionné et gère la logique de réservation.
   */
  const handleBookingConfirm = (selectedData: {
    day: string;
    date: string;
    time: string;
  }) => {
    if (!isLoggedIn) {
      (document.getElementById("auth_modal") as HTMLDialogElement)?.showModal();
      return;
    }

    // Sécurité : Vérifier que l'utilisateur n'est pas le vendeur
    const vendorId =
      typeof service?.vendor === "object"
        ? service?.vendor?._id
        : service?.vendor;
    if (user?._id === vendorId) {
      alert("Vous ne pouvez pas réserver votre propre service.");
      return;
    }

    // Redirection vers la page de paiement/réservation avec les paramètres
    navigate(
      `/services/${id}/book?day=${selectedData.day}&date=${selectedData.date}&time=${selectedData.time}`
    );
  };

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
        <p className="mt-4 text-slate-400 font-bold text-xs uppercase tracking-widest">
          Initialisation...
        </p>
      </div>
    );

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans antialiased">
      <Navbar />

      {/* --- MODAL D'AUTHENTIFICATION (SI NON CONNECTÉ) --- */}
      <dialog id="auth_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-10 rounded-[2.5rem] text-center border-none shadow-2xl">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={40} />
          </div>
          <h3 className="font-black text-2xl text-slate-900 uppercase">
            Connexion requise
          </h3>
          <p className="py-4 text-slate-500 font-medium italic">
            Vous devez être connecté pour réserver un créneau avec{" "}
            {service?.vendor?.name || "ce prestataire"}.
          </p>
          <div className="modal-action flex flex-col gap-3">
            <button
              onClick={() => navigate("/login")}
              className="btn bg-blue-600 hover:bg-blue-700 text-white border-none rounded-2xl h-14 font-bold uppercase tracking-widest w-full"
            >
              Se connecter
            </button>
            <form method="dialog" className="w-full">
              <button className="btn btn-ghost w-full font-bold text-slate-400 uppercase text-xs">
                Annuler
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* --- COLONNE GAUCHE (INFO VENDOR) --- */}
          <InfoVendor service={service} />

          {/* --- COLONNE CENTRALE (CALENDRIER) --- */}
          {/* On passe le service et la fonction de callback */}
          <ServiceScheduler
            service={service}
            onBooking={handleBookingConfirm}
          />
        </div>
      </main>
    </div>
  );
}
