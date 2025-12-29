import { Link, useLocation } from "react-router-dom";
import type { User } from "../../../types";
import { navLinksByRole } from "./navLinks";

interface Props {
  user: User | null;
  isAuthenticated: boolean;
}

const DesktopNavLinks = ({ user, isAuthenticated }: Props) => {
  const location = useLocation();

  if (!isAuthenticated || !user) return null;

  const links = navLinksByRole[user.role];

  return (
    <div className="hidden md:flex items-center space-x-1">
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            location.pathname === link.path
              ? "bg-blue-50 text-blue-600"
              : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
          }`}
        >
          <div className="flex items-center gap-2">
            {link.icon && <link.icon className="w-4 h-4" />}
            {link.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DesktopNavLinks;
