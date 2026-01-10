import { useEffect, useState, useMemo } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  PieChart as PieIcon,
  DollarSign,
  Loader2,
} from "lucide-react";
import Sidebar from "../../Components/Sidebar";
import HeaderAdmin from "../../Components/admin/HeaderAdmin";
import api from "../../api/axios";

export default function Analytics() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/admin/users");
        // Filtrer pour ne garder que les vendeurs
        const vendors = res.data.filter((u: any) => u.role === "vendor");
        setData(vendors);
      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- LOGIQUE DE CALCUL DES DONNÉES ---
  const stats = useMemo(() => {
    const counts = { free: 0, pro: 0, premium: 0 };

    data.forEach((v) => {
      const plan = v.vendorPlan || "free";
      if (plan in counts) {
        counts[plan as keyof typeof counts]++;
      } else {
        counts.free++;
      }
    });

    const pieData = [
      { name: "Gratuit", value: counts.free, color: "#94A3B8" },
      { name: "Pro", value: counts.pro, color: "#8B5CF6" },
      { name: "Premium", value: counts.premium, color: "#F59E0B" },
    ];

    // Simulation de revenus (Ex: Pro=29€, Premium=79€)
    const monthlyRevenue = counts.pro * 29 + counts.premium * 79;

    return { counts, pieData, monthlyRevenue };
  }, [data]);

  // Données d'évolution basées sur les stats calculées
  const evolutionData = [
    { name: "Jan", revenue: stats.monthlyRevenue * 0.7 },
    { name: "Fév", revenue: stats.monthlyRevenue * 0.8 },
    { name: "Mar", revenue: stats.monthlyRevenue * 0.95 },
    { name: "Avr", revenue: stats.monthlyRevenue },
  ];

  // Gestion de l'état de chargement pour corriger l'erreur TS
  if (loading) {
    return (
      <div className="flex h-screen bg-[#F8FAFC]">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <p className="text-slate-500 font-bold animate-pulse">
              Chargement des analyses...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <div className="p-4 lg:p-8 max-w-[1400px] mx-auto space-y-8">
          <HeaderAdmin onSearch={() => {}} />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Analytique
              </h1>
              <p className="text-slate-500 font-medium">
                Performance des abonnements vendeurs
              </p>
            </div>
            <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                <DollarSign size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Revenu Mensuel Estimé
                </p>
                <p className="text-xl font-black text-slate-900">
                  {stats.monthlyRevenue.toLocaleString()} €
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* --- GRAPHIQUE 1 : RÉPARTITION --- */}
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-2">
                <PieIcon size={20} className="text-blue-500" /> Répartition des
                Plans
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.pieData}
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {stats.pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "16px",
                        border: "none",
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-6 mt-4">
                {stats.pieData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* --- GRAPHIQUE 2 : ÉVOLUTION REVENUS --- */}
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-2">
                <TrendingUp size={20} className="text-green-500" /> Croissance
                du CA
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={evolutionData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#3B82F6"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3B82F6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#F1F5F9"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94A3B8", fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis hide domain={[0, "auto"]} />
                    <Tooltip
                      cursor={{ stroke: "#3B82F6", strokeWidth: 2 }}
                      contentStyle={{
                        borderRadius: "16px",
                        border: "none",
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3B82F6"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorRev)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
