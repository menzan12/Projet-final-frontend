import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut, LayoutDashboard, ChevronDown, Store } from "lucide-react";
import type { User } from "../../../types";

interface Props {
  user: User;
  onLogout: () => void;
}

const UserMenu = ({ user, onLogout }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Définition dynamique du lien du Dashboard selon le rôle
  const getDashboardLink = () => {
    switch (user.role) {
      case "admin":
        return "/dashAdmin";
      case "vendor":
        return "/dashVendor";
      default:
        return "/dashClient";
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 pl-2 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
      >
        <div className="relative">
          <img
            src={
              user.avatar ||
              `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`
            }
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-white shadow-sm"
            alt={user.name}
          />
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>

        <div className="hidden lg:flex flex-col items-start leading-tight">
          <span className="text-sm font-black text-gray-900">{user.name}</span>
          <span className="text-[10px] font-bold uppercase text-blue-600 tracking-tighter">
            Mode {user.role}
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
              Compte
            </p>
            <p className="text-sm font-bold text-gray-900 truncate">
              {user.email}
            </p>
          </div>

          <div className="p-2">
            <Link
              to={getDashboardLink()}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all group"
            >
              {user.role === "vendor" ? (
                <Store className="w-5 h-5" />
              ) : (
                <LayoutDashboard className="w-5 h-5" />
              )}
              <span className="font-bold text-sm">Tableau de bord</span>
            </Link>

            <div className="my-2 border-t border-gray-100"></div>

            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-bold text-sm">Déconnexion</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
