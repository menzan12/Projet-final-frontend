import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-600 to-orange-500 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 text-center w-full max-w-md animate-fade-in">
        {/* Icône */}
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-12 w-12 sm:h-16 sm:w-16 text-orange-500" />
        </div>

        {/* Titre */}
        <h1 className="mb-4 text-5xl sm:text-6xl font-bold text-blue-600">
          404
        </h1>
        <p className="mb-4 text-base sm:text-lg font-bold text-gray-700">
          Oups! La page que vous cherchez n’existe pas.
        </p>

        {/* Bouton retour */}
        <Link
          to="/"
          className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-orange-500 text-white hover:shadow-lg hover:-translate-y-1 transition-transform"
        >
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
