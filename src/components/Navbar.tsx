import { useState } from "react";
import Logo from "./home/navbar/Logo";
import DesktopNavLinks from "./home/navbar/DesktopNavLinks";
import MobileMenu from "./home/navbar/MobileMenu";
import UserMenu from "./home/navbar/UserMenu";
import { useAuth } from "../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />

        {/* Liens publics (desktop) */}
        <div className="hidden md:flex gap-4">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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

        {/* Desktop nav par rôle */}
        <DesktopNavLinks user={user} isAuthenticated={isAuthenticated} />

        {/* Auth desktop */}
        <div className="hidden md:flex gap-4">
          {isAuthenticated && user ? (
            <UserMenu user={user} onLogout={logout} />
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 text-blue-600 hover:text-white font-semibold rounded-lg border border-blue-500 hover:bg-blue-500 transition flex items-center justify-center"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="px-4 py-3 text-orange-600 hover:text-white font-semibold rounded-lg border border-orange-300 hover:bg-orange-500 transition flex items-center justify-center"
              >
                Inscription
              </Link>
            </>
          )}
        </div>

        {/* Burger button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <MobileMenu
          user={user}
          isAuthenticated={isAuthenticated}
          closeMenu={() => setOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
