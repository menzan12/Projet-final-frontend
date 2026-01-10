import React, { useState, useEffect } from "react";
import { Search, Bell, MessageSquare } from "lucide-react";
import { useAuthStore } from "../../stores/useAuthStore";

interface AdminHeaderProps {
  onSearch?: (query: string) => void;
}

const HeaderAdmin: React.FC<AdminHeaderProps> = ({ onSearch }) => {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");

  // Utilisation d'un useEffect pour le "Debounce"
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (onSearch) {
        onSearch(searchQuery);
      }
    }, 400); // Attend 400ms après la dernière frappe

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, onSearch]);

  return (
    <div className="flex items-center justify-between mb-10">
      {/* BARRE DE RECHERCHE DYNAMIQUE */}
      <div className="relative w-full max-w-md">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher par nom ou email..."
          className="w-full bg-white border-none rounded-xl py-3 pl-12 pr-4 shadow-sm text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all italic font-medium"
        />
      </div>

      {/* ACTIONS ET PROFIL */}
      <div className="flex items-center gap-4">
        {/* Notifications & Messages (Visibles sur desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <button className="relative p-2.5 bg-white rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm group">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <button className="p-2.5 bg-white rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm">
            <MessageSquare size={20} />
          </button>
        </div>

        {/* PROFIL DYNAMIQUE */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-slate-900 leading-none">
              {user?.name || "Administrateur"}
            </p>
            <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mt-1">
              {user?.role === "admin" ? "Super Admin" : "Staff"}
            </p>
          </div>
          <div className="relative">
            <img
              src={`https://ui-avatars.com/api/?name=${
                user?.name || "Admin"
              }&bg=3b82f6&color=fff&bold=true`}
              className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-md"
              alt="avatar"
            />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
