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

const SearchPage = () => {
  const { getAllProducts, isGettingAllProducts } = useProductStore();
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const { state } = useLocation();

  const [page, setPage] = useState(0);
  const [currentProducts, setcurrentProducts] = useState();
  const prodPerPage = 3

  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
      const fetchProduct = async () => {
        const product = await getAllProducts();
        if(id) setProducts(product.filter((prod) => prod.tenDanhMuc == id));
        else setProducts(product);
      };
  
      fetchProduct(); // Gọi hàm async bên trong useEffect
    }, [id]);

  useEffect(() => {
    const filteredItems = products.filter((prod) =>
    prod.tenSanPham.toLowerCase().includes(state.toLowerCase())
    );

    if(state) setFilteredProducts(filteredItems);
    else setFilteredProducts(products);

  }, [products, state])

  useEffect(() => {
  setcurrentProducts(
    filteredProducts.filter((item, index) => {
      return (index >= page * prodPerPage) & (index < (page + 1) * prodPerPage);
    })
  );
}, [page, filteredProducts, prodPerPage]);

  return (
    <div className="mt-15 ml-30">
      <section className="flex">
        <aside className="w-[15%]">
          <CategoryList current={id||"all"} />{" "}
        </aside>
        <article className="w-[85%]">
          <div className="flex flex-wrap items-center justify-between">
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
          <ReactPaginate className="flex items-center justify-center"
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        activeClassName={"active"}
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