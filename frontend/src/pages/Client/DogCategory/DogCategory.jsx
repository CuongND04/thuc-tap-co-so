import React from "react";
import CategoryList from "../../../components/Client/CategoryList/CategoryList";

const DogCategory = () => {
  return (
    <div>
      <div className="wrap-bread-crumb">
        <div className="container">
          <div className="bread-crumb">
            <a href="">Trang chủ</a>
            <span>Danh mục cún</span>
          </div>
        </div>
      </div>
      <CategoryList />
    </div>
  );
};

export default DogCategory;
