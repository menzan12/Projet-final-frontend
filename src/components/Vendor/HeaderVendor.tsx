import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Hourglass, Wallet } from "lucide-react";
import api from "../../api/axios";
import type { VendorStats } from "../../types";

export default function HeaderVendor() {
  const [stats, setStats] = useState<VendorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await api.get<VendorStats>("/stats/vendor");
        setStats(response.data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          setError("Session expirée.");
          setTimeout(() => (window.location.href = "/login"), 2000);
        } else {
          setError(err.response?.data?.message || "Erreur de chargement");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <HeaderSkeleton />;

  if (error || !stats) {
    return (
      <div className="bg-red-50 border border-red-100 text-red-600 rounded-3xl p-6 mb-8 flex justify-between items-center">
        <p className="font-bold">⚠️ {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-white px-4 py-2 rounded-xl shadow-sm text-sm font-black uppercase"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const isPositive = stats.revenueGrowth >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {/* Carte Revenus */}
      <StatCard
        label="Chiffre d'affaires"
        value={`${stats.currentMonthRevenue.toLocaleString("fr-FR")} FCFA`}
        subtext="Ce mois-ci"
        icon={<Wallet className="w-7 h-7 text-white" />}
        iconBg="bg-gradient-to-br from-blue-600 to-blue-400"
      />

      {/* Carte Croissance */}
      <StatCard
        label="Croissance"
        value={`${isPositive ? "+" : ""}${stats.revenueGrowth.toFixed(1)}%`}
        subtext="vs mois dernier"
        icon={
          isPositive ? (
            <TrendingUp className="w-7 h-7" />
          ) : (
            <TrendingDown className="w-7 h-7" />
          )
        }
        iconBg={
          isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        }
        valueClass={isPositive ? "text-green-600" : "text-red-600"}
      />

      {/* Carte Services en Attente */}
      <StatCard
        label="En attente"
        value={stats.pendingServices.toString()}
        subtext="Services à valider"
        icon={<Hourglass className="w-7 h-7 text-white" />}
        iconBg="bg-gradient-to-br from-orange-500 to-yellow-400"
      />
    </div>
  );
}

/* --- Sous-composant pour les cartes --- */
function StatCard({
  label,
  value,
  subtext,
  icon,
  iconBg,
  valueClass = "text-slate-900",
}: any) {
  return (
    <div className="bg-white rounded-[2.5rem] p-7 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div>
        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
          {label}
        </p>
        <p className={`text-2xl font-black ${valueClass}`}>{value}</p>
        <p className="text-xs font-bold text-slate-400 mt-1">{subtext}</p>
      </div>
      <div className={`${iconBg} p-4 rounded-2xl shadow-lg`}>{icon}</div>
    </div>
  );
}

/* --- Skeleton Loading --- */
function HeaderSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-[2.5rem] p-8 shadow-sm animate-pulse flex justify-between items-center"
        >
          <div className="space-y-3">
            <div className="h-3 w-20 bg-slate-100 rounded" />
            <div className="h-6 w-32 bg-slate-200 rounded" />
          </div>
          <div className="h-14 w-14 bg-slate-100 rounded-2xl" />
        </div>
      ))}
    </div>
  );
}
