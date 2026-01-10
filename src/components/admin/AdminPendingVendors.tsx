import React, { useEffect, useState } from "react";
import { UserPlus, Layers, Megaphone, Check, X, Loader2 } from "lucide-react";
import api from "../../api/axios";
import { ToastSucces, ToastError, ToastInfo } from "../../utils/toastConfig";

interface PendingVendor {
  _id: string;
  name: string;
  vendorCategory: string;
  address: string;
  createdAt: string;
}

const AdminPendingVendors: React.FC = () => {
  const [vendors, setVendors] = useState<PendingVendor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingVendors = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/pending-vendors");
      setVendors(res.data);
    } catch (err) {
      ToastError("Impossible de charger les dossiers en attente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingVendors();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await api.patch(`/admin/approve-vendor/${id}`);
      setVendors(vendors.filter((v) => v._id !== id));
      ToastSucces("Vendeur approuvé avec succès ! 🚀");
    } catch (err) {
      ToastError("Erreur lors de la validation du vendeur.");
    }
  };

  const handleReject = async (id: string) => {
    if (window.confirm("Voulez-vous vraiment refuser ce dossier ?")) {
      try {
        await api.put(`/admin/reject-vendor/${id}`);
        setVendors(vendors.filter((v) => v._id !== id));
        ToastInfo("Dossier refusé.");
      } catch (err) {
        ToastError("Erreur lors du refus du dossier.");
      }
    }
  };

  return (
    <div className="xl:col-span-4 space-y-8 animate-fade-in">
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-50">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Vendeurs à valider
          </h3>
          <span className="bg-red-500 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full animate-pulse">
            {vendors.length}
          </span>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-blue-600" />
            </div>
          ) : vendors.length > 0 ? (
            vendors.map((v) => (
              <div
                key={v._id}
                className="group p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                    {v.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      {v.name}
                      <span className="text-[10px] text-slate-400 float-right font-medium">
                        {new Date(v.createdAt).toLocaleDateString()}
                      </span>
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      {v.vendorCategory} • {v.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleApprove(v._id)}
                    className="flex-1 py-2.5 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Check size={14} /> Accepter
                  </button>
                  <button
                    onClick={() => handleReject(v._id)}
                    className="flex-1 py-2.5 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center gap-2"
                  >
                    <X size={14} /> Refuser
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                Aucune demande
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-[2rem] shadow-xl text-white">
        <h3 className="text-lg font-bold mb-1">Actions Rapides</h3>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6">
          Gestion système
        </p>
        <div className="space-y-3">
          <QuickActionBtn icon={UserPlus} label="Inviter un utilisateur" />
          <QuickActionBtn icon={Layers} label="Catégories" />
          <QuickActionBtn icon={Megaphone} label="Annonce globale" />
        </div>
      </div>
    </div>
  );
};

const QuickActionBtn = ({ icon: Icon, label }: any) => (
  <button className="w-full flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest">
    <Icon size={18} className="text-blue-400" /> {label}
  </button>
);

export default AdminPendingVendors;
