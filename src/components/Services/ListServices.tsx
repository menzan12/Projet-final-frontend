import type { Service } from "../../types/service";
import CardServices from "./CardServices";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {services.map((service, index) => (
        <div
          key={service._id}
          className="flex justify-center"
          style={{
            animationDelay: `${index * 50}ms`,
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
