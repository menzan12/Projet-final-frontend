import React from "react";
import { Star, Clock, DollarSign, Video, ShieldCheck } from "lucide-react";

interface InfoVendorProps {
  service: any;
}

const InfoVendor: React.FC<InfoVendorProps> = ({ service }) => {
  // Extraction sécurisée des données
  const vendor = service?.vendor;
  const categoryName =
    typeof service?.category === "object"
      ? service.category.name
      : service?.category;

  return (
    <aside className="lg:w-1/3 space-y-6">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        {/* --- Profil Vendeur --- */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <img
              src={
                vendor?.avatar ||
                `https://ui-avatars.com/api/?name=${
                  vendor?.name || "User"
                }&background=random`
              }
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              alt={vendor?.name || "Vendor"}
            />
            {vendor?.isVerified !== false && (
              <div className="absolute bottom-2 right-2 bg-blue-600 p-1.5 rounded-full border-2 border-white shadow-sm">
                <ShieldCheck size={16} className="text-white" />
              </div>
            )}
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-4 tracking-tight">
            {vendor?.name || "Prestataire"}
          </h2>

          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mt-1">
            {categoryName || "Expert"}
          </p>

          <div className="flex items-center justify-center gap-1 mt-3 text-orange-500 font-bold">
            <Star size={18} className="fill-orange-500" />
            <span className="text-slate-900">{service?.rating || "5.0"}</span>
            <span className="text-slate-400 font-medium text-sm ml-1">
              ({service?.reviewsCount || "0"} avis)
            </span>
          </div>
        </div>

        {/* --- Détails de la Prestation --- */}
        <div className="space-y-6 border-t border-slate-50 pt-8">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
            Détails du service
          </h3>

          {/* Durée */}
          <div className="flex items-center gap-4 group">
            <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                Durée
              </p>
              <p className="text-slate-900 font-extrabold">
                {service?.duration || "60"} Minutes
              </p>
            </div>
          </div>

          {/* Prix */}
          <div className="flex items-center gap-4 group">
            <div className="w-11 h-11 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
              <DollarSign size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                Prix
              </p>
              <p className="text-slate-900 font-extrabold">
                {service?.price}€{" "}
                <span className="text-slate-400 font-medium text-xs">
                  / session
                </span>
              </p>
            </div>
          </div>

          {/* Lieu / Mode */}
          <div className="flex items-center gap-4 group">
            <div className="w-11 h-11 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Video size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                Lieu
              </p>
              <p className="text-slate-900 font-extrabold">
                {service?.locationType || "Visioconférence"}
              </p>
            </div>
          </div>
        </div>

        {/* --- Section À Propos --- */}
        <div className="mt-8 pt-8 border-t border-slate-50">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
            À propos de l'expert
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed font-medium italic bg-slate-50 p-4 rounded-2xl border border-slate-100">
            "{service?.description?.slice(0, 150)}..."
          </p>
        </div>
      </div>
    </aside>
  );
};

export default InfoVendor;
