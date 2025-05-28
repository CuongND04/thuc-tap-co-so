import {React, useState, useEffect } from "react";
import CellComp from "./CellComp";
import { useProductStore } from "../../store/useProductStore";

const Section = ({text, maxProd, reverseSort, onlyOne, isNew}) => {

    const { getAllProducts, isGettingAllProducts } = useProductStore();
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    maxProd>0 ? maxProd : 8;
      
      useEffect(() => {
        const fetchProduct = async () => {
          const product = await getAllProducts();

          if(reverseSort) setProducts(product.sort().reverse());
          else setProducts(product);

          console.log(product);

          if(onlyOne=="pet") setProducts(product.filter((prod) => prod.maDanhMuc <= 12));
          else if(onlyOne=="accessory") setProducts(product.filter((prod) => prod.maDanhMuc > 12));
        };

        fetchProduct(); // Gọi hàm async bên trong useEffect
      }, []);

    return (
    <section className="pt-0 pb-0 pl-[138px] pr-[138px] w-[100%] mb-[10px] mt-[10px] ml-0 mr-0">
        <div className="w-[100%] mb-[21px]">
          <div className="mt-[10px] mb-[10px] ml-0 mr-0">
            <div className="text-center uppercase font-bold mb-[20px]">
              <a href="#">
                <strong className="font-[Coiny] text-[30px] text-[#de8ebe]">{text}</strong>
              </a>
            </div>
            
            <article>
              <div className="flex flex-wrap items-center justify-between">
              {products.length>0 && products.slice(0, maxProd).map((prod) => (
                <CellComp key={prod.maSanPham} prodID={prod.maSanPham} imgSource={prod.hinhAnh} prodName={prod.tenSanPham} price={prod.giaBan} newStat={isNew} />
              ))}
              </div>
            </article>
            <div className="w-[100%] flex justify-end">
              <div className="mt-[5px] mb-[15px] ml-0 mr-0 flex justify-center items-center bg-[#de8ebe] rounded-[10px] w-[140px] h-[40px] hover:bg-[#cf72aa]">
                <a className="flex justify-center items-center border-[1px] border-dashed border-[#fff] rounded-[10px] text-[16px] font-bold w-[135px] h-[35px] hover:bg-[#cf72aa] after:content-['\276F'] after:m-[10px] text-white" href="/danh-muc-cun">Xem Thêm</a>
              </div>
            </div>
          </div>
        </div>
      </section>
)
}

export default Section;