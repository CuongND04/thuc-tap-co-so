import React from "react";
import CategoryList from "../../components/CategoryList/CategoryList";

const DogCategory = () => {
  return (
    <div>
      <div class="wrap-bread-crumb">
        <div class="container">
          <div class="bread-crumb">
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
