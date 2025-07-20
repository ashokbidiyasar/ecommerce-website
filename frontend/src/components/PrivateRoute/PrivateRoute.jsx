import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { UserInfo } = useSelector((state) => state.auth);
  return UserInfo ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
