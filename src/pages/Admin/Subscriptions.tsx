import { useEffect, useState, useCallback } from "react";
import {
  Search,
  TrendingUp,
  Users,
  Zap,
  Crown,
  Loader2,
  ExternalLink,
} from "lucide-react";
import Sidebar from "../../Components/Sidebar";
import HeaderAdmin from "../../Components/admin/HeaderAdmin";
import api from "../../api/axios";

interface VendorSubscription {
  _id: string;
  name: string;
  email: string;
  vendorPlan: "free" | "pro" | "premium";
  createdAt: string;
}

export default function Subscriptions() {
  const [vendors, setVendors] = useState<VendorSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSubscriptions = useCallback(async () => {
    setLoading(true);
    try {
      // On récupère tous les utilisateurs filtrés par rôle vendor
      const res = await api.get("/admin/users");
      const onlyVendors = res.data.filter((u: any) => u.role === "vendor");
      setVendors(onlyVendors);
    } catch (err) {
      console.error("Erreur chargement abonnements", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const stats = {
    total: vendors.length,
    pro: vendors.filter((v) => v.vendorPlan === "pro").length,
    premium: vendors.filter((v) => v.vendorPlan === "premium").length,
    free: vendors.filter((v) => v.vendorPlan === "free").length,
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

          {/* --- HEADER STATS --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Vendeurs"
              value={stats.total}
              icon={<Users className="text-blue-500" />}
              color="bg-blue-50"
            />
            <StatCard
              title="Plans Free"
              value={stats.free}
              icon={<Zap className="text-slate-400" />}
              color="bg-slate-50"
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

          {/* --- LISTE DES ABONNEMENTS --- */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 italic">
                  Suivi des Abonnements
                </h2>
                <p className="text-slate-400 text-sm font-medium">
                  Liste des prestataires et leurs paliers actuels
                </p>
              </div>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Rechercher un vendeur..."
                  className="pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all w-full md:w-64"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-20 flex justify-center">
                  <Loader2 className="animate-spin text-blue-500" size={40} />
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Vendeur
                      </th>
                      <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Plan Actuel
                      </th>
                      <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Date d'inscription
                      </th>
                      <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredVendors.map((vendor) => (
                      <tr
                        key={vendor._id}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs uppercase">
                              {vendor.name.substring(0, 2)}
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
                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${getPlanStyle(
                              vendor.vendorPlan
                            )}`}
                          >
                            {vendor.vendorPlan}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                          {new Date(vendor.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-8 py-5">
                          <a
                            href={`/dashAdmin/users`} // Redirection vers la gestion pour modifier le plan
                            className="p-2 text-slate-300 hover:text-blue-500 transition-colors block"
                          >
                            <ExternalLink size={18} />
                          </a>
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

// --- SOUS-COMPOSANTS ---

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: any;
  color: string;
}) {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
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
