import React, { useState } from "react";
import { Star, X, Plus, Award } from "lucide-react";
import InputField from "./InputField";

interface SkillsDetailsProps {
  data: any;
  onChange: (newData: any) => void;
}

const SkillsDetails: React.FC<SkillsDetailsProps> = ({ data, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  // Ajouter un tag (compétence)
  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!data.skills.includes(inputValue.trim())) {
        onChange({ ...data, skills: [...data.skills, inputValue.trim()] });
      }
      setInputValue("");
    }
  };

  // Supprimer un tag
  const removeSkill = (skillToRemove: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((s: string) => s !== skillToRemove),
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Expertise Principale */}
      <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
        <h3 className="font-black text-slate-900 flex items-center gap-3">
          <Star size={20} className="text-blue-600" /> Domaine d'expertise
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">
              Catégorie Principale
            </label>
            <select
              className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl text-sm outline-none focus:bg-white focus:border-blue-500 transition-all font-medium appearance-none"
              value={data.category}
              onChange={(e) => onChange({ ...data, category: e.target.value })}
            >
              <option value="tech">Tech & Développement</option>
              <option value="design">Design & Créatif</option>
              <option value="marketing">Marketing & Sales</option>
              <option value="consulting">Conseil & Business</option>
            </select>
          </div>
          <InputField
            label="Années d'expérience"
            placeholder="Ex: 5"
            type="number"
            value={data.experienceYears}
            onChange={(v) => onChange({ ...data, experienceYears: v })}
          />
        </div>
      </section>

      {/* Compétences (Tags) */}
      <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-black text-slate-900 flex items-center gap-3">
              <Award size={20} className="text-blue-600" /> Vos Compétences
            </h3>
            <p className="text-slate-400 text-[10px] uppercase font-bold mt-1 tracking-wider">
              Appuyez sur "Entrée" pour ajouter une compétence
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={addSkill}
              placeholder="Ex: React, UI/UX, Growth Hacking..."
              className="w-full p-5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Plus size={18} className="text-slate-300" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-black uppercase tracking-tight group hover:bg-blue-600 hover:text-white transition-all cursor-default"
              >
                {skill}
                <button onClick={() => removeSkill(skill)}>
                  <X
                    size={14}
                    className="group-hover:scale-110 transition-transform"
                  />
                </button>
              </span>
            ))}
            {data.skills.length === 0 && (
              <p className="text-slate-300 text-xs italic">
                Aucune compétence ajoutée.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillsDetails;
