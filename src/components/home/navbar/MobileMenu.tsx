import { Link } from "react-router-dom";

import { navLinksByRole } from "./navLinks";
import { LogOut } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import type { User } from "../../../types";

interface Props {
  user: User | null;
  isAuthenticated: boolean;
}

const MobileMenu = ({ user, isAuthenticated }: Props) => {
  const { logout } = useAuth();

  if (!isAuthenticated || !user) return null;

  const links = navLinksByRole[user.role];

  return (
    <div className="md:hidden border-t border-gray-200 bg-white">
      <div className="px-4 py-4 space-y-1">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {link.icon && <link.icon className="w-5 h-5" />}
            {link.name}
          </Link>
        ))}

        <div className="pt-4 mt-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
