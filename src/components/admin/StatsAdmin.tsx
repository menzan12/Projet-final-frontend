import React, { useEffect, useState } from "react";
import { TrendingUp, Users, Calendar, Briefcase, Loader2 } from "lucide-react";
import api from "../../api/axios";

// 1. Définition du sous-composant StatCard AVANT le composant principal
const StatCard = ({ title, value, trend, icon: Icon, colorClass }: any) => {
  // Sécurité au cas où l'icône est mal passée
  if (!Icon) return null;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50 relative overflow-hidden group hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-black text-slate-900">{value}</h3>
          <div
            className={`flex items-center gap-1 text-[10px] font-black mt-2 uppercase tracking-wider ${
              trend >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            <TrendingUp size={14} className={trend < 0 ? "rotate-180" : ""} />
            {trend > 0 ? "+" : ""}
            {trend}%
          </div>
        </div>
        <div
          className={`p-3 rounded-2xl ${colorClass} transition-transform group-hover:scale-110`}
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};

// 2. Le composant principal exporté par défaut
const StatsAdmin: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats-summary");
        setStats(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Affichage pendant le chargement (Skeleton)
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl h-32 animate-pulse flex items-center justify-center border border-slate-50"
          >
            <Loader2 className="animate-spin text-slate-200" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Chiffre d'affaires"
        value={`${stats?.revenue?.toLocaleString() || 0} €`}
        trend={stats?.trends?.revenue || 0}
        icon={TrendingUp}
        colorClass="text-green-600 bg-green-50"
      />
      <StatCard
        title="Utilisateurs Actifs"
        value={stats?.users || 0}
        trend={stats?.trends?.users || 0}
        icon={Users}
        colorClass="text-blue-600 bg-blue-50"
      />
      <StatCard
        title="Demandes en attente"
        value={stats?.pendingRequests || 0}
        trend={stats?.trends?.requests || 0}
        icon={Calendar}
        colorClass="text-orange-600 bg-orange-50"
      />
      <StatCard
        title="Services Totaux"
        value={stats?.totalServices || 0}
        trend={stats?.trends?.services || 0}
        icon={Briefcase}
        colorClass="text-purple-600 bg-purple-50"
      />
    </div>
  );
};

export default StatsAdmin;
