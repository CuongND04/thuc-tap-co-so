import React, { useEffect } from "react";
import Header from "./components/Client/Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Client/HomePage/HomePage";
import Footer from "./components/Client/Footer/Footer";
import DogCategory from "./pages/Client/DogCategory/DogCategory";
import Login from "./pages/Client/Login.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AdminLayout from "./components/Admin/AdminLayout";
import ClientLayout from "./components/Client/ClientLayout/ClientLayout";
import ManageProducts from "./pages/Admin/ManageAccessory.jsx";
import ManageCategories from "./pages/Admin/ManageCategories.jsx";
import ImportOrders from "./pages/Admin/ImportOrders.jsx";
import SalesOrders from "./pages/Admin/SalesOrders.jsx";
import ManageUsers from "./pages/Admin/ManageUsers.jsx";
import ManageSuppliers from "./pages/Admin/ManageSuppliers.jsx";
import RevenueReports from "./pages/Admin/RevenueReports.jsx";
import UserProfile from "./pages/Admin/UserProfile.jsx";
import ManagePet from "./pages/Admin/ManagePet.jsx";
import ManageAccessory from "./pages/Admin/ManageAccessory.jsx";
import Registeration from "./pages/Client/Registration.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import LoginAdmin from "./pages/Admin/LoginAdmin.jsx";
import ProtectedRoute from "./components/Admin/ProtectedRoute.jsx";
const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  // console.log("isCheckingAuth:", isCheckingAuth);
  console.log("authUser:", authUser);
  return (
    <div>
      <Routes>
        {/* client route */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path="danh-muc-cun" element={<DogCategory />} />
          <Route path="dang-nhap" element={<Login />} />
          <Route path="dang-ky" element={<Registeration />} />
        </Route>

        {/* Admin route */}
        <Route
          path="/admin/login"
          element={
            authUser ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <LoginAdmin />
            )
          }
        />

        {/* Bọc tất cả route cần bảo vệ trong ProtectedRoute */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="pet" element={<ManagePet />} />
            <Route path="accessory" element={<ManageAccessory />} />
            <Route path="categories" element={<ManageCategories />} />
            <Route path="import" element={<ImportOrders />} />
            <Route path="sales" element={<SalesOrders />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="suppliers" element={<ManageSuppliers />} />
            <Route path="reports" element={<RevenueReports />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
