import Sidebar from "../../Components/Sidebar";
import AdminPendingVendors from "../../Components/admin/AdminPendingVendors";
import HeaderAdmin from "../../Components/admin/HeaderAdmin";
import StatsAdmin from "../../Components/admin/StatsAdmin";
import RecentBookings from "../../Components/admin/RecentBookings";
import BookingChart from "../../Components/admin/BookingChart";

export default function DashAdmin() {
  const handleSearch = (query: string) => {
    console.log("Recherche globale admin:", query);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* 1. SIDEBAR (Navigation latérale) */}
      <Sidebar />

      {/* 2. CONTENU PRINCIPAL */}
      <main className="flex-1 min-w-0 overflow-hidden">
        {/* Container principal avec marges responsives */}
        <div className="p-4 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
          {/* BARRE DE HAUT DE PAGE (Recherche & Profil) */}
          <HeaderAdmin onSearch={handleSearch} />

          {/* SECTION TITRE */}
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Tableau de bord
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Aperçu en temps réel de l'activité de votre plateforme
            </p>
          </div>

          {/* GRILLE DES CARTES DE STATISTIQUES (Composant Dynamique) */}
          <StatsAdmin />

          {/* SECTION ANALYSE (Graphique + Vendeurs en attente) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* GRAPHIQUE DE VOLUME */}
            <BookingChart />

            {/* LISTE DES VENDEURS EN ATTENTE (Composant Dynamique) */}
            <div className="xl:col-span-4">
              <AdminPendingVendors />
            </div>
          </div>

          {/* SECTION TABLEAU (Composant Dynamique RecentBookings) */}
          <RecentBookings />
        </div>
      </main>
    </div>
  );
}
