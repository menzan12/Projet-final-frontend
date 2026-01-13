import React, { useState } from "react";
import { Zap, ChevronRight, CheckCircle } from "lucide-react";
import PricingModal from "./PricingModal";

interface QuotaUpgradeCardProps {
  usagePercentage: number;
  isLimitReached: boolean;
  userPlan: string;
  currentCount: number;
  limit: number;
}

const QuotaUpgradeCard: React.FC<QuotaUpgradeCardProps> = ({
  usagePercentage,
  isLimitReached,
  userPlan,
  currentCount,
  limit,
}) => {
  const [isRequested, setIsRequested] = useState(false);

  const openPricing = () => {
    const modal = document.getElementById("pricing_modal") as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  if (usagePercentage < 80 && !isLimitReached) return null;

  return (
    <>
      <div className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-1 shadow-lg shadow-blue-200">
        <div className="bg-white/5 backdrop-blur-sm rounded-[22px] p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-white">
            <div className="p-3 bg-white/20 rounded-2xl">
              <Zap
                size={24}
                className={
                  isLimitReached
                    ? "fill-yellow-400 text-yellow-400 animate-pulse"
                    : ""
                }
              />
            </div>
            <div>
              <h4 className="font-bold text-lg">
                {isLimitReached
                  ? "Limite atteinte !"
                  : "Besoin de plus d'espace ?"}
              </h4>
              <p className="text-blue-100 text-sm">
                Plan {userPlan.toUpperCase()} : {currentCount}/{limit} services
                utilisés.
              </p>
            </div>
          </div>

          <button
            onClick={openPricing}
            disabled={isRequested}
            className={`w-full md:w-auto px-6 py-3 font-black rounded-xl transition-all flex items-center justify-center gap-2 group ${
              isRequested
                ? "bg-green-500 text-white"
                : "bg-white text-blue-600 hover:bg-blue-50 shadow-xl"
            }`}
          >
            {isRequested ? (
              <>
                Demande en cours <CheckCircle size={18} />
              </>
            ) : (
              <>
                Voir les plans{" "}
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </button>
        </div>
      </div>

      <PricingModal onRequested={() => setIsRequested(true)} />
    </>
  );
};

export default QuotaUpgradeCard;
