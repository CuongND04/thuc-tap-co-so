import {React, useState, useEffect } from "react";
import { useCategoryStore } from "../../store/useCategoryStore";

const CategoryList = (props) => {
  const { getAllCategories, isGettingAllCategories } = useCategoryStore();

    const [categories, setCategories] = useState([]);
    useEffect(() => {
      const fetchCategory = async () => {
        const category = await getAllCategories();
        setCategories(category);
      };
      fetchCategory(); // Gọi hàm async bên trong useEffect
    }, []);

    const compareCurrent = (str) => {
      if(props.current==str) return true;
      else return false;
    }

  return (
          <div className="sidebar mr-[15px] p-[20px] border-[1px] border-solid border-[#e5e5e5] rounded-[4px]">
            <div className="sidebar-info mb-[30px]">
              <h3 className="font-bold text-[14px] uppercase mt-0 mb-[20px] pb-[10px] border-b-[1px] border-solid border-[#e5e5e5] font-[Dosis]">Danh Mục Sản Phẩm</h3>
              
              <ul className="product">
              {categories && categories.map((category) => (
                <>
                {compareCurrent(category.tenDanhMuc) ? (<li key={category.maDanhMuc} className="product-pet-iteam relateive mb-[10px] pt-[5px] pb-[5px]">
                  <a className="text-[#cf72aa] font-bold bg-transparent transition-all ease-out duration-[0.3s] delay-[0s]" href="#">
                    {category.tenDanhMuc}
                  </a>
                </li>) : (<li key={category.maDanhMuc} className="product-pet-iteam relateive mb-[10px] pt-[5px] pb-[5px]">
                  <a className="text-[#555] bg-transparent transition-all ease-out duration-[0.3s] delay-[0s] hover:text-[#cf72aa]" href={`/danh-muc-san-pham/${category.tenDanhMuc}`}>
                    {category.tenDanhMuc}
                  </a>
                </li>)}
                </>
              ))}
              </ul>

            </div>
        </div>

  )
};

export default CategoryList;
