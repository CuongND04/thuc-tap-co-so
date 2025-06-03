import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Client/HomePage/HomePage";
import DogCategory from "./pages/Client/DogCategory/DogCategory";
import Login from "./pages/Client/Login.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AdminLayout from "./components/Admin/AdminLayout";
import ClientLayout from "./components/Client/ClientLayout.jsx";
import ManageProducts from "./pages/Admin/ManageAccessory.jsx";
import ProductDetailClient from "./pages/Client/ProductDetail.jsx";
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
import ProductDetail from "./pages/Admin/ProductDetail.jsx";
import CategoryDetail from "./pages/Admin/CategoryDetail.jsx";
import CreateCategory from "./pages/Admin/CreateCategory.jsx";
import UserDetail from "./pages/Admin/UserDetail.jsx";
import UserCreate from "./pages/Admin/UserCreate.jsx";
import CreatePetProduct from "./pages/Admin/CreatePetProduct.jsx";
import CreateAccessoryProduct from "./pages/Admin/CreateAccessoryProduct.jsx";
import Profile from "./pages/Client/Profile.jsx";
import ImportDetail from "./pages/Admin/ImportDetail.jsx";
import ImportCreate from "./pages/Admin/ImportCreate.jsx";
import SaleDetail from "./pages/Admin/SaleDetail.jsx";
import SaleCreate from "./pages/Admin/SaleCreate.jsx";
import Contact from "./pages/Client/Contact.jsx";
import Intro from "./pages/Client/Intro.jsx";
import FavorList from "./pages/Client/FavorList.jsx";
import Search from "./pages/Client/Search.jsx";
import MyOrder from "./pages/Client/MyOrder.jsx";
import DetailMyOrder from "./pages/Client/DetailMyOrder.jsx";
import Checkout from "./pages/Client/Checkout.jsx"
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
  // console.log("authUser:", authUser);
  return (
    <div>
      <Routes>
        {/* client route */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/trang-ca-nhan" element={<Profile />} />
          <Route path="danh-muc-cun" element={<DogCategory />} />
          <Route path="danh-muc-san-pham" element={<Search />} />
          <Route path="danh-muc-san-pham/:id" element={<Search />} />
          <Route path="dang-nhap" element={<Login />} />
          <Route path="dang-ky" element={<Registeration />} />
          <Route path="lien-he" element={<Contact />} />
          <Route path="gioi-thieu" element={<Intro />} />
          <Route path="yeu-thich" element={<FavorList />} />
          <Route path="don-hang" element={<MyOrder />} />
          <Route path="don-hang/:maDonHang" element={<DetailMyOrder />} />
          <Route path="/san-pham/:id" element={<ProductDetailClient />} />
          <Route path="/thanh-toan" element={<Checkout />} />
        </Route>

        <Route
          path="/admin/login"
          element={
            authUser && authUser.quyenTruyCap === "ADMIN" ? (
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
            <Route path="pet/:id/detail" element={<ProductDetail />} />
            <Route path="accessory/:id/detail" element={<ProductDetail />} />
            <Route path="pet/create" element={<CreatePetProduct />} />
            <Route
              path="accessory/create"
              element={<CreateAccessoryProduct />}
            />

            <Route path="categories" element={<ManageCategories />} />
            <Route path="categories/:id/detail" element={<CategoryDetail />} />
            <Route path="categories/create" element={<CreateCategory />} />

            <Route path="import" element={<ImportOrders />} />
            <Route
              path="import/detail/:maNhaCungCap/:maSanPham"
              element={<ImportDetail />}
            />
            <Route path="import/create" element={<ImportCreate />} />

            <Route path="sales" element={<SalesOrders />} />
            <Route path="sales/detail/:maDonHang" element={<SaleDetail />} />
            <Route path="sales/create" element={<SaleCreate />} />

            <Route path="users" element={<ManageUsers />} />
            <Route path="users/:id/detail" element={<UserDetail />} />
            <Route path="users/create" element={<UserCreate />} />

            <Route path="suppliers" element={<ManageSuppliers />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
