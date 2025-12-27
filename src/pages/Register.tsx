import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Briefcase, Lock, Mail, Search, User } from "lucide-react";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/auth/register", formData);
      setMessage(
        "Inscription réussie ! Vérifie tes emails pour valider ton compte."
      );
      setTimeout(() => navigate("/login"), 3000);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Erreur lors de l'inscription"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 px-6">
      {/* ===== CARD PRINCIPALE ===== */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex">
        {/* ========= GAUCHE : FORMULAIRE ========= */}
        <div className="w-1/2 flex items-center justify-center p-10">
          <div className="w-full max-w-md space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <Briefcase className="text-white" />
              </div>
              <span className="text-xl font-bold">SkillMarket</span>
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
              {/* ROLE */}
              <div>
                <p className="text-xs uppercase font-bold text-gray-500 mb-3">
                  Je souhaite
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "client" })}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 ${
                      formData.role === "client"
                        ? "border-green-600 bg-blue-50 text-green-600"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    <Search className="w-4 h-4" />
                    Trouver un service
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "vendor" })}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 ${
                      formData.role === "vendor"
                        ? "border-green-600 bg-blue-50 text-green-600"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                    Proposer mes services
                  </button>
                </div>
              </div>

              {/* NAME */}
              <div>
                <label className="text-sm font-medium">Nom complet</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 text-gray-400" />
                  <input
                    required
                    placeholder="Menzan Abdoul"
                    className="w-full pl-10 py-3 border border-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-green-400
  focus:border-green-500
  transition-all duration-200"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    placeholder="email@example.com"
                    required
                    className="w-full pl-10 py-3 border border-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-green-400
  focus:border-green-500
  transition-all duration-200"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-medium">Mot de passe</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 py-3 border border-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-green-400
  focus:border-green-500
  transition-all duration-200"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
              >
                {loading ? "Création..." : "Créer un compte"}
              </button>

              <p className="text-center text-sm">
                Déjà inscrit ?{" "}
                <Link to="/login" className="text-green-600 font-medium">
                  Se connecter
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* IMAGE  */}
        <div className="w-1/2 relative hidden lg:block">
          <img
            src="/image/serviceRegister.jpg"
            alt="Service"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-900/20"></div>
        </div>
      </div>
    </div>
  );
};
export default Register;
