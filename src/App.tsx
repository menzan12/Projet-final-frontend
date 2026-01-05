import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AdminRoute } from "./components/AdminRoute"; // Import de la protection

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Services from "./pages/services/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ServiceDetail from "./pages/services/ServiceDetail";

// Composants
import AIChat from "./components/AIChat";
import AdminDashboard from "./pages/Dashboard/AdminDash";
import ServiceBooking from "./pages/services/ServiceBooking";

import MyBookings from "./pages/MyBookings";
import Profile from "./pages/profile";
import Chat from "./pages/Chat";
import ClientDash from "./pages/Dashboard/ClientDash";
import VendorDash from "./pages/Dashboard/VendorDash";
import VendorService from "./pages/VendorService";
import VendorBookings from "./pages/VendorBookings";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AIChat />
        <Routes>
          {/* Routes Publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/services/:id/book" element={<ServiceBooking />} />
          <Route path="/ClientDash" element={<ClientDash />} />
          <Route path="/vendorDash" element={<VendorDash />} />
          <Route path="/vendorService" element={<VendorService />} />
          <Route path="/vendorBookings" element={<VendorBookings />} />

          <Route
            path="/vendor"
            element={<Navigate to="/vendorDash" replace />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat/:bookingId" element={<Chat />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Route Admin Protégée */}
          {/* On utilise /admin/* pour permettre au dashboard d'avoir 
              ses propres sous-routes (ex: /admin/users, /admin/stats) 
          */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* Fallback : 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
