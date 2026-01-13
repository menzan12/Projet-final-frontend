import { useEffect, useState, useMemo } from "react";
import {
  Calendar,
  CheckCircle2,
  FileText,
  Video,
  Loader2,
  ArrowRight,
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
    year: "numeric",
  });
};

export default function DashClient() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

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
      icon: <Calendar size={22} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Terminés",
      value: completedCount.toString(),
      icon: <CheckCircle2 size={22} />,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Factures",
      value: "0",
      icon: <FileText size={22} />,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
  ];

  if (loading)
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="font-black text-slate-400 text-[10px] tracking-[0.3em] uppercase">
          Chargement de votre espace...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="flex">
        {/* --- SIDEBAR (Utilise ton composant Sidebar corrigé) --- */}
        <Sidebar />

        {/* --- CONTENU PRINCIPAL --- */}
        <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto">
          {/* HEADER SECTION */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Bonjour,{" "}
                <span className="text-blue-600">
                  {user?.name?.split(" ")[0]}
                </span>{" "}
                👋
              </h1>
              <p className="text-slate-500 font-medium mt-1">
                Content de vous revoir ! Voici le point sur vos services.
              </p>
            </div>
          </header>

          {/* STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 flex justify-between items-center shadow-sm border border-slate-100 hover:border-blue-100 transition-all group"
              >
                <div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}
                >
                  {stat.icon}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* PROCHAINE RÉSERVATION */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  Prochain rendez-vous
                  <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping"></span>
                </h3>
              </div>

              {nextBooking ? (
                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 group">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-40 h-40 rounded-[2rem] overflow-hidden bg-slate-100 shadow-inner">
                      <img
                        src={
                          nextBooking.service?.images?.[0] ||
                          "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=300"
                        }
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt="service"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[9px] font-black px-3 py-1 bg-blue-50 text-blue-600 rounded-full uppercase tracking-tighter border border-blue-100">
                          {nextBooking.status === "confirmed"
                            ? "Confirmé"
                            : "En attente"}
                        </span>
                      </div>
                      <h4 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {nextBooking.service?.title}
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                          <div className="p-2 bg-slate-50 rounded-lg text-blue-500">
                            <Calendar size={16} />
                          </div>
                          {formatDate(nextBooking.bookingDate)}
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                          <div className="p-2 bg-slate-50 rounded-lg text-blue-500">
                            <Video size={16} />
                          </div>
                          {nextBooking.time || "Horaire à confirmer"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/myBooking`)}
                    className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-slate-200"
                  >
                    Gérer mes réservations
                    <ArrowRight size={18} />
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-[2.5rem] p-16 text-center border-2 border-dashed border-slate-200">
                  <p className="font-bold text-slate-400">
                    Aucune activité programmée
                  </p>
                  <Link
                    to="/explore"
                    className="text-blue-600 text-sm font-black uppercase mt-4 block hover:underline"
                  >
                    Parcourir le catalogue
                  </Link>
                </div>
              )}
            </div>

            {/* ACTIVITÉS RÉCENTES */}
            <div className="lg:col-span-5">
              <h3 className="text-xl font-black text-slate-900 mb-6">
                Dernières factures
              </h3>
              <div className="space-y-4">
                {bookings.length > 0 ? (
                  bookings.slice(0, 4).map((item) => (
                    <div
                      key={item._id}
                      className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center justify-between hover:border-blue-200 transition-all group"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors font-black">
                          {item.service?.title?.charAt(0) || "S"}
                        </div>
                        <div className="truncate">
                          <p className="font-black text-slate-900 text-[13px] truncate uppercase tracking-tight">
                            {item.service?.title}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                            {formatDate(item.bookingDate)}
                          </p>
                        </div>
                      </div>
                      <p className="font-black text-blue-600 text-sm">
                        {new Intl.NumberFormat("fr-FR").format(item.totalPrice)}{" "}
                        <span className="text-[10px]">FCFA</span>
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm font-medium italic">
                    Aucun historique disponible.
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
