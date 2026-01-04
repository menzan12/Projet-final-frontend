import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  User,
  LogOut,
  Plus,
  CheckCircle2,
  FileText,
  Video,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import ClientSide from "../../components/Sidebar/ClientSide";

export default function ClientDash() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  // 1. Récupération des données depuis ta route /api/bookings/my
  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/bookings/my");
      setBookings(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // 2. Calcul des statistiques en temps réel
  const upcoming = bookings.filter(
    (b) => b.status === "pending" || b.status === "confirmed"
  );
  const completedCount = bookings.filter(
    (b) => b.status === "completed"
  ).length;

  // Trouver la prochaine réservation (la plus proche dans le futur)
  const nextBooking = upcoming.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )[0];

  const stats = [
    {
      label: "Réservations à venir",
      value: upcoming.length.toString(),
      icon: <Calendar size={24} className="text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      label: "Services terminés",
      value: completedCount.toString(),
      icon: <CheckCircle2 size={24} className="text-green-500" />,
      color: "bg-green-50",
    },
    {
      label: "Factures en attente",
      value: "0",
      icon: <FileText size={24} className="text-orange-400" />,
      color: "bg-orange-50",
    },
  ];

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center font-black text-blue-600">
        CHARGEMENT...
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-[#F4F7FA] font-sans">
        {/* --- SIDEBAR --- */}
        <aside className="w-72 bg-white border-r border-gray-100 flex flex-col sticky top-0 h-screen">
          <div className="p-8 flex items-center gap-4">
            <div className="relative">
              <img
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff`
                }
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-sm"
                alt="Avatar"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="font-black text-gray-900 leading-none truncate w-32">
                {user?.name || "Utilisateur"}
              </h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                {user?.role || "Client"}
              </p>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4">
            {/* Correction : To="/" ou "/dashboard" selon votre config de route */}
            <ClientSide
              icon={<LayoutDashboard size={20} />}
              label="Tableau de bord"
              to=""
              active
            />
            <ClientSide
              icon={<Calendar size={20} />}
              label="Mes Réservations"
              to="/bookings"
            />
            <ClientSide
              icon={<User size={20} />}
              label="Mon Profil"
              to="/profile"
            />
          </nav>

          <div className="p-8 border-t border-gray-50">
            <button
              onClick={logout}
              className="flex items-center gap-3 text-red-500 font-black text-sm hover:pl-2 transition-all duration-300"
            >
              <LogOut size={18} /> Déconnexion
            </button>
          </div>
        </aside>

        {/* --- CONTENU PRINCIPAL --- */}
        <main className="flex-1 p-12">
          <header className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                Bonjour, {user?.name?.split(" ")[0]}
              </h1>
              <p className="text-gray-500 font-medium mt-1">
                Ravi de vous revoir. Voici vos activités récentes.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/services">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-blue-200 transition-all active:scale-95">
                  <Plus size={20} strokeWidth={3} />
                  Nouvelle réservation
                </button>
              </Link>
            </div>
          </header>

          {/* --- STATS --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[2.5rem] p-8 flex justify-between items-center shadow-sm border border-gray-50"
              >
                <div className="space-y-1">
                  <p className="text-gray-400 font-bold text-sm tracking-tight">
                    {stat.label}
                  </p>
                  <p className="text-5xl font-black text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center shadow-inner`}
                >
                  {stat.icon}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* --- PROCHAINE RÉSERVATION --- */}
            <div className="lg:col-span-7">
              <h3 className="text-xl font-black text-gray-900 mb-6">
                Prochaine Réservation
              </h3>
              {nextBooking ? (
                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 group">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-40 h-40 rounded-[2rem] overflow-hidden bg-blue-50 flex items-center justify-center text-blue-600">
                      <Calendar size={48} strokeWidth={1} />
                    </div>
                    <div className="flex flex-col justify-between flex-1 py-1">
                      <div>
                        <span
                          className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block ${
                            nextBooking.status === "confirmed"
                              ? "bg-green-100 text-green-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {nextBooking.status}
                        </span>
                        <h4 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
                          {nextBooking.service?.title || "Consultation"}
                        </h4>
                        <div className="space-y-2 text-gray-500 font-bold text-sm">
                          <div className="flex items-center gap-3">
                            <Calendar size={18} className="text-blue-200" />
                            <span className="capitalize">
                              {new Date(nextBooking.date).toLocaleDateString(
                                "fr-FR",
                                {
                                  weekday: "long",
                                  day: "numeric",
                                  month: "long",
                                }
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Video size={18} className="text-blue-200" />
                            <span>
                              {nextBooking.time || "Heure non définie"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-6 relative z-10">
                        <Link
                          // Correction de la syntaxe to={...} et utilisation de l'ID de la réservation
                          to={`/services/${nextBooking.service?._id}/book`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-black text-sm flex-1 text-center transition-all active:scale-95 cursor-pointer"
                          onClick={() =>
                            console.log("Clic sur Gérer l'ID:", nextBooking._id)
                          }
                        >
                          Gérer
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-[2.5rem] p-12 text-center text-gray-400 border-2 border-dashed border-gray-200">
                  <p className="font-bold">Aucune réservation à venir</p>
                  <Link
                    to="/services"
                    className="text-blue-600 text-sm font-black mt-2 inline-block"
                  >
                    Réserver un service
                  </Link>
                </div>
              )}
            </div>

            {/* --- HISTORIQUE DYNAMIQUE --- */}
            <div className="lg:col-span-5">
              <h3 className="text-xl font-black text-gray-900 mb-6">
                Historique Récent
              </h3>
              <div className="space-y-4">
                {bookings.length > 0 ? (
                  bookings.slice(0, 4).map((item) => (
                    <div
                      key={item._id}
                      className="bg-white rounded-3xl p-5 border border-gray-50 flex items-center gap-5 hover:border-blue-100 transition-colors shadow-sm"
                    >
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                        {/* Icône peut être adaptée selon la catégorie du service plus tard */}
                        <FileText size={18} />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-black text-gray-900 text-sm tracking-tight truncate w-32">
                          {item.service?.title || "Service"}
                        </h5>
                        <p className="text-[11px] text-gray-400 font-bold uppercase">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-gray-900 text-sm">
                          {item.price || item.totalPrice || "0"} €
                        </p>
                        <div
                          className={`font-black text-[9px] uppercase tracking-widest mt-0.5 ${
                            item.status === "cancelled"
                              ? "text-red-400"
                              : "text-green-500"
                          }`}
                        >
                          {item.status}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 text-sm py-10 italic">
                    Aucun historique disponible
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
