import { useState } from "react";
import axios from "axios";

export default function AdminRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin", // On force le rôle admin ici
    adminSecret: "", // Le champ crucial
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      alert("Admin créé avec succès ! Vérifiez vos emails.");
    } catch (error: any) {
      alert(error.response?.data?.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Inscription Administrateur</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom"
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 border rounded"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {/* Champ Secret Admin */}
        <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
          <label className="block text-sm font-medium text-yellow-700">
            Code Secret Admin
          </label>
          <input
            type="password"
            placeholder="Entrez le code de sécurité"
            className="w-full p-2 border rounded mt-1"
            onChange={(e) =>
              setFormData({ ...formData, adminSecret: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
        >
          Créer le compte Admin
        </button>
      </form>
    </div>
  );
}
