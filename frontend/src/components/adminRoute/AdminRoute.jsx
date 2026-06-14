import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { UserInfo } = useSelector((state) => state.auth);
  
  return UserInfo && UserInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};
export default AdminRoute;
