import { Clock, ExternalLink } from "lucide-react";
import type { Booking, BookingStatus } from "../../types/booking";

/* ---------- STATUS UI ---------- */
const statusUI: Record<BookingStatus, { label: string; className: string }> = {
  pending: {
    label: "En attente",
    className: "bg-orange-50 text-orange-600 border-orange-100",
  },
  confirmed: {
    label: "Confirmé",
    className: "bg-green-50 text-green-600 border-green-100",
  },
  cancelled: {
    label: "Annulé",
    className: "bg-red-50 text-red-600 border-red-100",
  },
  completed: {
    label: "Terminé",
    className: "bg-blue-50 text-blue-600 border-blue-100",
  },
};

/* ---------- DATE FORMAT ---------- */
const formatDate = (date?: string) => {
  if (!date) return "Date inconnue";

  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* ---------- COMPONENT ---------- */
const TableRow = ({ booking }: { booking: Booking }) => {
  const status = statusUI[booking.status] ?? statusUI.pending;

  const clientName =
    typeof booking.client === "object" ? booking.client.name : "Client";

  const serviceTitle =
    typeof booking.service === "object" ? booking.service.title : "Service";

  const clientId =
    typeof booking.client === "object" ? booking.client._id : booking.client;

  return (
    <tr className="group hover:bg-slate-50/80 transition-all duration-200">
      {/* CLIENT */}
      <td className="py-5 pl-2">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={`https://i.pravatar.cc/150?u=${clientId}`}
              className="w-9 h-9 rounded-xl object-cover border border-slate-100 shadow-sm"
              alt={clientName}
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-black text-slate-900 leading-none mb-1">
              {clientName}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              ID: #{clientId.slice(-4)}
            </span>
          </div>
        </div>
      </td>

      {/* SERVICE */}
      <td className="py-5">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-700 line-clamp-1">
            {serviceTitle}
          </span>
          <span className="text-[11px] font-medium text-blue-500">
            Détails de l'offre
          </span>
        </div>
      </td>

      {/* DATE */}
      <td className="py-5">
        <div className="flex items-center gap-2 text-slate-500">
          <div className="p-1.5 bg-slate-100 rounded-lg">
            <Clock size={12} />
          </div>
          <span className="text-xs font-bold whitespace-nowrap">
            {formatDate(booking.bookingDate)}
          </span>
        </div>
      </td>

      {/* STATUS */}
      <td className="py-5 text-right pr-2">
        <span
          className={`inline-flex items-center text-[10px] font-black px-3 py-1.5 rounded-xl border uppercase tracking-wider ${status.className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse" />
          {status.label}
        </span>
      </td>

      {/* ACTION */}
      <td className="py-5 text-right pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 hover:bg-white rounded-lg shadow-sm border border-slate-100 text-slate-400 hover:text-blue-600 transition-all">
          <ExternalLink size={16} />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
