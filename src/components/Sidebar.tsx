import { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  MessageSquare,
  LogOut,
  User,
  Menu,
  X,
  ShieldCheck,
  Heart,
  Settings,
  Compass,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

interface SidebarItem {
  label: string;
  to: string;
  icon: React.ElementType;
  badge?: string | number;
}

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  const menuConfig: Record<string, SidebarItem[]> = {
    vendor: [
      { label: "Dashboard", to: "/dashVendor", icon: LayoutDashboard },
      { label: "Mes Services", to: "/vendorService", icon: Briefcase },
      { label: "Réservations", to: "/vendorBooking", icon: Calendar, badge: 3 },
      { label: "Agenda", to: "/agenda", icon: MessageSquare },
      { label: "Mon Profil", to: "/profil", icon: User },
    ],
    client: [
      { label: "Explorer", to: "/", icon: Compass },
      { label: "Mes RDV", to: "/myBooking", icon: Calendar }, // Corrigé sans le "s"
      { label: "Favoris", to: "/favorites", icon: Heart },
      { label: "Mon Profil", to: "/profil", icon: User },
    ],
    admin: [
      { label: "Admin Panel", to: "/dashAdmin", icon: ShieldCheck },
      { label: "Membres", to: "/dashAdmin/community", icon: User },
      { label: "Offres", to: "/dashAdmin/abonnement", icon: Briefcase },
      { label: "Système", to: "/settings", icon: Settings },
    ],
  };

  const menuItems =
    menuConfig[user?.role as keyof typeof menuConfig] || menuConfig.client;

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "SM";

  return (
    <>
      {/* BOUTON MOBILE */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-5 left-5 z-50 p-3 bg-blue-600 text-white rounded-xl shadow-lg"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* ASIDE PRINCIPAL */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-blue-600 text-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* LOGO SECTION - Plus élégant */}
        <div className="p-10 flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/20">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight">
            Skill<span className="text-orange-400">Market</span>
          </span>
        </div>

        {/* PROFIL CARD - Épuré */}
        <div className="px-6 mb-10">
          <div className="flex items-center gap-4 p-4 bg-slate-900/20 rounded-[2rem] border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center font-black text-lg shadow-inner border border-white/20">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-black truncate tracking-tight uppercase">
                {user?.name || "Utilisateur"}
              </p>
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-blue-200 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* NAVIGATION - Espacement amélioré */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <p className="px-5 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200/40 mb-4">
            Navigation
          </p>
          {menuItems.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={`
                  group flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-200
                  ${
                    active
                      ? "bg-white text-blue-600 shadow-lg translate-x-1"
                      : "text-blue-50 hover:bg-white/10 hover:translate-x-1"
                  }
                `}
              >
                <item.icon
                  size={20}
                  className={`${
                    active
                      ? "text-orange-500"
                      : "text-blue-200 group-hover:text-white"
                  }`}
                />
                <span className="flex-1 text-[13px] font-bold tracking-tight">
                  {item.label}
                </span>

                {item.badge && (
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${
                      active
                        ? "bg-blue-100 text-blue-600"
                        : "bg-orange-500 text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER / LOGOUT */}
        <div className="p-6 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-4 w-full bg-white/5 hover:bg-red-500/20 text-blue-100 hover:text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all group"
          >
            <LogOut
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
