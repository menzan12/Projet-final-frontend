import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-blue-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/*TEXTE*/}
          <div className="text-center lg:text-left animate-slide-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-5">
              Trouvez le service parfait pour{" "}
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                vos besoins.
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-7 max-w-md mx-auto lg:mx-0">
              Des experts qualifiés prêts à vous aider en quelques clics.
              Simplifiez votre quotidien dès aujourd'hui.
            </p>

            {/* CTA */}
            <div className="flex justify-center lg:justify-start mb-7">
              <Link
                to="/services"
                className="
                  group inline-flex items-center gap-3
                  px-7 py-3 rounded-xl
                  bg-blue-600 text-white font-semibold
                  transition-all duration-300
                  hover:bg-white border hover:border-blue-600 hover:text-blue-600 hover:shadow-xl hover:-translate-y-1
                  active:translate-y-0 active:shadow-md
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
              >
                Commencer maintenant
                <ArrowRight
                  className="
                    w-5 h-5
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>

            {/* PREUVE SOCIALE */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-blue-200 bg-gradient-to-br from-blue-600 to-orange-500"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-700">
                Rejoint par 10,000+ utilisateurs
              </p>
            </div>
          </div>

          {/* ================= IMAGE ================= */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/image/hero.jpg"
                alt="Espace de travail professionnel"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* DECOR */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl opacity-40" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-300 rounded-full blur-3xl opacity-40" />
          </div>
        </div>
      </div>
    </section>
  );
}
