import React, { useEffect, useState } from "react";
import { MoreHorizontal, Loader2, CalendarX } from "lucide-react";
import api from "../../api/axios";

interface Booking {
  _id: string;
  serviceName: string;
  clientName: string;
  createdAt: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
}

const RecentBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/admin/recent-bookings");
        setBookings(res.data);
      } catch (err) {
        console.error("Erreur bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Fonction pour gérer les couleurs des badges de statut
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "confirmed":
      case "completed":
        return "bg-green-50 text-green-600";
      case "pending":
        return "bg-orange-50 text-orange-600";
      case "cancelled":
        return "bg-red-50 text-red-600";
      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-12 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={32} />
        <p className="text-slate-400 text-sm font-medium">
          Chargement des réservations...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-50 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900">
          Dernières Réservations
        </h3>
        <button className="text-blue-600 text-xs font-black uppercase tracking-widest hover:text-blue-700 transition-colors">
          Voir tout le rapport
        </button>
      </div>

      <div className="overflow-x-auto">
        {bookings.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                <th className="px-8 py-5">Service</th>
                <th className="px-8 py-5">Client</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Montant</th>
                <th className="px-8 py-5">Statut</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-slate-50/30 transition-colors group"
                >
                  <td className="px-8 py-5 font-bold text-slate-900 italic">
                    {booking.serviceName}
                  </td>
                  <td className="px-8 py-5 text-slate-500 font-bold uppercase text-[10px]">
                    {booking.clientName}
                  </td>
                  <td className="px-8 py-5 text-slate-400 font-medium text-xs">
                    {new Date(booking.createdAt).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-8 py-5 font-black text-slate-900 text-sm">
                    {booking.totalPrice.toFixed(2)} €
                  </td>
                  <td className="px-8 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(
                        booking.status
                      )}`}
                    >
                      {booking.status === "pending"
                        ? "En attente"
                        : booking.status === "confirmed"
                        ? "Confirmé"
                        : booking.status === "completed"
                        ? "Terminé"
                        : "Annulé"}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-20 flex flex-col items-center justify-center text-slate-400">
            <CalendarX size={48} className="mb-4 opacity-20" />
            <p className="text-sm font-medium">Aucune réservation trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentBookings;
