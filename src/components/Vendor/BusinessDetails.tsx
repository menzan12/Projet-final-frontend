import React from "react";
import { Building2, MapPin, Globe, Shield } from "lucide-react";
import InputField from "./InputField";

interface BusinessDetailsProps {
  data: any;
  onChange: (newData: any) => void;
}

const BusinessDetails: React.FC<BusinessDetailsProps> = ({
  data,
  onChange,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Section Identification */}
      <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
        <h3 className="font-black text-slate-900 flex items-center gap-3">
          <Building2 size={20} className="text-blue-600" /> Structure Légale
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Nom de l'entreprise"
            placeholder="Ex: Agence Digital Flow"
            value={data.companyName}
            onChange={(v) => onChange({ ...data, companyName: v })}
          />
          <InputField
            label="Numéro SIRET / ID Fiscal"
            placeholder="123 456 789 00012"
            icon={<Shield size={16} />}
            value={data.taxId}
            onChange={(v) => onChange({ ...data, taxId: v })}
          />
          <div className="space-y-2 flex-1">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">
              Type de Structure
            </label>
            <select
              className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl text-sm outline-none focus:bg-white focus:border-blue-500 transition-all font-medium appearance-none"
              value={data.businessType}
              onChange={(e) =>
                onChange({ ...data, businessType: e.target.value })
              }
            >
              <option value="auto_entrepreneur">Auto-entrepreneur</option>
              <option value="sasu_sarl">SASU / SARL</option>
              <option value="freelance">Freelance (Indépendant)</option>
              <option value="agency">Agence</option>
            </select>
          </div>
          <InputField
            label="Site Web"
            placeholder="www.votresite.com"
            icon={<Globe size={16} />}
            value={data.website}
            onChange={(v) => onChange({ ...data, website: v })}
          />
        </div>
      </section>

      {/* Section Localisation */}
      <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
        <h3 className="font-black text-slate-900 flex items-center gap-3">
          <MapPin size={20} className="text-blue-600" /> Siège Social
        </h3>
        <InputField
          label="Adresse"
          placeholder="12 rue de la Paix"
          value={data.address}
          onChange={(v) => onChange({ ...data, address: v })}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <InputField
            label="Ville"
            placeholder="Paris"
            value={data.city}
            onChange={(v) => onChange({ ...data, city: v })}
          />
          <InputField
            label="Code Postal"
            placeholder="75000"
            value={data.zipCode}
            onChange={(v) => onChange({ ...data, zipCode: v })}
          />
          <div className="col-span-2 md:col-span-1">
            <InputField
              label="Pays"
              placeholder="France"
              value={data.country}
              onChange={(v) => onChange({ ...data, country: v })}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessDetails;
