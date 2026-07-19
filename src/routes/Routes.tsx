import Analyze from "@/pages/Analyze";
import AccessDenied from "@/pages/AccessDenied";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import SavedDealsPage from "@/pages/SavedDealsPage";
import WhopCallback from "@/pages/auth/WhopCallback";
import ChangePassword from "@/pages/auth/ChangePassword";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import VerifyOtp from "@/pages/auth/VerifyOtp";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "analyze",
            element: <Analyze />,
          },
          {
            path: "saved",
            element: <SavedDealsPage />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
        ],
      },

      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "auth/whop/callback", element: <WhopCallback /> },
      { path: "access-denied", element: <AccessDenied /> },

      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "verify-otp", element: <VerifyOtp /> },
      { path: "reset-password", element: <ResetPassword /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default routes;
