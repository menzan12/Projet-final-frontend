import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, CheckCircle2, Clock, MapPin, ShieldCheck } from "lucide-react";
import api from "../../api/axios";
import { useAuthStore } from "../../stores/useAuthStore";
import Navbar from "../../Components/Navbar";
import Breadcrumbs from "../../Components/Services/Breadcrumbs";
import type { Service } from "../../types/service";

type TabType = "description" | "included" | "reviews";

export default function DetailServices() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthStore();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("description");
  const [postalCode, setPostalCode] = useState("");

  const isLoggedIn = !!user;
  const isOwnService = user?._id === service?.vendorId;

  useEffect(() => {
    const fetchService = async () => {
      if (!id || id === ":id") return;
      try {
        const { data } = await api.get(`/services/${id}`);
        setService(data);
      } catch (err) {
        console.error("Erreur API", err);
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
      return;
    }

    if (isOwnService) {
      alert("Vous ne pouvez pas réserver votre propre service.");
      return;
    }

    if (!postalCode) {
      alert(
        "Veuillez saisir votre code postal pour vérifier la disponibilité."
      );
      return;
    }

    navigate(`/services/${id}/book?postalCode=${postalCode}`);
  };

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
        <p className="mt-4 text-gray-500 font-medium animate-pulse">
          Chargement de votre expérience...
        </p>
      </div>
    );

  if (!service)
    return (
      <div className="text-center py-20 font-bold">Service introuvable.</div>
    );

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* --- MODAL AUTHENTIFICATION --- */}
      <dialog id="auth_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-center p-8 rounded-[2rem]">
          <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="font-black text-2xl text-gray-900">
            Connexion requise
          </h3>
          <p className="py-4 text-gray-600">
            Créez un compte ou connectez-vous pour réserver cette prestation.
          </p>
          <div className="flex flex-col gap-3 mt-4">
            <Link
              to="/login"
              className="btn bg-blue-600 hover:bg-blue-700 text-white border-none rounded-2xl h-14"
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
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
              ✕
            </button>
          </form>
        </div>
      </dialog>

      <main className="max-w-7xl mx-auto px-6 pt-8 pb-20">
        <Breadcrumbs
          service={{
            ...service,
            category: Array.isArray(service.category)
              ? service.category[0]?.name
              : service.category,
          }}
        />

        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- COLONNE GAUCHE --- */}
          <div className="lg:w-2/3">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                {Array.isArray(service.category)
                  ? service.category.map((cat: any) => cat.name).join(", ")
                  : service.category}
              </span>
              <div className="flex items-center text-orange-500 font-bold">
                <Star className="h-5 w-5 fill-orange-500 mr-1" />{" "}
                {service.rating || "4.9"}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
              {service.title}
            </h1>

            {/* Galerie */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[300px] md:h-[500px] mb-12">
              <div className="md:col-span-8 overflow-hidden rounded-[2rem] border border-gray-100">
                <img
                  src={service.images?.[0]}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  alt="Main"
                />
              </div>
              <div className="md:col-span-4 grid grid-rows-2 gap-4 hidden md:grid">
                {service.images?.slice(1, 3).map((img, idx) => (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-[2rem] border border-gray-100 relative group"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      alt="Detail"
                    />
                    {idx === 1 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold cursor-pointer group-hover:bg-black/20 transition-all">
                        Voir tout
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Onglets Interactifs */}
            <div className="flex gap-8 border-b border-gray-100 mb-8">
              {(["description", "included", "reviews"] as TabType[]).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-lg font-bold capitalize transition-all border-b-2 ${
                      activeTab === tab
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-400"
                    }`}
                  >
                    {tab === "description"
                      ? "Description"
                      : tab === "included"
                      ? "Inclus"
                      : "Avis"}
                  </button>
                )
              )}
            </div>

            <div className="min-h-[200px]">
              {activeTab === "description" && (
                <div className="prose prose-blue max-w-none text-gray-600">
                  <p className="text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>
              )}

              {activeTab === "included" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Expertise certifiée",
                    "Matériel inclus",
                    "Garantie satisfaction",
                    "Assurance comprise",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl"
                    >
                      <CheckCircle2 className="text-green-500 h-5 w-5" />
                      <span className="font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="text-center py-10 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500">
                    Aucun avis pour le moment sur ce service.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* --- COLONNE DROITE --- */}
          <div className="lg:w-1/3">
            <div className="sticky top-28 bg-white border border-gray-100 shadow-2xl shadow-blue-100/30 rounded-[2.5rem] p-8">
              <div className="flex justify-between items-center mb-8">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Prix
                </p>
                <div className="text-right">
                  <span className="text-4xl font-black text-blue-600">
                    {service.price}€
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-2xl">
                  <div className="flex items-center text-blue-700 font-bold">
                    <Clock className="h-5 w-5 mr-2" /> Rapide
                  </div>
                  <span className="text-blue-900 font-bold">Dès demain</span>
                </div>

                <div className="group relative flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-100 transition-all">
                  <MapPin
                    className="text-gray-400 group-focus-within:text-blue-500"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Code postal"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="bg-transparent font-bold outline-none w-full text-gray-900"
                  />
                </div>
              </div>

              <button
                onClick={handleReservation}
                disabled={isOwnService}
                className={`w-full h-16 rounded-2xl text-lg font-black transition-all shadow-xl ${
                  isOwnService
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 hover:-translate-y-1"
                }`}
              >
                {isOwnService ? "Votre service" : "Réserver maintenant"}
              </button>

              <p className="text-center text-[10px] text-gray-400 uppercase font-black mt-6 tracking-widest flex items-center justify-center gap-2">
                <ShieldCheck size={14} /> Annulation gratuite 24h avant
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
