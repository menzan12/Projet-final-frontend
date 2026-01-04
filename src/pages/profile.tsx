import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  ShieldCheck,
  Save,
} from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    avatar: "",
    membership: "",
    verified: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profil sauvegardé:", user);
    setIsEditing(false);
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-50 shadow-sm text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img
                  src={user.avatar}
                  className="w-full h-full rounded-[2.5rem] object-cover border-4 border-blue-50"
                  alt="Avatar"
                />
                <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-3 rounded-2xl shadow-lg border-4 border-white hover:scale-110 transition-transform">
                  <Camera size={18} />
                </button>
              </div>
              <h2 className="text-2xl font-black text-gray-900 leading-none">
                {user.fullName}
              </h2>
              <p className="text-blue-600 font-black text-[10px] uppercase tracking-widest mt-2">
                Membre {user.membership}
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

              <form className="space-y-6">
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
                        disabled={!isEditing}
                        value={user.fullName}
                        onChange={(e) =>
                          setUser({ ...user, fullName: e.target.value })
                        }
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 focus:ring-2 focus:ring-blue-100 outline-none transition-all disabled:opacity-60"
                      />
                    </div>
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
                      disabled={!isEditing}
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 focus:ring-2 focus:ring-blue-100 outline-none transition-all disabled:opacity-60"
                    />
                  </div>
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
                      className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 focus:ring-2 focus:ring-blue-100 outline-none transition-all disabled:opacity-60"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-6">
                    <button
                      onClick={handleSave}
                      className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                    >
                      <Save size={20} /> Enregistrer les modifications
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
