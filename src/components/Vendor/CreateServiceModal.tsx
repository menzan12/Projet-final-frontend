import React, { useState } from "react";
import {
  Plus,
  X,
  Save,
  Building2,
  MapPin,
  Tag,
  Coins,
  AlignLeft,
} from "lucide-react";
import api from "../../api/axios";

interface CreateServiceModalProps {
  onServiceCreated: () => void;
}

const CreateServiceModal: React.FC<CreateServiceModalProps> = ({
  onServiceCreated,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
    city: "",
    provider: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category.trim()) {
      alert("Veuillez saisir une catégorie");
      return;
    }

    setLoading(true);
    try {
      // Envoi vers le backend (qui créera la catégorie dynamiquement si elle n'existe pas)
      await api.post("/services/create", formData);

      // Reset du formulaire
      setFormData({
        title: "",
        description: "",
        category: "",
        price: 0,
        city: "",
        provider: "",
      });

      // Fermeture du modal
      const modal = document.getElementById(
        "create_service_modal"
      ) as HTMLDialogElement;
      if (modal) modal.close();

      // Notification du parent pour rafraîchir la liste
      onServiceCreated();
    } catch (error: any) {
      console.error("Erreur création service:", error);
      alert(
        error.response?.data?.message || "Erreur lors de la création du service"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BOUTON DÉCLENCHEUR */}
      <button
        className="group flex items-center justify-center gap-2 bg-gradient-to-br from-blue-700 via-blue-600 to-orange-500 text-white px-7 py-3.5 rounded-2xl font-bold transition-all duration-300 hover:shadow-[0_8px_25px_-5px_rgba(59,130,246,0.5)] active:scale-95 shadow-lg"
        onClick={() =>
          (
            document.getElementById("create_service_modal") as HTMLDialogElement
          ).showModal()
        }
      >
        <Plus
          size={20}
          className="group-hover:rotate-90 transition-transform duration-300"
        />
        Créer un nouveau service
      </button>

      {/* MODAL DAISYUI */}
      <dialog
        id="create_service_modal"
        className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
      >
        <div className="modal-box max-w-2xl bg-white rounded-[2rem] p-0 overflow-hidden shadow-2xl border border-slate-100">
          {/* Header */}
          <div className="flex justify-between items-center p-6 bg-slate-50 border-b border-slate-100">
            <div>
              <h3 className="font-black text-2xl uppercase tracking-tighter bg-gradient-to-r from-blue-700 to-orange-600 bg-clip-text text-transparent">
                Nouveau Service
              </h3>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">
                Zone Vendeur • FCFA
              </p>
            </div>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost text-slate-400 hover:rotate-90 transition-all">
                <X size={22} />
              </button>
            </form>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Titre du service */}
              <div className="form-control">
                <label className="label text-xs font-black text-slate-500 uppercase px-1">
                  Nom du service
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: Maintenance Climatisation"
                  className="input input-bordered w-full bg-slate-50 border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 transition-all rounded-xl font-medium"
                />
              </div>

              {/* Catégorie (Input Libre) */}
              <div className="form-control">
                <label className="label text-xs font-black text-slate-500 uppercase px-1">
                  Catégorie
                </label>
                <div className="relative">
                  <Tag
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Ex: Informatique, Sport..."
                    className="input input-bordered w-full pl-10 bg-slate-50 border-slate-200 focus:border-orange-400 transition-all rounded-xl"
                  />
                </div>
              </div>

              {/* Prix en FCFA */}
              <div className="form-control">
                <label className="label text-xs font-black text-slate-500 uppercase px-1 text-orange-600">
                  Prix (FCFA)
                </label>
                <div className="relative">
                  <Coins
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="number"
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0"
                    className="input input-bordered w-full pl-10 pr-12 bg-slate-50 border-slate-200 focus:border-orange-400 rounded-xl font-bold text-lg"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">
                    CFA
                  </span>
                </div>
              </div>

              {/* Ville */}
              <div className="form-control">
                <label className="label text-xs font-black text-slate-500 uppercase px-1">
                  Ville
                </label>
                <div className="relative">
                  <MapPin
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Abidjan, Dakar..."
                    className="input input-bordered w-full pl-10 bg-slate-50 border-slate-200 focus:border-orange-400 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Prestataire */}
            <div className="form-control">
              <label className="label text-xs font-black text-slate-500 uppercase px-1">
                Nom de l'établissement
              </label>
              <div className="relative">
                <Building2
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  name="provider"
                  required
                  value={formData.provider}
                  onChange={handleChange}
                  placeholder="Nom de votre entreprise ou votre nom"
                  className="input input-bordered w-full pl-10 bg-slate-50 border-slate-200 focus:border-orange-400 rounded-xl"
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label text-xs font-black text-slate-500 uppercase px-1">
                Description détaillée
              </label>
              <div className="relative">
                <AlignLeft
                  size={16}
                  className="absolute left-4 top-3 text-slate-400"
                />
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full pl-10 h-28 bg-slate-50 border-slate-200 focus:border-orange-400 rounded-xl text-base"
                  placeholder="Décrivez les avantages de votre service..."
                ></textarea>
              </div>
            </div>

            {/* Bouton de validation */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-block h-14 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white border-none rounded-2xl text-base font-black shadow-xl shadow-blue-200 transition-all duration-300 disabled:bg-slate-200"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <div className="flex items-center gap-2 uppercase tracking-widest">
                    <Save size={20} />
                    Enregistrer le service
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Backdrop pour fermer en cliquant à côté */}
        <form method="dialog" className="modal-backdrop bg-slate-900/40">
          <button>Fermer</button>
        </form>
      </dialog>
    </>
  );
};

export default CreateServiceModal;
