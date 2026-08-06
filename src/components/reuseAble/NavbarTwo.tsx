import logo from "@/assets/images/logo.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, UserCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  clearStoredAccessToken,
  getSubscriptionSummary,
} from "@/store/features/auth/auth.helpers";
import {
  logout,
  selectAccessToken,
  selectSubscription,
  selectUser,
} from "@/store/features/auth/auth.slice";
import { useLogoutSessionMutation } from "@/store/features/auth/auth.api";

const NavbarTwo = () => {
  const [scrolled, setScrolled] = useState(false);
  const token = useSelector(selectAccessToken);
  const subscription = useSelector(selectSubscription);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutSession] = useLogoutSessionMutation();
  const subscriptionSummary = getSubscriptionSummary(subscription);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutSession().unwrap();
    } catch {
      // Clear the frontend state even if the backend token is already expired.
    } finally {
      clearStoredAccessToken();
      dispatch(logout());
      navigate("/", { replace: true });
    }
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
            {!token ? (
              <Link
                to="/login"
                className="bg-[#06696D] text-white px-4.5 py-3 rounded-[6px]"
              >
                Sign In
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-center w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 text-white font-semibold text-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/40">
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

                  {subscriptionSummary ? (
                    <>
                      <div className="space-y-1.5 px-2 py-2 text-xs text-gray-600">
                        {subscriptionSummary.subscriptionStatus ? (
                          <p>
                            Status:{" "}
                            {String(subscriptionSummary.subscriptionStatus)}
                          </p>
                        ) : null}
                        {subscriptionSummary.subscriptionTier ? (
                          <p>
                            Tier: {String(subscriptionSummary.subscriptionTier)}
                          </p>
                        ) : null}
                        {typeof subscriptionSummary.seatCount === "number" ? (
                          <p>Seats: {subscriptionSummary.seatCount}</p>
                        ) : null}
                        {subscriptionSummary.subscriptionEndsAt ? (
                          <p>
                            Ends:{" "}
                            {new Date(
                              String(subscriptionSummary.subscriptionEndsAt),
                            ).toLocaleDateString()}
                          </p>
                        ) : null}
                        {typeof subscriptionSummary.cancelAtPeriodEnd ===
                        "boolean" ? (
                          <p>
                            Cancel at period end:{" "}
                            {subscriptionSummary.cancelAtPeriodEnd
                              ? "Yes"
                              : "No"}
                          </p>
                        ) : null}
                      </div>
                      <DropdownMenuSeparator />
                    </>
                  ) : null}

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
      </div>
    </nav>
  );
};

export default NavbarTwo;
