import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const ProtectedRoute = () => {
  const { authUser } = useAuthStore();

  const isAdmin = authUser && authUser.quyenTruyCap === "ADMIN";

  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
