import { useEffect, useState } from "react";
import {
  Star,
  TrendingUp,
  Calendar as CalendarIcon,
  Wallet,
  Clock,
  AlertCircle,
} from "lucide-react";
import api from "../../api/axios";
import Sidebar from "../../Components/Sidebar";
import HeaderVendor from "../../Components/Vendor/HeaderVendor";
import TableRow from "../../Components/Vendor/TableRow";
import { useAuthStore } from "../../stores/useAuthStore"; // Import du store
import type { Service } from "../../types/service";
import type { Booking } from "../../types/booking";

const DashVendor = () => {
  const { user } = useAuthStore(); // Récupération de l'utilisateur
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [servicesRes, bookingsRes] = await Promise.all([
          api.get<Service[]>("/services/vendor"),
          api.get<Booking[]>("/bookings/vendor"),
        ]);
        setServices(servicesRes.data);
        setBookings(bookingsRes.data);
      } catch (err) {
        console.error("Erreur Dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10">
            <HeaderVendor />
          </header>

          {/* 🟧 BANNIÈRE D'ATTENTE DE VALIDATION (Ajoutée ici) */}
          {user?.isWaitingApproval && !user?.isAdminApproved && (
            <div className="mb-10 bg-orange-50 border border-orange-100 p-6 rounded-[2.5rem] flex items-center gap-6 animate-in slide-in-from-top-4 duration-700">
              <div className="bg-orange-500 p-4 rounded-[1.5rem] text-white shadow-lg shadow-orange-200">
                <Clock size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-1">
                  Dossier en cours de vérification
                </h3>
                <p className="text-slate-500 text-sm font-medium">
                  Votre profil est actuellement examiné par nos équipes. Vous
                  pourrez publier vos services dès que votre compte sera validé
                  (sous 24/48h).
                </p>
              </div>
              <div className="hidden md:block">
                <span className="px-4 py-2 bg-white border border-orange-200 text-orange-600 rounded-xl text-[10px] font-black uppercase tracking-tighter">
                  Statut : En attente
                </span>
              </div>
            </div>
          )}

          {/* 📊 STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard
              title="Revenus"
              value="1,250 €"
              icon={<Wallet className="text-blue-600" />}
              trend="+12%"
            />
            <StatCard
              title="Réservations"
              value={bookings.length.toString()}
              icon={<CalendarIcon className="text-orange-500" />}
              trend="En cours"
            />
            <StatCard
              title="Services"
              value={services.length.toString()}
              icon={<TrendingUp className="text-green-500" />}
              trend="Actifs"
            />
            <StatCard
              title="Note Moyenne"
              value="4.9"
              icon={<Star className="text-yellow-400 fill-yellow-400" />}
              trend="Excellente"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10">
            <section className="xl:col-span-2">
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 h-full">
                <h2 className="text-lg font-black mb-8">
                  Prochaines Réservations
                </h2>
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="h-16 bg-slate-50 animate-pulse rounded-2xl"
                      />
                    ))}
                  </div>
                ) : bookings.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-slate-400 text-[10px] uppercase tracking-widest border-b border-slate-50">
                          <th className="pb-5 font-black">Client</th>
                          <th className="pb-5 font-black">Service</th>
                          <th className="pb-5 font-black">Date</th>
                          <th className="pb-5 font-black text-right">Statut</th>
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
                  <div className="text-center py-10">
                    <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                      <AlertCircle size={24} />
                    </div>
                    <p className="text-slate-400 font-medium">
                      Aucune réservation pour le moment
                    </p>
                  </div>
                )}
              </div>
            </section>

            <section>
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 h-full">
                <h2 className="text-lg font-black mb-8">Mes Services</h2>
                <div className="space-y-5">
                  {services.slice(0, 4).map((service) => (
                    <ServiceMiniCard key={service._id} service={service} />
                  ))}
                  <button
                    disabled={!user?.isAdminApproved}
                    className="w-full py-4 text-sm font-black text-blue-600 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {user?.isAdminApproved
                      ? "Gérer mes services"
                      : "En attente de validation"}
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

/* --- StatCard & ServiceMiniCard --- */
const StatCard = ({ title, value, icon, trend }: any) => (
  <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="p-4 bg-slate-50 rounded-2xl">{icon}</div>
      <span className="text-[10px] font-black px-3 py-1 bg-green-50 text-green-600 rounded-lg uppercase tracking-tighter">
        {trend}
      </span>
    </div>
    <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest mb-1">
      {title}
    </p>
    <h3 className="text-2xl font-black text-slate-900">{value}</h3>
  </div>
);

const ServiceMiniCard = ({ service }: { service: Service }) => (
  <div className="flex items-center gap-4 p-2 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer">
    <img
      src={service.images?.[0] || "https://placehold.co/100"}
      className="w-14 h-14 rounded-2xl object-cover shadow-sm"
      alt=""
    />
    <div className="flex-1 overflow-hidden">
      <h4 className="text-sm font-bold text-slate-900 truncate">
        {service.title}
      </h4>
      <p className="text-xs font-black text-blue-600 mt-1">{service.price}€</p>
    </div>
  </div>
);

export default DashVendor;
