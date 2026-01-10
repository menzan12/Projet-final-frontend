import React, { useState } from "react";
import {
  FileText,
  CheckCircle2,
  X,
  ShieldCheck,
  Image as ImageIcon,
  Plus,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { IKUpload } from "imagekitio-react";

// Définition d'une interface pour la réponse ImageKit
interface ImageKitResponse {
  url: string;
  fileId: string;
  name: string;
  [key: string]: any;
}

interface DocumentUploadProps {
  data: any;
  onChange: (newData: any) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ data, onChange }) => {
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const docTypes = [
    {
      id: "identityUrl",
      label: "Pièce d'identité",
      desc: "CNI, Passeport ou Titre de séjour",
      folder: "/vendors/identity",
    },
    {
      id: "registrationUrl",
      label: "Justificatif d'activité",
      desc: "Extrait KBIS ou avis INSEE",
      folder: "/vendors/registration",
    },
  ];

  // Correction : Ajout du type explicite pour 'res'
  const handleUploadSuccess = (id: string, res: ImageKitResponse) => {
    onChange({ ...data, [id]: res.url });
    setUploadingId(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* SECTION 1: DOCUMENTS LÉGAUX */}
      <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
        <div>
          <h3 className="font-black text-slate-900 flex items-center gap-3">
            <ShieldCheck size={20} className="text-blue-600" /> Vérification
            d'identité
          </h3>
          <p className="text-slate-400 text-[10px] uppercase font-bold mt-1 tracking-wider">
            Formats : PDF, JPG, PNG (Auto-upload vers Cloud)
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {docTypes.map((doc) => (
            <div key={doc.id} className="relative group">
              <label
                className={`flex items-center justify-between p-5 rounded-[1.5rem] border-2 border-dashed transition-all cursor-pointer
                  ${
                    data[doc.id]
                      ? "border-green-200 bg-green-50/30"
                      : "border-slate-100 bg-slate-50/50 hover:border-blue-300"
                  }`}
              >
                {/* Correction : Paramètre 'res' typé pour éviter TS7006 */}
                <IKUpload
                  fileName={`${doc.id}_${Date.now()}`}
                  folder={doc.folder}
                  className="hidden"
                  onUploadStart={() => setUploadingId(doc.id)}
                  onSuccess={(res: ImageKitResponse) =>
                    handleUploadSuccess(doc.id, res)
                  }
                  onError={() => setUploadingId(null)}
                />

                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl ${
                      data[doc.id]
                        ? "bg-green-500 text-white"
                        : "bg-white text-slate-400"
                    }`}
                  >
                    {uploadingId === doc.id ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : data[doc.id] ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <FileText size={20} />
                    )}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">
                      {doc.label}
                    </h4>
                    <p className="text-slate-400 text-[11px] truncate max-w-[200px]">
                      {data[doc.id]
                        ? "Document téléchargé avec succès"
                        : doc.desc}
                    </p>
                  </div>
                </div>

                {data[doc.id] && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onChange({ ...data, [doc.id]: "" });
                    }}
                    className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: IMAGE DE SERVICE */}
      <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
        <div>
          <h3 className="font-black text-slate-900 flex items-center gap-3">
            <ImageIcon size={20} className="text-purple-600" /> Image de
            couverture
          </h3>
          <p className="text-slate-400 text-[10px] uppercase font-bold mt-1 tracking-wider">
            Visible par vos clients sur votre profil
          </p>
        </div>

        <div className="relative group">
          <label
            className={`relative flex flex-col items-center justify-center min-h-[200px] rounded-[2rem] border-2 border-dashed transition-all cursor-pointer overflow-hidden
              ${
                data.serviceImageUrl
                  ? "border-purple-200"
                  : "border-slate-100 bg-slate-50/50 hover:border-purple-300 hover:bg-purple-50/30"
              }`}
          >
            {/* Correction : Paramètre 'res' typé ici aussi */}
            <IKUpload
              fileName="service_cover"
              folder="/vendors/services"
              className="hidden"
              onUploadStart={() => setUploadingId("serviceImageUrl")}
              onSuccess={(res: ImageKitResponse) =>
                handleUploadSuccess("serviceImageUrl", res)
              }
              onError={() => setUploadingId(null)}
            />

            {data.serviceImageUrl ? (
              <>
                <img
                  src={data.serviceImageUrl}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-xs font-black uppercase tracking-widest">
                    Modifier l'image
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 text-slate-400">
                {uploadingId === "serviceImageUrl" ? (
                  <Loader2 size={32} className="animate-spin text-blue-500" />
                ) : (
                  <div className="p-4 bg-white rounded-2xl shadow-sm">
                    <Plus size={24} />
                  </div>
                )}
                <p className="font-bold text-xs uppercase tracking-tighter">
                  {uploadingId === "serviceImageUrl"
                    ? "Téléchargement..."
                    : "Cliquez pour ajouter une photo"}
                </p>
              </div>
            )}
          </label>

          {data.serviceImageUrl && (
            <button
              type="button"
              onClick={() => onChange({ ...data, serviceImageUrl: "" })}
              className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="p-6 bg-blue-50/50 rounded-[2rem] flex gap-5 border border-blue-100">
          <AlertCircle size={20} className="text-blue-500 shrink-0" />
          <p className="text-blue-800/70 text-xs leading-relaxed font-medium">
            Une belle image augmente vos chances d'être contacté de <b>40%</b>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default DocumentUpload;
