import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // const { accessToken } = useSelector((state: RootState) => state.auth);

  // if (!accessToken) {
  //   return <Navigate to="/login" replace />;
  // }
  return <Outlet />;
};

export default ProtectedRoute;
