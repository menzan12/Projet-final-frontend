import { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";
import Logo from "./Home/navbar/Logo";
import UserMenu from "./Home/navbar/UserMenu";
import MobileMenu from "./Home/navbar/MobileMenu";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Fonction pour vérifier si le lien est actif
  const isActive = (path: string) => location.pathname === path;

  // Style commun pour les liens de navigation desktop
  const navLinkStyles = (path: string) => `
    px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300
    ${
      isActive(path)
        ? "bg-blue-50 text-blue-600 shadow-sm"
        : "text-gray-500 hover:text-orange-600 hover:bg-orange-50"
    }
  `;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Centre : Liens de navigation (Desktop) */}
        <div className="hidden md:flex items-center gap-2 bg-gray-50/50 p-1.5 rounded-2xl border border-gray-100">
          <Link to="/" className={navLinkStyles("/")}>
            Accueil
          </Link>
          <Link to="/services" className={navLinkStyles("/services")}>
            Services
          </Link>
          <Link to="/about" className={navLinkStyles("/about")}>
            À propos
          </Link>
          <Link to="/contact" className={navLinkStyles("/contact")}>
            Contact
          </Link>
        </div>

        {/* Droite : Actions Authentification (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <UserMenu user={user} onLogout={logout} />
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-6 py-2.5 text-blue-600 font-bold text-sm hover:bg-blue-50 rounded-xl transition-colors"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 transition-all"
              >
                S'inscrire
              </Link>
            </div>
          )}
        </div>

        {/* Bouton Menu Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className={`p-2.5 rounded-xl transition-all ${
              open
                ? "bg-orange-100 text-orange-600"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Overlay et Menu Mobile */}
      {open && (
        <>
          {/* Background overlay pour fermer le menu en cliquant à côté */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl z-50 md:hidden animate-in slide-in-from-top-2 duration-300">
            <MobileMenu
              user={user}
              isAuthenticated={isAuthenticated}
              closeMenu={() => setOpen(false)}
            />
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
