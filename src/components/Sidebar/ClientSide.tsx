import { Link } from "react-router-dom";

function ClientSide({
  icon,
  label,
  to,
  active = false,
}: {
  icon: any;
  label: string;
  to: string;
  active?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-4 px-6 py-4 rounded-2xl cursor-pointer transition-all duration-300 group ${
        active
          ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
          : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
      }`}
    >
      <span
        className={`${
          active ? "text-white" : "text-gray-300 group-hover:text-blue-500"
        } transition-colors`}
      >
        {icon}
      </span>
      <span className="font-black text-sm tracking-tight">{label}</span>
    </Link>
  );
}

export default ClientSide;
