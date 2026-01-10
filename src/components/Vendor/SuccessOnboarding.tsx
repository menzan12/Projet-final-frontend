import React from "react";
import {
  CheckCircle,
  Clock,
  Rocket,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuccessOnboarding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in zoom-in duration-700">
      {/* Icône de succès animée */}
      <div className="relative">
        <div className="absolute inset-0 bg-green-200 blur-3xl opacity-30 animate-pulse"></div>
        <div className="relative bg-white p-8 rounded-[3rem] shadow-xl shadow-green-100 border border-green-50">
          <CheckCircle size={80} className="text-green-500" />
        </div>
      </div>

      <div className="max-w-md space-y-4">
        <h2 className="text-3xl font-black text-slate-900 leading-tight">
          Dossier envoyé avec succès !
        </h2>
        <p className="text-slate-500 font-medium leading-relaxed">
          Merci d'avoir complété votre profil. Nos experts vérifient vos
          informations et vos documents sous{" "}
          <span className="text-slate-900 font-bold underline decoration-blue-500 underline-offset-4">
            24h à 48h ouvrées
          </span>
          .
        </p>
      </div>

      {/* Timeline de validation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mt-8">
        {[
          {
            icon: <CheckCircle size={20} />,
            label: "Soumission",
            desc: "Reçu",
            active: true,
          },
          {
            icon: <Clock size={20} />,
            label: "Vérification",
            desc: "En cours",
            active: true,
          },
          {
            icon: <Rocket size={20} />,
            label: "Visibilité",
            desc: "À venir",
            active: false,
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`p-6 rounded-[2rem] border transition-all ${
              item.active
                ? "bg-white border-slate-200 shadow-sm"
                : "bg-slate-50/50 border-transparent opacity-50"
            }`}
          >
            <div
              className={`${
                item.active ? "text-blue-600" : "text-slate-300"
              } mb-3`}
            >
              {item.icon}
            </div>
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest">
              {item.label}
            </h4>
            <p className="text-slate-400 text-[10px] font-bold uppercase mt-1">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={() => navigate("/dashVendor")}
          className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-3 shadow-xl shadow-slate-200"
        >
          Accéder au Dashboard <ArrowRight size={18} />
        </button>
      </div>

      <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest pt-8">
        <ShieldCheck size={14} /> Données protégées par cryptage AES-256
      </div>
    </div>
  );
};

export default SuccessOnboarding;
