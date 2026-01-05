import { Clock } from "lucide-react";
import type { Booking, BookingStatus } from "../../types";

/* ---------- STATUS UI ---------- */

const statusUI: Record<BookingStatus, { label: string; className: string }> = {
  pending: {
    label: "En attente",
    className: "bg-orange-100 text-orange-600",
  },
  confirmed: {
    label: "Confirmé",
    className: "bg-green-100 text-green-600",
  },
  cancelled: {
    label: "Annulé",
    className: "bg-red-100 text-red-600",
  },
  completed: {
    label: "Terminé",
    className: "bg-blue-100 text-blue-600",
  },
};

/* ---------- DATE FORMAT ---------- */

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

/* ---------- COMPONENT ---------- */

const TableRow = ({ booking }: { booking: Booking }) => {
  const status = statusUI[booking.status];

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      {/* CLIENT */}
      <td className="py-4 flex items-center gap-3">
        <img
          src={`https://i.pravatar.cc/150?u=${booking.client._id}`}
          className="w-8 h-8 rounded-full"
          alt={booking.client.name}
        />
        <span className="text-sm font-bold">{booking.client.name}</span>
      </td>

      {/* SERVICE */}
      <td className="py-4 text-sm text-slate-600 font-medium">
        {booking.service.title}
      </td>

      {/* DATE */}
      <td className="py-4">
        <div className="flex items-center gap-1.5 text-slate-500 text-sm">
          <Clock size={14} />
          {formatDate(booking.bookingDate)}
        </div>
      </td>

      {/* STATUS */}
      <td className="py-4">
        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${status.className}`}
        >
          {status.label}
        </span>
      </td>
    </tr>
  );
};

export default TableRow;
