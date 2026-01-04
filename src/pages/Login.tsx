import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AlertCircle, Lock, Mail, Eye, EyeOff } from "lucide-react";

const Login: React.FC = () => {
  // --- États (States) ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // --- Hooks ---
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // --- Configuration des redirections ---
  const roleRoutes: Record<string, string> = {
    admin: "/admin",
    vendor: "/vendorDash",
    client: "/",
  };

  /**
   * 1. Redirection automatique si l'utilisateur est déjà connecté.
   * Cela évite qu'un vendeur connecté puisse revenir sur la page Login.
   */
  useEffect(() => {
    if (user) {
      const target = roleRoutes[user.role] || "/";
      navigate(target);
    }
  }, [user, navigate]);

  /**
   * 2. Gestion de la soumission du formulaire
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Appel au service de connexion
      const loggedUser = await login(email, password);

      if (!loggedUser) {
        throw new Error(
          "Impossible de récupérer les informations de l'utilisateur."
        );
      }

      // Redirection immédiate après succès
      const targetPath = roleRoutes[loggedUser.role] || "/";
      console.log(
        `Connexion réussie (${loggedUser.role}). Direction : ${targetPath}`
      );
      navigate(targetPath);
    } catch (err: any) {
      console.error("Erreur de connexion:", err);
      setError(
        err.response?.data?.message ||
          "Identifiants incorrects ou problème de serveur."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-blue-100">
      {/* --- PARTIE GAUCHE : Formulaire --- */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-blue-200">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Logo et Header */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src="/image/Logo.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                SkillMarket
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900">Bienvenue</h2>
            <p className="text-sm font-medium text-gray-600 mt-2">
              Connectez-vous pour accéder à votre compte
            </p>
          </div>

          {/* Affichage de l'erreur */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex gap-3 animate-pulse">
              <AlertCircle className="text-red-500 shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Bouton de Connexion */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center shadow-md active:scale-95"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connexion...
                </span>
              ) : (
                "Se connecter"
              )}
            </button>

            <p className="text-center text-sm text-gray-600">
              Pas encore de compte ?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Créer un compte
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* --- PARTIE DROITE : Visuel --- */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <img
          src="/image/serviceLogin.jpg"
          alt="Service Illustration"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 shadow-inner"></div>
        <div className="relative z-10 flex items-center justify-center p-12 text-white">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold leading-tight">
              Trouvez & proposez des services en toute simplicité
            </h2>
            <p className="mt-6 text-lg text-white/90">
              Rejoignez notre communauté de professionnels et développez votre
              activité dès aujourd’hui.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
