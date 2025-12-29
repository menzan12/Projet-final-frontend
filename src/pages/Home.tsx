import { Link } from "react-router-dom";
import Hero from "../components/home/Hero";
import Navbar from "../components/home/Navbar";
import { ArrowRight, Monitor, Scale, Target } from "lucide-react";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />

      {/* Section Stats */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Stat 1 */}
            <div className="p-6 rounded-xl shadow-md bg-white animate-slide-up hover:shadow-lg hover:-translate-y-1 transition-transform">
              <h4 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                10k+
              </h4>
              <p className="text-sm text-gray-600 tracking-wide">
                Clients satisfaits
              </p>
            </div>

            {/* Stat 2 */}
            <div
              className="p-6 rounded-xl shadow-md bg-white animate-slide-up hover:shadow-lg hover:-translate-y-1 transition-transform"
              style={{ animationDelay: "0.15s" }}
            >
              <h4 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                500+
              </h4>
              <p className="text-sm text-gray-600 tracking-wide">
                Experts qualifiés
              </p>
            </div>

            {/* Stat 3 */}
            <div
              className="p-6 rounded-xl shadow-md bg-white animate-slide-up hover:shadow-lg hover:-translate-y-1 transition-transform"
              style={{ animationDelay: "0.3s" }}
            >
              <h4 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                4.9/5
              </h4>
              <p className="text-sm text-gray-600 tracking-wide">
                Note moyenne
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section className="py-16 bg-blue-50">
        <div className="container-main">
          {/* En-tête */}
          <div className="mb-12 text-center">
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              NOS SERVICES
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Ce que nous offrons
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explorez une large gamme de services adaptés à vos besoins
              personnels et professionnels. Nous connectons les meilleurs
              talents pour vos projets.
            </p>
          </div>

          {/* Cartes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-5">
            {/* Carte 1 */}
            <div className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-transform hover:-translate-y-1">
              <div className="flex items-center px-4 py-4">
                <div className="border border-blue-100  bg-blue-100 rounded-md p-3">
                  <Scale className="text-3xl text-orange-500" />
                </div>
              </div>
              <div className="p-5">
                <span className="inline-block mb-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white text-xs font-semibold rounded-full px-3 py-1 shadow-md">
                  Consultation Juridique
                </span>
                <p className="text-sm text-gray-600 mb-4">
                  Atteignez vos objectifs de vie et de carrière avec des coachs
                  certifiés. Un accompagnement sur mesure pour réussir.
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:gap-3 transition-all"
                >
                  En savoir plus <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            {/* Cartes2*/}
            <div className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-transform hover:-translate-y-1">
              <div className="flex items-center px-4 py-4">
                <div className="border border-blue-100  bg-blue-100 rounded-md p-3">
                  <Monitor className="text-3xl text-orange-500" />
                </div>
              </div>
              <div className="p-5">
                <span className="inline-block mb-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white text-xs font-semibold rounded-full px-3 py-1 shadow-md">
                  Dépannage Informatique
                </span>
                <p className="text-sm text-gray-600 mb-4">
                  Support technique à distance ou sur site pour résoudre vos
                  problèmes.'
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:gap-3 transition-all"
                >
                  En savoir plus <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            {/* Cartes3 */}
            <div className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-transform hover:-translate-y-1">
              <div className="flex items-center px-4 py-4">
                <div className="border border-blue-100  bg-blue-100 rounded-md p-3">
                  <Target className="text-3xl text-orange-500" />
                </div>
              </div>
              <div className="p-5">
                <span className="inline-block mb-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white text-xs font-semibold rounded-full px-3 py-1 shadow-md">
                  Coaching Personnel
                </span>
                <p className="text-sm text-gray-600 mb-4">
                  Atteignez vos objectifs de vie et de carrière avec des coachs
                  certifiés.
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:gap-3 transition-all"
                >
                  En savoir plus <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
