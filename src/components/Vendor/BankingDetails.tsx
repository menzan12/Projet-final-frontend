import React from "react";
import { Landmark, ShieldCheck, CreditCard, Info } from "lucide-react";
import InputField from "./InputField";

interface BankingDetailsProps {
  data: any;
  onChange: (newData: any) => void;
}

const BankingDetails: React.FC<BankingDetailsProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-900 flex items-center gap-3">
            <Landmark size={20} className="text-blue-600" /> Configuration des
            paiements
          </h3>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase">
            <ShieldCheck size={14} /> Sécurisé par Stripe
          </div>
        </div>

        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-200">
            <CreditCard size={28} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="font-black text-slate-900">
              Connexion Stripe Connect
            </h4>
            <p className="text-slate-500 text-xs mt-1">
              Nous utilisons Stripe pour garantir des paiements rapides et
              sécurisés. Connectez votre compte pour recevoir vos fonds
              automatiquement.
            </p>
          </div>
          <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all">
            Lier mon compte
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-100"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-slate-400 font-bold">
              Ou virement classique
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <InputField
              label="Titulaire du compte"
              placeholder="Ex: Jean Dupont"
              value={data.accountHolder}
              onChange={(v) => onChange({ ...data, accountHolder: v })}
            />
          </div>
          <div className="md:col-span-2">
            <InputField
              label="IBAN"
              placeholder="FR76 3000 6000 0001 2345 6789 012"
              value={data.iban}
              onChange={(v) => onChange({ ...data, iban: v })}
            />
          </div>
          <InputField
            label="Code BIC / SWIFT"
            placeholder="BCDEFRPPXXX"
            value={data.bic}
            onChange={(v) => onChange({ ...data, bic: v })}
          />
          <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 mt-auto">
            <Info size={16} className="text-blue-500 shrink-0" />
            <p className="text-[10px] text-blue-700 font-medium leading-tight">
              Vos fonds sont reversés 48h après la validation de chaque mission.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BankingDetails;
