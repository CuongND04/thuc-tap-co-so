import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const ClientLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Đây là nơi các component con sẽ được render */}
      </main>
      <Footer />
    </>
  );
};

export default ClientLayout;
