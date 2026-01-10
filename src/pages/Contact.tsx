import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Linkedin,
  Twitter,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Logique d'envoi (API call) ici
    console.log("Données envoyées :", formData);
    alert("Merci ! Votre message a bien été envoyé.");
  };

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen">
        {/* HERO SECTION */}
        <section className="relative py-24 bg-blue-600 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl lg:text-6xl font-black mb-6 text-white leading-tight">
              Parlons de votre <br />
              <span className="text-orange-400">prochain projet</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium">
              Une question technique ou besoin d'un expert ? Notre équipe est là
              pour vous accompagner 24h/24.
            </p>
          </div>
        </section>

        {/* CARTES DE CONTACT RAPIDE */}
        <section className="-mt-12 relative z-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {/* Email */}
            <div className="p-8 rounded-3xl shadow-xl bg-white border border-gray-100 text-center group hover:border-blue-500 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Mail className="h-7 w-7 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Email</h4>
              <p className="text-gray-500 mb-4 text-sm">Réponse sous 2h</p>
              <a
                href="mailto:contact@skillmarket.com"
                className="text-blue-600 font-bold hover:underline break-all"
              >
                contact@skillmarket.com
              </a>
            </div>

            {/* Téléphone */}
            <div className="p-8 rounded-3xl shadow-xl bg-white border border-gray-100 text-center group hover:border-orange-500 transition-all duration-300">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Phone className="h-7 w-7 text-orange-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Téléphone</h4>
              <p className="text-gray-500 mb-4 text-sm">Lun-Ven de 9h à 18h</p>
              <a
                href="tel:+2250503131076"
                className="text-orange-600 font-bold hover:underline"
              >
                +225 05 03 13 10 76
              </a>
            </div>

            {/* WhatsApp */}
            <div className="p-8 rounded-3xl shadow-xl bg-white border border-gray-100 text-center group hover:border-green-500 transition-all duration-300">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="h-7 w-7 text-green-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">WhatsApp</h4>
              <p className="text-gray-500 mb-4 text-sm">Support instantané</p>
              <a
                href="https://wa.me/2250503131076?text=Bonjour%20SkillMarket,%20j'aimerais%20avoir des%20informations"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 font-bold hover:underline"
              >
                Lancer le chat
              </a>
            </div>
          </div>
        </section>

        {/* FORMULAIRE + MAP SECTION */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-4">
                Envoyez un message
              </h2>
              <p className="text-gray-500 mb-10">
                Remplissez le formulaire et notre responsable de compte vous
                contactera personnellement.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="Nom complet"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600 outline-none transition-all"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email professionnel"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600 outline-none transition-all"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <input
                  type="text"
                  placeholder="Sujet de votre demande"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600 outline-none transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />
                <textarea
                  required
                  rows={5}
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600 outline-none transition-all resize-none"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  Envoyer le message <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            </div>

            <div className="space-y-8">
              {/* Fake Map */}
              <div className="h-80 w-full rounded-[2.5rem] bg-gray-200 relative overflow-hidden shadow-inner group">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                  alt="Localisation SkillMarket"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                      <MapPin className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">
                        SkillMarket HQ
                      </p>
                      <p className="text-xs text-gray-500">Plateau, Abidjan</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SOCIAL MEDIA */}
              <div className="bg-gray-50 rounded-[2.5rem] p-8">
                <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                  Suivez-nous sur les réseaux
                </h4>
                <div className="flex gap-4">
                  {[
                    { Icon: Linkedin, href: "#" },
                    { Icon: Twitter, href: "#" },
                    { Icon: Instagram, href: "#" },
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm"
                    >
                      <item.Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ RAPIDE */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-4">
                <HelpCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-black text-gray-900">
                Questions fréquentes
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Comment devenir prestataire ?",
                  a: "Inscrivez-vous via l'onglet 'Devenir prestataire' et soumettez vos documents d'identité et de certification pour vérification.",
                },
                {
                  q: "Quels sont les délais de paiement ?",
                  a: "Les fonds sont débloqués et transférés sur votre compte 48h après la validation finale de la mission par le client.",
                },
                {
                  q: "Comment annuler une mission ?",
                  a: "Vous pouvez annuler via votre tableau de bord. L'annulation est gratuite jusqu'à 24h avant le début de la prestation.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="collapse collapse-plus bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                  <input
                    type="radio"
                    name="faq-accordion"
                    defaultChecked={i === 0}
                  />
                  <div className="collapse-title text-lg font-bold text-gray-800">
                    {item.q}
                  </div>
                  <div className="collapse-content text-gray-500">
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
