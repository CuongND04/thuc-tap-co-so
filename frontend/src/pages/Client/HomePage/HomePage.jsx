import { React, useState, useEffect } from "react";
import Section from "../../../components/Client/Section";
const HomePage = () => {
  return (
    <div className="mt-10">
      <Section
        text="Sản phẩm mới"
        maxProd={4}
        reverseSort={true}
        onlyOne="pet"
        isNew={true}
      />
      {/* Featured Products */}
      <Section text="Sản phẩm nổi bật" maxProd={4} />
      {/* <PetSection /> */}
      <Section text="Shop bán pet thú cưng" maxProd={8} onlyOne="pet" />
      {/* <AccessoriesSection /> */}
      <Section text="Phụ kiện thú cưng" maxProd={8} onlyOne="accessory" />
    </div>
  );
};

export default HomePage;
