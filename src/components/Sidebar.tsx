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
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

/* ✅ Typage correct des items */
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

  /* ✅ CONFIG AVEC `to` PARTOUT */
  const menuConfig: Record<string, SidebarItem[]> = {
    vendor: [
      { label: "Mon Profil", to: "profil", icon: User },
      {
        label: "Tableau de bord",
        to: "/dashVendor/dashboard",
        icon: LayoutDashboard,
      },
      { label: "Mes Services", to: "/dashVendor/services", icon: Briefcase },
      {
        label: "Réservations",
        to: "/dashVendor/bookings",
        icon: Calendar,
        badge: 3,
      },
      {
        label: "Messages",
        to: "/vendor/messages",
        icon: MessageSquare,
      },
    ],
    client: [
      { label: "Mon Profil", to: "/profil", icon: User },
      { label: "Mes Commandes", to: "/my-bookings", icon: Calendar },
      { label: "Favoris", to: "/favorites", icon: Heart },
      { label: "Messages", to: "/messages", icon: MessageSquare },
    ],
    admin: [
      { label: "Admin Panel", to: "/dashAdmin", icon: ShieldCheck },
      { label: "Utilisateurs", to: "/dashAdmin/community", icon: User },
      { label: "Abonnement", to: "/dashAdmin/abonnement", icon: Briefcase },
      { label: "Graphiques", to: "/dashAdmin/graphiques", icon: Briefcase },
    ],
  };

  const menuItems =
    menuConfig[user?.role as keyof typeof menuConfig] || menuConfig.client;

  const initials = user?.name?.slice(0, 2).toUpperCase() || "SM";

  return (
    <>
      {/* BOUTON MOBILE */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white flex flex-col shadow-2xl transition-transform duration-300
          lg:relative lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="p-8 flex items-center gap-3">
          <div className="bg-white text-blue-700 p-2 rounded-xl shadow-inner">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter">
            SkillMarket
          </span>
        </div>

        {/* USER */}
        <div className="px-6 py-4">
          <div className="flex items-center gap-3 p-3 bg-white/10 rounded-2xl mb-8">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold">
              {initials}
            </div>
            <div>
              <p className="text-sm font-bold">{user?.name || "Utilisateur"}</p>
              <p className="text-[10px] uppercase text-blue-200">
                {user?.role || "client"}
              </p>
            </div>
          </div>

          {/* MENU */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition
                  ${
                    isActive(item.to)
                      ? "bg-white text-blue-700"
                      : "text-blue-100 hover:bg-white/10"
                  }
                `}
              >
                <item.icon size={20} />
                <span className="flex-1 text-sm">{item.label}</span>

                {item.badge && (
                  <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* LOGOUT */}
        <div className="mt-auto p-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-blue-200 hover:text-red-400 w-full text-sm font-bold"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
