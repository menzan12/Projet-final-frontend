import { Link } from "react-router-dom";
import { Star, Heart, MapPin } from "lucide-react";
import type { Service } from "../../types";

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
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
            {service.category}
          </span>
        </div>
        <button
          onClick={() => toggleFavorite(service._id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 h-12">
            {service.title}
          </h3>
          <div className="flex items-center bg-orange-50 px-2 py-1 rounded-lg">
            <Star className="h-4 w-4 text-orange-500 fill-orange-500" />
            <span className="ml-1 text-sm font-bold text-orange-700">
              {service.rating || "4.8"}
            </span>
          </div>
        </div>

        <p className="text-sm font-bold text-gray-500 line-clamp-2 mb-4">
          {service.description ||
            "Service professionnel de qualité pour vos besoins quotidiens."}
        </p>

        {/* Provider Info */}
        <div className="flex items-center justify-between border-t border-gray-50 pt-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs border border-blue-200 uppercase">
              {service.provider?.substring(0, 2) || "SP"}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {service.provider}
              </p>
              <p className="text-sm font-bold text-orange-500 flex items-center">
                <MapPin className="h-3 w-3 mr-1" /> {service.city || "Paris"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-blue-600">
              {service.price}€
              <span className="text-sm font-bold text-gray-400 ">/heure</span>
            </p>
          </div>
        </div>

        <Link
          to={`/services/${service._id}`}
          className="mt-4 w-full block text-center py-2.5 rounded-xl font-bold bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-all border border-blue-100"
        >
          Réserver
        </Link>
      </div>
    </div>
  );
}
