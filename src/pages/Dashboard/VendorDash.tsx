import {
  LayoutDashboard,
  MessageSquare,
  Plus,
  Star,
  Clock,
} from "lucide-react";

import VendorSide from "../../components/Sidebar/VendorSide";
import VendorHeader from "../../components/Vendor/VendorHeader";

/* ---------- TYPES ---------- */

interface TableRowProps {
  name: string;
  service: string;
  date: string;
  status: string;
  color: "green" | "orange";
}

interface MessageItemProps {
  name: string;
  text: string;
  time: string;
}

interface ServiceCardProps {
  title: string;
  price: string;
  rating: number;
  image: string;
}

/* ---------- MAIN COMPONENT ---------- */

const VendorDash = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* SIDEBAR */}
      <VendorSide />

      {/* MAIN */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <VendorHeader />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* RESERVATIONS */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Prochaines Réservations</h2>
              <button className="text-blue-600 text-sm font-bold hover:underline">
                Voir tout
              </button>
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[11px] uppercase tracking-wider border-b">
                  <th className="pb-3 font-bold">Client</th>
                  <th className="pb-3 font-bold">Service</th>
                  <th className="pb-3 font-bold">Date</th>
                  <th className="pb-3 font-bold">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <TableRow
                  name="Julie Martin"
                  service="Coaching Sportif"
                  date="12 Oct, 14:00"
                  status="Confirmé"
                  color="green"
                />
                <TableRow
                  name="Thomas Bernard"
                  service="Création Logo"
                  date="14 Oct, 09:00"
                  status="En attente"
                  color="orange"
                />
                <TableRow
                  name="Sophie Durand"
                  service="Consultation SEO"
                  date="15 Oct, 11:30"
                  status="Confirmé"
                  color="green"
                />
              </tbody>
            </table>
          </div>

          {/* MESSAGES */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Messages Récents</h2>
              <LayoutDashboard size={18} />
            </div>

            <div className="space-y-4 mb-6">
              <MessageItem
                name="Marc L."
                text="Bonjour, est-il possible de décaler..."
                time="10:42"
              />
              <MessageItem
                name="Sarah K."
                text="Merci pour le logo, c'est parfait !"
                time="Hier"
              />
              <MessageItem
                name="Lucas C."
                text="J'aimerais avoir un devis pour..."
                time="Lun"
              />
            </div>

            <button className="w-full py-3 text-blue-600 font-bold text-sm bg-blue-50 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-100">
              <MessageSquare size={16} />
              Ouvrir la messagerie
            </button>
          </div>
        </div>

        {/* SERVICES */}
        <section>
          <h2 className="text-xl font-bold mb-6">Mes Services Actifs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              title="Conception de Logo Pro"
              price="250 €"
              rating={4.9}
              image="https://images.unsplash.com/photo-1626785774573-4b799315345d"
            />
            <ServiceCard
              title="Développement Site Vitrine"
              price="800 €"
              rating={4.7}
              image="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            />
            <ServiceCard
              title="Audit SEO Complet"
              price="150 €"
              rating={5.0}
              image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173"
            />

            <div className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all cursor-pointer bg-white/50">
              <Plus size={24} />
              <p className="text-sm font-bold mt-2">Créer un nouveau service</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

/* ---------- SUB COMPONENTS ---------- */

const TableRow = ({ name, service, date, status, color }: TableRowProps) => (
  <tr className="hover:bg-slate-50 transition-colors">
    <td className="py-4 flex items-center gap-3">
      <img
        src={`https://i.pravatar.cc/150?u=${name}`}
        className="w-8 h-8 rounded-full"
        alt={name}
      />
      <span className="text-sm font-bold">{name}</span>
    </td>
    <td className="py-4 text-sm text-slate-600 font-medium">{service}</td>
    <td className="py-4">
      <div className="flex items-center gap-1.5 text-slate-500 text-sm">
        <Clock size={14} />
        {date}
      </div>
    </td>
    <td className="py-4">
      <span
        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
          color === "green"
            ? "bg-green-100 text-green-600"
            : "bg-orange-100 text-orange-600"
        }`}
      >
        {status}
      </span>
    </td>
  </tr>
);

const MessageItem = ({ name, text, time }: MessageItemProps) => (
  <div className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-xl transition-all cursor-pointer">
    <img
      src={`https://i.pravatar.cc/150?u=${name}`}
      className="w-9 h-9 rounded-full"
      alt={name}
    />
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-baseline mb-0.5">
        <h4 className="text-sm font-bold truncate">{name}</h4>
        <span className="text-[10px] text-slate-400 font-medium">{time}</span>
      </div>
      <p className="text-xs text-slate-500 truncate">{text}</p>
    </div>
  </div>
);

const ServiceCard = ({ title, price, rating, image }: ServiceCardProps) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group">
    <div className="relative h-40 overflow-hidden">
      <img
        src={image}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        alt={title}
      />
      <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
        <Star size={10} className="fill-yellow-400 text-yellow-400" />
        {rating}
      </div>
    </div>
    <div className="p-4">
      <h4 className="font-bold text-sm mb-3 h-10 line-clamp-2">{title}</h4>
      <div className="flex justify-between items-center">
        <span className="text-[10px] text-slate-400 font-bold uppercase">
          À partir de
        </span>
        <span className="text-md font-black">{price}</span>
      </div>
    </div>
  </div>
);

export default VendorDash;
