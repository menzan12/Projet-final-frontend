import { Link } from "react-router-dom";
import { Star, Heart, MapPin, User } from "lucide-react";
import type { Service } from "../../types/service";

interface Props {
  service: Service;
  isFavorite: boolean;
  toggleFavorite: (id: string) => void;
}

export default function ServiceCard({
  service,
  isFavorite,
  toggleFavorite,
}: Props) {
  // Image par défaut si service.images est vide
  const displayImage =
    service.images?.[0] ||
    "https://images.unsplash.com/photo-1581578731548-c64695cc6958?q=80&w=800&auto=format&fit=crop";

  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image Container */}
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={displayImage}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm text-[10px] font-black uppercase tracking-widest text-blue-600">
            {Array.isArray(service.category)
              ? service.category.map((cat: any) => cat.name).join(", ")
              : service.category}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault(); // Évite de déclencher le lien parent si la carte est cliquable
            toggleFavorite(service._id);
          }}
          className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/90 backdrop-blur-md hover:bg-white transition-all shadow-sm active:scale-90"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 min-h-[3rem]">
            {service.title}
          </h3>
          <div className="flex items-center bg-orange-50 px-2 py-1 rounded-lg shrink-0">
            <Star className="h-3.5 w-3.5 text-orange-500 fill-orange-500" />
            <span className="ml-1 text-xs font-black text-orange-700">
              {service.rating?.toFixed(1) || "New"}
            </span>
          </div>
        </div>

        <p className="text-sm font-medium text-gray-500 line-clamp-2 mb-6">
          {service.description}
        </p>

        {/* Provider & Price */}
        <div className="flex items-center justify-between border-t border-gray-50 pt-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 overflow-hidden">
              {/* On peut utiliser un avatar ou une icône */}
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 leading-none mb-1">
                {service.provider}
              </p>
              <p className="text-[11px] font-bold text-gray-400 flex items-center uppercase tracking-tighter">
                <MapPin className="h-3 w-3 mr-0.5 text-orange-500" />{" "}
                {service.city}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-black text-blue-600 leading-none">
              {service.price}€
            </p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              / heure
            </p>
          </div>
        </div>

        <Link
          to={`/services/${service._id}`}
          className="mt-6 w-full flex items-center justify-center py-3 rounded-2xl font-bold bg-gray-900 text-white hover:bg-blue-600 transition-all shadow-lg shadow-gray-100 hover:shadow-blue-100"
        >
          Voir les détails
        </Link>
      </div>
    </div>
  );
}
