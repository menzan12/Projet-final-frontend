import React, { useState, useRef, useEffect } from "react";
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IKUpload, IKContext } from "imagekitio-react";
import axios from "axios";
import ServiceDetailsForm from "../../components/Vendor/DetailsForm";
import ServiceScheduleForm from "../../components/Vendor/ScheduleForm";

// Type pour les créneaux horaires
interface TimeSlot {
  start: string;
  end: string;
}

// Type pour les jours de la semaine
interface DaySchedule {
  day: string;
  active: boolean;
  slots: TimeSlot[];
}

export default function CreateService() {
  const navigate = useNavigate();
  const ikUploadRef = useRef<any>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // État pour stocker les URLs ImageKit
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    city: "",
    address: "",
  });

  const [schedule, setSchedule] = useState<DaySchedule[]>([
    { day: "Lundi", active: true, slots: [{ start: "09:00", end: "17:00" }] },
    { day: "Mardi", active: true, slots: [{ start: "09:00", end: "17:00" }] },
    {
      day: "Mercredi",
      active: true,
      slots: [{ start: "09:00", end: "17:00" }],
    },
    {
      day: "Jeudi",
      active: true,
      slots: [
        { start: "09:00", end: "12:00" },
        { start: "13:00", end: "17:00" },
      ],
    },
    {
      day: "Vendredi",
      active: true,
      slots: [{ start: "09:00", end: "16:00" }],
    },
    { day: "Samedi", active: false, slots: [] },
    { day: "Dimanche", active: false, slots: [] },
  ]);

  // Configuration ImageKit
  const publicKey =
    import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY ||
    "public_Bs/BIiGG1jNmfsynPlyRdDTuZ6I=";
  const urlEndpoint =
    import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT ||
    "https://ik.imagekit.io/kmak12099628/";

  const authenticator = async () => {
    try {
      console.log("🔐 Demande d'authentification ImageKit...");

      // CORRECTION: Utiliser /api/image/auth au lieu de /api/imagekit/auth
      const response = await fetch("http://localhost:5001/api/image/auth", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("📡 Statut de la réponse:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Erreur serveur:", errorText);
        throw new Error(`Erreur d'authentification: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Auth data reçue:", data);

      const { signature, expire, token } = data;

      if (!signature || !expire || !token) {
        console.error("❌ Données manquantes:", data);
        throw new Error("Données d'authentification incomplètes");
      }

      return { signature, expire, token };
    } catch (error) {
      console.error("❌ Erreur authenticator complète:", error);
      toast.error("Erreur d'authentification ImageKit. Vérifiez la console.");
      throw error;
    }
  };

  // Debug: Vérifier la configuration au montage
  useEffect(() => {
    console.log("🎬 ImageKit Config:", { publicKey, urlEndpoint });
    console.log("📍 Backend URL:", "http://localhost:5001/api/image/auth");

    // Test de connexion au backend
    const testBackend = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/image/auth", {
          credentials: "include",
        });
        if (response.ok) {
          console.log("✅ Backend ImageKit accessible");
        } else {
          console.error("❌ Backend ImageKit retourne:", response.status);
          toast.error(
            "Impossible de contacter le serveur d'authentification ImageKit"
          );
        }
      } catch (error) {
        console.error("❌ Erreur de connexion backend:", error);
        toast.error("Serveur d'authentification ImageKit non disponible");
      }
    };

    testBackend();
  }, []);

  // --- LOGIQUE IMAGEKIT SDK ---
  const onUploadStart = () => {
    console.log("Upload démarré");
    setIsUploading(true);
  };

  const onUploadSuccess = (res: any) => {
    console.log("Upload réussi:", res);

    if (res && res.url) {
      setImageUrls((prev) => [...prev, res.url]);
      toast.success("Image ajoutée avec succès");
    } else {
      console.error("Réponse sans URL:", res);
      toast.error("URL de l'image introuvable");
    }
    setIsUploading(false);
  };

  const onUploadError = (err: any) => {
    console.error("❌ Erreur ImageKit complète:", err);
    console.error("❌ Type d'erreur:", typeof err);
    console.error("❌ Clés de l'erreur:", Object.keys(err));
    setIsUploading(false);

    // Messages d'erreur plus détaillés
    if (err.message) {
      console.error("❌ Message:", err.message);
      toast.error(`Erreur: ${err.message}`);
    } else if (err.response) {
      console.error("❌ Response:", err.response);
      toast.error(`Erreur serveur: ${err.response.status || "inconnu"}`);
    } else if (err.error) {
      console.error("❌ Error field:", err.error);
      toast.error(`Erreur: ${JSON.stringify(err.error)}`);
    } else {
      console.error("❌ Erreur brute:", JSON.stringify(err));
      toast.error("Erreur lors de l'upload de l'image");
    }
  };

  const removeImage = (index: number) => {
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    toast.info("Image supprimée");
  };

  const handleUploadClick = () => {
    console.log("Click sur bouton upload");
    console.log("Ref actuelle:", ikUploadRef.current);

    if (!publicKey || publicKey === "your_public_key_here") {
      toast.error("Configuration ImageKit manquante");
      return;
    }

    // Solution 1: Essayer de cliquer directement
    if (ikUploadRef.current) {
      console.log("✅ Tentative de clic sur input");
      ikUploadRef.current.click();
    } else {
      console.error("❌ Ref non attachée");
      // Solution 2: Chercher l'input dans le DOM
      const input = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (input) {
        console.log("✅ Input trouvé via querySelector");
        input.click();
      } else {
        console.error("❌ Aucun input file trouvé");
        toast.error("Erreur: Input file introuvable");
      }
    }
  };

  // --- SOUMISSION FINALE ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting || isUploading) {
      toast.warning("Veuillez attendre la fin de l'upload");
      return;
    }

    // Validation des champs obligatoires
    if (!formData.title.trim()) {
      toast.error("Le titre est obligatoire");
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error("Le prix doit être supérieur à 0");
      return;
    }

    if (!formData.category.trim()) {
      toast.error("La catégorie est obligatoire");
      return;
    }

    if (imageUrls.length === 0) {
      toast.error("Veuillez ajouter au moins une photo");
      return;
    }

    const hasActiveSchedule = schedule.some(
      (day) => day.active && day.slots.length > 0
    );

    if (!hasActiveSchedule) {
      toast.error("Veuillez définir au moins une disponibilité");
      return;
    }

    setIsSubmitting(true);

    try {
      const finalPayload = {
        ...formData,
        price: parseFloat(formData.price),
        availability: schedule,
        images: imageUrls,
      };

      console.log("Envoi du payload:", finalPayload);

      const response = await axios.post(
        "http://localhost:5001/api/services",
        finalPayload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Service publié avec succès !");
        navigate("/vendorService");
      }
    } catch (error: any) {
      console.error("Erreur lors de la publication:", error);

      if (error.response) {
        toast.error(
          error.response.data?.message ||
            `Erreur ${error.response.status}: ${error.response.statusText}`
        );
      } else if (error.request) {
        toast.error("Impossible de contacter le serveur");
      } else {
        toast.error("Une erreur inattendue s'est produite");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-10 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-4 bg-white rounded-2xl shadow-sm hover:bg-orange-500 hover:text-white transition-all border border-slate-100 group"
              aria-label="Retour"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>
            <div>
              <h1 className="text-4xl font-[1000] text-slate-900 uppercase tracking-tighter leading-none">
                Nouveau <span className="text-blue-500">Service</span>
              </h1>
              <p className="text-slate-400 font-bold text-sm italic mt-2">
                Configurez votre offre et vos disponibilités
              </p>
            </div>
          </div>

          <button
            form="service-form"
            type="submit"
            disabled={isSubmitting || isUploading}
            className={`flex items-center justify-center gap-3 px-10 py-5 bg-blue-500 text-white rounded-[1.8rem] font-black uppercase text-[11px] tracking-[0.2em] shadow-xl shadow-blue-500/20 transition-all ${
              isSubmitting || isUploading
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 active:scale-95"
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            {isSubmitting ? "Publication..." : "Publier le service"}
          </button>
        </header>

        <form
          id="service-form"
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          {/* COLONNE GAUCHE */}
          <div className="lg:col-span-5 space-y-8">
            <ServiceDetailsForm formData={formData} setFormData={setFormData} />

            {/* SECTION IMAGES */}
            <section className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-50">
              <h3 className="text-[11px] font-[1000] uppercase tracking-[0.2em] text-blue-500 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <ImageIcon size={16} />
                </span>
                Médias & Photos
              </h3>

              <div className="grid grid-cols-3 gap-4">
                {imageUrls.map((url, index) => (
                  <div
                    key={`image-${index}`}
                    className="relative group aspect-square rounded-[1.2rem] overflow-hidden shadow-md"
                  >
                    <img
                      src={url}
                      className="w-full h-full object-cover"
                      alt={`Service image ${index + 1}`}
                      loading="lazy"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
                      aria-label={`Supprimer l'image ${index + 1}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}

                {/* IMAGEKIT CONTEXT ET UPLOAD */}
                <div>
                  <IKContext
                    publicKey={publicKey}
                    urlEndpoint={urlEndpoint}
                    authenticator={authenticator}
                  >
                    <IKUpload
                      fileName={`service_${Date.now()}`}
                      folder="/services"
                      onUploadStart={onUploadStart}
                      onSuccess={onUploadSuccess}
                      onError={onUploadError}
                      style={{ display: "none" }}
                      ref={ikUploadRef as any}
                      accept="image/jpeg,image/png,image/jpg,image/webp"
                      validateFile={(file: File) => {
                        console.log(
                          "📁 Validation du fichier:",
                          file.name,
                          file.size
                        );
                        if (file.size > 10000000) {
                          // 10MB
                          toast.error(
                            "Le fichier est trop volumineux (max 10MB)"
                          );
                          return false;
                        }
                        return true;
                      }}
                    />
                  </IKContext>
                </div>

                <button
                  type="button"
                  onClick={handleUploadClick}
                  disabled={isUploading}
                  className="border-2 border-dashed border-slate-100 rounded-[1.2rem] flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all aspect-square group disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Ajouter une image"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all mb-2 ${
                      isUploading
                        ? "bg-blue-100 text-blue-500"
                        : "bg-slate-50 group-hover:bg-blue-500 group-hover:text-white"
                    }`}
                  >
                    {isUploading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <Plus size={20} />
                    )}
                  </div>
                  <span className="text-[8px] font-black uppercase text-slate-400 tracking-tighter">
                    {isUploading ? "Upload..." : "Ajouter"}
                  </span>
                </button>
              </div>
            </section>
          </div>

          {/* COLONNE DROITE */}
          <div className="lg:col-span-7">
            <ServiceScheduleForm
              schedule={schedule}
              setSchedule={setSchedule}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
