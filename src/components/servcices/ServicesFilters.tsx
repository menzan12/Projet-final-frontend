import { Search, MapPin, Star, RotateCcw } from "lucide-react";

interface CategoryData {
  name: string;
  count: number;
}

interface Props {
  categories: CategoryData[]; // Liste dynamique venant de la DB
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
}

export default function ServicesFilters({
  categories,
  search,
  setSearch,
  category,
  setCategory,
}: Props) {
  // Fonction pour réinitialiser tous les filtres
  const handleReset = () => {
    setSearch("");
    setCategory("");
  };

  return (
    <aside className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Filtres</h3>
          <button
            onClick={handleReset}
            className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Réinitialiser
          </button>
        </div>

        {/* SECTION : RECHERCHE TEXTUELLE */}
        <div className="mb-8">
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
            Recherche
          </h4>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ex: Plomberie..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
            />
          </div>
        </div>

        {/* SECTION : CATÉGORIES DYNAMIQUES */}
        <div className="mb-8">
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
            Catégories disponibles
          </h4>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
            {categories.length === 0 ? (
              <p className="text-xs text-gray-400 italic">
                Aucune catégorie active
              </p>
            ) : (
              categories.map((cat) => (
                <label
                  key={cat.name}
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all ${
                    category === cat.name
                      ? "bg-blue-50 border border-blue-100"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={category === cat.name}
                      onChange={() =>
                        setCategory(category === cat.name ? "" : cat.name)
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all"
                    />
                    <span
                      className={`ml-3 text-sm transition-colors ${
                        category === cat.name
                          ? "font-bold text-blue-700"
                          : "text-gray-600"
                      }`}
                    >
                      {cat.name}
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      category === cat.name
                        ? "bg-blue-200 text-blue-800"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {cat.count}
                  </span>
                </label>
              ))
            )}
          </div>
        </div>

        {/* SECTION : LOCALISATION (Statique pour le design) */}
        <div className="mb-8">
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
            Localisation
          </h4>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Ville ou CP"
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-100 rounded-xl bg-gray-50 outline-none"
            />
          </div>
        </div>

        {/* SECTION : NOTES (Design type ServiceBooker) */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
            Note minimum
          </h4>
          <div className="space-y-2">
            {[4, 3].map((rating) => (
              <label
                key={rating}
                className="flex items-center group cursor-pointer"
              >
                <input
                  type="radio"
                  name="rating"
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="ml-3 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < rating
                          ? "text-orange-400 fill-orange-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                    & plus
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
