import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Calendar as CalIcon,
  Clock,
  MessageSquare,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ChevronRight,
  ArrowLeft, // Importation de l'icône de retour
} from "lucide-react";
import { toast } from "react-toastify";
import { useAuthStore } from "../stores/useAuthStore";
import api from "../api/axios";
import type { Booking, BookingStatus } from "../types/booking";

export default function MyBooking() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"upcoming" | "history">(
    "upcoming"
  );
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/my");
        setBookings(res.data);
      } catch (error) {
        console.error("Erreur chargement réservations:", error);
        toast.error("Erreur lors du chargement des réservations");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: BookingStatus) => {
    try {
      await api.patch(`/bookings/status/${id}`, { status: newStatus });
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
      );
      toast.success(`Statut mis à jour : ${newStatus}`);
    } catch (error) {
      toast.error("Impossible de mettre à jour le statut");
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const isUpcoming = b.status === "pending" || b.status === "confirmed";
      const matchesTab = activeTab === "upcoming" ? isUpcoming : !isUpcoming;
      const serviceTitle = b.service?.title || (b.service as any)?.name || "";
      const partnerName =
        user?.role === "client" ? b.vendor?.name : b.client?.name;
      const matchesSearch =
        serviceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partnerName?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [bookings, activeTab, searchTerm, user]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-blue-600" size={48} />
          <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">
            Initialisation de l'agenda...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        {/* BOUTON RETOUR & TITRE */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-sm mb-6 transition-all group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          RETOUR
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Mes Réservations
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              {user?.role === "vendor"
                ? "Gérez vos interventions et vos revenus"
                : "Consultez et gérez vos rendez-vous programmés"}
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 shadow-sm border border-slate-100 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 font-bold transition-all placeholder:text-slate-300"
              placeholder="Rechercher un service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* ONGLETS STYLISÉS */}
        <div className="flex gap-10 border-b border-slate-200 mb-10">
          {[
            { id: "upcoming", label: "À venir" },
            { id: "history", label: "Historique" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 font-black text-xs uppercase tracking-[0.15em] transition-all relative ${
                activeTab === tab.id
                  ? "text-blue-600"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* LISTE DES RÉSERVATIONS */}
        <div className="space-y-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => {
              const partner =
                user?.role === "client" ? booking.vendor : booking.client;

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-8 hover:shadow-xl hover:border-blue-100 transition-all duration-300 group"
                >
                  {/* IMAGE DU SERVICE */}
                  <div className="w-full lg:w-48 h-44 rounded-3xl overflow-hidden shrink-0 bg-slate-100">
                    <img
                      src={
                        booking.service?.images?.[0] ||
                        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=500"
                      }
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={booking.service?.title}
                    />
                  </div>

                  {/* CONTENU */}
                  <div className="flex-1 space-y-5">
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          booking.status === "confirmed"
                            ? "bg-green-50 text-green-600 border border-green-100"
                            : booking.status === "pending"
                            ? "bg-amber-50 text-amber-600 border border-amber-100" // Couleur ambre stylisée
                            : "bg-slate-50 text-slate-500 border border-slate-100"
                        }`}
                      >
                        {booking.status === "pending"
                          ? "En attente"
                          : booking.status}
                      </span>
                      <span className="text-[10px] font-bold text-slate-300">
                        #{booking._id.slice(-6).toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      {booking.service?.title || (booking.service as any)?.name}
                    </h3>

                    <div className="flex items-center gap-3 bg-slate-50 w-fit p-1.5 pr-4 rounded-2xl border border-slate-100">
                      <img
                        src={
                          partner?.avatar ||
                          `https://ui-avatars.com/api/?name=${partner?.name}&background=6366f1&color=fff`
                        }
                        className="w-8 h-8 rounded-xl object-cover"
                        alt={partner?.name}
                      />
                      <p className="text-sm font-bold text-slate-600">
                        {user?.role === "client" ? "Expert" : "Client"} :{" "}
                        <span className="text-blue-600">{partner?.name}</span>
                      </p>
                    </div>
                  </div>

                  {/* DATE & PRIX */}
                  <div className="flex flex-col justify-center gap-4 lg:border-l lg:pl-8 min-w-[220px] border-slate-100">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 font-bold text-slate-700">
                        <CalIcon size={18} className="text-blue-600" />
                        <span className="text-sm">
                          {new Date(booking.bookingDate).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-bold text-slate-400">
                        <Clock size={18} className="text-blue-400" />
                        <span className="text-sm">
                          {booking.time || "14:30"}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-50">
                      <p className="text-2xl font-black text-slate-900">
                        {new Intl.NumberFormat("fr-FR").format(
                          booking.totalPrice
                        )}
                        <span className="text-xs ml-1.5 text-slate-400 font-bold uppercase">
                          {booking.currency || "FCFA"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex lg:flex-col gap-3 justify-center lg:border-l lg:pl-6 border-slate-100">
                    {user?.role === "vendor" &&
                      booking.status === "pending" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(booking._id, "confirmed" as any)
                          }
                          className="p-4 bg-green-500 text-white rounded-2xl hover:bg-green-600 shadow-lg shadow-green-200 transition-all flex items-center justify-center"
                          title="Accepter"
                        >
                          <CheckCircle2 size={24} />
                        </button>
                      )}

                    <button
                      onClick={() => navigate(`/chat/${partner?._id}`)}
                      className="p-4 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                    >
                      <MessageSquare size={24} />
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/dashboard/bookings/${booking._id}`)
                      }
                      className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center shadow-lg shadow-slate-200"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            /* EMPTY STATE */
            <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={40} className="text-slate-200" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Aucun rendez-vous
              </h3>
              <p className="text-slate-400 mt-2 font-medium">
                Votre agenda est libre pour le moment.
              </p>
              {!searchTerm && (
                <button
                  onClick={() => navigate("/services")}
                  className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all"
                >
                  Explorer les services
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
