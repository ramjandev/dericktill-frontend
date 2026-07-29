import { getStoredAccessToken } from "@/store/features/auth/auth.helpers";
import { selectAccessToken } from "@/store/features/auth/auth.slice";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const accessToken = useSelector(selectAccessToken);
  const hasAccessToken = Boolean(accessToken ?? getStoredAccessToken());

  if (!hasAccessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
