import { useEffect, useState } from "react";
import {
  Star,
  Calendar as CalendarIcon,
  AlertCircle,
  Plus,
  ChevronRight,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Sidebar from "../../components/Sidebar";
import HeaderVendor from "../../components/Vendor/HeaderVendor";
import TableRow from "../../components/Vendor/TableRow";
import { useAuthStore } from "../../stores/useAuthStore";
import type { Service } from "../../types/service";
import type { Booking } from "../../types/booking";

const DashVendor = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [servicesRes, bookingsRes] = await Promise.all([
          api.get<Service[]>("/services/my-services", {
            withCredentials: true,
          }),
          api.get<Booking[]>("/bookings/my", { withCredentials: true }),
        ]);
        setServices(servicesRes.data);
        setBookings(bookingsRes.data);
      } catch (err: any) {
        console.error("Erreur Dashboard:", err.message);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchDashboardData();
  }, [user]);

  return (
    <div className="flex h-screen bg-[#F4F7FE] text-slate-900 overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* HEADER SECTION AVEC GRADIENT BLEU-ORANGE */}
          <div className="relative p-10 rounded-[3.5rem] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white overflow-hidden shadow-2xl shadow-blue-200">
            {/* Décoration Orange */}
            <div className="absolute top-[-20%] right-[-5%] w-80 h-80 bg-orange-500/20 rounded-full blur-[100px]"></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <span className="flex items-center gap-2 text-orange-400 font-black uppercase text-[10px] tracking-[0.4em] mb-4">
                  <Zap size={14} fill="currentColor" /> Dashboard Vendeur
                </span>
                <h1 className="text-5xl font-[1000] tracking-tighter uppercase italic leading-none">
                  Hello,{" "}
                  <span className="text-orange-400">
                    {user?.name?.split(" ")[0]}
                  </span>
                </h1>
                <p className="text-blue-100 font-bold text-sm mt-4 opacity-80">
                  Votre activité est en hausse de +12% cette semaine.
                </p>
              </div>

              <button
                onClick={() => navigate("/createService")}
                disabled={!user?.isAdminApproved}
                className={`
                  group flex items-center justify-center gap-4 px-10 py-5 rounded-[2.2rem] font-[1000] uppercase text-[12px] tracking-[0.2em] transition-all shadow-2xl
                  ${
                    user?.isAdminApproved
                      ? "bg-orange-500 text-white shadow-orange-500/40 hover:bg-white hover:text-orange-600 hover:-translate-y-2"
                      : "bg-white/10 text-white/30 cursor-not-allowed border border-white/10"
                  }
                `}
              >
                <Plus size={22} strokeWidth={4} />
                Nouveau Service
              </button>
            </div>
          </div>

          {/* STATS RAPIDES (Utilise tes couleurs dans ton composant HeaderVendor) */}
          <div className="w-full">
            <HeaderVendor />
          </div>

          {/* MAIN CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* SECTION RESERVATIONS : BLEU & WHITE */}
            <section className="lg:col-span-8">
              <div className="bg-white rounded-[4rem] p-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.06)] border border-blue-50">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-blue-200">
                      <CalendarIcon size={24} />
                    </div>
                    <h2 className="text-3xl font-[1000] uppercase tracking-tighter italic text-slate-900">
                      Recent <span className="text-blue-600">Bookings</span>
                    </h2>
                  </div>
                </div>

                {loading ? (
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-20 bg-slate-50 rounded-[2rem] animate-pulse"
                      />
                    ))}
                  </div>
                ) : bookings.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-slate-300 text-[11px] font-[1000] uppercase tracking-[0.2em] border-b border-slate-50">
                          <th className="pb-8">Client</th>
                          <th className="pb-8">Service</th>
                          <th className="pb-8">Date</th>
                          <th className="pb-8 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {bookings.map((booking) => (
                          <TableRow key={booking._id} booking={booking} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <AlertCircle
                      size={48}
                      className="mx-auto text-slate-200 mb-4"
                    />
                    <p className="font-black uppercase text-xs text-slate-400 tracking-widest">
                      En attente de commandes
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* SECTION MES OFFRES : ORANGE & DARK */}
            <section className="lg:col-span-4">
              <div className="bg-slate-900 rounded-[4rem] p-10 text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden group">
                {/* Accent Orange */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>

                <h2 className="text-2xl font-[1000] uppercase tracking-tighter mb-12 flex items-center gap-3">
                  My <span className="text-orange-500">Offers</span>
                </h2>

                <div className="space-y-8 relative z-10">
                  {services.slice(0, 4).map((service) => (
                    <ServiceMiniCard key={service._id} service={service} />
                  ))}

                  {services.length === 0 && (
                    <p className="text-slate-500 font-bold italic text-sm">
                      Vous n'avez pas encore d'offres.
                    </p>
                  )}
                </div>

                <button
                  onClick={() => navigate("/vendorService")}
                  className="w-full mt-12 py-5 bg-orange-500 text-white rounded-[2rem] font-[1000] uppercase text-[11px] tracking-[0.2em] hover:bg-white hover:text-orange-500 transition-all flex items-center justify-center gap-3"
                >
                  Gérer la boutique <ChevronRight size={18} />
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

/* --- MINI CARD STYLISÉE ORANGE & WHITE --- */
const ServiceMiniCard = ({ service }: { service: Service }) => (
  <div className="flex items-center gap-5 group cursor-pointer">
    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/5 group-hover:border-orange-500 transition-all">
      <img
        src={service.images?.[0] || "https://placehold.co/100"}
        className="w-full h-full object-cover group-hover:scale-125 transition-all duration-500"
        alt=""
      />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-black truncate uppercase tracking-tight group-hover:text-orange-400 transition-colors">
        {service.title}
      </h4>
      <div className="flex items-center gap-3 mt-1.5">
        <span className="px-2 py-0.5 bg-orange-500/10 text-orange-500 text-[10px] font-black rounded-md border border-orange-500/20">
          {service.price}€
        </span>
        <div className="flex items-center gap-1 text-slate-400 group-hover:text-white transition-colors">
          <Star size={10} fill="#f97316" className="text-orange-500" />
          <span className="text-[10px] font-black tracking-widest">4.9</span>
        </div>
      </div>
    </div>
  </div>
);

export default DashVendor;
