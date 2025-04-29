import React from "react";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import DogCategory from "./pages/DogCategory/DogCategory";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/danh-muc-cun" element={<DogCategory />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
