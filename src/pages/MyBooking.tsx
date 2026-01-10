import {
  Search,
  Calendar as CalIcon,
  Clock,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuthStore } from "../stores/useAuthStore";
import type { Booking } from "../types/booking";

export default function MyBookings() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed">(
    "upcoming"
  );
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/my");
        setBookings(res.data);
      } catch (error) {
        console.error("Erreur API :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Logique de filtrage optimisée avec useMemo
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const status = booking.status;
      const matchesTab =
        activeTab === "upcoming"
          ? status === "pending" || status === "confirmed"
          : status === "completed" || status === "cancelled";

      const matchesSearch =
        booking.service.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        booking.vendor?.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [bookings, activeTab, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FA]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-gray-500">
            Récupération de vos rendez-vous...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FA] p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900">
              Mes Réservations
            </h1>
            <p className="text-gray-500 font-medium mt-1 italic">
              {user?.role === "vendor"
                ? "Gérez vos interventions clients"
                : "Suivez vos demandes de services"}
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher..."
                className="w-full bg-white rounded-2xl py-3 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-blue-400 font-bold text-sm outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          {[
            { id: "upcoming", label: "À venir" },
            { id: "completed", label: "Historique" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-sm font-black relative transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600"
                  : "text-gray-400 hover:text-gray-600"
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
              const isClient = user?.role === "client";
              const partner = isClient
                ? booking.vendor
                : (booking as any).client;

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-[2.5rem] p-6 shadow-md border border-gray-50 flex flex-col lg:flex-row gap-8 hover:shadow-xl transition-all duration-300"
                >
                  {/* IMAGE DU SERVICE */}
                  <div className="w-full lg:w-48 h-36 rounded-3xl overflow-hidden shrink-0">
                    <img
                      src={booking.service.images?.[0] || "/placeholder.png"}
                      alt={booking.service.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* CORPS DE LA CARTE */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          booking.status === "confirmed"
                            ? "bg-blue-100 text-blue-700"
                            : booking.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                      <span className="text-[11px] font-bold text-gray-400">
                        Réf: #{booking._id.slice(-6).toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-gray-900 leading-tight">
                      {booking.service.title}
                    </h3>

                    <div className="flex items-center gap-2 group">
                      <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                        <img
                          src={
                            partner?.avatar ||
                            `https://ui-avatars.com/api/?name=${partner?.name}`
                          }
                          alt=""
                        />
                      </div>
                      <p className="text-sm font-bold text-gray-600">
                        {isClient ? "Prestataire : " : "Client : "}
                        <span className="text-blue-600">
                          {partner?.name || "Utilisateur"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* DATE & PRIX */}
                  <div className="flex flex-col justify-center gap-3 lg:border-l lg:pl-8 border-gray-100 min-w-[200px]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-bold text-gray-700">
                        <CalIcon size={16} className="text-blue-500" />
                        {new Date(booking.bookingDate).toLocaleDateString(
                          "fr-FR",
                          { day: "numeric", month: "long" }
                        )}
                      </div>
                      <div className="flex items-center gap-2 font-bold text-gray-500 text-sm">
                        <Clock size={16} className="text-blue-500" />
                        {new Date(booking.bookingDate).toLocaleTimeString(
                          "fr-FR",
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="text-2xl font-black text-gray-900">
                        {booking.totalPrice.toLocaleString()}{" "}
                        <span className="text-sm">FCFA</span>
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS BOUTONS */}
                  <div className="flex lg:flex-col items-center justify-center gap-3 border-t lg:border-t-0 lg:border-l pt-6 lg:pt-0 lg:pl-6 border-gray-100">
                    <button
                      onClick={() => navigate(`/chat/${booking._id}`)}
                      className="flex-1 lg:w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-600 p-4 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <MessageSquare size={20} />
                      <span className="lg:hidden">Chat</span>
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/services/${booking.service._id}`)
                      }
                      className="flex-[2] lg:w-full bg-gray-900 text-white px-6 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all"
                    >
                      Détails
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={40} className="text-gray-300" />
              </div>
              <h3 className="text-2xl font-black text-gray-900">
                Rien à afficher ici
              </h3>
              <p className="text-gray-400 mt-2 max-w-sm mx-auto font-medium">
                {searchTerm
                  ? `Aucun résultat pour "${searchTerm}"`
                  : "Vous n'avez pas encore de réservations dans cette section."}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => navigate("/services")}
                  className="mt-8 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-blue-200 hover:scale-105 transition-transform"
                >
                  Parcourir les services
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
