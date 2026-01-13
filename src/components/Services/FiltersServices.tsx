import { Search, Star, Filter, ChevronRight, Zap } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  categories: { name: string; count: number }[];
}

export default function FiltersServices({
  categories,
  search,
  setSearch,
  category,
  setCategory,
}: Props) {
  const handleReset = () => {
    setSearch("");
    setCategory("");
  };

  return (
    <aside className="space-y-6 sticky top-24">
      <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-[0_15px_40px_-12px_rgba(0,0,0,0.05)]">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
              <Filter size={18} />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tighter text-slate-900">
              Filtres
            </h3>
          </div>
          {(search || category) && (
            <button
              onClick={handleReset}
              className="text-orange-600 hover:bg-orange-50 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Réinitialiser
            </button>
          )}
        </div>

        {/* RECHERCHE */}
        <div className="mb-8">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3 ml-1">
            Recherche
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Un service, une ville..."
              className="w-full pl-11 pr-4 py-3.5 text-sm font-bold bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl outline-none transition-all placeholder:text-slate-300 text-slate-700"
            />
          </div>
        </div>

        {/* CATEGORIES DYNAMIQUES */}
        <div className="mb-8">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3 ml-1">
            Catégories
          </label>
          <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {categories.map((cat) => {
              const isActive = category === cat.name;
              return (
                <button
                  key={`cat-${cat.name}`} // Clé unique corrigée
                  onClick={() => setCategory(isActive ? "" : cat.name)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all group ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                      : "hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <span
                    className={`text-sm font-bold ${
                      isActive ? "text-white" : "text-slate-700"
                    }`}
                  >
                    {cat.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-lg font-black ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {cat.count}
                    </span>
                    <ChevronRight
                      size={14}
                      className={
                        isActive ? "text-orange-400" : "text-slate-200"
                      }
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* AVIS CLIENTS */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3 ml-1">
            Avis Clients
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[4, 3, 2].map((rating) => (
              <button
                key={`rating-btn-${rating}`} // Clé unique corrigée
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-slate-50 font-bold text-xs text-slate-600 hover:border-orange-500 hover:text-orange-600 transition-all"
              >
                <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                {rating}+
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BANNIERE SIMPLE */}
      <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
        <div className="relative z-10">
          <Zap className="text-orange-400 mb-3" fill="currentColor" size={24} />
          <h4 className="font-black uppercase tracking-tighter text-xl leading-none mb-2">
            Besoin d'un <br /> <span className="text-orange-400">Expert ?</span>
          </h4>
          <p className="text-blue-100 text-[11px] font-bold opacity-80">
            Trouvez le meilleur prestataire.
          </p>
        </div>
        {/* Déco en arrière plan */}
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full" />
      </div>
    </aside>
  );
}
