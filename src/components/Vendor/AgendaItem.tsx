import React from "react";
import {
  ChevronRight,
  Video,
  ShieldCheck,
  Settings,
  BellRing,
} from "lucide-react";

interface AgendaItemProps {
  time: string;
  title: string;
  type: string;
  status?: "pending" | "completed";
}

const AgendaItem: React.FC<AgendaItemProps> = ({
  time,
  title,
  type,
  status = "pending",
}) => {
  // Fonction pour attribuer une icône et une couleur selon le type de tâche
  const getTypeStyles = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes("video") || lowerType.includes("kyc")) {
      return {
        icon: <Video size={16} />,
        color: "text-blue-600",
        bg: "bg-blue-50",
      };
    }
    if (lowerType.includes("admin") || lowerType.includes("sécurité")) {
      return {
        icon: <ShieldCheck size={16} />,
        color: "text-orange-600",
        bg: "bg-orange-50",
      };
    }
    if (lowerType.includes("setup") || lowerType.includes("portfolio")) {
      return {
        icon: <Settings size={16} />,
        color: "text-purple-600",
        bg: "bg-purple-50",
      };
    }
    return {
      icon: <BellRing size={16} />,
      color: "text-slate-600",
      bg: "bg-slate-50",
    };
  };

  const styles = getTypeStyles(type);

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-md hover:shadow-blue-50/50 transition-all group cursor-pointer">
      {/* Heure avec indicateur de type */}
      <div
        className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-xl font-black text-xs ${styles.bg} ${styles.color} transition-colors group-hover:bg-blue-600 group-hover:text-white`}
      >
        {time}
        <div className="absolute -top-1 -right-1 p-1 bg-white rounded-lg shadow-sm border border-slate-50 text-[10px]">
          {styles.icon}
        </div>
      </div>

      {/* Contenu textuel */}
      <div className="flex-1">
        <h5
          className={`text-sm font-black transition-colors ${
            status === "completed"
              ? "text-slate-400 line-through"
              : "text-slate-900 group-hover:text-blue-600"
          }`}
        >
          {title}
        </h5>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {type}
          </span>
          {status === "completed" && (
            <span className="px-1.5 py-0.5 rounded-md bg-green-50 text-green-600 text-[8px] font-black uppercase">
              Fait
            </span>
          )}
        </div>
      </div>

      {/* Flèche d'action */}
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
        <ChevronRight size={18} />
      </div>
    </div>
  );
};

export default AgendaItem;
