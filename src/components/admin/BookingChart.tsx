import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";
import api from "../../api/axios";

const BookingChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"semaine" | "mois">("mois");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Appel API dès que l'onglet change
  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        // On envoie la période en paramètre à ton backend
        const response = await api.get(
          `/admin/stats/bookings-chart?period=${activeTab}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du graphique:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [activeTab]);

  return (
    <div className="xl:col-span-8 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Volume des réservations
          </h3>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
            Performance :{" "}
            {activeTab === "semaine" ? "7 derniers jours" : "30 derniers jours"}
          </p>
        </div>

        {/* Sélecteur de période */}
        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 shadow-inner">
          <button
            onClick={() => setActiveTab("semaine")}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === "semaine"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Semaine
          </button>
          <button
            onClick={() => setActiveTab("mois")}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === "mois"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Mois
          </button>
        </div>
      </div>

      {/* ZONE DU GRAPHIQUE AVEC ÉTAT DE CHARGEMENT */}
      <div className="h-[320px] w-full relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
            <Loader2 className="animate-spin text-blue-500" size={32} />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                dy={10}
              />
              <YAxis hide domain={[0, "auto"]} />
              <Tooltip
                contentStyle={{
                  borderRadius: "20px",
                  border: "none",
                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                  padding: "12px 16px",
                }}
                itemStyle={{ fontWeight: 800, color: "#1e293b" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={4}
                fill="url(#colorValue)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default BookingChart;
