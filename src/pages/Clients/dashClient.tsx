import { useEffect, useState, useMemo } from "react";
import {
  Calendar,
  LogOut,
  Plus,
  CheckCircle2,
  FileText,
  Video,
  Loader2,
} from "lucide-react";

import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import type { Booking } from "../../types/booking";

/* ---------- HELPERS ---------- */
const formatDate = (date?: string) => {
  if (!date) return "Date inconnue";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });
};

/* ---------- COMPONENT ---------- */
export default function DashClient() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch data & Auth check
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/bookings/my");
        setBookings(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Erreur dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, navigate]);

  // 2. Calculs mémorisés
  const upcoming = useMemo(
    () =>
      bookings.filter(
        (b) => b.status === "pending" || b.status === "confirmed"
      ),
    [bookings]
  );

  const completedCount = useMemo(
    () => bookings.filter((b) => b.status === "completed").length,
    [bookings]
  );

  const nextBooking = useMemo(() => {
    if (upcoming.length === 0) return null;
    return [...upcoming].sort((a, b) => {
      const dateA = a.bookingDate
        ? new Date(a.bookingDate).getTime()
        : Infinity;
      const dateB = b.bookingDate
        ? new Date(b.bookingDate).getTime()
        : Infinity;
      return dateA - dateB;
    })[0];
  }, [upcoming]);

  const stats = [
    {
      label: "À venir",
      value: upcoming.length.toString(),
      icon: <Calendar size={24} className="text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      label: "Terminés",
      value: completedCount.toString(),
      icon: <CheckCircle2 size={24} className="text-green-500" />,
      color: "bg-green-50",
    },
    {
      label: "Factures",
      value: "0",
      icon: <FileText size={24} className="text-orange-400" />,
      color: "bg-orange-50",
    },
  ];

  if (loading)
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#F4F7FA]">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="font-black text-gray-400 text-sm tracking-widest uppercase">
          Chargement du dashboard...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      <Navbar />
      <div className="flex font-sans">
        {/* --- SIDEBAR --- */}
        <aside className="hidden lg:flex w-72 bg-white border-r border-gray-100 flex-col sticky top-0 h-screen">
          <div className="p-8 flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${
                    user?.name || "User"
                  }&background=0D8ABC&color=fff`
                }
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                alt="Avatar"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="min-w-0">
              <h2 className="font-black text-gray-900 leading-none truncate">
                {user?.name || "Utilisateur"}
              </h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                Client Privilège
              </p>
            </div>
          </div>

          <nav className="flex-1 px-4 mt-4 overflow-y-auto">
            <Sidebar />
          </nav>

          <div className="p-8 border-t border-gray-50">
            <button
              onClick={() => logout()}
              className="flex items-center gap-3 text-red-500 font-black text-sm hover:translate-x-1 transition-transform"
            >
              <LogOut size={18} /> Déconnexion
            </button>
          </div>
        </aside>

        {/* --- CONTENU PRINCIPAL --- */}
        <main className="flex-1 p-6 lg:p-12">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h1 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                Bonjour, {user?.name?.split(" ")[0]} 👋
              </h1>
              <p className="text-gray-500 font-medium mt-1 italic">
                Voici le résumé de vos prestations de service.
              </p>
            </div>
            <Link to="/services">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-blue-200 transition-all hover:scale-[1.02] active:scale-95">
                <Plus size={22} strokeWidth={3} />
                Nouveau besoin ?
              </button>
            </Link>
          </header>

          {/* --- STATS --- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[2rem] p-6 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">
                    {stat.label}
                  </p>
                  <p className="text-4xl font-black text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center`}
                >
                  {stat.icon}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* PROCHAINE RÉSERVATION */}
            <div className="lg:col-span-7">
              <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                Prochaine Réservation{" "}
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              </h3>
              {nextBooking ? (
                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 overflow-hidden relative">
                  <div className="flex flex-col md:flex-row gap-8 relative z-10">
                    <div className="w-full md:w-32 h-32 rounded-3xl overflow-hidden bg-gray-100">
                      <img
                        src={
                          nextBooking.service?.images?.[0] ||
                          "https://images.unsplash.com/photo-1581578731548-c64695cc6958?q=80&w=200"
                        }
                        className="w-full h-full object-cover"
                        alt="service"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-black px-3 py-1 bg-blue-100 text-blue-600 rounded-full uppercase mb-3 inline-block">
                        {nextBooking.status}
                      </span>
                      <h4 className="text-2xl font-black text-gray-900 mb-4 truncate">
                        {nextBooking.service?.title}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-500 font-bold text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-blue-400" />
                          {formatDate(nextBooking.bookingDate)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Video size={16} className="text-blue-400" />
                          {nextBooking.time || "À confirmer"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/bookings/${nextBooking._id}`}
                    className="mt-8 block bg-gray-900 text-white text-center py-4 rounded-2xl font-black hover:bg-blue-600 transition-colors"
                  >
                    Détails du rendez-vous
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-[2.5rem] p-16 text-center border-2 border-dashed border-gray-200">
                  <p className="font-bold text-gray-400">
                    Aucun projet en cours
                  </p>
                </div>
              )}
            </div>

            {/* HISTORIQUE */}
            <div className="lg:col-span-5">
              <h3 className="text-xl font-black text-gray-900 mb-6">
                Activités Récentes
              </h3>
              <div className="space-y-4">
                {bookings.slice(0, 5).map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl p-4 border border-gray-50 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 shrink-0 font-bold">
                        {item.service?.title?.charAt(0) || "S"}
                      </div>
                      <div className="truncate">
                        <p className="font-black text-gray-900 text-sm truncate">
                          {item.service?.title}
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase italic">
                          Le {formatDate(item.bookingDate)}
                        </p>
                      </div>
                    </div>
                    <p className="font-black text-blue-600 text-sm whitespace-nowrap ml-4">
                      {item.totalPrice?.toLocaleString() || "0"} €
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
