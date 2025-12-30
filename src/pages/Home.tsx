import { Link } from "react-router-dom";
import Hero from "../components/home/Hero";
import Navbar from "../components/Navbar";
import {
  ArrowRight,
  Monitor,
  Scale,
  Target,
  Star,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />

      {/* --- SECTION STATS : Épurée et Impactante --- */}
      <section className="py-20 bg-white relative z-10 -mt-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                label: "Clients satisfaits",
                val: "10k+",
                icon: <Star className="text-orange-500" />,
              },
              {
                label: "Experts qualifiés",
                val: "500+",
                icon: <ShieldCheck className="text-blue-600" />,
              },
              {
                label: "Note moyenne",
                val: "4.9/5",
                icon: <Zap className="text-yellow-500" />,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-blue-100/20 flex flex-col items-center text-center group hover:border-blue-500 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <h4 className="text-5xl font-black mb-2 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent font-display">
                  {stat.val}
                </h4>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION SERVICES : Style Grille Moderne --- */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          {/* En-tête */}
          <div className="mb-20 text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-xs font-black uppercase tracking-widest mb-4">
              Nos Catégories
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Ce que nous <span className="text-blue-600">offrons</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
              Explorez une large gamme de services adaptés à vos besoins. Nous
              connectons les meilleurs talents pour vos projets.
            </p>
          </div>

          {/* Grille de Cartes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Consultation Juridique",
                desc: "Accédez à des conseils d'experts pour vos démarches administratives et vos contrats en toute sécurité.",
                icon: <Scale className="h-7 w-7 text-orange-600" />,
                tag: "Légal",
                bg: "bg-orange-50",
              },
              {
                title: "Dépannage Informatique",
                desc: "Support technique expert pour vos PC, réseaux et logiciels, à domicile ou à distance.",
                icon: <Monitor className="h-7 w-7 text-blue-600" />,
                tag: "Technologie",
                bg: "bg-blue-50",
              },
              {
                title: "Coaching Personnel",
                desc: "Atteignez vos objectifs de vie et de carrière avec l'accompagnement de coachs certifiés.",
                icon: <Target className="h-7 w-7 text-green-600" />,
                tag: "Bien-être",
                bg: "bg-green-50",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-500"
              >
                <div
                  className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform`}
                >
                  {item.icon}
                </div>
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                  <h3 className="text-2xl font-black text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                  <Link
                    to="/services"
                    className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all pt-4"
                  >
                    En savoir plus <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/services"
              className="px-4 py-3  font-semibold rounded-lg border text-orange-400 hover:text-orange-600 hover:bg-orange-100  "
            >
              Voir toutes les catégories
            </Link>
          </div>
        </div>
      </section>

      {/* --- SECTION CTA : Design "Floating Card" --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative bg-gray-900 rounded-[3.5rem] p-10 lg:p-20 overflow-hidden shadow-3xl">
            {/* Formes abstraites de fond */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-30 -mr-40 -mt-40"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-[120px] opacity-20 -ml-40 -mb-40"></div>

            <div className="relative z-10 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">
                  Prêt à transformer <br />
                  <span className="text-blue-400">votre quotidien ?</span>
                </h2>
                <p className="text-gray-400 text-xl font-medium mb-10">
                  Rejoignez la plus grande communauté d'experts. Simple,
                  sécurisé et sans engagement.
                </p>
                <div className="flex flex-wrap gap-5 justify-center lg:justify-start">
                  <Link
                    to="/auth?mode=signup"
                    className="px-10 py-5 rounded-2xl font-black bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-900/40 transition-all hover:-translate-y-1"
                  >
                    Commencer maintenant
                  </Link>
                  <Link
                    to="/contact"
                    className="px-10 py-5 rounded-2xl font-black border-2 border-white/10 text-white hover:bg-white/5 transition-all"
                  >
                    Parler à un conseiller
                  </Link>
                </div>
              </div>

              <div className="hidden lg:grid grid-cols-2 gap-4 animate-pulse-slow">
                <div className="space-y-4">
                  <div className="h-40 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10"></div>
                  <div className="h-64 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10"></div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="h-64 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10"></div>
                  <div className="h-40 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
