import {
  LayoutDashboard,
  Calendar,
  User,
  LogOut,
  Plus,
  CheckCircle2,
  FileText,
  ChevronRight,
  Video,
  Hammer,
  Code,
  TrendingUp,
  XCircle,
  Bell,
} from "lucide-react";
import SidebarLink from "../../components/clientDash/SidebarLink";
import Navbar from "../../components/Navbar";

export default function DashboardClient() {
  // Données fictives pour l'exemple
  const stats = [
    {
      label: "Réservations à venir",
      value: "3",
      icon: <Calendar size={24} className="text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      label: "Services terminés",
      value: "12",
      icon: <CheckCircle2 size={24} className="text-green-500" />,
      color: "bg-green-50",
    },
    {
      label: "Factures en attente",
      value: "0",
      icon: <FileText size={24} className="text-orange-400" />,
      color: "bg-orange-50",
    },
  ];

  const history = [
    {
      id: 1,
      title: "Audit UX/UI Design",
      date: "15 Octobre 2023",
      price: "150,00 €",
      status: "Terminé",
      icon: <Hammer size={18} />,
    },
    {
      id: 2,
      title: "Développement Web",
      date: "02 Octobre 2023",
      price: "450,00 €",
      status: "Terminé",
      icon: <Code size={18} />,
    },
    {
      id: 3,
      title: "Coaching Stratégie",
      date: "28 Septembre 2023",
      price: "80,00 €",
      status: "Annulé",
      icon: <TrendingUp size={18} />,
      cancelled: true,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-[#F4F7FA] font-sans">
        {/* --- BARRE LATÉRALE (SIDEBAR) --- */}
        <aside className="w-72 bg-white border-r border-gray-100 flex flex-col sticky top-0 h-screen">
          <div className="p-8 flex items-center gap-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-sm"
                alt="Avatar"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="font-black text-gray-900 leading-none">
                Jean Dupont
              </h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                Membre Premium
              </p>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4">
            <SidebarLink
              icon={<LayoutDashboard size={20} />}
              label="Tableau de bord"
              to="/dashboard"
              active
            />
            <SidebarLink
              icon={<Calendar size={20} />}
              label="Mes Réservations"
              to="/bookings"
            />
            <SidebarLink
              icon={<User size={20} />}
              label="Mon Profil"
              to="/profile"
            />
          </nav>

          <div className="p-8 border-t border-gray-50">
            <button className="flex items-center gap-3 text-red-500 font-black text-sm hover:pl-2 transition-all duration-300">
              <LogOut size={18} /> Déconnexion
            </button>
          </div>
        </aside>

        {/* --- CONTENU PRINCIPAL --- */}
        <main className="flex-1 p-12">
          {/* Header */}
          <header className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                Bonjour, Jean 👋
              </h1>
              <p className="text-gray-500 font-medium mt-1">
                Voici le résumé de vos activités et réservations.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-3 bg-white rounded-2xl text-gray-400 border border-gray-100 shadow-sm hover:text-blue-600 transition-colors">
                <Bell size={20} />
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-blue-200 transition-all active:scale-95">
                <Plus size={20} strokeWidth={3} /> Nouvelle réservation
              </button>
            </div>
          </header>

          {/* --- GRILLE DE STATISTIQUES --- */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[2.5rem] p-8 flex justify-between items-center shadow-sm border border-gray-50 hover:shadow-md transition-shadow"
              >
                <div className="space-y-1">
                  <p className="text-gray-400 font-bold text-sm tracking-tight">
                    {stat.label}
                  </p>
                  <p className="text-5xl font-black text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center shadow-inner`}
                >
                  {stat.icon}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* --- SECTION GAUCHE : PROCHAINE RÉSERVATION --- */}
            <div className="lg:col-span-7">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-gray-900">
                  Prochaine Réservation
                </h3>
                <button className="text-blue-600 font-black text-sm hover:underline flex items-center gap-1">
                  Voir tout <ChevronRight size={14} />
                </button>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 group">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-52 h-52 rounded-[2rem] overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=500"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt="Consultation"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div>
                      <span className="bg-blue-100 text-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
                        Confirmé
                      </span>
                      <h4 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
                        Consultation Marketing
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                          <Calendar size={18} className="text-blue-200" />
                          <span>Mardi 24 Octobre • 14:00</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                          <Video size={18} className="text-blue-200" />
                          <span>Appel Vidéo</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-black text-sm flex-1 transition-colors">
                        Gérer
                      </button>
                      <button className="bg-white border-2 border-gray-100 text-gray-400 px-8 py-3.5 rounded-xl font-black text-sm flex-1 hover:bg-gray-50 transition-colors">
                        Annuler
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bannière de mise à jour */}
              <div className="mt-8 bg-white rounded-3xl p-6 border border-gray-100 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-sm">
                      Besoin de modifier vos infos ?
                    </p>
                    <p className="text-gray-400 text-xs font-medium">
                      Mettez à jour votre téléphone ou email.
                    </p>
                  </div>
                </div>
                <button className="text-blue-600 font-black text-sm hover:translate-x-1 transition-transform">
                  Mon Profil
                </button>
              </div>
            </div>

            {/* --- SECTION DROITE : HISTORIQUE --- */}
            <div className="lg:col-span-5">
              <h3 className="text-xl font-black text-gray-900 mb-6">
                Historique Récent
              </h3>
              <div className="space-y-4">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-5 border border-gray-50 flex items-center gap-5 hover:border-blue-100 transition-colors shadow-sm"
                  >
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-black text-gray-900 text-sm tracking-tight">
                        {item.title}
                      </h5>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tighter">
                        {item.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-gray-900 text-sm">
                        {item.price}
                      </p>
                      <div
                        className={`flex items-center gap-1 justify-end font-black text-[9px] uppercase tracking-widest mt-0.5 ${
                          item.cancelled ? "text-red-400" : "text-green-500"
                        }`}
                      >
                        {item.cancelled ? (
                          <XCircle size={10} />
                        ) : (
                          <CheckCircle2 size={10} />
                        )}
                        {item.status}
                      </div>
                    </div>
                  </div>
                ))}

                <button className="w-full py-5 bg-white border-2 border-dashed border-gray-200 rounded-3xl font-black text-gray-400 text-sm hover:bg-gray-50 hover:border-blue-200 transition-all mt-4">
                  Voir tout l'historique
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
