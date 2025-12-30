import type { Service } from "../../types";
import ServiceCard from "./ServiceCard";

interface Props {
  services: Service[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export default function ServicesList({
  services,
  favorites,
  toggleFavorite,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard
          // Utilisation de _id pour la clé React et les favoris
          key={service._id}
          service={service}
          isFavorite={favorites.includes(service._id)}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}
