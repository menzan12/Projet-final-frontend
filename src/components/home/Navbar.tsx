import Logo from "./navbar/Logo";
import DesktopNavLinks from "./navbar/DesktopNavLinks";
import MobileMenu from "./navbar/MobileMenu";
import UserMenu from "./navbar/UserMenu";
import { useAuth } from "../../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Fonction utilitaire pour savoir si un lien est actif
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur ">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />

        {/* Liens publics */}
        <div className="flex gap-4">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors  ${
              isActive("/")
                ? "bg-blue-100 text-blue-600"
                : "text-orange-400 hover:text-orange-600 hover:bg-orange-100"
            }`}
          >
            Accueil
          </Link>
          <Link
            to="/services"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive("/services")
                ? "bg-blue-100 text-blue-600"
                : "text-orange-400 hover:text-orange-600 hover:bg-orange-100"
            }`}
          >
            Services
          </Link>
          <Link
            to="/about"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive("/about")
                ? "bg-blue-100 text-blue-600"
                : "text-orange-400 hover:text-orange-600 hover:bg-orange-100"
            }`}
          >
            À propos
          </Link>
          <Link
            to="/contact"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive("/contact")
                ? "bg-blue-100 text-blue-600"
                : "text-orange-400 hover:text-orange-600 hover:bg-orange-100"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Liens desktop par rôle */}
        <DesktopNavLinks user={user} isAuthenticated={isAuthenticated} />

        {/* Menu utilisateur ou liens de connexion */}
        {isAuthenticated && user ? (
          <UserMenu user={user} onLogout={logout} />
        ) : (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="w-full px-4 text-blue-600 hover:text-white font-semibold rounded-lg border border-blue-500 hover:bg-blue-500 transition-colors flex items-center justify-center"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="w-full px-4 py-3 text-orange-600 hover:text-white font-semibold rounded-lg border border-orange-300 hover:bg-orange-500 transition-colors flex items-center justify-center"
            >
              Inscription
            </Link>
          </div>
        )}
      </div>

      {/* Menu mobile */}
      <MobileMenu user={user} isAuthenticated={isAuthenticated} />
    </nav>
  );
};

export default Navbar;
