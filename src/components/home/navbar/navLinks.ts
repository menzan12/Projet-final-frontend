import { Home, Settings, Users } from "lucide-react";

export const navLinksByRole = {
  admin: [
    { name: "Dashboard", path: "/admin", icon: Home },
    { name: "Gestion Users", path: "/admin/users", icon: Users },
    { name: "Paramètres", path: "/admin/settings", icon: Settings },
  ],
  vendor: [
    { name: "Mes Services", path: "/vendor/services", icon: Home },
    { name: "Ajouter Service", path: "/vendor/add-service", icon: Settings },
  ],
  client: [
    { name: "Mes Réservations", path: "/client/bookings", icon: Home },
    { name: "Profil", path: "/client/profile", icon: Settings },
  ],
};
