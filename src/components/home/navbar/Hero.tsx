import { Link } from "react-router-dom";
import { ArrowRight, Star, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden pt-12 lg:pt-20">
      {/* Éléments de fond décoratifs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-orange-50 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* --- TEXTE --- */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 animate-fade-in">
              <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span className="text-sm font-bold text-blue-700 uppercase tracking-wider">
                La plateforme n°1 en Côte d'Ivoire
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-7xl font-black leading-[1.1] mb-8 text-gray-900">
              Trouvez le service <br />
              parfait pour{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                  vos besoins.
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-orange-200 z-0"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 25 0 50 5 T 100 5"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Accédez instantanément à des experts qualifiés pour vos projets.
              Simple, rapide et sécurisé pour un quotidien sans stress.
            </p>

            {/* CTA & Rassurance */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-10">
              <Link
                to="/services"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold text-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-200 hover:-translate-y-1 active:translate-y-0"
              >
                Explorer les services
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2 text-green-600 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Experts vérifiés</span>
                </div>
                <p className="text-sm text-gray-400 font-medium">
                  Satisfaction garantie à 100%
                </p>
              </div>
            </div>

            {/* PREUVE SOCIALE */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 p-4 rounded-3xl bg-gray-50/50 border border-gray-100 w-fit mx-auto lg:mx-0">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/150?u=${i + 20}`}
                    alt="User"
                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
                <div className="h-10 w-10 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                  +10k
                </div>
              </div>
              <p className="text-sm text-gray-600 font-semibold">
                Rejoint par <span className="text-blue-600">10,000+</span>{" "}
                utilisateurs satisfaits
              </p>
            </div>
          </div>

          {/* --- IMAGE --- */}
          <div className="relative order-1 lg:order-2">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-[8px] border-white transition-transform duration-500 hover:scale-[1.02]">
              <img
                src="/image/hero.jpg"
                alt="Espace de travail professionnel"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />

              {/* Badge flottant sur l'image */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-[2rem] border border-white/20 shadow-xl hidden sm:block animate-slide-up">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 font-black">
                    4.9
                  </div>
                  <div>
                    <p className="font-black text-gray-900">Note globale</p>
                    <p className="text-sm text-gray-500 font-medium">
                      Basée sur 5000+ avis clients
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Éléments de décor derrière l'image */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-400 rounded-full blur-[100px] opacity-20 z-0" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-400 rounded-full blur-[100px] opacity-20 z-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
