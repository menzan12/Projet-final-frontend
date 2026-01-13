import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  ArrowLeft,
  Zap,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../../api/axios";

// Import des types basés sur vos interfaces
import type { Service, Availability } from "../../types/service";
import QuotaUpgradeCard from "../../components/Vendor/QuotaUpgradeCard";

const PLAN_LIMITS: Record<string, number> = {
  free: 3,
  pro: 10,
  premium: 1000,
};

const VendorService = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "active">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [userPlan, setUserPlan] = useState<string>("free");
  const [isUpgradePending, setIsUpgradePending] = useState(false);
  const [_editingService, setEditingService] = useState<Service | null>(null);

  const navigate = useNavigate();

  const fetchUserStatus = useCallback(async () => {
    try {
      const res = await api.get("/auth/me");
      setUserPlan(res.data.vendorPlan || "free");
      setIsUpgradePending(res.data.upgradeRequested || false);
    } catch (error) {
      console.error("Erreur profil utilisateur", error);
    }
  }, []);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get<Service[]>("/services/my-services");
      setServices(res.data);
    } catch (error) {
      console.error("Erreur chargement services", error);
      toast.error("Erreur lors de la récupération.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserStatus();
    fetchServices();
  }, [fetchServices, fetchUserStatus]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce service ?")) return;
    try {
      await api.delete(`/services/${id}`);
      toast.success("Service supprimé avec succès !");
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      toast.error("Erreur lors de la suppression.");
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    const modal = document.getElementById(
      "create_service_modal"
    ) as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  const currentLimit = PLAN_LIMITS[userPlan] || 3;
  const usagePercentage = Math.min((services.length / currentLimit) * 100, 100);
  const isLimitReached = services.length >= currentLimit;

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchesSearch = s.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      if (activeTab === "all") return matchesSearch;
      return matchesSearch && s.status === "active";
    });
  }, [services, searchQuery, activeTab]);

  return (
    <div className="min-h-screen bg-[#f0f4f8] p-4 md:p-8">
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-gradient-to-br from-blue-900 to-blue-800 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>

          <div className="flex items-start gap-6 relative z-10">
            <button
              onClick={() => navigate("/dashVendor")}
              className="mt-1 p-4 bg-white/10 backdrop-blur-md hover:bg-orange-500 text-white rounded-2xl transition-all border border-white/20"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-4xl font-[1000] text-white uppercase tracking-tighter">
                Catalogue <span className="text-orange-400">Pro</span>
              </h1>
              <p className="text-blue-100 font-medium opacity-80 mt-1 uppercase text-xs tracking-widest">
                Plan actuel: {userPlan}
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-3xl relative z-10">
            <div className="flex justify-between mb-2 text-[10px] font-black uppercase text-blue-200">
              <span>Quota Services</span>
              <span className="text-orange-400">
                {services.length} / {currentLimit === 1000 ? "∞" : currentLimit}
              </span>
            </div>
            <div className="w-40 h-2.5 bg-blue-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all duration-1000"
                style={{ width: `${usagePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <QuotaUpgradeCard
        usagePercentage={usagePercentage}
        isLimitReached={isLimitReached}
        userPlan={userPlan}
        currentCount={services.length}
        limit={currentLimit}
        isPending={isUpgradePending}
        onRefresh={fetchUserStatus}
      />

      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex bg-blue-900/5 p-1.5 rounded-[1.8rem] border border-blue-900/10">
          <TabButton
            label="Tout voir"
            active={activeTab === "all"}
            onClick={() => setActiveTab("all")}
          />
          <TabButton
            label="Actifs"
            active={activeTab === "active"}
            onClick={() => setActiveTab("active")}
            orange
          />
        </div>

        <div className="relative w-full md:w-96 group">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-900/30 group-focus-within:text-orange-500 transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-14 pr-6 py-4 bg-white border-2 border-transparent rounded-[1.8rem] focus:outline-none focus:border-orange-500 shadow-lg font-bold text-blue-900 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ? (
          <div className="col-span-full py-40 flex justify-center">
            <div className="w-16 h-16 border-4 border-blue-900/10 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
        ) : filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
              onDelete={() => handleDelete(service._id)}
              onEdit={() => handleEdit(service)}
            />
          ))
        ) : (
          <div className="col-span-full bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-blue-900/10">
            <Zap className="mx-auto text-orange-200 mb-4" size={48} />
            <h3 className="text-xl font-black text-blue-900 uppercase">
              Aucun service trouvé
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

// --- SOUS-COMPOSANTS ---

const TabButton = ({ label, active, onClick, orange }: any) => (
  <button
    onClick={onClick}
    className={`px-8 py-3.5 rounded-[1.4rem] text-[11px] font-[900] uppercase tracking-widest transition-all ${
      active
        ? orange
          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
          : "bg-blue-900 text-white shadow-lg shadow-blue-900/30"
        : "text-blue-900/40 hover:text-blue-900"
    }`}
  >
    {label}
  </button>
);

const ServiceCard = ({
  service,
  onDelete,
  onEdit,
}: {
  service: Service;
  onDelete: () => void;
  onEdit: () => void;
}) => {
  // Détermine comment afficher la catégorie selon le type défini dans l'interface
  const categoryLabel =
    typeof service.category === "string"
      ? service.category
      : service.category[0]?.name || "Service";

  return (
    <div className="bg-white rounded-[2.8rem] overflow-hidden shadow-xl border border-white hover:shadow-orange-500/10 hover:-translate-y-4 transition-all duration-500 group">
      <div className="relative h-64 overflow-hidden">
        <img
          src={
            service.images?.[0] ||
            "https://via.placeholder.com/800x600?text=No+Image"
          }
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute bottom-6 right-6 flex gap-2 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <button
            onClick={onEdit}
            className="h-12 w-12 bg-white rounded-2xl shadow-xl text-blue-900 hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center"
          >
            <Edit3 size={18} />
          </button>
          <button
            onClick={onDelete}
            className="h-12 w-12 bg-white rounded-2xl shadow-xl text-red-500 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="p-10">
        <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">
          {categoryLabel}
        </span>
        <h3 className="font-[1000] text-blue-900 text-2xl mb-4 line-clamp-1 tracking-tighter">
          {service.title}
        </h3>

        {/* Section Planning utilisant explicitement le type Availability pour éviter l'erreur TS6196 */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {service.availability?.some((a: Availability) => a.active) ? (
            service.availability
              .filter((a: Availability) => a.active)
              .map((day: Availability, idx: number) => (
                <span
                  key={idx}
                  className="text-[9px] font-black px-2 py-1 bg-blue-50 text-blue-900 rounded-lg border border-blue-100 uppercase"
                >
                  {day.day.substring(0, 3)}
                </span>
              ))
          ) : (
            <span className="text-[9px] font-bold text-blue-300 italic">
              Aucun planning actif
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-8 border-t-2 border-blue-50">
          <div>
            <p className="text-[10px] font-black text-blue-900/30 uppercase tracking-widest mb-1">
              Tarif Fixe
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-[1000] text-blue-900 tracking-tighter">
                {(service.price || 0).toLocaleString()}
              </span>
              <span className="text-xs font-black text-orange-500 uppercase tracking-tighter">
                CFA
              </span>
            </div>
          </div>
          <button className="h-14 w-14 bg-blue-50 rounded-3xl text-blue-900 hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center group/btn">
            <ExternalLink
              size={22}
              className="group-hover/btn:scale-110 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorService;
