import React from "react";
import Header from "./components/Client/Header/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Client/HomePage/HomePage";
import Footer from "./components/Client/Footer/Footer";
import DogCategory from "./pages/Client/DogCategory/DogCategory";
import Login from "./pages/Client/Login/Login";
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

const App = () => {
  return (
    <div>
      <Routes>
        {/* client route */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path="danh-muc-cun" element={<DogCategory />} />
          <Route path="dang-nhap" element={<Login />} />
        </Route>
        {/* admin route */}
        <Route path="/admin" element={<AdminLayout />}>
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
      </Routes>
    </div>
  );
};

export default App;
