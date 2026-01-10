import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useAuthStore } from "./stores/useAuthStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import NotFound from "./Pages/NotFound";
import Services from "./Pages/Services/Service";
import DashVendor from "./Pages/Vendor/dashVendor";
import ProfilVendor from "./Pages/Vendor/ProfilVendor";
import DashClient from "./Pages/Clients/dashClient";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import DetailServices from "./Pages/Services/DetailServices";
import Profil from "./Pages/Profil";
import DashAdmin from "./Pages/Admin/dashAdmin";
import UsersManagement from "./Pages/Admin/UsersManagement";
import Subscriptions from "./Pages/Admin/Subscriptions";
import Analytics from "./Pages/Admin/Analytics";

// --- COMPOSANT DE PROTECTION AVANCÉ ---
const AuthGuard = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const { user, loading } = useAuthStore();
  const location = useLocation();

  if (loading) return null;

  // 1. Si pas d'utilisateur connecté
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. LOGIQUE VENDOR : Redirection forcée vers onboarding si profil incomplet
  if (
    user.role === "vendor" &&
    !user.isProfileComplete &&
    location.pathname !== "/profilVendor"
  ) {
    console.warn(
      "[Guard] Profil Vendor incomplet. Redirection vers onboarding."
    );
    return <Navigate to="/profilVendor" replace />;
  }

  // 3. Protection par Rôle (ex: empêcher un client d'aller sur dashAdmin)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.error("[Guard] Accès refusé : Rôle insuffisant.");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const App = () => {
  const { checkAuth, loading, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Écran de chargement global de l'application
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-50 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-t-blue-600 rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <div className="text-center">
            <p className="text-slate-900 font-black text-xl tracking-tight">
              SkillMarket
            </p>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] animate-pulse mt-1">
              Initialisation sécurisée...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {/* Conteneur de notifications global */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        {/* --- ROUTES PUBLIQUES --- */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            !user ? (
              <Login />
            ) : (
              <Navigate
                to={user.role === "admin" ? "/dashAdmin" : "/"}
                replace
              />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<DetailServices />} />

        {/* --- ROUTES PRIVÉES (ACCESSIBLES PAR TOUS LES CONNECTÉS) --- */}
        <Route
          element={<AuthGuard allowedRoles={["client", "vendor", "admin"]} />}
        >
          <Route path="/dashClient" element={<DashClient />} />
          <Route path="/profil" element={<Profil />} />
        </Route>

        {/* --- ROUTES VENDEURS --- */}
        <Route element={<AuthGuard allowedRoles={["vendor"]} />}>
          <Route path="/dashVendor" element={<DashVendor />} />
        </Route>

        {/* --- ROUTES ADMIN --- */}
        <Route element={<AuthGuard allowedRoles={["admin"]} />}>
          <Route path="/dashAdmin" element={<DashAdmin />} />
          <Route path="/dashAdmin/community" element={<UsersManagement />} />
          <Route path="/dashAdmin/abonnement" element={<Subscriptions />} />
          <Route path="/dashAdmin/graphiques" element={<Analytics />} />
        </Route>

        {/* --- ROUTE ONBOARDING VENDOR --- */}
        <Route
          path="/profilVendor"
          element={
            user && user.role === "vendor" ? (
              user.isProfileComplete ? (
                <Navigate to="/dashVendor" replace />
              ) : (
                <ProfilVendor />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* --- 404 --- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
