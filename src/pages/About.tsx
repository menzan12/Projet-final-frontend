import {
  ArrowRight,
  Target,
  Lightbulb,
  Users2,
  ShieldCheck,
  Heart,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen">
        {/* --- HERO SECTION --- */}
        <section className="relative py-20 lg:py-32 bg-blue-50 overflow-hidden">
          {/* Décoration d'arrière-plan */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-100/50 clip-path-slant hidden lg:block"></div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="animate-slide-up">
                <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-bold mb-6">
                  Notre Histoire
                </span>
                <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight text-gray-900">
                  Redéfinir le <br />
                  <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                    Service de Proximité
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                  SkillMarket est né d'une idée simple : transformer la
                  recherche de services en une expérience fluide, humaine et
                  sécurisée. Nous bâtissons le futur du travail indépendant.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all hover:-translate-y-1"
                  >
                    Explorer les services
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all"
                  >
                    Rejoindre l'aventure
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/image/equipe-commerciale.jpg"
                    alt="Notre équipe au travail"
                    className="w-full h-[500px] object-cover"
                  />
                </div>
                {/* Badge flottant */}
                <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-3xl shadow-xl border border-gray-50 animate-bounce-slow">
                  <p className="text-3xl font-black text-blue-600">98%</p>
                  <p className="text-sm font-bold text-gray-400">
                    Satisfaction Client
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION STATISTIQUES --- */}
        <section className="py-12 bg-white relative z-20 -mt-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-gray-900 rounded-[2.5rem] p-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Experts Actifs", val: "2,500+" },
                { label: "Services Rendus", val: "15k+" },
                { label: "Villes Couvertes", val: "45" },
                { label: "Note Moyenne", val: "4.9/5" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl md:text-4xl font-black text-white mb-2">
                    {stat.val}
                  </p>
                  <p className="text-blue-400 font-bold text-sm uppercase tracking-widest">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- NOTRE MISSION & VISION --- */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/image/Office.jpg"
                className="rounded-3xl h-64 w-full object-cover mt-12"
                alt="Office"
              />
              <img
                src="/image/Meeting.jpg"
                className="rounded-3xl h-64 w-full object-cover"
                alt="Meeting"
              />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <h2 className="text-3xl font-black text-gray-900">
                  Notre Mission
                </h2>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Nous croyons que chaque talent mérite d'être valorisé.
                SkillMarket n'est pas qu'une application, c'est un écosystème
                qui permet aux experts locaux de digitaliser leur savoir-faire
                et aux clients de déléguer en toute confiance.
              </p>
              <ul className="space-y-4">
                {[
                  "Simplifier l'accès aux services essentiels",
                  "Garantir une rémunération juste pour les experts",
                  "Sécuriser chaque transaction de A à Z",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 font-bold text-gray-700"
                  >
                    <ShieldCheck className="h-5 w-5 text-green-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- NOS VALEURS --- */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl font-black text-gray-900 mb-6 font-display">
                Ce qui nous anime
              </h2>
              <p className="text-gray-500 font-medium">
                Nos valeurs ne sont pas que des mots sur un mur, elles dictent
                chaque ligne de code que nous écrivons.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Transparence",
                  desc: "Aucun frais caché. Une communication honnête entre clients et prestataires.",
                  icon: <Lightbulb className="h-8 w-8 text-blue-600" />,
                  bg: "bg-blue-50",
                },
                {
                  title: "Excellence",
                  desc: "Nous sélectionnons rigoureusement chaque profil pour garantir un service 5 étoiles.",
                  icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
                  bg: "bg-orange-50",
                },
                {
                  title: "Humain",
                  desc: "La technologie est au service de l'humain, et non l'inverse.",
                  icon: <Heart className="h-8 w-8 text-red-600" />,
                  bg: "bg-red-50",
                },
              ].map((valeur, i) => (
                <div
                  key={i}
                  className="p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group"
                >
                  <div
                    className={`w-16 h-16 ${valeur.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}
                  >
                    {valeur.icon}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">
                    {valeur.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    {valeur.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION ÉQUIPE --- */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-10 md:p-20 overflow-hidden relative">
              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                  <h2 className="text-4xl font-black text-white mb-6">
                    Une équipe de passionnés
                  </h2>
                  <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                    Développeurs, designers et experts en relation client, nous
                    travaillons tous depuis Abidjan pour offrir la meilleure
                    expérience de service en Afrique.
                  </p>
                  <button className="flex items-center gap-3 font-bold text-white group">
                    <Users2 className="h-6 w-6" />
                    <span>Voir nos postes ouverts</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <img
                      src="/image/Team.jpg"
                      className="rounded-2xl h-40 w-full object-cover"
                      alt="Team member"
                    />
                    <img
                      src="/image/chauffeur.jpg"
                      className="rounded-2xl h-56 w-full object-cover"
                      alt="chauffeur"
                    />
                  </div>
                  <div className="space-y-4 pt-8">
                    <img
                      src="/image/dame.jpg"
                      className="rounded-2xl h-56 w-full object-cover"
                      alt="dame"
                    />
                    <img
                      src="/image/boy.jpg"
                      className="rounded-2xl h-40 w-full object-cover"
                      alt="boy"
                    />
                  </div>
                </div>
              </div>
              {/* Cercles décoratifs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full -ml-32 -mb-32"></div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
