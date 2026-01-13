import { Link } from "react-router-dom";
import { Star, Heart, MapPin, User, ArrowUpRight } from "lucide-react";
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
  const displayImage =
    service.images && service.images.length > 0
      ? service.images[0]
      : "https://images.unsplash.com/photo-1581578731548-c64695cc6958?q=80&w=800&auto=format&fit=crop";

  return (
    <div className="group bg-white rounded-[2.8rem] overflow-hidden border border-slate-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(59,130,246,0.15)] hover:-translate-y-2 transition-all duration-500 relative">
      {/* IMAGE SECTION */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={displayImage}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Badge Catégorie : Glassmorphism */}
        <div className="absolute top-5 left-5">
          <span className="bg-white/70 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm text-[10px] font-[1000] uppercase tracking-[0.2em] text-blue-700 border border-white/40">
            {typeof service.category === "string"
              ? service.category
              : "Service"}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(service._id);
          }}
          className="absolute top-5 right-5 p-3 rounded-2xl bg-white/80 backdrop-blur-md hover:bg-orange-500 hover:text-white transition-all shadow-sm active:scale-90 group/heart"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isFavorite
                ? "text-red-500 fill-red-500"
                : "text-slate-400 group-hover/heart:text-white"
            }`}
          />
        </button>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-8">
        {/* Ligne Titre & Rating : Corrigée pour éviter la collision */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <h3 className="flex-1 text-xl font-[1000] text-slate-900 leading-[1.2] uppercase italic tracking-tighter line-clamp-2">
            {service.title}
          </h3>
          <div className="flex items-center bg-orange-500 text-white px-2.5 py-1.5 rounded-xl shrink-0 shadow-lg shadow-orange-200">
            <Star className="h-3.5 w-3.5 fill-white" />
            <span className="ml-1.5 text-[11px] font-black">
              {service.rating ? service.rating.toFixed(1) : "5.0"}
            </span>
          </div>
        </div>

        {/* Localisation & Description */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2 text-orange-500">
            <MapPin size={14} strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              {service.city}
            </span>
          </div>
          <p className="text-sm font-bold text-slate-400 line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Footer : Prix et Vendor */}
        <div className="flex items-center justify-between border-t border-slate-50 pt-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
              <User size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                Expert
              </span>
              <span className="text-xs font-black text-slate-900 uppercase">
                {(service as any).vendor?.name || "Prestataire inconnu"}
              </span>
            </div>
          </div>

          <div className="bg-blue-600 px-5 py-2.5 rounded-2xl shadow-xl shadow-blue-100 flex flex-col items-center">
            <span className="text-white text-xl font-[1000] leading-none tracking-tighter">
              {service.price}€
            </span>
            <span className="text-[8px] font-black text-blue-200 uppercase tracking-tighter mt-1">
              Par heure
            </span>
          </div>
        </div>

        {/* Link Button */}
        <Link
          to={`/services/${service._id}`}
          className="mt-8 w-full h-14 flex items-center justify-center gap-3 rounded-[1.6rem] font-black uppercase text-[11px] tracking-[0.2em] border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 group/btn"
        >
          Consulter l'offre
          <ArrowUpRight
            size={18}
            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}
