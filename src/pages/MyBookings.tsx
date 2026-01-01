import {
  Search,
  Filter,
  Calendar as CalIcon,
  Clock,
  MoreVertical,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const bookings = [
    {
      id: "BK-9021",
      service: "Deep House Cleaning",
      provider: "Marie Clean & Co",
      date: "Oct 5, 2023",
      time: "10:00",
      status: "upcoming",
      price: "85.00€",
      img: "https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: "BK-8842",
      service: "Plumbing Repair",
      provider: "Jean Tech",
      date: "Sep 28, 2023",
      time: "14:30",
      status: "completed",
      price: "120.00€",
      img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=200",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FA] p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Mes Réservations
            </h1>
            <p className="text-gray-500 font-medium mt-1 italic">
              Gérez vos rendez-vous et l'historique de vos services.
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
                className="w-full bg-white border-none rounded-2xl py-3 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-blue-100 font-bold text-sm outline-none"
              />
            </div>
            <button className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm text-gray-500 hover:text-blue-600 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* TABS SELECTOR */}
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-4 text-sm font-black transition-all relative ${
              activeTab === "upcoming"
                ? "text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            À venir
            {activeTab === "upcoming" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`pb-4 text-sm font-black transition-all relative ${
              activeTab === "completed"
                ? "text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Passées
            {activeTab === "completed" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full" />
            )}
          </button>
        </div>

        {/* BOOKINGS LIST */}
        <div className="space-y-6">
          {bookings.filter((b) => b.status === activeTab || activeTab === "all")
            .length > 0 ? (
            bookings
              .filter((b) => b.status === activeTab)
              .map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-50 flex flex-col lg:flex-row items-center gap-8 hover:shadow-md transition-all group"
                >
                  {/* Service Image */}
                  <div className="w-full lg:w-40 h-32 rounded-3xl overflow-hidden shrink-0">
                    <img
                      src={booking.img}
                      alt={booking.service}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Service Info */}
                  <div className="flex-1 space-y-2 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        ID: {booking.id}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                          booking.status === "upcoming"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {booking.status === "upcoming" ? "Confirmé" : "Terminé"}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900">
                      {booking.service}
                    </h3>
                    <p className="text-sm font-bold text-gray-500 flex items-center justify-center lg:justify-start gap-2">
                      Prestataire :{" "}
                      <span className="text-blue-600 underline">
                        {booking.provider}
                      </span>
                    </p>
                  </div>

                  {/* Date & Time */}
                  <div className="flex lg:flex-col gap-6 lg:gap-2 px-8 py-4 lg:py-0 border-y lg:border-y-0 lg:border-x border-gray-50">
                    <div className="flex items-center gap-3 text-gray-600 font-bold text-sm">
                      <CalIcon size={18} className="text-blue-400" />{" "}
                      {booking.date}
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 font-bold text-sm">
                      <Clock size={18} className="text-blue-400" />{" "}
                      {booking.time}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="text-right hidden lg:block mr-4">
                      <p className="text-[10px] font-black text-gray-400 uppercase">
                        Total
                      </p>
                      <p className="text-xl font-black text-gray-900">
                        {booking.price}
                      </p>
                    </div>
                    <button className="flex-1 lg:flex-none bg-gray-50 hover:bg-gray-100 p-4 rounded-2xl text-gray-600 transition-colors">
                      <MessageSquare size={20} />
                    </button>
                    <button className="flex-1 lg:flex-none bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-lg shadow-blue-100 transition-all">
                      Détails
                    </button>
                    <button className="p-2 text-gray-300 hover:text-gray-600">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={40} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-black text-gray-900">
                Aucune réservation
              </h3>
              <p className="text-gray-400 font-medium mt-2">
                Vous n'avez pas encore de services prévus dans cette catégorie.
              </p>
              <button className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-blue-100 hover:scale-105 transition-all">
                Découvrir nos services
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
