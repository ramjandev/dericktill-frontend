import logo from "@/assets/images/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  logout,
  selectAccessToken,
  selectUser,
} from "@/store/features/auth/auth.slice";
import { Home, KeyRound, LogIn, LogOut, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { LuSave } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CommonContainer from "../common/CommonContainer";

const navItems = [
  { label: "Analyze", icon: Home, path: "/analyze" },
  { label: "Saved Deals", icon: LuSave, path: "/saved" },
  { label: "Login", icon: LogIn, path: "/login" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const token = useSelector(selectAccessToken);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav
      className={`border-b sticky top-0 z-50 transition-all duration-300 backdrop-blur-sm ${
        scrolled ? "bg-black/50 border-white/10" : "bg-white/14 border-white/10"
      }`}
    >
      <CommonContainer>
        <div className="w-full h-17 flex items-center justify-between">
          <Link to="/" className="h-full w-17">
            <img
              src={logo}
              alt="Feasible Logo"
              className="w-full h-full object-cover bg-white"
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

            {/* ✅ Replaced logout button with avatar dropdown */}
            {token && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white font-semibold text-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40">
                    {user?.name ? (
                      getInitials(user.name)
                    ) : (
                      <UserCircle2 size={18} />
                    )}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-52 mt-2">
                  <DropdownMenuLabel className="flex flex-col gap-0.5 py-2">
                    <span className="text-sm font-semibold text-gray-900 truncate">
                      {user?.name || "My Account"}
                    </span>
                    <span className="text-xs font-normal text-gray-500 truncate">
                      {user?.email || ""}
                    </span>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => navigate("/change-password")}
                    className="flex items-center gap-2 cursor-pointer py-2"
                  >
                    <KeyRound size={14} className="text-gray-500" />
                    <span>Change Password</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer py-2 text-red-500 focus:text-red-500 focus:bg-red-50"
                  >
                    <LogOut size={14} />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CommonContainer>
    </nav>
  );
};

export default Navbar;
