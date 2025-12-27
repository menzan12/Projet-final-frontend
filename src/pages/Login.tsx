import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../hooks/useAuth";
import { AlertCircle, Briefcase, Lock, Mail, Eye, EyeOff } from "lucide-react";

const Login: React.FC = () => {
  // États pour les champs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // États pour l'UI
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      login(data.user);

      // Redirection intelligente selon le rôle
      const routes: Record<string, string> = {
        admin: "/admin",
        vendor: "/vendor",
        client: "/",
      };

      navigate(routes[data.user.role] || "/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Identifiants incorrects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-blue-100">
      {/* Partie gauche : Formulaire */}
      <div className="flex-1 flex items-center justify-center px-6 bg-white">
        <div className="w-full max-w-md space-y-8 ">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                SkillMarket
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900">Bienvenue</h2>
            <p className="text-sm text-gray-600 mt-2">
              Connectez-vous pour accéder à votre compte
            </p>
          </div>

          {/* Alert d'erreur */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex gap-3 animate-in fade-in duration-300">
              <AlertCircle className="text-red-500 shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
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

            {/* Password */}
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

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center"
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

      {/* Partie droite : Visuel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        {/* Image de fond */}
        <img
          src="/image/serviceLogin.jpg"
          alt="Service"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Contenu texte */}
        <div className="relative z-10 flex items-center justify-center p-12 text-white">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold leading-tight">
              Trouvez & proposez des services en toute simplicité
            </h2>

            <p className="mt-6 font-bold text-lg text-white/90">
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
