import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* FOOTER PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* 1. LOGO & INFO */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/image/Logo.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                SkillMarket
              </span>
            </div>
            <p className="text-gray-500 leading-relaxed">
              La plateforme de confiance pour tous vos services à domicile et
              besoins professionnels. Simple, rapide et sécurisé.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, color: "hover:text-pink-500" },
                { Icon: Twitter, color: "hover:text-blue-400" },
                { Icon: Linkedin, color: "hover:text-blue-700" },
                { Icon: Facebook, color: "hover:text-blue-600" },
              ].map(({ Icon, color }, idx) => (
                <a
                  key={idx}
                  href="#"
                  className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 transition-all hover:bg-white hover:shadow-md ${color}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. NAVIGATION */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">
              Navigation
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Explorer les Services", path: "/services" },
                { name: "Devenir prestataire", path: "/register" },
                { name: "Comment ça marche", path: "/how-it-works" },
                { name: "Aide & Support", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-500 hover:text-blue-600 font-medium transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-blue-600 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. CONTACT DIRECT */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">
              Nous contacter
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">
                    Email
                  </p>
                  <a
                    href="mailto:contact@skillmarket.com"
                    className="text-gray-700 font-bold hover:text-blue-600 transition-colors"
                  >
                    contact@skillmarket.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">
                    Téléphone
                  </p>
                  <p className="text-gray-700 font-bold">+225 05 03 13 10 76</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">
                    Bureau
                  </p>
                  <p className="text-gray-700 font-bold">
                    Abidjan, Côte d’Ivoire
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* 4. NEWSLETTER / TRUST */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider text-sm">
              Restez informé
            </h3>
            <div className="relative">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full pl-4 pr-12 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none font-medium transition-all"
              />
              <button className="absolute right-2 top-2 bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-all">
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <ShieldCheck className="h-8 w-8 text-blue-600 opacity-50" />
              <p className="text-[11px] text-gray-400 font-medium">
                Paiements 100% sécurisés et satisfaction garantie par
                SkillMarket.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT & LEGAL */}
      <div className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 font-medium">
            © {new Date().getFullYear()}{" "}
            <span className="text-blue-600">SkillMarket</span>. Tous droits
            réservés.
          </p>
          <div className="flex gap-6 text-sm font-bold text-gray-400">
            <Link
              to="/privacy"
              className="hover:text-blue-600 transition-colors"
            >
              Confidentialité
            </Link>
            <Link to="/terms" className="hover:text-blue-600 transition-colors">
              CGU
            </Link>
            <Link
              to="/cookies"
              className="hover:text-blue-600 transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
