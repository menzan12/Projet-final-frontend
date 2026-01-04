import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Hourglass, Wallet } from "lucide-react";
import api from "../../api/axios";
import type { VendorStats } from "../../types";

export default function VendorHeader() {
  const [stats, setStats] = useState<VendorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await api.get<VendorStats>("/stats/vendor");
        setStats(response.data);
        setError("");
      } catch (err: any) {
        if (err.response?.status === 401) {
          setError("Session expirée. Veuillez vous reconnecter.");
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        } else {
          const message =
            err.response?.data?.message ||
            "Impossible de charger les statistiques";
          setError(message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500">Chargement des statistiques...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-red-50 text-red-600 rounded-2xl p-6 shadow-md">
        <p className="font-semibold mb-2">⚠️ {error || "Erreur inconnue"}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm font-bold text-blue-600 hover:underline"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const isPositive = stats.revenueGrowth >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* 💰 CA du mois */}
      <div className="bg-white rounded-2xl p-6 shadow-md flex items-center justify-between hover:shadow-lg hover:scale-[1.02] transition-all">
        <div>
          <p className="text-sm text-slate-500 mb-1">Chiffre d&apos;affaires</p>
          <p className="text-2xl font-bold text-slate-900">
            {stats.currentMonthRevenue.toLocaleString("fr-FR")} FCFA
          </p>
          <p className="text-xs text-slate-400 mt-1">Ce mois-ci</p>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-3 rounded-xl shadow-md">
          <Wallet className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* 📈 Croissance */}
      <div className="bg-white rounded-2xl p-6 shadow-md flex items-center justify-between hover:shadow-lg hover:scale-[1.02] transition-all">
        <div>
          <p className="text-sm text-slate-500 mb-1">Croissance</p>
          <p
            className={`text-2xl font-bold ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? "+" : ""}
            {stats.revenueGrowth.toFixed(1)}%
          </p>
          <p className="text-xs text-slate-400 mt-1">vs mois dernier</p>
        </div>
        <div
          className={`p-3 rounded-xl shadow-md ${
            isPositive
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-8 h-8" />
          ) : (
            <TrendingDown className="w-8 h-8" />
          )}
        </div>
      </div>

      {/* ⏳ Services en attente */}
      <div className="bg-white rounded-2xl p-6 shadow-md flex items-center justify-between hover:shadow-lg hover:scale-[1.02] transition-all">
        <div>
          <p className="text-sm text-slate-500 mb-1">En attente</p>
          <p className="text-2xl font-bold text-slate-900">
            {stats.pendingServices}
          </p>
          <p className="text-xs text-slate-400 mt-1">Services</p>
        </div>
        <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-3 rounded-xl shadow-md">
          <Hourglass className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
}
