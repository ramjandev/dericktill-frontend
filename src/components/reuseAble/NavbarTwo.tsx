import logo from "@/assets/images/logo.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavbarTwo = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-sm"
      style={{
        borderBottom: "1.173px solid rgba(0, 0, 0, 0.10)",
        background: scrolled
          ? "rgba(0, 0, 0, 0.50)"
          : "rgba(255, 255, 255, 0.14)",
      }}
    >
      <div className="px-6 md:px-31">
        <div className="w-full h-17 flex items-center justify-between">
          <Link to="/" className="h-full w-17">
            <img
              src={logo}
              alt="Feasible Logo"
              className="w-full h-full object-cover bg-white"
            />
          </Link>

          <div className="flex items-center gap-.5 sm:gap-2">
            <Link
              to="/login"
              className="bg-[#06696D] text-white px-4.5 py-3 rounded-[6px]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarTwo;
