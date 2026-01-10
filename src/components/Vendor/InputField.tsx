import React from "react";

interface InputFieldProps {
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  noLabel?: boolean;
  value: string; // Ajouté pour le contrôle
  onChange: (value: string) => void; // Ajouté pour la remontée d'info
  type?: "text" | "email" | "password" | "tel" | "number"; // Ajouté pour la flexibilité
  error?: string; // Optionnel : pour afficher une bordure rouge si erreur
  name?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  icon,
  disabled,
  noLabel,
  value,
  onChange,
  type = "text",
  error,
  name,
}) => {
  return (
    <div className="space-y-2 flex-1">
      {!noLabel && (
        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">
          {label}
        </label>
      )}

      <div
        className={`relative flex items-center ${disabled ? "opacity-60" : ""}`}
      >
        {/* Icône dynamique */}
        {icon && (
          <div className="absolute left-4 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}

        <input
          name={name}
          type={type}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          // On passe l'événement au parent via onChange
          onChange={(e) => onChange(e.target.value)}
          className={`w-full p-4 ${icon ? "pl-12" : "pl-4"} 
            ${
              error
                ? "border-red-500 bg-red-50"
                : "bg-slate-50 border-transparent"
            }
            border rounded-2xl text-sm outline-none focus:bg-white focus:border-blue-500 
            transition-all font-medium placeholder:text-slate-400`}
        />
      </div>

      {/* Petit message d'erreur si présent */}
      {error && (
        <p className="text-[10px] text-red-500 font-bold ml-2 uppercase">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
