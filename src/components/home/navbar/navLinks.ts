import { Home, Briefcase, Users, Settings } from "lucide-react";

export const navLinksByRole = {


  client: [
    { name: "Dashboard", path: "/client-dashboard", icon: Home },
  ],
  vendor: [
    { name: "Dashboard", path: "/vendor-dashboard", icon: Home },
    { name: "Mes services", path: "/vendor/services", icon: Briefcase },
  ],
  admin: [
    { name: "Admin", path: "/admin", icon: Home },
    { name: "Utilisateurs", path: "/admin/users", icon: Users },
    { name: "Paramètres", path: "/admin/settings", icon: Settings },
  ],
};
