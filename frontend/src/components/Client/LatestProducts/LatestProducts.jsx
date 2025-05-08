import React from "react";
import "./LatestProducts.css";
const LatestProducts = () => {
  return (
    <>
      <main>
        <section>
          <div className="row">
            <div className="row-content">
              <div className="row-title">
                <a href="#">
                  <strong>Sản Phẩm Mới</strong>
                </a>
              </div>
              <article>
                <div className="article-iteam">
                  <div className="product-iteam">
                    <div className="product-thumb">
                      <div className="product-thumb-img">
                        <a href="#">
                          <div className="badge">
                            <p>New</p>
                          </div>
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
                          <a href="">
                            <i className="fa-solid fa-magnifying-glass">
                              <div className="tooltip">Xem Nhanh</div>
                            </i>
                          </a>
                        </div>
                        <div className="function-buy">
                          <div className="function-buy-boder">
                            <button onclick="buy(this)" id="useFunctionBtn">
                              <span>Mua Hàng</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-info">
                      <div className="product-info-id">
                        <span>ID:SP00610</span>
                        <div className="product-info-rate">
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                        </div>
                      </div>
                      <h3>
                        <a href="">PHỐC SÓC TRẮNG ĐỰC</a>
                      </h3>
                      <p>18.000.000₫</p>
                    </div>
                  </div>
                </div>
                <div className="article-iteam">
                  <div className="product-iteam">
                    <div className="product-thumb">
                      <div className="product-thumb-img">
                        <a href="#">
                          <div className="badge">
                            <p>New</p>
                          </div>
                          <div className="img">
                            <img
                              src="/IMG/TrangChu/TrangChu15.jpg"
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
                        <span>ID:SP00611</span>
                        <div className="product-info-rate">
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                        </div>
                      </div>
                      <h3>
                        <a href="#">CORGI Ú MÔNG TO</a>
                      </h3>
                      <p>35.000.000₫</p>
                    </div>
                  </div>
                </div>
                <div className="article-iteam">
                  <div className="product-iteam">
                    <div className="product-thumb">
                      <div className="product-thumb-img">
                        <a href="#">
                          <div className="badge">
                            <p>New</p>
                          </div>
                          <div className="img">
                            <img
                              src="/IMG/TrangChu/ThuCung04 (1).jpg"
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
                        <span>ID:SP00612</span>
                        <div className="product-info-rate">
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                        </div>
                      </div>
                      <h3>
                        <a href="#">GOLDEN CÔNG CHÚA BẠCH TUYẾT</a>
                      </h3>
                      <p>15.000.000₫ </p>
                    </div>
                  </div>
                </div>
                <div className="article-iteam">
                  <div className="product-iteam">
                    <div className="product-thumb">
                      <div className="product-thumb-img">
                        <a href="#">
                          <div className="badge">
                            <p>New</p>
                          </div>
                          <div className="img">
                            <img
                              src="/IMG/TrangChu/TrangChu18.jpg"
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
                        <span>ID:SP00609</span>
                        <div className="product-info-rate">
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                        </div>
                      </div>
                      <h3>
                        <a href="#">GOLDEN CÁI Ú</a>
                      </h3>
                      <p>15.000.000₫</p>
                    </div>
                  </div>
                </div>
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
    </>
  );
};

export default LatestProducts;
