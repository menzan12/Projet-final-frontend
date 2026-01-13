import { useState } from "react";
import { Check, Sparkles, Zap, Loader2 } from "lucide-react";
import api from "../../api/axios";
import { toast } from "react-toastify";

const PLANS = [
  {
    id: "pro",
    name: "Plan Pro",
    price: "5,000",
    limit: 10,
    color: "blue",
    features: ["Jusqu'à 10 services", "Support prioritaire", "Badge Pro"],
    icon: <Zap className="text-blue-500" />,
  },
  {
    id: "premium",
    name: "Plan Premium",
    price: "15,000",
    limit: "Illimité",
    color: "orange",
    features: [
      "Services illimités",
      "Mise en avant (TOP)",
      "Support 24/7",
      "Stats avancées",
    ],
    icon: <Sparkles className="text-orange-500" />,
    popular: true,
  },
];

const PricingModal = ({ onRequested }: { onRequested: () => void }) => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSelectPlan = async (planId: string) => {
    try {
      setLoadingPlan(planId);
      await api.post("/admin/request-upgrade", { requestedPlan: planId });
      toast.success("Demande d'upgrade envoyée à l'administrateur !");

      const modal = document.getElementById(
        "pricing_modal"
      ) as HTMLDialogElement;
      if (modal) modal.close();
      onRequested();
    } catch (error) {
      toast.error("Erreur lors de l'envoi de la demande.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <dialog id="pricing_modal" className="modal backdrop-blur-md">
      <div className="modal-box max-w-4xl bg-slate-50 p-0 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 text-center bg-white border-b border-slate-100">
          <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
            Boostez votre visibilité
          </h3>
          <p className="text-slate-500 font-medium mt-2">
            Choisissez le plan qui correspond à votre croissance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white p-8 rounded-[2rem] border-2 transition-all hover:shadow-xl ${
                plan.popular ? "border-orange-500" : "border-slate-100"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                  Recommandé
                </span>
              )}

              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-50 rounded-2xl">{plan.icon}</div>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-[10px] block font-bold text-slate-400 uppercase">
                    FCFA / Mois
                  </span>
                </div>
              </div>

              <h4 className="text-xl font-black text-slate-900 mb-6 uppercase">
                {plan.name}
              </h4>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-bold text-slate-600"
                  >
                    <div className="p-1 bg-green-100 text-green-600 rounded-full">
                      <Check size={12} />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan.id)}
                disabled={!!loadingPlan}
                className={`w-full py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${
                  plan.popular
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {loadingPlan === plan.id ? (
                  <Loader2 className="animate-spin mx-auto" size={18} />
                ) : (
                  "Choisir ce plan"
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="modal-action p-4 bg-white">
          <form method="dialog">
            <button className="btn btn-ghost font-bold text-slate-400">
              Plus tard
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default PricingModal;
