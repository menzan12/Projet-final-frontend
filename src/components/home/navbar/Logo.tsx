import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5 group transition-transform active:scale-95"
    >
      <div className="w-10 h-10 flex items-center justify-center">
        <img
          src="/image/Logo.png"
          alt="SkillMarket Logo"
          className="w-full h-full object-contain group-hover:rotate-12 transition-transform duration-300"
        />
      </div>
      <span
        className="hidden sm:block text-2xl font-black 
                   bg-gradient-to-r from-blue-600 to-orange-500 
                   bg-clip-text text-transparent font-display"
      >
        SkillMarket
      </span>
    </Link>
  );
};

export default Logo;
