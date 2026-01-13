import React from "react";
import { Info, MapPin, Tag, Banknote, AlignLeft } from "lucide-react";

interface ServiceFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

const DetailsForm = ({ formData, setFormData }: ServiceFormProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="bg-white p-8 lg:p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-50 transition-all">
      {/* HEADER SECTION */}
      <h3 className="text-[11px] font-[1000] uppercase tracking-[0.2em] text-blue-500 mb-8 flex items-center gap-3">
        <span className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
          <Info size={18} />
        </span>
        Informations Générales
      </h3>

      <div className="space-y-6">
        {/* TITRE DU SERVICE */}
        <div className="group">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-3 ml-2 tracking-[0.1em]">
            <Tag size={12} className="text-orange-500" />
            Titre de la prestation
          </label>
          <input
            required
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Photographe de mariage professionnel"
            className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.8rem] font-bold text-sm focus:border-blue-500/20 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all placeholder:text-slate-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PRIX FCFA (INPUT SIMPLE) */}
          <div>
            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-3 ml-2 tracking-[0.1em]">
              <Banknote size={12} className="text-orange-500" />
              Tarif (FCFA)
            </label>
            <div className="relative">
              <input
                required
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="50 000"
                className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.8rem] font-bold text-sm focus:border-blue-500/20 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
              />
              <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 bg-white px-3 py-1 rounded-lg border border-slate-100 shadow-sm">
                FCFA
              </span>
            </div>
          </div>

          {/* CATÉGORIE (INPUT SIMPLE) */}
          <div>
            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-3 ml-2 tracking-[0.1em]">
              <Tag size={12} className="text-orange-500" />
              Domaine / Catégorie
            </label>
            <input
              required
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Ex: Événementiel"
              className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.8rem] font-bold text-sm focus:border-blue-500/20 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* VILLE */}
          <div>
            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-3 ml-2 tracking-[0.1em]">
              <MapPin size={12} className="text-orange-500" />
              Ville
            </label>
            <input
              required
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ex: Abidjan, Cocody"
              className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.8rem] font-bold text-sm focus:border-blue-500/20 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
            />
          </div>

          {/* ADRESSE PRÉCISE */}
          <div>
            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-3 ml-2 tracking-[0.1em]">
              <MapPin size={12} className="text-orange-500" />
              Adresse précise
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Ex: Cité des arts, face pharmacie"
              className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.8rem] font-bold text-sm focus:border-blue-500/20 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-3 ml-2 tracking-[0.1em]">
            <AlignLeft size={12} className="text-orange-500" />
            Description détaillée
          </label>
          <textarea
            required
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            placeholder="Détaillez votre expertise, le matériel utilisé, et ce qui est inclus dans le prix..."
            className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[2rem] font-bold text-sm focus:border-blue-500/20 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all resize-none"
          />
        </div>
      </div>
    </section>
  );
};

export default DetailsForm;
