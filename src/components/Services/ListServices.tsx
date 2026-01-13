import type { Service } from "../../types/service";
import CardServices from "./CardServices";
import { SearchX } from "lucide-react";

interface Props {
  services: Service[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export default function ListServices({
  services,
  favorites,
  toggleFavorite,
}: Props) {
  // Si aucun service n'est trouvé après filtrage
  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100 animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <SearchX className="text-slate-300" size={40} />
        </div>
        <h3 className="text-2xl font-[1000] text-slate-900 uppercase italic tracking-tighter mb-2">
          Aucun service trouvé
        </h3>
        <p className="text-slate-400 font-bold max-w-xs mx-auto">
          Désolé, nous n'avons trouvé aucun résultat pour votre recherche.
          Essayez d'autres filtres.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {services.map((service, index) => (
        <div
          key={service._id}
          className="flex justify-center h-full"
          style={{
            // Staggered animation : chaque carte apparaît l'une après l'autre
            animationDelay: `${index * 100}ms`,
            animationFillMode: "both",
          }}
        >
          <CardServices
            service={service}
            isFavorite={favorites.includes(service._id)}
            toggleFavorite={toggleFavorite}
          />
        </div>
      ))}
    </div>
  );
}
