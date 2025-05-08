import React from "react";
import LatestProducts from "../../../components/Client/LatestProducts/LatestProducts";
import FeaturedProducts from "../../../components/Client/FeaturedProducts/FeaturedProducts";
import PetSection from "../../../components/Client/PetSection/PetSection";
import AccessoriesSection from "../../../components/Client/AccessoriesSection/AccessoriesSection";
const HomePage = () => {
  return (
    <div>
      <div className="wrap-bread-crumb">
        <div className="container">
          <div className="bread-crumb">
            <a href="">Trang chủ</a>
            <span>Danh mục sản phẩm</span>
          </div>
        </div>
      </div>
      <LatestProducts />
      <FeaturedProducts />
      <PetSection />
      <AccessoriesSection />
    </div>
  );
};

export default HomePage;
