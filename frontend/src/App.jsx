import React from "react";
import Header from "./components/Client/Header/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Client/HomePage/HomePage";
import Footer from "./components/Client/Footer/Footer";
import DogCategory from "./pages/Client/DogCategory/DogCategory";
import Login from "./pages/Client/Login/Login";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/danh-muc-cun" element={<DogCategory />} />
        <Route path="/dang-nhap" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
