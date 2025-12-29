import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center transition">
        <img src="/image/Logo.png" alt="Image Logo" />
      </div>
      <span
        className="hidden sm:block text-xl font-bold 
                   bg-gradient-to-r from-blue-600 to-orange-500 
                   bg-clip-text text-transparent"
      >
        SkillMarket
      </span>
    </Link>
  );
};

export default Logo;
