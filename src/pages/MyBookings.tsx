import {
  Search,
  Filter,
  Calendar as CalIcon,
  Clock,
  MoreVertical,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";
import type { Booking, BookingStatus } from "../types";

export default function MyBookings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed">(
    "upcoming"
  );
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* =========================
      FETCH BOOKINGS
  ========================= */
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/my");
        console.log("DONNÉES DU BACKEND :", res.data); // <--- AJOUTE ÇA
        setBookings(res.data);
      } catch (error) {
        console.error("Erreur API :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  /* =========================
      STATUS MAPPING
  ========================= */
  const isUpcoming = (status: BookingStatus) =>
    status === "pending" || status === "confirmed";

  const isCompleted = (status: BookingStatus) =>
    status === "completed" || status === "cancelled";

  const filteredBookings = bookings.filter((booking) =>
    activeTab === "upcoming"
      ? isUpcoming(booking.status)
      : isCompleted(booking.status)
  );

  /* =========================
      LOADING
  ========================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FA]">
        <p className="font-bold text-gray-500">
          Chargement des réservations...
        </p>
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
              Gérez vos rendez-vous et services réservés
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
                placeholder="Rechercher un service..."
                className="w-full bg-white rounded-2xl py-3 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-blue-100 font-bold text-sm outline-none"
              />
            </div>
            <button className="bg-white p-3 rounded-2xl shadow-sm text-gray-500 hover:text-blue-600 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          {["upcoming", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "upcoming" | "completed")}
              className={`pb-4 text-sm font-black relative ${
                activeTab === tab ? "text-blue-600" : "text-gray-400"
              }`}
            >
              {tab === "upcoming" ? "À venir" : "Passées"}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* BOOKINGS LIST */}
        <div className="space-y-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => {
              const receiverName =
                user?.role === "client"
                  ? booking.vendor?.name || "Prestataire"
                  : (booking as any).client?.name || "Client";

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-[2.5rem] p-6 shadow-lg border border-gray-100 flex flex-col lg:flex-row gap-8 hover:shadow-2xl transition-shadow"
                >
                  {/* IMAGE */}
                  <div className="w-full lg:w-40 h-32 rounded-3xl overflow-hidden border border-gray-200">
                    <img
                      src={booking.service.images?.[0] || "/placeholder.png"}
                      alt={booking.service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* INFOS */}
                  <div className="flex-1 space-y-2 text-center lg:text-left">
                    <div className="flex gap-2 justify-center lg:justify-start items-center">
                      <span className="text-[10px] font-black text-gray-400">
                        Discussion avec {receiverName}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                          booking.status === "confirmed"
                            ? "bg-blue-50 text-blue-600"
                            : booking.status === "completed"
                            ? "bg-green-50 text-green-600"
                            : booking.status === "cancelled"
                            ? "bg-red-50 text-red-600"
                            : "bg-yellow-50 text-yellow-600"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-gray-900">
                      {booking.service.title}
                    </h3>

                    <p className="text-sm font-medium text-gray-500">
                      Prestataire :{" "}
                      <span className="text-blue-600 underline">
                        {booking.vendor?.name || "N/A"}
                      </span>
                    </p>
                  </div>

                  {/* DATE & TIME */}
                  <div className="flex flex-col gap-2 px-8 text-gray-600">
                    <div className="flex items-center gap-3 font-bold text-sm">
                      <CalIcon size={18} className="text-blue-400" />
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-3 font-bold text-sm">
                      <Clock size={18} className="text-blue-400" />
                      {new Date(booking.bookingDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-4 mt-4 lg:mt-0">
                    <div className="text-right hidden lg:block">
                      <p className="text-[10px] font-black text-gray-400">
                        Total
                      </p>
                      <p className="text-xl font-black text-gray-900">
                        {booking.totalPrice} FCFA
                      </p>
                    </div>

                    <button
                      onClick={async () => {
                        try {
                          const receiverId =
                            user?.role === "client"
                              ? booking.vendor?._id
                              : (booking as any).client?._id;
                          if (!receiverId) return;
                          await api.post("/messages", {
                            receiverId,
                            content:
                              "Bonjour, je vous contacte concernant ma réservation.",
                            booking: booking._id,
                          });
                          navigate(`/chat/${booking._id}`);
                        } catch {
                          navigate(`/chat/${booking._id}`);
                        }
                      }}
                      className="bg-blue-50 hover:bg-blue-100 p-4 rounded-2xl text-blue-600 transition-colors"
                      title="Contacter"
                    >
                      <MessageSquare size={20} />
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/services/${booking.service._id}`)
                      }
                      className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-colors"
                    >
                      Détails
                    </button>

                    <button className="p-2 text-gray-300 hover:text-gray-500">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed">
              <AlertCircle size={40} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-black text-gray-900">
                Aucune réservation
              </h3>
              <p className="text-gray-400 mt-2">
                Aucun service trouvé dans cette catégorie.
              </p>
              <button
                onClick={() => navigate("/services")}
                className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-colors"
              >
                Découvrir les services
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
