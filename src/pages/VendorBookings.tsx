import { useState, useEffect } from "react";

import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  Mail,
  Euro,
} from "lucide-react";
import api from "../api/axios";
import type { Booking } from "../types";

const VendorBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/vendor");
      setBookings(res.data);
    } catch (err) {
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/bookings/status/${id}`, { status: newStatus });
      fetchBookings(); // Rafraîchir la liste
    } catch (err) {
      alert("Erreur lors de la mise à jour");
    }
  };

  const filteredBookings = bookings.filter(
    (b) => filter === "all" || b.status === filter
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              Gestion des Réservations
            </h1>
            <p className="text-slate-500 font-medium">
              Suivez et validez vos rendez-vous clients
            </p>
          </div>

          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
            {["all", "pending", "confirmed", "cancelled"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all capitalize ${
                  filter === s
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {s === "all"
                  ? "Tous"
                  : s === "pending"
                  ? "En attente"
                  : s === "confirmed"
                  ? "Confirmé"
                  : "Annulé"}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="grid gap-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Date & Time */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-start gap-3 lg:gap-1 min-w-[140px]">
                    <div className="bg-blue-50 text-blue-700 p-2 rounded-lg">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">
                        {new Date(booking.bookingDate).toLocaleDateString(
                          "fr-FR",
                          { day: "numeric", month: "short" }
                        )}
                      </p>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                        <Clock size={12} />{" "}
                        {new Date(booking.bookingDate).toLocaleTimeString(
                          "fr-FR",
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Client & Service */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900">
                      {booking.service?.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <User size={14} /> {booking.client?.name}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Mail size={14} /> {booking.client?.email}
                      </span>
                      <span className="flex items-center gap-1.5 font-bold text-slate-700">
                        <Euro size={14} /> {booking.totalPrice}€
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 lg:border-l lg:pl-6 border-slate-100">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(booking._id, "confirmed")}
                          className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold transition-all"
                        >
                          <CheckCircle size={16} /> Accepter
                        </button>
                        <button
                          onClick={() => updateStatus(booking._id, "cancelled")}
                          className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-sm font-bold transition-all"
                        >
                          <XCircle size={16} /> Refuser
                        </button>
                      </>
                    )}
                    {booking.status === "confirmed" && (
                      <button className="text-slate-400 text-sm font-medium italic">
                        Réservation confirmée
                      </button>
                    )}
                  </div>
                </div>
                {booking.notes && (
                  <div className="mt-4 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 italic border-l-4 border-blue-200">
                    " {booking.notes} "
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-slate-200">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-slate-400" size={30} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Aucune réservation
            </h3>
            <p className="text-slate-500">
              Les demandes de vos clients apparaîtront ici.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorBookings;
