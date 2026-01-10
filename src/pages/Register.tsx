import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Search,
  User,
  ShieldCheck,
} from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";
import type { UserRole } from "../types";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client" as UserRole,
    adminSecret: "",
  });

  const [message, setMessage] = useState("");
  // MODIFICATION : Utilisation du loading du store
  const register = useAuthStore((state) => state.register);
  const loading = useAuthStore((state) => state.loading);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      // MODIFICATION : Appel de la fonction register du store Zustand
      // On passe l'objet formData complet qui contient maintenant le rôle et potentiellement le secret
      await register(formData as any);

      setMessage(
        "Inscription réussie ! Vérifie tes emails pour valider ton compte."
      );
      // Redirection après un court délai pour laisser lire le message
      setTimeout(() => navigate("/login"), 3000);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Erreur lors de l'inscription"
      );
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-orange-100 overflow-hidden">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row">
        {/* Gauche : Formulaire */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto max-h-screen">
          <div className="w-full max-w-md space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <img src="/image/Logo.png" alt="Image Logo" />
              </div>
              <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                SkillMarket
              </span>
            </div>

            <h2 className="text-2xl font-bold">Créer un compte</h2>

            {message && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  message.includes("réussie")
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Rôles */}
              <div>
                <p className="text-xs uppercase font-bold text-gray-500 mb-3 text-center sm:text-left">
                  Type de compte
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "client" })}
                    className={`flex items-center justify-center gap-1 p-2 rounded-lg border-2 text-xs font-bold transition-all ${
                      formData.role === "client"
                        ? "border-orange-600 bg-blue-50 text-orange-600"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    <Search className="w-3 h-3" />
                    Client
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "vendor" })}
                    className={`flex items-center justify-center gap-1 p-2 rounded-lg border-2 text-xs font-bold transition-all ${
                      formData.role === "vendor"
                        ? "border-orange-600 bg-blue-50 text-orange-600"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    <Briefcase className="w-3 h-3" />
                    Vendor
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "admin" })}
                    className={`flex items-center justify-center gap-1 p-2 rounded-lg border-2 text-xs font-bold transition-all ${
                      formData.role === "admin"
                        ? "border-red-600 bg-red-50 text-red-600"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    <ShieldCheck className="w-3 h-3" />
                    Admin
                  </button>
                </div>
              </div>

              {/* Nom */}
              <div>
                <label className="text-sm font-bold text-gray-600">
                  Nom complet
                </label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 text-gray-400" />
                  <input
                    required
                    placeholder="Menzan Abdoul"
                    className="w-full pl-10 py-3 border border-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-bold text-gray-600">
                  Adresse email
                </label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    placeholder="email@example.com"
                    required
                    className="w-full pl-10 py-3 border border-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Champ Secret Admin */}
              {formData.role === "admin" && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="text-sm font-bold text-red-600 italic">
                    Code secret Administrateur
                  </label>
                  <div className="relative mt-1">
                    <ShieldCheck className="absolute left-3 top-3 text-red-400" />
                    <input
                      type="password"
                      placeholder="Entrez le code de sécurité"
                      required
                      className="w-full pl-10 py-3 border border-red-300 bg-red-50 rounded-lg outline-none focus:ring-2 focus:ring-red-400 transition-all"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          adminSecret: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              {/* Mot de passe */}
              <div>
                <label className="text-sm font-bold text-gray-600">
                  Mot de passe
                </label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-white rounded-lg font-bold transition-colors ${
                  formData.role === "admin"
                    ? "bg-red-600 hover:bg-red-700 disabled:bg-red-300"
                    : "bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300"
                }`}
              >
                {loading ? "Création..." : "Créer un compte"}
              </button>

              <p className="text-center font-bold text-sm text-gray-600">
                Déjà inscrit ?{" "}
                <Link
                  to="/login"
                  className="text-orange-600 font-medium hover:underline"
                >
                  Se connecter
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Droite : Image */}
        <div className="flex-1 relative hidden lg:block">
          <img
            src="/image/serviceRegister.jpg"
            alt="Service"
            className="w-full h-full object-cover shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
