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
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services/Service";
import DashVendor from "./pages/Vendor/dashVendor";
import ProfilVendor from "./pages/Vendor/ProfilVendor";
import DashClient from "./pages/Clients/dashClient";
import Contact from "./pages/Contact";
import About from "./pages/About";
import DetailServices from "./pages/Services/DetailServices";
import DashAdmin from "./pages/Admin/dashAdmin";
import UsersManagement from "./pages/Admin/UsersManagement";
import Subscriptions from "./pages/Admin/Subscriptions";
import Analytics from "./pages/Admin/Analytics";
import Profil from "./pages/Profil";
import VendorService from "./pages/Vendor/VendorService";
import VendorBookings from "./pages/Vendor/VendorBooking";
import CreateService from "./pages/Vendor/CreateServicePage";
import BookingPage from "./pages/Services/BookingPage";
import MyBooking from "./pages/MyBooking";

// Composants Globaux
import AIChat from "./Components/AIChat"; // Importation du Chat IA

// --- COMPOSANT DE PROTECTION AVANCÉ ---
const AuthGuard = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const { user, loading } = useAuthStore();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirection si le prestataire n'a pas fini son profil
  if (
    user.role === "vendor" &&
    !user.isProfileComplete &&
    location.pathname !== "/profilVendor"
  ) {
    return <Navigate to="/profilVendor" replace />;
  }

  // Vérification des rôles
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const App = () => {
  const { checkAuth, loading, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Écran de chargement initial
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-50 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-t-blue-600 rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-slate-900 font-black text-xl tracking-tighter">
            Skill<span className="text-blue-600">Market</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {/* Notifications */}
      <ToastContainer position="top-right" autoClose={4000} theme="colored" />

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
        <Route path="/services/:id/book" element={<BookingPage />} />

        {/* --- ROUTES PRIVÉES (CLIENT & VENDOR) --- */}
        <Route
          element={<AuthGuard allowedRoles={["client", "vendor", "admin"]} />}
        >
          <Route path="/dashClient" element={<DashClient />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/myBooking" element={<MyBooking />} />
        </Route>

        {/* --- ROUTES VENDEURS --- */}
        <Route element={<AuthGuard allowedRoles={["vendor"]} />}>
          <Route path="/dashVendor" element={<DashVendor />} />
          <Route path="/vendorService" element={<VendorService />} />
          <Route path="/vendorBooking" element={<VendorBookings />} />
          <Route path="/createService" element={<CreateService />} />
        </Route>

        {/* --- ROUTES ADMIN --- */}
        <Route element={<AuthGuard allowedRoles={["admin"]} />}>
          <Route path="/dashAdmin" element={<DashAdmin />} />
          <Route path="/dashAdmin/community" element={<UsersManagement />} />
          <Route path="/dashAdmin/abonnement" element={<Subscriptions />} />
          <Route path="/dashAdmin/graphiques" element={<Analytics />} />
        </Route>

        <Route
          path="/profilVendor"
          element={
            user?.role === "vendor" ? (
              <ProfilVendor />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* --- CHAT IA FLOTTANT --- */}
      {/* On l'affiche uniquement si l'utilisateur est connecté pour qu'il puisse interagir avec l'IA */}
      {user && <AIChat />}
    </BrowserRouter>
  );
};

export default App;
