import React from "react";
import { CheckCircle2, type LucideIcon } from "lucide-react";

export interface Step {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface OnboardingSidebarProps {
  steps: Step[];
  currentStepId: string;
}

const OnboardingSidebar: React.FC<OnboardingSidebarProps> = ({
  steps,
  currentStepId,
}) => {
  // Calculer l'index actuel pour déterminer le statut (terminé, en cours, à venir)
  const currentIndex = steps.findIndex((s) => s.id === currentStepId);

  // Calcul du pourcentage de progression
  const progressPercentage = Math.round(
    ((currentIndex + 1) / steps.length) * 100
  );

  return (
    <aside className="w-80 bg-white border-r border-slate-100 flex flex-col h-full p-8 hidden lg:flex">
      <div className="mb-12">
        <h2 className="text-2xl font-black text-slate-900 tracking-tighter">
          Onboarding
        </h2>
        <p className="text-sm text-slate-400 font-medium mt-1">
          Évoluez vers votre succès.
        </p>
      </div>

      <nav className="flex-1 space-y-8">
        {steps.map((step, index) => {
          // Logique d'état dynamique
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isUpcoming = index > currentIndex;

          let status: "completed" | "current" | "upcoming" = "upcoming";
          if (isCompleted) status = "completed";
          if (isCurrent) status = "current";

          return (
            <div
              key={step.id}
              className="relative flex items-start gap-4 group transition-all"
            >
              {/* Ligne de connexion entre les points */}
              {index !== steps.length - 1 && (
                <div
                  className={`absolute left-5 top-10 w-[2px] h-10 ${
                    isCompleted ? "bg-blue-600" : "bg-slate-100"
                  }`}
                />
              )}

              {/* Icône du cercle */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center z-10 transition-all duration-500 ${
                  status === "completed"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                    : status === "current"
                    ? "bg-white text-blue-600 ring-2 ring-blue-600 shadow-xl"
                    : "bg-slate-50 text-slate-300"
                }`}
              >
                {status === "completed" ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <step.icon size={20} />
                )}
              </div>

              {/* Texte de l'étape */}
              <div className="flex flex-col">
                <span
                  className={`text-sm font-black transition-colors ${
                    isUpcoming ? "text-slate-300" : "text-slate-900"
                  }`}
                >
                  {step.label}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest mt-0.5 text-blue-600">
                  {status === "completed"
                    ? "Terminé"
                    : status === "current"
                    ? "En cours"
                    : ""}
                </span>
              </div>
            </div>
          );
        })}
      </nav>

      {/* Barre de progression dynamique */}
      <div className="mt-auto pt-8 border-t border-slate-50">
        <div className="flex justify-between items-end mb-3">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Progression
          </p>
          <p className="text-sm font-black text-blue-600">
            {progressPercentage}%
          </p>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(37,99,235,0.4)]"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </aside>
  );
};

export default OnboardingSidebar;
