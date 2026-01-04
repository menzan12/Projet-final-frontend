import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function VendorSide() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 🔠 Récupération des 2 premières lettres du nom
  const initials = user?.name?.slice(0, 2).toUpperCase() || "VD";

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-600 to-orange-500 text-white flex flex-col shadow-xl">
      {/* Logo */}
      <div className="p-6 flex items-center gap-2">
        <div className="bg-white/20 p-1.5 rounded-lg">
          <LayoutDashboard className="w-6 h-6" />
        </div>
        <span className="text-xl font-bold tracking-tight">SkillMarket</span>
      </div>

      {/* Profil utilisateur */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl mb-6">
          {/* Avatar avec initiales */}
          <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center font-bold shadow-sm">
            {initials}
          </div>

          <div>
            <p className="text-sm font-bold">{user?.name || "Vendeur"}</p>
            <p className="text-[10px] text-white/80 font-medium">
              Vendeur Certifié
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          <Link
            to="/vendorDash"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all
              ${
                isActive("/vendorDash")
                  ? "bg-white/20 text-white shadow-md"
                  : "text-white/80 hover:bg-white/10"
              }
            `}
          >
            <LayoutDashboard size={20} />
            <span className="text-sm font-medium">Vue d'ensemble</span>
          </Link>

          <Link
            to="/vendorService"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all
              ${
                isActive("/vendorDash/services")
                  ? "bg-white/20 text-white shadow-md"
                  : "text-white/80 hover:bg-white/10"
              }
            `}
          >
            <Briefcase size={20} />
            <span className="text-sm font-medium">Mes Services</span>
          </Link>

          <Link
            to="/vendorDash/bookings"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all
              ${
                isActive("/vendorDash/bookings")
                  ? "bg-white/20 text-white shadow-md"
                  : "text-white/80 hover:bg-white/10"
              }
            `}
          >
            <Calendar size={20} />
            <span className="text-sm font-medium flex-1">Réservations</span>
            <span className="text-xs bg-red-500 px-2 py-0.5 rounded-full font-semibold">
              3
            </span>
          </Link>

          <Link
            to="/vendorDash/messages"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all
              ${
                isActive("/vendorDash/messages")
                  ? "bg-white/20 text-white shadow-md"
                  : "text-white/80 hover:bg-white/10"
              }
            `}
          >
            <MessageSquare size={20} />
            <span className="text-sm font-medium">Messages</span>
          </Link>

          <Link
            to="/vendorDash/settings"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all
              ${
                isActive("/vendorDash/settings")
                  ? "bg-white/20 text-white shadow-md"
                  : "text-white/80 hover:bg-white/10"
              }
            `}
          >
            <Settings size={20} />
            <span className="text-sm font-medium">Paramètres</span>
          </Link>
        </nav>
      </div>

      {/* Déconnexion */}
      <div className="mt-auto p-4 border-t border-white/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-white/80 hover:text-red-200 transition-colors w-full p-2"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
