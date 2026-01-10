import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Ghost } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden px-4">
      {/* Éléments de fond décoratifs pour la cohérence avec le Hero */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-orange-50 rounded-full blur-[100px] opacity-60" />

      <div className="relative z-10 text-center max-w-2xl animate-in fade-in zoom-in duration-500">
        {/* Illustration Iconographique */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50 animate-pulse" />
          <div className="relative bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-blue-100 border border-blue-50">
            <Ghost className="h-20 w-20 text-blue-600 animate-bounce" />
          </div>
        </div>

        {/* Texte 404 */}
        <h1 className="text-[8rem] sm:text-[12rem] font-black leading-none mb-4 bg-gradient-to-b from-blue-600 to-blue-800 bg-clip-text text-transparent opacity-10 select-none">
          404
        </h1>

        <div className="mt-[-4rem] sm:mt-[-6rem]">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Page introuvable
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto font-medium">
            Il semble que le service ou la page que vous recherchez ait déménagé
            ou n'existe plus. Pas d'inquiétude, nos experts sont toujours là
            pour vous !
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all"
            >
              <Home className="w-5 h-5" />
              Retour à l’accueil
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gray-50 text-gray-700 font-bold text-lg hover:bg-gray-100 transition-all border border-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
              Page précédente
            </button>
          </div>
        </div>

        {/* Aide supplémentaire */}
        <p className="mt-12 text-sm text-gray-400 font-medium">
          Besoin d'aide ?{" "}
          <Link to="/contact" className="text-blue-600 hover:underline">
            Contactez notre support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
