import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LogOut,
  User as UserIcon,
  LayoutDashboard,
  ChevronDown,
  Store,
} from "lucide-react";
import type { User } from "../../../types";

interface Props {
  user: User;
  onLogout: () => void;
}

const UserMenu = ({ user, onLogout }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu si clic en dehors
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
      {/* BOUTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-orange-500 transition-all duration-300"
      >
        <img
          src={
            user.avatar ||
            `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`
          }
          className="w-9 h-9 rounded-full object-cover ring-2 ring-orange-400"
          alt={user.name}
        />

        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-bold text-gray-800">{user.name}</span>
          <span className="text-[10px] font-bold uppercase bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            {user.role}
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* MENU */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-2xl z-50 animate-fadeIn">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium truncate text-gray-700">
              {user.email}
            </p>
          </div>

          <div className="p-1 space-y-1">
            {/* ADMIN */}
            {user.role === "admin" && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 transition-all"
              >
                <LayoutDashboard className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700">Admin Dashboard</span>
              </Link>
            )}

            {/* VENDOR */}
            {user.role === "vendor" && (
              <Link
                to="/vendorDash"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 transition-all"
              >
                <Store className="w-4 h-4 text-orange-500" />
                <span className="text-gray-700">Dashboard Vendeur</span>
              </Link>
            )}

            {/* CLIENT */}
            {user.role === "client" && (
              <Link
                to="/ClientDash"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 transition-all"
              >
                <UserIcon className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700">Mes Commandes</span>
              </Link>
            )}

            <div className="border-t border-gray-200 my-1"></div>

            {/* LOGOUT */}
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
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
