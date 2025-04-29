import React from "react";
import "./LatestProducts.css";
const LatestProducts = () => {
  return (
    <>
      <main>
        <section>
          <div class="row">
            <div class="row-content">
              <div class="row-title">
                <a href="#">
                  <strong>Sản Phẩm Mới</strong>
                </a>
              </div>
              <article>
                <div class="article-iteam">
                  <div class="product-iteam">
                    <div class="product-thumb">
                      <div class="product-thumb-img">
                        <a href="#">
                          <div class="badge">
                            <p>New</p>
                          </div>
                          <div class="img">
                            <img
                              src="/IMG/TrangChu/TrangChu17.jpg"
                              alt="img"
                              width="270px"
                              height="270px"
                            />
                          </div>
                        </a>
                        <div class="function-icon">
                          <a href="#">
                            <i class="fa-regular fa-heart">
                              <div class="tooltip">Yêu Thích</div>
                            </i>
                          </a>
                          <a href="">
                            <i class="fa-solid fa-magnifying-glass">
                              <div class="tooltip">Xem Nhanh</div>
                            </i>
                          </a>
                        </div>
                        <div class="function-buy">
                          <div class="function-buy-boder">
                            <button onclick="buy(this)" id="useFunctionBtn">
                              <span>Mua Hàng</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="product-info">
                      <div class="product-info-id">
                        <span>ID:SP00610</span>
                        <div class="product-info-rate">
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                        </div>
                      </div>
                      <h3>
                        <a href="">PHỐC SÓC TRẮNG ĐỰC</a>
                      </h3>
                      <p>18.000.000₫</p>
                    </div>
                  </div>
                </div>
                <div class="article-iteam">
                  <div class="product-iteam">
                    <div class="product-thumb">
                      <div class="product-thumb-img">
                        <a href="#">
                          <div class="badge">
                            <p>New</p>
                          </div>
                          <div class="img">
                            <img
                              src="/IMG/TrangChu/TrangChu15.jpg"
                              alt="img"
                              width="270px"
                              height="270px"
                            />
                          </div>
                        </a>
                        <div class="function-icon">
                          <a href="#">
                            <i class="fa-regular fa-heart">
                              <div class="tooltip">Yêu Thích</div>
                            </i>
                          </a>
                          <a href="#">
                            <i class="fa-solid fa-magnifying-glass">
                              <div class="tooltip">Xem Nhanh</div>
                            </i>
                          </a>
                        </div>
                        <div class="function-buy">
                          <div class="function-buy-boder">
                            <button onclick="buy(this)">
                              <span>Mua Hàng</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="product-info">
                      <div class="product-info-id">
                        <span>ID:SP00611</span>
                        <div class="product-info-rate">
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                        </div>
                      </div>
                      <h3>
                        <a href="#">CORGI Ú MÔNG TO</a>
                      </h3>
                      <p>35.000.000₫</p>
                    </div>
                  </div>
                </div>
                <div class="article-iteam">
                  <div class="product-iteam">
                    <div class="product-thumb">
                      <div class="product-thumb-img">
                        <a href="#">
                          <div class="badge">
                            <p>New</p>
                          </div>
                          <div class="img">
                            <img
                              src="/IMG/TrangChu/ThuCung04 (1).jpg"
                              alt="img"
                              width="270px"
                              height="270px"
                            />
                          </div>
                        </a>
                        <div class="function-icon">
                          <a href="#">
                            <i class="fa-regular fa-heart">
                              <div class="tooltip">Yêu Thích</div>
                            </i>
                          </a>
                          <a href="#">
                            <i class="fa-solid fa-magnifying-glass">
                              <div class="tooltip">Xem Nhanh</div>
                            </i>
                          </a>
                        </div>
                        <div class="function-buy">
                          <div class="function-buy-boder">
                            <button onclick="buy(this)">
                              <span>Mua Hàng</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="product-info">
                      <div class="product-info-id">
                        <span>ID:SP00612</span>
                        <div class="product-info-rate">
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                        </div>
                      </div>
                      <h3>
                        <a href="#">GOLDEN CÔNG CHÚA BẠCH TUYẾT</a>
                      </h3>
                      <p>15.000.000₫ </p>
                    </div>
                  </div>
                </div>
                <div class="article-iteam">
                  <div class="product-iteam">
                    <div class="product-thumb">
                      <div class="product-thumb-img">
                        <a href="#">
                          <div class="badge">
                            <p>New</p>
                          </div>
                          <div class="img">
                            <img
                              src="/IMG/TrangChu/TrangChu18.jpg"
                              alt="img"
                              width="270px"
                              height="270px"
                            />
                          </div>
                        </a>
                        <div class="function-icon">
                          <a href="#">
                            <i class="fa-regular fa-heart">
                              <div class="tooltip">Yêu Thích</div>
                            </i>
                          </a>
                          <a href="#">
                            <i class="fa-solid fa-magnifying-glass">
                              <div class="tooltip">Xem Nhanh</div>
                            </i>
                          </a>
                        </div>
                        <div class="function-buy">
                          <div class="function-buy-boder">
                            <button onclick="buy(this)">
                              <span>Mua Hàng</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="product-info">
                      <div class="product-info-id">
                        <span>ID:SP00609</span>
                        <div class="product-info-rate">
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
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
              <div class="continue">
                <div class="continue-boder">
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
