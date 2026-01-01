import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  ShieldCheck,
  Save,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
    role: "client",
    verified: true,
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError("");

      // Appel à votre API pour récupérer les infos de l'utilisateur connecté
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        credentials: "include", // Important pour envoyer le cookie
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Vous devez être connecté pour voir cette page");
          return;
        }
        throw new Error("Erreur lors du chargement du profil");
      }

      const data = await response.json();

      // Essayer de récupérer les données supplémentaires depuis le storage
      try {
        const savedData = await window.storage.get(`user_profile_${data.id}`);
        if (savedData && savedData.value) {
          const extraData = JSON.parse(savedData.value);
          setUser({
            ...data,
            phone: extraData.phone || "",
            address: extraData.address || "",
            avatar:
              extraData.avatar ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
          });
        } else {
          setUser({
            ...data,
            phone: "",
            address: "",
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
          });
        }
      } catch (storageError) {
        // Si pas de données supplémentaires, utiliser uniquement les données de l'API
        setUser({
          ...data,
          phone: "",
          address: "",
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
        });
      }
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
      setError("Impossible de charger le profil. Veuillez vous reconnecter.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      // Sauvegarder les données supplémentaires (téléphone, adresse, avatar) dans le storage
      const extraData = {
        phone: user.phone,
        address: user.address,
        avatar: user.avatar,
      };

      await window.storage.set(
        `user_profile_${user.id}`,
        JSON.stringify(extraData)
      );

      console.log("Profil sauvegardé avec succès");
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      setError("Erreur lors de la sauvegarde du profil");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = async () => {
    const seed = Math.random().toString(36).substring(7);
    const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

    const updatedUser = { ...user, avatar: newAvatar };
    setUser(updatedUser);

    try {
      const extraData = {
        phone: updatedUser.phone,
        address: updatedUser.address,
        avatar: newAvatar,
      };
      await window.storage.set(
        `user_profile_${user.id}`,
        JSON.stringify(extraData)
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'avatar:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-500 font-bold">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (error && !user.id) {
    return (
      <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-lg">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-gray-900 mb-2">Erreur</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/login"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all"
          >
            Se connecter
          </a>
        </div>
      </div>
    );
  }

  const getRoleBadge = (role) => {
    const badges = {
      admin: { text: "ADMINISTRATEUR", color: "text-purple-600" },
      vendor: { text: "VENDEUR", color: "text-green-600" },
      client: { text: "CLIENT", color: "text-blue-600" },
    };
    return badges[role] || badges.client;
  };

  const roleBadge = getRoleBadge(user.role);

  return (
    <div className="min-h-screen bg-[#F4F7FA] p-6 lg:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-10">
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
            className="bg-white border-2 border-gray-100 px-6 py-3 rounded-2xl font-black text-sm text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            {isEditing ? "Annuler" : "Modifier le profil"}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="text-red-600" size={20} />
            <p className="text-red-800 font-bold">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-50 shadow-sm text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img
                  src={user.avatar}
                  className="w-full h-full rounded-[2.5rem] object-cover border-4 border-blue-50"
                  alt="Avatar"
                />
                <button
                  onClick={handleAvatarChange}
                  className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-3 rounded-2xl shadow-lg border-4 border-white hover:scale-110 transition-transform"
                >
                  <Camera size={18} />
                </button>
              </div>
              <h2 className="text-2xl font-black text-gray-900 leading-none">
                {user.name}
              </h2>
              <p
                className={`${roleBadge.color} font-black text-[10px] uppercase tracking-widest mt-2`}
              >
                {roleBadge.text}
              </p>

              {user.verified && (
                <div className="mt-8 pt-8 border-t border-gray-50 space-y-3">
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-500 bg-gray-50 p-4 rounded-2xl">
                    <ShieldCheck className="text-green-500" size={20} />
                    Compte Vérifié
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-50 shadow-sm">
              <h3 className="text-xl font-black text-gray-900 mb-8">
                Informations Personnelles
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                      Nom complet
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                        size={18}
                      />
                      <input
                        type="text"
                        disabled={true}
                        value={user.name}
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 outline-none opacity-60"
                      />
                    </div>
                    <p className="text-xs text-gray-400 ml-1">
                      Ce champ ne peut pas être modifié
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                      Téléphone
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                        size={18}
                      />
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={user.phone}
                        onChange={(e) =>
                          setUser({ ...user, phone: e.target.value })
                        }
                        placeholder="+225 XX XX XX XX XX"
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 focus:ring-2 focus:ring-blue-100 outline-none transition-all disabled:opacity-60"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                    Adresse Email
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                      size={18}
                    />
                    <input
                      type="email"
                      disabled={true}
                      value={user.email}
                      className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 outline-none opacity-60"
                    />
                  </div>
                  <p className="text-xs text-gray-400 ml-1">
                    Ce champ ne peut pas être modifié
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                    Adresse de résidence
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                      size={18}
                    />
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={user.address}
                      onChange={(e) =>
                        setUser({ ...user, address: e.target.value })
                      }
                      placeholder="Votre adresse complète"
                      className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 focus:ring-2 focus:ring-blue-100 outline-none transition-all disabled:opacity-60"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-6">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {saving ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Enregistrement...
                        </>
                      ) : (
                        <>
                          <Save size={20} />
                          Enregistrer les modifications
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
