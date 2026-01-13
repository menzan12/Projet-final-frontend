import React from "react";
import { Zap, ChevronRight, CheckCircle } from "lucide-react";
import PricingModal from "./PricingModal";

interface QuotaUpgradeCardProps {
  usagePercentage: number;
  isLimitReached: boolean;
  userPlan?: string;
  currentCount: number;
  limit: number;
  isPending: boolean; // Ajouté pour la dynamique
  onRefresh: () => void; // Ajouté pour la dynamique
}

const QuotaUpgradeCard: React.FC<QuotaUpgradeCardProps> = ({
  usagePercentage = 0,
  isLimitReached = false,
  userPlan = "free",
  currentCount = 0,
  limit = 3,
  isPending = false,
  onRefresh,
}) => {
  const openPricing = () => {
    const modal = document.getElementById("pricing_modal") as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  // On affiche si quota > 80%, limite atteinte, OU si une demande est en attente
  if (usagePercentage < 80 && !isLimitReached && !isPending) return null;

  const planDisplayName = (userPlan || "free").toUpperCase();

  return (
    <>
      <div className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-1 shadow-lg shadow-blue-200">
        <div className="bg-white/5 backdrop-blur-sm rounded-[22px] p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-white">
            <div className="p-3 bg-white/20 rounded-2xl">
              <Zap
                size={24}
                className={
                  isLimitReached || isPending
                    ? "fill-yellow-400 text-yellow-400 animate-pulse"
                    : "text-white"
                }
              />
            </div>
            <div>
              <h4 className="font-bold text-lg">
                {isPending
                  ? "Demande en cours..."
                  : isLimitReached
                  ? "Limite atteinte !"
                  : "Besoin de plus d'espace ?"}
              </h4>
              <p className="text-blue-100 text-sm">
                {isPending
                  ? "Un administrateur examine votre demande d'upgrade."
                  : isLimitReached
                  ? `Vous avez utilisé vos ${limit} services (Plan ${planDisplayName}).`
                  : `Vous approchez de la limite (${currentCount}/${limit}).`}
              </p>
            </div>
          </div>

          <button
            onClick={openPricing}
            disabled={isPending}
            className={`w-full md:w-auto px-6 py-3 font-black rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg ${
              isPending
                ? "bg-green-500 text-white cursor-default"
                : "bg-white text-blue-600 hover:bg-blue-50 active:scale-95"
            }`}
          >
            {isPending ? (
              <>
                Demande envoyée <CheckCircle size={18} />
              </>
            ) : (
              <>
                Demander le plan supérieur
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </button>
        </div>
      </div>
      <PricingModal onRequested={onRefresh} />
    </>
  );
};

export default QuotaUpgradeCard;
