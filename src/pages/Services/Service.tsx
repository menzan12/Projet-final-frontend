import { useEffect, useState, useMemo } from "react";
import api from "../../api/axios";
import FiltersServices from "../../Components/Services/FiltersServices";
import ListServices from "../../Components/Services/ListServices";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import type { Service } from "../../types/service";
import Breadcrumbs from "../../Components/Services/Breadcrumbs";

type SortOption = "recommanded" | "price-asc" | "rating-desc";

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<
    { name: string; count: number }[]
  >([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recommanded");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const [servicesRes, categoriesRes] = await Promise.all([
          api.get<Service[]>("/services"),
          api.get<{ name: string; count: number }[]>("/services/categories"),
        ]);
        setServices(servicesRes.data);
        setCategories(categoriesRes.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            "Erreur lors du chargement des services"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- LOGIQUE DE FILTRAGE ET TRI CORRIGÉE ---
  const processedServices = useMemo(() => {
    let result = services.filter((s) => {
      // 1. Filtre par recherche (titre)
      const matchesSearch = s.title
        .toLowerCase()
        .includes(search.toLowerCase());

      // 2. Filtre par catégorie (Correction de l'erreur TS2339 & TS7006)
      const matchesCategory = category
        ? Array.isArray(s.category)
          ? s.category.some(
              (cat: any) => cat.name.toLowerCase() === category.toLowerCase()
            )
          : typeof s.category === "string" &&
            s.category.toLowerCase() === category.toLowerCase()
        : true;

      return matchesSearch && matchesCategory;
    });

    // 3. Logique de tri
    switch (sortBy) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "rating-desc":
        return [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return result;
    }
  }, [services, search, category, sortBy]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50/50 min-h-screen pb-20">
        <section className="py-8">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="mb-6">
              <Breadcrumbs />
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
              {/* Sidebar Filtres */}
              <aside className="lg:w-1/4">
                <div className="sticky top-24">
                  <FiltersServices
                    categories={categories}
                    search={search}
                    setSearch={setSearch}
                    category={category}
                    setCategory={setCategory}
                  />
                </div>
              </aside>

              {/* Contenu Principal */}
              <main className="lg:w-3/4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                  <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                      Services disponibles
                    </h1>
                    <p className="text-gray-500 mt-1 font-semibold">
                      <span className="text-blue-600">
                        {processedServices.length}
                      </span>{" "}
                      prestataires trouvés
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                    <span className="text-[11px] text-gray-400 font-black uppercase pl-2">
                      Trier par
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="bg-transparent text-sm font-bold text-gray-700 outline-none cursor-pointer pr-2"
                    >
                      <option value="recommanded">Recommandés</option>
                      <option value="price-asc">Prix croissant</option>
                      <option value="rating-desc">Mieux notés</option>
                    </select>
                  </div>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="h-[420px] bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col gap-4 animate-pulse"
                      >
                        <div className="w-full h-48 bg-gray-100 rounded-2xl" />
                        <div className="h-6 w-3/4 bg-gray-100 rounded-lg" />
                        <div className="h-4 w-1/2 bg-gray-100 rounded-lg" />
                        <div className="mt-auto h-12 w-full bg-gray-100 rounded-xl" />
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="bg-red-50 p-8 rounded-[2rem] text-red-600 border border-red-100 text-center font-bold">
                    {error}
                  </div>
                ) : processedServices.length === 0 ? (
                  <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 shadow-sm">
                    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                      🔍
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Aucun résultat
                    </h3>
                    <p className="text-gray-400 max-w-xs mx-auto font-medium">
                      Modifiez vos filtres pour trouver ce que vous cherchez.
                    </p>
                    <button
                      onClick={() => {
                        setSearch("");
                        setCategory("");
                      }}
                      className="mt-6 text-blue-600 font-bold hover:underline"
                    >
                      Réinitialiser
                    </button>
                  </div>
                ) : (
                  <ListServices
                    services={processedServices}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                )}
              </main>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
