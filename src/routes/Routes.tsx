import Analyze from "@/pages/Analyze";
import AccessDenied from "@/pages/AccessDenied";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import SavedDealsPage from "@/pages/SavedDealsPage";
import WhopCallback from "@/pages/auth/WhopCallback";

import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import LandingLayout from "@/components/layout/LandingLayout";
import LandingPageTwo from "@/pages/LandingPageTwo";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "app", element: <Home /> },

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
        ],
      },

      { path: "login", element: <Login /> },
      { path: "auth/whop/callback", element: <WhopCallback /> },
      { path: "access-denied", element: <AccessDenied /> },
      { path: "register", element: <Navigate to="/login" replace /> },
      { path: "change-password", element: <Navigate to="/login" replace /> },
      { path: "forgot-password", element: <Navigate to="/login" replace /> },
      { path: "verify-otp", element: <Navigate to="/login" replace /> },
      { path: "reset-password", element: <Navigate to="/login" replace /> },

      { path: "*", element: <NotFound /> },
    ],
  },
  {
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <LandingPageTwo />,
      },
    ],
  },
]);

export default routes;
