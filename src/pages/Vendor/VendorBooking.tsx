import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Search,
  MoreVertical,
  Filter,
  ArrowLeft,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../../api/axios";
import type { Conversation, Message } from "../../types/Message";
import UniversalChat from "../../Components/UniversalChat";

export default function VendorBookings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"bookings" | "messages">(
    "bookings"
  );

  // États Réservations
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // États Messagerie Dynamique
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  // Chargement initial des données
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [userRes, bookingsRes, convsRes] = await Promise.all([
        api.get("/auth/me"),
        api.get("/bookings/vendor"),
        api.get("/conversations"),
      ]);

      setCurrentUserId(userRes.data._id);
      setBookings(bookingsRes.data);
      setConversations(convsRes.data);
    } catch (err) {
      toast.error("Erreur de chargement des données");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Chargement des messages quand une conversation est sélectionnée
  useEffect(() => {
    if (selectedConvId) {
      api
        .get(`/messages/${selectedConvId}`)
        .then((res) => setMessages(res.data))
        .catch(() => toast.error("Impossible de charger les messages"));
    }
  }, [selectedConvId]);

  // LOGIQUE DE RECHERCHE FILTRÉE
  const filteredBookings = useMemo(() => {
    return bookings.filter(
      (booking) =>
        booking.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.serviceTitle?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [bookings, searchQuery]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/bookings/${id}`, { status });
      toast.success(`Statut mis à jour : ${status}`, { theme: "colored" });
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (err) {
      toast.error("Erreur de mise à jour");
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedConvId) return;
    try {
      const res = await api.post("/messages", {
        conversationId: selectedConvId,
        content,
        type: "text",
      });
      setMessages((prev) => [...prev, res.data]);
    } catch (err) {
      toast.error("Erreur lors de l'envoi");
    }
  };

  if (loading && bookings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F4F8]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F4F8] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* --- HEADER --- */}
        <div className="mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white p-8 rounded-[3rem] shadow-2xl shadow-blue-900/5 relative overflow-hidden border border-white">
          <div className="flex items-start gap-6 relative z-10">
            <button
              onClick={() => navigate("/dashVendor")}
              className="mt-1 p-4 bg-slate-900/5 backdrop-blur-md hover:bg-orange-500 text-slate-900 hover:text-white rounded-2xl transition-all active:scale-95 group border border-slate-200"
            >
              <ArrowLeft
                size={24}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>

            <div>
              <h1 className="text-4xl font-[1000] text-slate-900 uppercase tracking-tighter">
                Gestion <span className="text-blue-500">Business</span>
              </h1>
              <p className="text-slate-500 font-bold italic mt-1">
                Suivi des réservations et{" "}
                <span className="text-orange-500 text-sm">
                  interactions clients
                </span>
              </p>
            </div>
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-2xl relative z-10">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                activeTab === "bookings"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-slate-400 hover:text-blue-500"
              }`}
            >
              <Calendar size={16} /> Réservations
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                activeTab === "messages"
                  ? "bg-orange-500 text-white shadow-lg"
                  : "text-slate-400 hover:text-orange-500"
              }`}
            >
              <MessageSquare size={16} /> Messagerie
            </button>
          </div>
        </div>

        {activeTab === "bookings" ? (
          <div className="bg-white rounded-[3rem] border border-blue-50 shadow-2xl shadow-blue-900/5 overflow-hidden animate-in fade-in duration-500">
            <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full md:w-96 group">
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="Rechercher un client ou service..."
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-[1.5rem] text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all">
                <Filter size={16} /> Filtrer
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-blue-50/50">
                    <th className="px-10 py-5 text-[10px] font-black uppercase text-blue-900/40 tracking-[0.2em]">
                      Client
                    </th>
                    <th className="px-10 py-5 text-[10px] font-black uppercase text-blue-900/40 tracking-[0.2em]">
                      Prestation
                    </th>
                    <th className="px-10 py-5 text-[10px] font-black uppercase text-blue-900/40 tracking-[0.2em]">
                      Date
                    </th>
                    <th className="px-10 py-5 text-[10px] font-black uppercase text-blue-900/40 tracking-[0.2em]">
                      Statut
                    </th>
                    <th className="px-10 py-5 text-[10px] font-black uppercase text-blue-900/40 tracking-[0.2em] text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="hover:bg-blue-50/30 transition-all group"
                      >
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-black">
                              {booking.clientName?.charAt(0) || "C"}
                            </div>
                            <span className="font-bold text-slate-800 tracking-tight">
                              {booking.clientName}
                            </span>
                          </div>
                        </td>
                        <td className="px-10 py-6 font-black text-slate-600 text-sm uppercase">
                          {booking.serviceTitle}
                        </td>
                        <td className="px-10 py-6 italic font-bold text-xs text-slate-400">
                          {booking.date}
                        </td>
                        <td className="px-10 py-6">
                          <StatusBadge status={booking.status} />
                        </td>
                        <td className="px-10 py-6 text-center">
                          <div className="flex justify-center gap-3">
                            {booking.status === "pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    updateStatus(booking._id, "confirmed")
                                  }
                                  className="h-10 w-10 bg-white border border-green-100 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all flex items-center justify-center"
                                >
                                  <CheckCircle2 size={18} />
                                </button>
                                <button
                                  onClick={() =>
                                    updateStatus(booking._id, "cancelled")
                                  }
                                  className="h-10 w-10 bg-white border border-red-100 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                                >
                                  <XCircle size={18} />
                                </button>
                              </>
                            )}
                            <button className="h-10 w-10 bg-slate-50 text-slate-300 rounded-xl hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-20 text-center text-slate-400 font-bold uppercase text-xs tracking-widest"
                      >
                        Aucune réservation trouvée
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-right-5 duration-500">
              <UniversalChat
              title="Support & Ventes"
              accentColor="blue"
              conversations={conversations}
              messages={messages}
              selectedConvId={selectedConvId}
              currentUserId={currentUserId}
              onSelectConversation={(id: string) => setSelectedConvId(id)}
              onSendMessage={handleSendMessage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    confirmed: "bg-green-50 text-green-600 border-green-100",
    pending: "bg-orange-50 text-orange-600 border-orange-100",
    cancelled: "bg-red-50 text-red-500 border-red-100",
  };
  return (
    <span
      className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] border ${
        styles[status as keyof typeof styles] ||
        "bg-slate-50 text-slate-500 border-slate-100"
      }`}
    >
      {status === "pending" ? "Attente" : status}
    </span>
  );
};
