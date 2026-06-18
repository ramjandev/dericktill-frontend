import { logout, selectAccessToken } from "@/store/features/auth/auth.slice";
import { Home, LogIn, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { LuSave } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import CommonContainer from "./common/CommonContainer";

const navItems = [
  { label: "Analyze", icon: Home, path: "/analyze" },
  { label: "Saved Deals", icon: LuSave, path: "/saved" },
  { label: "Login", icon: LogIn, path: "/login" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const token = useSelector(selectAccessToken);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav
      className={`border-b sticky top-0 z-50 transition-all duration-300 backdrop-blur-sm ${
        scrolled ? "bg-black/50 border-white/10" : "bg-black/20 border-white/10"
      }`}
    >
      <CommonContainer>
        <div className="w-full h-17 flex items-center justify-between">
          <Link to="/" className="h-full">
            <img
              src={logo}
              alt="Feasible Logo"
              className="w-full h-full object-cover"
            />
          </Link>

          <div className="flex items-center gap-.5 sm:gap-2">
            {navItems.map(({ label, icon: Icon, path }) => {
              if (label === "Login" && token) return null;

              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-sm font-medium transition-all truncate ${
                      isActive
                        ? "bg-white text-gray-900"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`
                  }
                >
                  <Icon size={14} className="min-w-4 min-h-4 " />
                  {label}
                </NavLink>
              );
            })}

            {token && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <LogOut size={14} />
                Logout
              </button>
            )}
          </div>
        </div>
      </CommonContainer>
    </nav>
  );
};

export default Navbar;
