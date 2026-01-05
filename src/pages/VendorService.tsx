import { useEffect, useState, useCallback } from "react";
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Edit3,
  Trash2,
  ExternalLink,
} from "lucide-react";

import type { BookingStatus, Service } from "../types";
import api from "../api/axios";
import CreateServiceModal from "../components/Vendor/CreateServiceModal";

// ---------- PAGE PRINCIPALE ----------
const VendorService = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<BookingStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get<Service[]>("/services/vendor");
      setServices(res.data);
    } catch (error) {
      console.error("Erreur chargement services", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // LOGIQUE DE FILTRAGE CORRIGÉE
  const filteredServices = services.filter((s) => {
    const matchesSearch = s.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;

    if (activeTab === "confirmed") {
      return matchesSearch && s.status === "confirmed";
    }

    return matchesSearch && s.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Mes Services
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Gérez et suivez vos services selon leur statut.
          </p>
        </div>

        {/* Intégration du composant Modal avec rafraîchissement auto */}
        <CreateServiceModal onServiceCreated={fetchServices} />
      </div>

      <div className="max-w-7xl mx-auto mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
            <TabButton
              label="Tous"
              active={activeTab === "all"}
              onClick={() => setActiveTab("all")}
            />
            <TabButton
              label="En attente"
              active={activeTab === "pending"}
              onClick={() => setActiveTab("pending")}
              color="text-orange-600"
            />
            <TabButton
              label="Confirmés"
              active={activeTab === "confirmed"}
              onClick={() => setActiveTab("confirmed")}
              color="text-green-600"
            />
            <TabButton
              label="Refusés"
              active={activeTab === "cancelled"}
              onClick={() => setActiveTab("cancelled")}
              color="text-red-600"
            />
          </div>

          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Rechercher un service..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 flex justify-center py-20">
            <span className="loading loading-dots loading-lg text-blue-600"></span>
          </div>
        ) : filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 col-span-3">
            <h3 className="text-xl font-bold text-slate-900">
              Aucun service trouvé
            </h3>
            <p className="text-slate-500">
              {activeTab === "all"
                ? "Commencez par créer votre premier service."
                : `Aucun service avec le statut "${activeTab}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- TabButton ----------
const TabButton = ({
  label,
  active,
  onClick,
  color = "text-slate-600",
}: any) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap flex-1 md:flex-none ${
      active
        ? "bg-white shadow-sm " + color
        : "text-slate-500 hover:text-slate-800"
    }`}
  >
    {label}
  </button>
);

// ---------- ServiceCard ----------
const ServiceCard = ({ service }: { service: Service }) => {
  const statusStyles: Record<string, any> = {
    pending: {
      icon: <Clock size={14} />,
      text: "En attente",
      bg: "bg-orange-100 text-orange-700",
      border: "border-orange-200",
    },
    confirmed: {
      icon: <CheckCircle2 size={14} />,
      text: "Approuvé",
      bg: "bg-green-100 text-green-700",
      border: "border-green-200",
    },
    approved: {
      icon: <CheckCircle2 size={14} />,
      text: "En ligne",
      bg: "bg-green-100 text-green-700",
      border: "border-green-200",
    },
    cancelled: {
      icon: <XCircle size={14} />,
      text: "Refusé",
      bg: "bg-red-100 text-red-700",
      border: "border-red-200",
    },
  };

  const style = statusStyles[service.status] || statusStyles.pending;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative h-52">
        <img
          src={
            service.images?.[0] ??
            "https://images.unsplash.com/photo-1521791136064-7986c2959210?auto=format&fit=crop&q=80&w=800"
          }
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md border shadow-sm ${style.bg} ${style.border}`}
        >
          {style.icon} {style.text}
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button className="p-3 bg-white rounded-xl shadow-xl hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110">
            <Edit3 size={20} />
          </button>
          <button className="p-3 bg-white rounded-xl shadow-xl hover:bg-red-600 hover:text-white transition-all transform hover:scale-110">
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span className="text-[11px] font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">
            {service.category}
          </span>
          <span className="text-[11px] text-slate-400 font-bold">
            {service.city}
          </span>
        </div>
        <h3 className="font-bold text-slate-900 text-lg mb-4 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {service.title}
        </h3>
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
              Prix prestation
            </p>
            <p className="text-xl font-black text-slate-900">
              {service.price.toLocaleString()} FCFA
            </p>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-all">
            Détails <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorService;
