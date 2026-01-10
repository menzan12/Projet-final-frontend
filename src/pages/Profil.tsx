import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  ShieldCheck,
  Save,
  Loader2,
} from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";
import Navbar from "../Components/Navbar";

export default function Profil() {
  const { user: authUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // État local initialisé avec les données de l'AuthStore
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    avatar: "",
  });

  // Synchroniser les données quand le user est chargé
  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.name || "",
        phone: authUser.phone || "",
        email: authUser.email || "",
        address:
          typeof authUser.address === "object"
            ? `${authUser.address.street}, ${authUser.address.city}`
            : authUser.address || "",
        avatar: authUser.avatar || "",
      });
    }
  }, [authUser]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulation ou appel API réel
      // await api.put("/users/profile", formData);
      console.log("Données envoyées:", formData);
      setIsEditing(false);
      // Optionnel : afficher un toast de succès ici
    } catch (error) {
      console.error("Erreur lors de la sauvegarde", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      <Navbar />
      <div className="p-6 lg:p-12 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Mon Profil
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Gérez vos informations personnelles et vos préférences.
            </p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-6 py-3 rounded-2xl font-black text-sm transition-all flex items-center gap-2 border-2 ${
              isEditing
                ? "bg-red-50 border-red-100 text-red-600 hover:bg-red-100"
                : "bg-white border-gray-100 text-gray-600 hover:bg-gray-50 shadow-sm"
            }`}
          >
            {isEditing ? "Annuler" : "Modifier le profil"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- COLONNE GAUCHE : AVATAR --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-50 shadow-sm text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img
                  src={
                    formData.avatar ||
                    `https://ui-avatars.com/api/?name=${formData.fullName}&background=0D8ABC&color=fff`
                  }
                  className="w-full h-full rounded-[2.5rem] object-cover border-4 border-blue-50 shadow-inner"
                  alt="Avatar"
                />
                {isEditing && (
                  <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-3 rounded-2xl shadow-lg border-4 border-white hover:scale-110 transition-transform">
                    <Camera size={18} />
                  </button>
                )}
              </div>
              <h2 className="text-2xl font-black text-gray-900 leading-tight">
                {formData.fullName || "Utilisateur"}
              </h2>
              <p className="text-blue-600 font-black text-[10px] uppercase tracking-widest mt-2">
                Membre {authUser?.role || "Client"}
              </p>

              {authUser?.verified !== false && (
                <div className="mt-8 pt-8 border-t border-gray-50">
                  <div className="flex items-center justify-center gap-3 text-sm font-bold text-green-600 bg-green-50 p-4 rounded-2xl">
                    <ShieldCheck size={20} />
                    Compte Vérifié
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* --- COLONNE DROITE : FORMULAIRE --- */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] p-6 lg:p-10 border border-gray-50 shadow-sm">
              <h3 className="text-xl font-black text-gray-900 mb-8">
                Informations Personnelles
              </h3>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nom complet */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                      Nom complet
                    </label>
                    <div className="relative group">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors"
                        size={18}
                      />
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 focus:bg-white focus:border-blue-100 outline-none transition-all disabled:opacity-60"
                        placeholder="Jean Dupont"
                      />
                    </div>
                  </div>

                  {/* Téléphone */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                      Téléphone
                    </label>
                    <div className="relative group">
                      <Phone
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors"
                        size={18}
                      />
                      <input
                        type="tel"
                        disabled={!isEditing}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 focus:bg-white focus:border-blue-100 outline-none transition-all disabled:opacity-60"
                        placeholder="+33 6 00 00 00 00"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                    Adresse Email
                  </label>
                  <div className="relative group">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors"
                      size={18}
                    />
                    <input
                      type="email"
                      disabled={!isEditing}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 focus:bg-white focus:border-blue-100 outline-none transition-all disabled:opacity-60"
                      placeholder="nom@exemple.com"
                    />
                  </div>
                </div>

                {/* Adresse */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                    Adresse de résidence
                  </label>
                  <div className="relative group">
                    <MapPin
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors"
                      size={18}
                    />
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 focus:bg-white focus:border-blue-100 outline-none transition-all disabled:opacity-60"
                      placeholder="123 Rue de la Paix, Paris"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-6 animate-in slide-in-from-top-2 duration-300">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <Save size={20} />
                      )}
                      Enregistrer les modifications
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
