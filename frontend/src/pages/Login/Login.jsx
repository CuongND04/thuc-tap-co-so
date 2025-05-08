import React from "react";
import LatestProducts from "../../components/LatestProducts/LatestProducts";
import "./Login.css";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import PetSection from "../../components/PetSection/PetSection";
import AccessoriesSection from "../../components/AccessoriesSection/AccessoriesSection";
const HomePage = () => {
  return (
    <div>
      <div class="wrap-bread-crumb">
        <div class="container">
          <div class="bread-crumb">
            <a href="">Trang chủ</a>
            <span>Danh mục sản phẩm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
