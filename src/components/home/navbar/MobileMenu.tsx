import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import type { User } from "../../../types";

interface Props {
  user: User | null;
  isAuthenticated: boolean;
  closeMenu: () => void;
}

const MobileMenu = ({ user, isAuthenticated, closeMenu }: Props) => {
  const { logout } = useAuth();

  return (
    <div className="md:hidden border-t border-gray-200 bg-white">
      <div className="px-4 py-4 space-y-1">
        {/* Liens publics */}
        <Link
          to="/"
          onClick={closeMenu}
          className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Accueil
        </Link>
        <Link
          to="/services"
          onClick={closeMenu}
          className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Services
        </Link>
        <Link
          to="/about"
          onClick={closeMenu}
          className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          À propos
        </Link>
        <Link
          to="/contact"
          onClick={closeMenu}
          className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Contact
        </Link>

        {/* Liens selon rôle */}
        {isAuthenticated && user && (
          <>
            <div className="pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="w-5 h-5" />
                Déconnexion
              </button>
            </div>
          </>
        )}

        {/* Si non connecté */}
        {!isAuthenticated && (
          <div className="pt-4 mt-4 border-t border-gray-200 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={closeMenu}
              className="w-full px-4 py-3 text-blue-600 hover:text-white font-semibold rounded-lg border border-blue-500 hover:bg-blue-500 transition flex items-center justify-center"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              onClick={closeMenu}
              className="w-full px-4 py-3 text-orange-600 hover:text-white font-semibold rounded-lg border border-orange-300 hover:bg-orange-500 transition flex items-center justify-center"
            >
              Inscription
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
