import { useState, useEffect, useRef } from "react";
import {
  Camera,
  Mail,
  Phone,
  Plus,
  ChevronRight,
  Info,
  User,
  Briefcase,
  GraduationCap,
  FileText,
  Landmark,
  Loader2,
} from "lucide-react";
import { IKContext, IKUpload } from "imagekitio-react";

// Imports des composants
import OnboardingSidebar from "../../Components/Vendor/OnboardingSidebar";
import InputField from "../../Components/Vendor/InputField";
import AgendaItem from "../../Components/Vendor/AgendaItem";
import ProfilHeader from "../../Components/Vendor/ProfilHeader";
import BusinessDetails from "../../Components/Vendor/BusinessDetails";
import SkillsDetails from "../../Components/Vendor/SkillsDetails";
import DocumentUpload from "../../Components/DocumentUpload";
import BankingDetails from "../../Components/Vendor/BankingDetails";
import SuccessOnboarding from "../../Components/Vendor/SuccessOnboarding";

import { useAuthStore } from "../../stores/useAuthStore";
import api from "../../api/axios";

export default function ProfilVendor() {
  const { user, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState("personal");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ikUploadRef = useRef<any>(null);

  // --- ÉTATS DES DONNÉES ---
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    profileImage: "",
  });

  const [businessData, setBusinessData] = useState({
    companyName: "",
    taxId: "",
    businessType: "auto_entrepreneur",
    website: "",
    address: "",
    city: "",
    zipCode: "",
    country: "France",
  });

  const [skillsData, setSkillsData] = useState({
    category: "tech",
    experienceYears: "",
    skills: [] as string[],
  });

  const [docsData, setDocsData] = useState({
    identityUrl: "",
    registrationUrl: "",
    serviceImageUrl: "",
  });

  const [bankingData, setBankingData] = useState({
    accountHolder: "",
    iban: "",
    bic: "",
  });

  useEffect(() => {
    if (user) {
      const nameParts = user.name ? user.name.split(" ") : ["", ""];
      setFormData((prev) => ({
        ...prev,
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        profileImage: user.serviceMainImage || "",
      }));
    }
  }, [user]);

  // --- LOGIQUE IMAGEKIT ---
  const handleProfileImageSuccess = (res: any) => {
    setFormData({ ...formData, profileImage: res.url });
    setUploading(false);
  };

  const handleProfileImageError = (err: any) => {
    console.error("Erreur upload:", err);
    setUploading(false);
    alert("Erreur lors de l'upload de l'image");
  };

  const triggerUpload = () => {
    if (ikUploadRef.current) {
      const inputElement =
        ikUploadRef.current.querySelector('input[type="file"]');
      if (inputElement) {
        inputElement.click();
      }
    }
  };

  const handleNextStep = async () => {
    setLoading(true);
    try {
      if (currentStep === "personal") {
        await api.put("/auth/complete-vendor-profile", {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          bio: formData.bio,
        });
        setCurrentStep("business");
      } else if (currentStep === "business") {
        setCurrentStep("skills");
      } else if (currentStep === "skills") {
        await api.put("/auth/update-vendor-skills", {
          category: skillsData.category,
          experience: skillsData.experienceYears,
          skills: skillsData.skills,
          imageUrl: formData.profileImage,
        });
        setCurrentStep("docs");
      } else if (currentStep === "docs") {
        await api.post("/auth/upload-vendor-docs", {
          identityUrl: docsData.identityUrl,
          registrationUrl: docsData.registrationUrl,
          serviceImageUrl: docsData.serviceImageUrl,
        });
        setCurrentStep("banking");
      } else if (currentStep === "banking") {
        await api.put("/auth/update-vendor-banking", bankingData);
        setIsSubmitted(true);
      }
      await checkAuth();
    } catch (error) {
      console.error("Erreur onboarding:", error);
      alert("Erreur lors de l'enregistrement.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: "personal", label: "Personnel", icon: User },
    { id: "business", label: "Business", icon: Briefcase },
    { id: "skills", label: "Expertise", icon: GraduationCap },
    { id: "docs", label: "Documents", icon: FileText },
    { id: "banking", label: "Paiement", icon: Landmark },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case "personal":
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex flex-col items-center gap-4">
                <div
                  className="relative group cursor-pointer"
                  onClick={triggerUpload}
                >
                  <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-400">
                    {formData.profileImage ? (
                      <img
                        src={formData.profileImage}
                        className="w-full h-full object-cover"
                        alt="Profil"
                      />
                    ) : (
                      <Camera
                        className="text-slate-300 group-hover:text-blue-400"
                        size={32}
                      />
                    )}
                    {uploading && (
                      <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <Loader2 className="animate-spin text-blue-600" />
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg">
                    <Plus size={16} />
                  </div>
                </div>
                {/* L'INPUT CACHÉ IMAGEKIT - déplacé en dehors du div cliquable */}
                <div ref={ikUploadRef} style={{ display: "none" }}>
                  <IKUpload
                    onUploadStart={() => setUploading(true)}
                    onSuccess={handleProfileImageSuccess}
                    onError={handleProfileImageError}
                    folder="/vendors/profiles"
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-black uppercase">
                  Photo de profil
                </p>
              </div>
              <div className="md:col-span-2 space-y-4">
                <h3 className="font-black text-slate-900">
                  Présentation rapide
                </h3>
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  placeholder="En quelques mots, quelle est votre spécialité ?"
                  className="w-full p-5 bg-slate-50 border-none rounded-2xl text-sm min-h-[100px] focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </section>

            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <h3 className="font-black text-slate-900 flex items-center gap-3">
                <User size={20} className="text-blue-600" /> Informations
                Personnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Prénom"
                  value={formData.firstName}
                  onChange={(v) => setFormData({ ...formData, firstName: v })}
                />
                <InputField
                  label="Nom"
                  value={formData.lastName}
                  onChange={(v) => setFormData({ ...formData, lastName: v })}
                />
                <InputField
                  label="Email"
                  value={formData.email}
                  disabled
                  icon={<Mail size={16} />}
                  onChange={() => {}}
                />
                <InputField
                  label="Téléphone"
                  placeholder="+33 6..."
                  icon={<Phone size={16} />}
                  value={formData.phone}
                  onChange={(v) => setFormData({ ...formData, phone: v })}
                />
              </div>
            </section>
          </div>
        );
      case "business":
        return (
          <BusinessDetails data={businessData} onChange={setBusinessData} />
        );
      case "skills":
        return <SkillsDetails data={skillsData} onChange={setSkillsData} />;
      case "docs":
        return <DocumentUpload data={docsData} onChange={setDocsData} />;
      case "banking":
        return <BankingDetails data={bankingData} onChange={setBankingData} />;
      default:
        return null;
    }
  };

  return (
    <IKContext
      publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      authenticator={async () => {
        const res = await api.get("/image/auth");
        return res.data;
      }}
    >
      <div className="flex h-screen bg-[#FDFDFD] overflow-hidden font-sans text-slate-900">
        <OnboardingSidebar
          steps={steps}
          currentStepId={isSubmitted ? "" : currentStep}
        />

        <main className="flex-1 flex flex-col min-w-0">
          <ProfilHeader />

          <div className="flex-1 overflow-y-auto p-8 lg:p-12 bg-[#F8FAFC]/50 custom-scrollbar">
            <div className="max-w-7xl mx-auto">
              {isSubmitted ? (
                <SuccessOnboarding />
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                  <div className="xl:col-span-8 space-y-8">
                    <div className="bg-white border border-slate-100 p-6 rounded-[2.5rem] flex gap-6 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500" />
                      <div className="bg-orange-50 p-3 h-fit rounded-2xl text-orange-500">
                        <Info size={24} />
                      </div>
                      <div>
                        <h4 className="text-slate-900 font-black text-sm uppercase tracking-tight">
                          Dossier en cours
                        </h4>
                        <p className="text-slate-500 text-xs mt-1 leading-relaxed font-medium">
                          Remplissez soigneusement chaque étape. Votre profil
                          sera examiné par nos modérateurs.
                        </p>
                      </div>
                    </div>

                    {renderStepContent()}
                  </div>

                  <aside className="xl:col-span-4 space-y-8">
                    <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                      <h3 className="font-black text-slate-900 mb-8">
                        Statut du profil
                      </h3>
                      <div className="space-y-4">
                        <AgendaItem
                          time="STEP 1"
                          title="Profil"
                          type="OK"
                          status={
                            currentStep !== "personal" ? "completed" : "pending"
                          }
                        />
                        <AgendaItem
                          time="STEP 2"
                          title="Business"
                          type="Setup"
                          status={
                            ["skills", "docs", "banking"].includes(currentStep)
                              ? "completed"
                              : "pending"
                          }
                        />
                        <AgendaItem
                          time="STEP 3"
                          title="Expertise"
                          type="Skills"
                          status={
                            ["docs", "banking"].includes(currentStep)
                              ? "completed"
                              : "pending"
                          }
                        />
                        <AgendaItem
                          time="STEP 4"
                          title="Vérification"
                          type="Docs"
                          status={
                            currentStep === "banking" ? "completed" : "pending"
                          }
                        />
                      </div>
                    </section>
                  </aside>
                </div>
              )}
            </div>
          </div>

          {!isSubmitted && (
            <footer className="h-24 bg-white border-t border-slate-100 px-12 flex items-center justify-between shrink-0 shadow-2xl z-30">
              <div className="flex items-center gap-3 text-green-500 font-bold text-[10px] uppercase tracking-widest">
                <div
                  className={`w-2 h-2 rounded-full bg-green-500 ${
                    loading ? "animate-ping" : "animate-pulse"
                  }`}
                />
                {loading ? "Chargement..." : "Modifications prêtes"}
              </div>
              <div className="flex gap-4">
                <button
                  disabled={currentStep === "personal" || loading}
                  onClick={() => {
                    const prevMap: Record<string, string> = {
                      business: "personal",
                      skills: "business",
                      docs: "skills",
                      banking: "docs",
                    };
                    setCurrentStep(prevMap[currentStep]);
                  }}
                  className="px-8 py-4 font-black text-slate-400 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all text-xs uppercase tracking-widest disabled:opacity-0"
                >
                  Retour
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={loading || uploading}
                  className="px-10 py-4 font-black text-white bg-blue-600 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center gap-3 text-xs uppercase tracking-widest disabled:opacity-50"
                >
                  {loading
                    ? "Enregistrement..."
                    : currentStep === "banking"
                    ? "Finaliser"
                    : "Suivant"}
                  <ChevronRight size={18} />
                </button>
              </div>
            </footer>
          )}
        </main>
      </div>
    </IKContext>
  );
}
