import type { User } from "../../../types";

interface Props {
  user: User;
  onLogout: () => void;
}

const UserMenu = ({ user, onLogout }: Props) => {
  return (
    <div className="relative">
      <button className="flex items-center gap-2">
        <img
          src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
          className="w-8 h-8 rounded-full"
        />
        <span>{user.name}</span>
      </button>

      <div className="absolute right-0 mt-2 bg-white shadow rounded w-48">
        {user.role === "admin" && (
          <a href="/admin" className="block px-4 py-2 hover:bg-gray-100">
            Admin Dashboard
          </a>
        )}
        <a href="/profile" className="block px-4 py-2">
          Profil
        </a>
        <button
          onClick={onLogout}
          className="w-full text-left px-4 py-2 text-red-600"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
