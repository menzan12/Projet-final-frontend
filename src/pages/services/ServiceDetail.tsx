import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star,
  CheckCircle2,
  Clock,
  Users,
  Calendar,
  MapPin,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import type { Service } from "../../types";
import { useAuth } from "../../hooks/useAuth";
import Breadcrumbs from "../../components/ServiceBooking/Breadcrumbs";

export default function ServiceDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useAuth(); // Vérifie si l'utilisateur est connecté
  const isLoggedIn = !!user;

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      if (!id || id === ":id") return;
      try {
        const { data } = await api.get(`/services/${id}`);
        setService(data);
      } catch (err) {
        console.error("Erreur lors de la récupération du service", err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleReservation = () => {
    if (!isLoggedIn) {
      const modal = document.getElementById("auth_modal") as HTMLDialogElement;
      modal?.showModal();
    } else {
      navigate(`/services/${id}/book?postalCode=${postalCode}`);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-gray-500 font-medium">
          Chargement du service...
        </p>
      </div>
    );

  if (!service)
    return (
      <div className="text-center py-20 text-xl font-bold">
        Service introuvable.
      </div>
    );

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* --- MODAL DAISYUI POUR L'AUTHENTIFICATION --- */}
      <dialog id="auth_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-center p-8 border-t-4 border-primary">
          <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <span className="loading loading-dots loading-md text-primary"></span>
          </div>
          <h3 className="font-black text-2xl text-gray-900">
            Connexion requise
          </h3>
          <p className="py-4 text-gray-600">
            Vous devez être connecté pour réserver cette prestation auprès de{" "}
            <strong>{service.vendor.name}</strong>.
          </p>
          <div className="flex flex-col gap-3 mt-4">
            <Link
              to="/login"
              className="btn btn-primary rounded-2xl h-14 text-lg"
            >
              Se connecter
            </Link>
            <Link
              to="/register"
              className="btn btn-ghost text-gray-500 underline"
            >
              Créer un compte gratuitement
            </Link>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <main className="max-w-7xl mx-auto px-6 pt-8 pb-20">
        {/* Breadcrumbs */}
        <Breadcrumbs service={service} />
        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- COLONNE GAUCHE : DÉTAILS DU SERVICE --- */}
          <div className="lg:w-2/3">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Recommandé
              </span>
              <div className="flex items-center text-orange-500 font-bold">
                <Star className="h-5 w-5 fill-orange-500 mr-1" />{" "}
                {service.rating || "4.9"}
                <span className="text-gray-400 font-normal ml-2 text-sm">
                  (128 avis)
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
              {service.title}
            </h1>

            {/* Galerie dynamique */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[500px] mb-12">
              <div className="md:col-span-8 overflow-hidden rounded-[2rem] border border-gray-100 shadow-sm">
                <img
                  src={service.images?.[0]}
                  className="w-full h-full object-cover"
                  alt="Service"
                />
              </div>
              <div className="md:col-span-4 grid grid-rows-2 gap-4">
                {(
                  service.images?.slice(0, 2) || [
                    "https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1528453334238-0061330979a2?auto=format&fit=crop&q=80",
                  ]
                ).map((img: string, idx: number) => (
                  <div
                    key={idx}
                    className={`${
                      idx === 1
                        ? "relative group overflow-hidden rounded-[2rem] border border-gray-100 shadow-sm"
                        : "overflow-hidden rounded-[2rem] border border-gray-100 shadow-sm"
                    }`}
                  >
                    <img
                      src={img}
                      className={`w-full h-full object-cover ${
                        idx === 1
                          ? "brightness-50 group-hover:brightness-75 transition-all"
                          : ""
                      }`}
                      alt={`Detail ${idx + 1}`}
                    />
                    {idx === 1 && (
                      <div className="absolute inset-0 flex items-center justify-center text-white font-bold cursor-pointer">
                        Voir les 8 photos
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Onglets Description/Inclus */}
            <div className="tabs tabs-bordered mb-8">
              <button className="tab tab-active font-bold text-lg pb-4 px-0 mr-8 border-primary">
                Description
              </button>
              <button className="tab font-medium text-lg text-gray-400 pb-4 px-0 mr-8 border-transparent">
                Ce qui est inclus
              </button>
              <button className="tab font-medium text-lg text-gray-400 pb-4 px-0 border-transparent">
                Avis clients
              </button>
            </div>

            <div className="prose prose-blue max-w-none text-gray-600 mb-12">
              <p className="text-lg leading-relaxed">{service.description}</p>
            </div>

            {/* Liste des inclusions */}
            <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100">
              <h3 className="text-2xl font-black mb-8">Ce qui est inclus</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Nettoyage complet des surfaces",
                  "Désinfection des points de contact",
                  "Utilisation de produits écologiques",
                  "Garantie satisfaction 24h",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 text-gray-700 font-medium"
                  >
                    <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- COLONNE DROITE : CARTE DE RÉSERVATION (STICKY) --- */}
          <div className="lg:w-1/3">
            <div className="sticky top-28 bg-white border border-gray-100 shadow-2xl shadow-blue-100/50 rounded-[2.5rem] p-8 md:p-10">
              <div className="flex justify-between items-baseline mb-8">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Prix Total Estimé
                </p>
                <div className="text-right">
                  <span className="text-4xl font-black text-blue-600">
                    {service.price}€
                  </span>
                  <span className="block text-xs text-gray-400">
                    / prestation
                  </span>
                </div>
              </div>

              <div className="space-y-5 mb-8">
                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                  <div className="flex items-center text-gray-500 font-medium">
                    <Clock className="h-5 w-5 mr-3 text-gray-300" /> Durée
                    estimée
                  </div>
                  <span className="text-gray-900 font-bold">~3h 30min</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                  <div className="flex items-center text-gray-500 font-medium">
                    <Users className="h-5 w-5 mr-3 text-gray-300" />{" "}
                    Intervenants
                  </div>
                  <span className="text-gray-900 font-bold">1 - 2 pers.</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center text-gray-500 font-medium">
                    <Calendar className="h-5 w-5 mr-3 text-gray-300" />{" "}
                    Disponibilité
                  </div>
                  <span className="text-green-600 font-black">Dès demain</span>
                </div>
              </div>

              {/* Input Code Postal */}
              <div className="mb-8">
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Votre code postal"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full pl-12 pr-4 h-14 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleReservation}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 rounded-2xl text-lg font-black shadow-xl shadow-blue-200 transition-all hover:-translate-y-1"
              >
                Réserver ce service
              </button>

              <div className="flex items-center justify-center gap-6 mt-8">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="h-5 w-5 text-gray-300" />
                  <span className="text-[10px] text-gray-400 uppercase font-bold">
                    Paiement Sécurisé
                  </span>
                </div>
                <div className="w-[1px] h-8 bg-gray-100"></div>
                <div className="flex flex-col items-center gap-1">
                  <MessageCircle className="h-5 w-5 text-gray-300" />
                  <span className="text-[10px] text-gray-400 uppercase font-bold">
                    Besoin d'aide ?
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
