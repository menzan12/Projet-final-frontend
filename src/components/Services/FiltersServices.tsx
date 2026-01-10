import { Search, Star } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  categories: { name: string; count: number }[]; // Changez de string[] à object[]
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
      <div className="bg-white p-7 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-gray-900 tracking-tight">
            Filtres
          </h3>
          {(search || category) && (
            <button
              onClick={handleReset}
              className="text-orange-600 hover:bg-orange-50 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Effacer
            </button>
          )}
        </div>

        {/* Recherche */}
        <div className="mb-10">
          <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-4">
            Mots-clés
          </label>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Peintre, Ménage..."
              className="w-full pl-11 pr-4 py-3.5 text-sm font-bold border-none rounded-2xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Catégories */}
        <div className="mb-10">
          <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-4">
            Catégories
          </label>
          <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() =>
                  setCategory(category === cat.name ? "" : cat.name)
                }
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group ${
                  category === cat.name
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                    : "hover:bg-gray-50 text-gray-600"
                }`}
              >
                <span
                  className={`text-sm font-bold ${
                    category === cat.name ? "text-white" : "text-gray-700"
                  }`}
                >
                  {cat.name}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-lg font-black ${
                    category === cat.name
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Note Minimum */}
        <div>
          <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-4">
            Note minimum
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[4, 3].map((rating) => (
              <button
                key={rating}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-100 font-bold text-sm text-gray-600 hover:border-orange-200 transition-all"
              >
                <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                {rating}+
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
