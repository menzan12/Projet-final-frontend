import { useEffect, useState } from "react";
import type { Service } from "../../types";
import Navbar from "../../components/Navbar";
import api from "../../api/axios";
import ServicesFilters from "../../components/servcices/ServicesFilters";
import ServicesList from "../../components/servcices/ServicesList";
import Breadcrumbs from "../../components/ServiceBooking/Breadcrumbs";

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<
    { name: string; count: number }[]
  >([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // On lance les deux requêtes en parallèle avec Axios
        // On retire le "/api" car il est déjà dans la baseURL de ton instance
        const [servicesRes, categoriesRes] = await Promise.all([
          api.get<Service[]>("/services"),
          api.get<{ name: string; count: number }[]>("/services/categories"),
        ]);

        setServices(servicesRes.data);
        setCategories(categoriesRes.data);
      } catch (err: any) {
        console.error("Erreur de chargement:", err);
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

  // Filtrage intelligent : gère la casse et les valeurs vides
  const filteredServices = services.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase());

    // Si une catégorie est sélectionnée, on compare (insensible à la casse)
    const matchesCategory = category
      ? s.category.toLowerCase() === category.toLowerCase()
      : true;

    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-6">
          <Breadcrumbs />
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar Filters - On passe maintenant 'categories' */}
            <div className="lg:w-1/4">
              <ServicesFilters
                categories={categories}
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
              />
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900">
                    Services disponibles
                  </h1>
                  <p className="text-gray-500 mt-1 font-medium">
                    {filteredServices.length} résultats trouvés
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-400 font-bold uppercase">
                    Trier par:
                  </span>
                  <select className="bg-white border-gray-200 rounded-xl text-sm font-bold p-2 outline-none shadow-sm cursor-pointer border hover:border-blue-300 transition-colors">
                    <option>Recommandés</option>
                    <option>Prix croissant</option>
                    <option>Mieux notés</option>
                  </select>
                </div>
              </div>

              {loading ? (
                /* Skeleton Loader pendant le chargement */
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-96 bg-gray-200 animate-pulse rounded-2xl"
                    />
                  ))}
                </div>
              ) : error ? (
                <div className="bg-red-50 p-6 rounded-2xl text-red-600 border border-red-100 flex items-center justify-center">
                  {error}
                </div>
              ) : filteredServices.length === 0 ? (
                /* État vide */
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100 shadow-inner">
                  <p className="text-gray-400 font-bolt">
                    Aucun service ne correspond à vos critères.
                  </p>
                </div>
              ) : (
                /* Liste des services */
                <ServicesList
                  services={filteredServices}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              )}

              {/* Pagination (Design uniquement) */}
              {!loading && filteredServices.length > 0 && (
                <div className="mt-12 flex justify-center space-x-2">
                  <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200">
                    1
                  </button>
                  <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors">
                    2
                  </button>
                  <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors">
                    3
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
