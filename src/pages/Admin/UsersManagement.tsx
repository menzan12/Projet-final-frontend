import { useEffect, useState, useCallback, useRef } from "react";
import {
  Users,
  Store,
  Mail,
  Calendar,
  Package,
  ChevronRight,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import Sidebar from "../../Components/Sidebar";
import HeaderAdmin from "../../Components/admin/HeaderAdmin";
import api from "../../api/axios";

type Role = "client" | "vendor";

interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  city?: string;
  avatar?: string;
  bookings?: any[];
  services?: any[];
}

export default function UsersManagement() {
  const [activeTab, setActiveTab] = useState<Role>("client");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewingDetail, setViewingDetail] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  // RÉSOLUTION DU BUG : Ref pour bloquer les appels en boucle
  const hasFetched = useRef(false);

  // 1. Récupération des utilisateurs stabilisée
  const fetchUsers = useCallback(
    async (searchQuery: string = "") => {
      if (!searchQuery && users.length === 0) setLoading(true);
      try {
        const endpoint = searchQuery
          ? `/admin/users?search=${searchQuery}`
          : "/admin/users";
        const res = await api.get(endpoint);
        setUsers(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs", err);
      } finally {
        setLoading(false);
      }
    },
    [users.length]
  );

  useEffect(() => {
    if (!hasFetched.current) {
      fetchUsers();
      hasFetched.current = true;
    }
  }, [fetchUsers]);

  // 2. Récupération des détails (Services/Bookings) au clic
  const openUserDetail = async (user: User) => {
    setDetailLoading(true);
    try {
      const res = await api.get(`/admin/users/${user._id}/full-profile`);
      setSelectedUser(res.data);
      setViewingDetail(true);
    } catch (err) {
      console.error("Erreur détails", err);
    } finally {
      setDetailLoading(false);
    }
  };

  const filteredUsers = users.filter((u) => u.role === activeTab);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <div className="p-4 lg:p-8 max-w-[1400px] mx-auto space-y-8">
          <HeaderAdmin onSearch={(query) => fetchUsers(query)} />

          {!viewingDetail ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                    Communauté
                  </h1>
                  <p className="text-slate-500 font-medium">
                    Gérez vos {activeTab}s inscrits sur la plateforme
                  </p>
                </div>

                <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm w-fit">
                  <button
                    onClick={() => setActiveTab("client")}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      activeTab === "client"
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : "text-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    <Users size={18} /> Clients
                  </button>
                  <button
                    onClick={() => setActiveTab("vendor")}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      activeTab === "vendor"
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : "text-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    <Store size={18} /> Prestataires
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-300">
                  <Loader2 className="animate-spin mb-4" size={40} />
                  <p className="font-bold uppercase text-[10px] tracking-widest text-slate-400">
                    Chargement des données...
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <div
                        key={user._id}
                        onClick={() => openUserDetail(user)}
                        className="bg-white p-6 rounded-[2.5rem] border border-slate-100 hover:ring-2 hover:ring-blue-400 hover:ring-inset hover:shadow-2xl hover:shadow-blue-100/40 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-xl font-black text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                                {user.name}
                              </h3>
                              <p className="text-slate-400 text-xs font-medium italic">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          {detailLoading && selectedUser?._id === user._id ? (
                            <Loader2
                              className="animate-spin text-blue-500"
                              size={20}
                            />
                          ) : (
                            <ChevronRight
                              className="text-slate-200 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
                              size={20}
                            />
                          )}
                        </div>

                        <div className="mt-6 flex items-center gap-4 pt-4 border-t border-slate-50">
                          <div className="text-[10px] font-black uppercase text-slate-400">
                            Membre depuis :{" "}
                            <span className="text-slate-900">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                      <p className="text-slate-400 font-bold italic">
                        Aucun utilisateur trouvé
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* VUE DÉTAILLÉE DU PROFIL (STYLE INITIAL RESTAURÉ) */
            <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
              <button
                onClick={() => setViewingDetail(false)}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-sm uppercase tracking-widest transition-colors group"
              >
                <ArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Retour à la liste
              </button>

              <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      selectedUser?.role === "vendor"
                        ? "bg-purple-50 text-purple-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    Compte {selectedUser?.role}
                  </span>
                </div>

                <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-5xl font-black text-white shadow-2xl shadow-blue-200">
                  {selectedUser?.name.charAt(0)}
                </div>

                <div className="text-center md:text-left space-y-3">
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                      {selectedUser?.name}
                    </h2>
                    <ShieldCheck className="text-blue-500" />
                  </div>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start text-slate-400 font-medium text-sm">
                    <span className="flex items-center gap-1">
                      <Mail size={14} /> {selectedUser?.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />{" "}
                      {selectedUser?.city || "Non spécifié"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {selectedUser?.role === "vendor" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="flex items-center gap-2 text-xl font-black text-slate-900 italic">
                        <Package className="text-purple-500" /> Services
                        proposés
                      </h3>
                      <span className="bg-slate-100 px-3 py-1 rounded-lg text-xs font-bold text-slate-500">
                        {selectedUser.services?.length || 0} services
                      </span>
                    </div>
                    <div className="grid gap-4">
                      {selectedUser.services?.map((service: any) => (
                        <div
                          key={service._id}
                          className="bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-md transition-all flex justify-between items-center group"
                        >
                          <div>
                            <p className="font-bold text-slate-900">
                              {service.title}
                            </p>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter mt-1">
                              {service.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-black text-blue-600">
                              {service.price}€
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className={`space-y-6 ${
                    selectedUser?.role === "client" ? "lg:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-xl font-black text-slate-900 italic">
                      <Calendar className="text-orange-500" /> Historique des
                      activités
                    </h3>
                  </div>
                  <div
                    className={`grid gap-4 ${
                      selectedUser?.role === "client"
                        ? "md:grid-cols-2"
                        : "grid-cols-1"
                    }`}
                  >
                    {selectedUser?.bookings?.length ? (
                      selectedUser.bookings.map((booking: any) => (
                        <div
                          key={booking._id}
                          className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-orange-200 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
                              <Calendar size={20} />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 leading-tight">
                                {booking.serviceName}
                              </p>
                              <p className="text-[10px] text-slate-400 font-black uppercase mt-1">
                                {new Date(booking.date).toLocaleDateString(
                                  "fr-FR",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span
                              className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                booking.status === "confirmed"
                                  ? "bg-green-50 text-green-600"
                                  : "bg-slate-100 text-slate-400"
                              }`}
                            >
                              {booking.status}
                            </span>
                            <p className="text-sm font-black text-slate-900 mt-2">
                              {booking.totalPrice}€
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400 italic text-sm">
                        Aucune activité enregistrée.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
