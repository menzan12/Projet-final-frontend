import { Link } from "react-router-dom";
import { LogOut, User as UserIcon } from "lucide-react";
import type { User } from "../../../types";
import { useAuthStore } from "../../../stores/useAuthStore";

interface Props {
  user: User | null;
  isAuthenticated: boolean;
  closeMenu: () => void;
}

const MobileMenu = ({ user, isAuthenticated, closeMenu }: Props) => {
  const { logout } = useAuthStore();

  return (
    <div className="md:hidden bg-white border-t border-gray-100 overflow-y-auto max-h-[calc(100vh-80px)]">
      <div className="px-6 py-8 space-y-6">
        {/* Navigation principale */}
        <div className="flex flex-col gap-4">
          {[
            { label: "Accueil", path: "/" },
            { label: "Services", path: "/services" },
            { label: "À propos", path: "/about" },
            { label: "Contact", path: "/contact" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Section Utilisateur */}
        <div className="pt-6 border-t border-gray-100">
          {isAuthenticated && user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${user.name}`
                  }
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-50"
                  alt={user.name}
                />
                <div>
                  <p className="font-black text-gray-900">{user.name}</p>
                  <p className="text-xs font-bold uppercase text-blue-600">
                    {user.role}
                  </p>
                </div>
              </div>

              <Link
                to={
                  user.role === "admin"
                    ? "/dashAdmin"
                    : user.role === "vendor"
                    ? "/dashVendor"
                    : "/dashClient"
                }
                onClick={closeMenu}
                className="flex items-center gap-3 w-full px-4 py-3 bg-gray-50 rounded-xl font-bold text-gray-700"
              >
                <UserIcon className="w-5 h-5" /> Mon Tableau de bord
              </Link>

              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="flex items-center gap-3 w-full px-4 py-3 font-bold text-red-600 bg-red-50 rounded-xl"
              >
                <LogOut className="w-5 h-5" /> Déconnexion
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                onClick={closeMenu}
                className="w-full py-4 text-center font-bold text-blue-600 bg-blue-50 rounded-2xl"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="w-full py-4 text-center font-bold text-white bg-blue-600 rounded-2xl shadow-lg shadow-blue-100"
              >
                S'inscrire gratuitement
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
