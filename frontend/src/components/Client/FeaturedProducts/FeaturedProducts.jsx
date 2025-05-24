import {React, useState, useEffect } from "react";
import CellComp from "../CellComp";
import { useProductStore } from "../../../store/useProductStore";



const FeaturedProducts = () => {
  const { getAllProducts, isGettingAllProducts } = useProductStore();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getAllProducts();
      setProducts(product);
    };
    fetchProduct(); // Gọi hàm async bên trong useEffect
  }, []);

  // if (isGettingAllProducts) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader className="size-10 animate-spin" />
  //     </div>
  //   );
  // }

  return (
    <main>
      <section>
        <div className="row">
          <div className="row-content">
            <div className="row-title">
              <a href="#">
                <strong>Sản Phẩm Nổi Bật</strong>
              </a>
            </div>
            
            <article>
              <div className="grid grid-cols-4 gap-x-50 gap-y-10 auto-cols-max justify-center">
              {products && products.map((prod) => (
                <CellComp key={prod.maSanPham} prodID={prod.maSanPham} imgSoure={prod.hinhAnh} prodName={prod.tenSanPham} price={prod.giaBan} />
              ))}
              </div>
            {/* <CellComp prodID="SP00370" imgSource="/IMG/TrangChu/TrangChu17.jpg" prodName="PHỐC SÓC BÉ XÍU CƯNG XĨU" price="20.000.000" newStat={true} /> */}

              {/* <div className="article-iteam">
                <div className="product-iteam">
                  <div className="product-thumb">
                    <div className="product-thumb-img">
                      <a href="#">
                        <div className="img">
                          <img
                            src="/IMG/TrangChu/TrangChu17.jpg"
                            alt="img"
                            width="270px"
                            height="270px"
                          />
                        </div>
                      </a>
                      <div className="function-icon">
                        <a href="#">
                          <i className="fa-regular fa-heart">
                            <div className="tooltip">Yêu Thích</div>
                          </i>
                        </a>
                        <a href="#">
                          <i className="fa-solid fa-magnifying-glass">
                            <div className="tooltip">Xem Nhanh</div>
                          </i>
                        </a>
                      </div>
                      <div className="function-buy">
                        <div className="function-buy-boder">
                          <button onclick="buy(this)">
                            <span>Mua Hàng</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-info">
                    <div className="product-info-id">
                      <span>ID:SP00364</span>
                      <div className="product-info-rate">
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <h3>
                      <a href="#">POODLE VÀNG MƠ SIÊU CƯNG</a>
                    </h3>
                    <p>15.000.000₫</p>
                  </div>
                </div>
              </div>
              <div className="article-iteam">
                <div className="product-iteam">
                  <div className="product-thumb">
                    <div className="product-thumb-img">
                      <a href="#">
                        <div className="img">
                          <img
                            src="/IMG/TrangChu/TrangChu22.jpeg"
                            alt="img"
                            width="270px"
                            height="270px"
                          />
                        </div>
                      </a>
                      <div className="function-icon">
                        <a href="#">
                          <i className="fa-regular fa-heart">
                            <div className="tooltip">Yêu Thích</div>
                          </i>
                        </a>
                        <a href="#">
                          <i className="fa-solid fa-magnifying-glass">
                            <div className="tooltip">Xem Nhanh</div>
                          </i>
                        </a>
                      </div>
                      <div className="function-buy">
                        <div className="function-buy-boder">
                          <button onclick="buy(this)">
                            <span>Mua Hàng</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-info">
                    <div className="product-info-id">
                      <span>ID:SP00362</span>
                      <div className="product-info-rate">
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <h3>
                      <a href="#">MÈO XÁM CHÂN NGẮN TAI CỤP SIÊU YÊU</a>
                    </h3>
                    <p>25.000.000₫ </p>
                  </div>
                </div>
              </div>
              <div className="article-iteam">
                <div className="product-iteam">
                  <div className="product-thumb">
                    <div className="product-thumb-img">
                      <a href="#">
                        <div className="img">
                          <img
                            src="/IMG/TrangChu/TrangChu26.jpg"
                            alt="img"
                            width="270px"
                            height="270px"
                          />
                        </div>
                      </a>
                      <div className="function-icon">
                        <a href="#">
                          <i className="fa-regular fa-heart">
                            <div className="tooltip">Yêu Thích</div>
                          </i>
                        </a>
                        <a href="#">
                          <i className="fa-solid fa-magnifying-glass">
                            <div className="tooltip">Xem Nhanh</div>
                          </i>
                        </a>
                      </div>
                      <div className="function-buy">
                        <div className="function-buy-boder">
                          <button onclick="buy(this)">
                            <span>Mua Hàng</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-info">
                    <div className="product-info-id">
                      <span>ID:SP00605</span>
                      <div className="product-info-rate">
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <h3>
                      <a href="#">HUSKY NÂU ĐỰC</a>
                    </h3>
                    <p>15.000.000₫</p>
                  </div>
                </div>
              </div> */}
            </article>
            <div className="continue">
              <div className="continue-boder">
                <a href="#">Xem Thêm</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FeaturedProducts;
