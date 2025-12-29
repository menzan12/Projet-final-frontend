import { ArrowRight } from "lucide-react";
import Navbar from "../components/home/Navbar";

export default function Contact() {
  return (
    <>
      <Navbar />
      <div className="bg-blue-50">
        {/* HERO */}
        <section className="py-20 bg-blue-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Contactez{" "}
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                SkillMarket
              </span>
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Vous avez une question, un projet ou souhaitez rejoindre notre
              communauté ? Nous serions ravis d’échanger avec vous.
            </p>
          </div>
        </section>

        {/* COORDONNÉES */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition-transform hover:-translate-y-1">
              <h4 className="text-xl font-semibold mb-2">📧 Email</h4>
              <p className="text-gray-700">contact@skillmarket.com</p>
            </div>
            <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition-transform hover:-translate-y-1">
              <h4 className="text-xl font-semibold mb-2">📞 Téléphone</h4>
              <p className="text-gray-700">+225 01 23 45 67</p>
            </div>
            <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition-transform hover:-translate-y-1">
              <h4 className="text-xl font-semibold mb-2">📍 Adresse</h4>
              <p className="text-gray-700">Abidjan, Côte d’Ivoire</p>
            </div>
          </div>
        </section>

        {/* FORMULAIRE */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">
              Envoyez-nous un message
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sujet
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-orange-500 text-white hover:shadow-lg hover:-translate-y-1 transition-transform"
              >
                Envoyer <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </div>
        </section>

        {/* HORAIRES */}
        <section className="py-16 bg-blue-100">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Nos Horaires</h2>
            <p className="text-lg text-gray-700">
              Lundi – Vendredi : 9h00 – 18h00 <br />
              Samedi : 10h00 – 14h00 <br />
              Dimanche : Fermé
            </p>
          </div>
        </section>

        {/* RÉSEAUX SOCIAUX */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Suivez-nous</h2>
            <div className="flex justify-center gap-6 text-blue-600 font-semibold">
              <a href="#" className="hover:text-orange-500 transition-colors">
                Facebook
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
