import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/home/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="bg-blue-50">
        {/* HERO */}
        <section className="py-20 bg-blue-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                À propos de{" "}
                <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                  SkillMarket
                </span>
              </h1>
              <p className="text-lg text-gray-700 mb-6 max-w-xl">
                Nous connectons les meilleurs talents aux besoins des
                particuliers et des entreprises. Notre mission est de simplifier
                votre quotidien grâce à des services fiables et rapides.
              </p>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-orange-500 text-white hover:shadow-lg hover:-translate-y-1 transition-transform"
              >
                Découvrir nos services
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl animate-fade-in">
              <img
                src="/image/about-hero.jpg"
                alt="Notre équipe"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Notre Mission</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Offrir une plateforme où chacun peut trouver le service parfait
              pour ses besoins, tout en permettant aux experts de partager leurs
              compétences et de développer leur activité.
            </p>
          </div>
        </section>

        {/* VALEURS */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Nos Valeurs
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Fiabilité",
                  desc: "Des services sur lesquels vous pouvez compter.",
                },
                {
                  title: "Innovation",
                  desc: "Des solutions modernes et adaptées à vos projets.",
                },
                {
                  title: "Satisfaction",
                  desc: "Plus de 10,000 utilisateurs satisfaits.",
                },
              ].map((valeur, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl shadow-md bg-blue-50 hover:shadow-lg transition-transform hover:-translate-y-1 text-center"
                >
                  <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                    {valeur.title}
                  </h3>
                  <p className="text-gray-600">{valeur.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ÉQUIPE */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Notre Équipe</h2>
              <p className="text-lg text-gray-700 mb-6">
                Une équipe passionnée, composée d’experts qualifiés dans divers
                domaines. Ensemble, nous travaillons pour vous offrir une
                expérience unique et personnalisée.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/image/team.jpg"
                alt="Notre équipe"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="py-16 bg-blue-100">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Contactez-nous</h2>
            <p className="text-lg text-gray-700 mb-8">
              Vous souhaitez en savoir plus ou rejoindre notre communauté ?
            </p>
            <div className="space-y-2 text-gray-700">
              <p>📧 Email : contact@skillmarket.com</p>
              <p>📞 Téléphone : +225 01 23 45 67</p>
              <p>📍 Adresse : Abidjan, Côte d’Ivoire</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
