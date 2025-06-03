import { React, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useParams, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate"
// import "./Detail.css";
import { useProductStore } from "../../store/useProductStore";
import CategoryList from "../../components/Client/CategoryList";
import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";
import CellComp from "../../components/Client/CellComp";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const SearchPage = () => {
  const { getAllProducts, isGettingAllProducts } = useProductStore();
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const { state } = useLocation();

  const [page, setPage] = useState(0);
  const [currentProducts, setcurrentProducts] = useState();
  const [prodPerPage, setProdPerPage] = useState(4);
  const [sorting, setSorting] = useState(1);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const changeProdPerPage = (e) => {
  setProdPerPage(e.target.value)
};

const changeSorting = (e) => {
  setSorting(e.target.value);
};



  useEffect(() => {
      const fetchProduct = async () => {
        const product = await getAllProducts();
        if(id)
        {
          if(id=="phu-kien") setProducts(product.filter((prod) => prod.maDanhMuc > 6));

          else if(id=="cho") setProducts(product.filter((prod) => prod.tenDanhMuc.toLowerCase().includes("chó")));

          else if(id=="meo") setProducts(product.filter((prod) => prod.tenDanhMuc.toLowerCase().includes("mèo")));

          else setProducts(product.filter((prod) => prod.tenDanhMuc == id));

        }
        else setProducts(product);
      };
  
      fetchProduct(); // Gọi hàm async bên trong useEffect
    }, [id]);

    console.log(products, state);

  useEffect(() => {
    if(state) 
    {
      const filteredItems = products.filter((prod) => prod.tenSanPham.toLowerCase().includes(state.toLowerCase()));
      setFilteredProducts(filteredItems);
    }
    else setFilteredProducts(products);

  }, [products, state])

  useEffect(() => {
    switch (sorting)
    {
      case "1":
        {
          setFilteredProducts(
            filteredProducts.sort((a, b) => {
            return a.maSanPham - b.maSanPham;
          })
          );
          break;
        }

      case "2":
        {
          setFilteredProducts(
            filteredProducts.sort((a, b) => {
            return b.maSanPham - a.maSanPham;
          })
          );
          break;
        }

      case "3":
        {
          setFilteredProducts(
            filteredProducts.sort((a, b) => {
            if (a.tenSanPham < b.tenSanPham) return -1;
            if (a.tenSanPham > b.tenSanPham) return 1;
            return 0;
          })
          );
          break;
        }

      case "4":
        {
          setFilteredProducts(
            filteredProducts.sort((a, b) => {
            if (a.tenSanPham > b.tenSanPham) return -1;
            if (a.tenSanPham < b.tenSanPham) return 1;
            return 0;
          })
          );
          break;
        }

      case "5":
        {
          setFilteredProducts(
            filteredProducts.sort((a, b) => {
            return a.giaBan - b.giaBan;
          })
          );
          break;
        }

      case "6":
        {
          setFilteredProducts(
            filteredProducts.sort((a, b) => {
            return b.giaBan - a.giaBan;
          })
          );
          break;
        }
    }

  }, [sorting])

  useEffect(() => {
  setcurrentProducts(
    filteredProducts.filter((item, index) => {
      return (index >= page * prodPerPage) & (index < (page + 1) * prodPerPage);
    })
  );
}, [page, filteredProducts, prodPerPage, sorting]);

    

  return (
    <div className="mt-15 ml-30">
      <section className="flex">
        <aside className="w-[15%]">
          <CategoryList current={id||"all"} />{" "}
        </aside>
        <article className="w-[85%]">
          <div className="flex gap-x-5">
          <div className="flex gap-x-3 items-center">
          <p>Sắp xếp:</p>
          <div className="grid grid-cols-1 shrink-0 focus-within:relative mr-5">
              <select
                id="sorting"
                name="sorting"
                onChange={changeSorting}
                className="col-start-1 row-start-1 appearance-none rounded-md cursor-pointer py-1.5 pr-7 pl-3 text-base placeholder:text-gray-400 outline-1 outline-[#000] focus:outline-2 focus:-outline-offset-2 focus:outline-[#de8ebe]"
              >
                <option value="1">Mã sản phẩm: A-Z</option>
                <option value="2">Mã sản phẩm: Z-A</option>
                <option value="3">Tên: A-Z</option>
                <option value="4">Tên: Z-A</option>
                <option value="5">Giá: thấp-cao</option>
                <option value="6">Giá: cao-thấp</option>
              </select>
              <ChevronDownIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
              </svg> */}
          </div>
          </div>

          <div className="flex gap-x-3 items-center">
          <p>Số sản phẩm hiển thị:</p>
          <div className="grid grid-cols-1 shrink-0 focus-within:relative mr-5">
              <select
                id="prodPerPage"
                name="prodPerPage"
                onChange={changeProdPerPage}
                className="col-start-1 row-start-1 appearance-none rounded-md cursor-pointer py-1.5 pr-7 pl-3 text-base placeholder:text-gray-400 outline-1 outline-[#000] focus:outline-2 focus:-outline-offset-2 focus:outline-[#de8ebe]"
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="12">12</option>
                <option value="16">16</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
              </svg>
            </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-start">
            {currentProducts && (currentProducts.map((prod) => (

              <CellComp
                            key={prod.maSanPham}
                            prodID={prod.maSanPham}
                            imgSource={prod.hinhAnh}
                            prodName={prod.tenSanPham}
                            price={prod.giaBan}
                          />
            )))}
          </div>
          <ReactPaginate className="flex items-center justify-center cursor-pointer"
        containerClassName={"list-none h-[31.5px] w-[31.5px] flex items-center mt-[2px] ml-10 cursor-pointer"}
        pageClassName={"list-none pt-[2px] pb-[2px] pl-[12px] pr-[12px] h-[31.5px] w-[31.5px] flex items-center justify-center mt-[2px] hover:bg-[#de8ebe] rounded-[50%]"}
        activeClassName={"bg-[#cf72aa] rounded-[50%]"}
        onPageChange={(event) => setPage(event.selected)}
        pageCount={Math.ceil(filteredProducts.length / prodPerPage)}
        breakLabel="..."
        previousLabel={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
          </svg>

        }
        nextLabel={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
          </svg>

        }
        renderOnZeroPageCount={null}
      />

        </article>
      </section>
    </div>
  );
}

export default SearchPage;