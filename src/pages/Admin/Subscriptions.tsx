import { useEffect, useState, useCallback } from "react";
import {
  TrendingUp,
  Users,
  Zap,
  Crown,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import Sidebar from "../../components/Sidebar";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import api from "../../api/axios";
import { toast } from "react-toastify"; // Utilisation de Toastify

interface VendorSubscription {
  _id: string;
  name: string;
  email: string;
  vendorPlan: "free" | "pro" | "premium";
  upgradeRequested: boolean;
  requestedPlan: string;
  createdAt: string;
}

export default function Subscriptions() {
  const [vendors, setVendors] = useState<VendorSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchSubscriptions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/users");
      const onlyVendors = res.data.filter((u: any) => u.role === "vendor");
      setVendors(onlyVendors);
    } catch (err) {
      toast.error("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  // --- LOGIQUE DE VALIDATION (Mise à jour DB via Backend) ---
  const handleApproveUpgrade = async (vendorId: string, newPlan: string) => {
    setProcessingId(vendorId);
    try {
      // Appel à votre route PATCH /admin/update-vendor-plan
      await api.patch("/admin/update-vendor-plan", {
        userId: vendorId,
        newPlan: newPlan,
      });

      toast.success(`Succès ! Le plan est passé à ${newPlan.toUpperCase()}`, {
        position: "top-right",
        theme: "colored",
      });

      fetchSubscriptions(); // Refresh global pour mettre à jour la liste et les stats
    } catch (err: any) {
      const msg =
        err.response?.data?.message || "Erreur lors de la mise à jour";
      toast.error(msg);
    } finally {
      setProcessingId(null);
    }
  };

  const stats = {
    total: vendors.length,
    pro: vendors.filter((v) => v.vendorPlan === "pro").length,
    premium: vendors.filter((v) => v.vendorPlan === "premium").length,
    pending: vendors.filter((v) => v.upgradeRequested).length,
  };

  const filteredVendors = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <div className="p-4 lg:p-8 max-w-[1400px] mx-auto space-y-8">
          <HeaderAdmin onSearch={(query) => setSearchTerm(query)} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Vendeurs"
              value={stats.total}
              icon={<Users className="text-blue-500" />}
              color="bg-blue-50"
            />
            <StatCard
              title="Demandes en cours"
              value={stats.pending}
              icon={<Zap className="text-orange-500 animate-pulse" />}
              color="bg-orange-50"
            />
            <StatCard
              title="Plans Pro"
              value={stats.pro}
              icon={<TrendingUp className="text-purple-500" />}
              color="bg-purple-50"
            />
            <StatCard
              title="Plans Premium"
              value={stats.premium}
              icon={<Crown className="text-amber-500" />}
              color="bg-amber-50"
            />
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50">
              <h2 className="text-xl font-black text-slate-900 italic">
                Suivi des Abonnements
              </h2>
              <p className="text-slate-400 text-sm font-medium">
                Gestion des niveaux d'accès prestataires
              </p>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-20 flex justify-center">
                  <Loader2 className="animate-spin text-blue-500" size={40} />
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">
                        Vendeur
                      </th>
                      <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">
                        Plan Actuel
                      </th>
                      <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">
                        Demande d'Upgrade
                      </th>
                      <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredVendors.map((vendor) => (
                      <tr
                        key={vendor._id}
                        className={`transition-colors ${
                          vendor.upgradeRequested
                            ? "bg-orange-50/30"
                            : "hover:bg-slate-50/50"
                        }`}
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                              {vendor.name[0]}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">
                                {vendor.name}
                              </p>
                              <p className="text-xs text-slate-400">
                                {vendor.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span
                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${getPlanStyle(
                              vendor.vendorPlan
                            )}`}
                          >
                            {vendor.vendorPlan}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          {vendor.upgradeRequested ? (
                            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-orange-100 w-fit">
                              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-ping"></span>
                              <span className="text-sm font-bold text-orange-600 italic">
                                Vers {vendor.requestedPlan?.toUpperCase()}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-300">
                              Stables
                            </span>
                          )}
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex justify-center gap-2">
                            {vendor.upgradeRequested && (
                              <button
                                onClick={() =>
                                  handleApproveUpgrade(
                                    vendor._id,
                                    vendor.requestedPlan
                                  )
                                }
                                disabled={processingId === vendor._id}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md hover:scale-105"
                              >
                                {processingId === vendor._id ? (
                                  <Loader2 className="animate-spin" size={14} />
                                ) : (
                                  <CheckCircle2 size={14} />
                                )}
                                Valider le Plan
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5">
      <div
        className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-2xl`}
      >
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">
          {title}
        </p>
        <p className="text-2xl font-black text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function getPlanStyle(plan: string) {
  switch (plan) {
    case "premium":
      return "bg-amber-50 text-amber-600 border border-amber-100";
    case "pro":
      return "bg-purple-50 text-purple-600 border border-purple-100";
    default:
      return "bg-slate-100 text-slate-500";
  }
}
