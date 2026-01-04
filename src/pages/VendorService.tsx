import { useState } from "react";
import {
  Plus,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Edit3,
  Trash2,
  ExternalLink,
} from "lucide-react";

// Types pour le statut
type ServiceStatus = "pending" | "approved" | "rejected";

interface Service {
  id: string;
  title: string;
  category: string;
  price: number;
  status: ServiceStatus;
  image: string;
  createdAt: string;
}

const VendorService = () => {
  const [activeTab, setActiveTab] = useState<ServiceStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Données de test (À remplacer par votre appel API type: res = await api.get('/my-services'))
  const services: Service[] = [
    {
      id: "1",
      title: "Conception de Logo Pro",
      category: "Design",
      price: 250,
      status: "approved",
      image:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400",
      createdAt: "12/10/2025",
    },
    {
      id: "2",
      title: "Audit SEO Complet",
      category: "Marketing",
      price: 150,
      status: "pending",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
      createdAt: "14/10/2025",
    },
    {
      id: "3",
      title: "Développement React Native",
      category: "Dev",
      price: 1200,
      status: "rejected",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
      createdAt: "10/10/2025",
    },
  ];

  const filteredServices = services.filter(
    (s) =>
      (activeTab === "all" || s.status === activeTab) &&
      s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              Mes Services
            </h1>
            <p className="text-slate-500 text-sm">
              Gérez et suivez l'approbation de vos offres de services.
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95">
            <Plus size={20} />
            Créer un nouveau service
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="max-w-7xl mx-auto mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          {/* Tabs de filtrage */}
          <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
            <TabButton
              label="Tous"
              active={activeTab === "all"}
              onClick={() => setActiveTab("all")}
            />
            <TabButton
              label="Approuvés"
              active={activeTab === "approved"}
              onClick={() => setActiveTab("approved")}
              color="text-green-600"
            />
            <TabButton
              label="En attente"
              active={activeTab === "pending"}
              onClick={() => setActiveTab("pending")}
              color="text-orange-600"
            />
            <TabButton
              label="Refusés"
              active={activeTab === "rejected"}
              onClick={() => setActiveTab("rejected")}
              color="text-red-600"
            />
          </div>

          {/* Barre de recherche */}
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Rechercher un service..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Empty State (Si aucun service n'est trouvé) */}
      {filteredServices.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 max-w-7xl mx-auto">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
            <Search size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Aucun résultat</h3>
          <p className="text-slate-500">
            Aucun service ne correspond à vos critères actuels.
          </p>
        </div>
      )}
    </div>
  );
};

// --- Sous-composants Utilitaires ---

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

const ServiceCard = ({ service }: { service: Service }) => {
  // Styles dynamiques basés sur l'Enum du statut
  const statusStyles = {
    approved: {
      icon: <CheckCircle2 size={14} />,
      text: "Approuvé",
      bg: "bg-green-100 text-green-700",
      border: "border-green-200",
    },
    pending: {
      icon: <Clock size={14} />,
      text: "En attente",
      bg: "bg-orange-100 text-orange-700",
      border: "border-orange-200",
    },
    rejected: {
      icon: <XCircle size={14} />,
      text: "Refusé",
      bg: "bg-red-100 text-red-700",
      border: "border-red-200",
    },
  };

  const style = statusStyles[service.status];

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      {/* Container Image */}
      <div className="relative h-52">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />

        {/* Badge Statut flottant */}
        <div
          className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md border shadow-sm ${style.bg} ${style.border}`}
        >
          {style.icon}
          {style.text}
        </div>

        {/* Boutons d'action rapides au survol */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button className="p-3 bg-white rounded-xl shadow-xl text-slate-700 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110">
            <Edit3 size={20} />
          </button>
          <button className="p-3 bg-white rounded-xl shadow-xl text-slate-700 hover:bg-red-600 hover:text-white transition-all transform hover:scale-110">
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Contenu de la carte */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span className="text-[11px] font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">
            {service.category}
          </span>
          <span className="text-[11px] text-slate-400 font-bold">
            {service.createdAt}
          </span>
        </div>

        <h3 className="font-bold text-slate-900 text-lg mb-6 line-clamp-1 leading-tight group-hover:text-blue-600 transition-colors">
          {service.title}
        </h3>

        <div className="flex items-center justify-between pt-5 border-t border-slate-50">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
              Tarification
            </p>
            <p className="text-xl font-black text-slate-900">
              {service.price} €
            </p>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-all">
            Détails
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorService;
