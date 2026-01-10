import { useAuthStore } from "../../stores/useAuthStore"; // Ajuste le chemin selon ta structure
import { ChevronRight, HelpCircle, Bell } from "lucide-react";

const ProfilHeader = () => {
  const { user } = useAuthStore();

  // 1. Calcul des initiales (ex: "Alex Morgan" -> "AM")
  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2) || "??"
    );
  };

  // 2. Formatage du Plan (ex: "premium" -> "Vendeur Premium")
  const planLabel = user?.vendorPlan
    ? `Vendeur ${
        user.vendorPlan.charAt(0).toUpperCase() + user.vendorPlan.slice(1)
      }`
    : "Vendeur";

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 flex items-center justify-between shrink-0 z-20">
      {/* Fil d'Ariane */}
      <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
        <span>Portail Vendeur</span> <ChevronRight size={14} />
        <span className="text-slate-900">Profil Complet</span>
      </div>

      <div className="flex items-center gap-6">
        {/* Actions secondaires */}
        <div className="flex items-center gap-4 pr-6 border-r border-slate-100 text-slate-400">
          <HelpCircle
            size={20}
            className="hover:text-slate-600 cursor-pointer transition-colors"
          />
          <div className="relative">
            <Bell
              size={20}
              className="hover:text-slate-600 cursor-pointer transition-colors"
            />
            {/* Badge de notification si besoin */}
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
        </div>

        {/* Profil Utilisateur Dynamique */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-black text-slate-900 leading-none mb-1">
              {/* Priorité au nom de la DB, sinon fallback sur le state du formulaire */}
              {user?.name || "Utilisateur"}
            </p>
            <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">
              {planLabel}
            </p>
          </div>

          {/* Avatar avec initiales et dégradé selon le plan */}
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shadow-lg 
            ${
              user?.vendorPlan === "premium"
                ? "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-purple-100"
                : "bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-100"
            }`}
          >
            {getInitials(user?.name || "??")}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProfilHeader;
