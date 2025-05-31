import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer/Footer.jsx";
import Breadcrumb from "./Breadcrumb.jsx"; // mới thêm

const ClientLayout = () => {
  return (
    <>
      <Header />
      <Breadcrumb />
      <main className="min-h-screen px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default ClientLayout;
