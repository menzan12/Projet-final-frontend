import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LogOut,
  User as UserIcon,
  LayoutDashboard,
  ChevronDown,
  Store, // Import de l'icône Store pour le vendeur
} from "lucide-react";
import type { User } from "../../../types";

interface Props {
  user: User;
  onLogout: () => void;
}

const UserMenu = ({ user, onLogout }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* BOUTON DECLENCHEUR */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
      >
        <div className="relative">
          <img
            src={
              user.avatar ||
              `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`
            }
            className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
            alt={user.name}
          />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <div className="hidden sm:flex flex-col items-start leading-tight">
          <span className="text-sm font-bold text-gray-900">{user.name}</span>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">
            {user.role}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* MENU DEROULANT */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50">
          <div className="px-4 py-3 border-b border-gray-50 mb-1">
            <p className="text-xs font-bold text-orange-400 uppercase tracking-widest">
              Compte
            </p>
            <p className="text-sm font-medium text-gray-600 truncate">
              {user.email}
            </p>
          </div>

          <div className="p-1 space-y-1">
            {/* 1. LIEN ADMIN */}
            {user.role === "admin" && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Tableau de bord Admin
              </Link>
            )}

            {/* 2. LIEN VENDOR (Modifié pour pointer vers /vendorDash) */}
            {user.role === "vendor" && (
              <Link
                to="/vendorDash"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors"
              >
                <Store className="w-4 h-4" />
                Tableau de bord Vendeur
              </Link>
            )}

            {/* 3. LIEN CLIENT (Visible pour les clients ou vendeurs qui veulent voir leurs achats) */}
            <Link
              to="/ClientDash"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
            >
              <UserIcon className="w-4 h-4" />
              Mes Commandes
            </Link>

            <div className="border-t border-gray-50 my-1"></div>

            {/* DECONNEXION */}
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
