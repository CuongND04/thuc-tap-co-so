import React from "react";
import "./CategoryList.css";
const CategoryList = () => {
  return (
    <main className="hehe-main">
      <section>
        <aside>
          <div className="sidebar">
            <div className="sidebar-info">
              <h3>Danh Mục Sản Phẩm</h3>
              <ul className="product">
                <li className="product-pet-iteam">
                  <a href="https://matpetfamily.com/danh-muc-san-pham/balo/">
                    Balo
                  </a>
                  <span>(9)</span>
                </li>
                <li className="product-pet-iteam">
                  <a href="">Cát Vệ Sinh</a>
                  <span>(7)</span>
                </li>
                <li className="product-pet-iteam">
                  <a href="">Chuồng</a>
                  <span>(17)</span>
                </li>
                <li className="product-pet-iteam">
                  <a href="" style={{ color: "#de8ebe" }}>
                    Danh Mục Cún
                  </a>
                  <span>(671)</span>
                  <ul className="product-iteam-dog">
                    <li className="dog-iteam">
                      <a href="">Chó Alaska Malamute</a>
                      <span>(147)</span>
                    </li>
                    <li className="dog-iteam">
                      <a href="">Chó Bắc Kinh</a>
                      <span>(5)</span>
                    </li>
                    <li className="dog-iteam">
                      <a href="">Chó Beagle</a>
                      <span>(12)</span>
                    </li>
                    <li className="dog-iteam">
                      <a href="">Chó Bichon</a>
                      <span>(13)</span>
                    </li>
                    <li className="dog-iteam">
                      <a href="">Chó Bull Pháp</a>
                      <span>(6)</span>
                    </li>
                    <li className="dog-iteam">
                      <a href="">Chó Corgi</a>
                      <span>(55)</span>
                    </li>
                    <li className="dog-iteam">
                      <a href="">Chó Golden Retriever</a>
                      <span>(102)</span>
                    </li>
                    <li className="dog-iteam">
                      <a href="">Chó Husky Siberian</a>
                      <span>(33)</span>
                    </li>
                    <li className="dog-iteam">
                      <a href="">Chó Lạp Xưởng</a>
                      <span>(6)</span>
                    </li>
                    <li className="dog-iteam">
                      <a href="">Chó Phốc Sóc - Pomeranian</a>
                      <span>(86)</span>
                    </li>
                    <li className="dog-iteam">
                      <a href="">Chó Poodle</a>
                      <span>(134)</span>
                    </li>
                    <li className="dog-iteam">
                      <a href="">Chó Pug</a>
                      <span>(17)</span>
                    </li>
                    <li className="dog-iteam">
                      <a href="">Chó Samoyed</a>
                      <span>(50)</span>
                    </li>
                  </ul>
                </li>
                <li className="product-pet-iteam">
                  <a href="">Danh Mục Mèo</a>
                  <span>(69)</span>
                </li>
                <li className="product-pet-iteam">
                  <a href="">Dây Vòng Cổ</a>
                  <span>(1)</span>
                </li>
                <li className="product-pet-iteam">
                  <a href="">Dịch Vụ</a>
                  <span>(1)</span>
                </li>
                <li className="product-pet-iteam">
                  <a href="">Mỹ Phẩm & Làm Đẹp</a>
                  <span>(43)</span>
                </li>
                <li className="product-pet-iteam">
                  <a href="">Nệm</a>
                  <span>(55)</span>
                </li>
                <li className="product-pet-iteam">
                  <a href="">Phụ Kiện</a>
                  <span>(231)</span>
                </li>
                <li className="product-pet-iteam">
                  <a href="">Thực Phẩm</a>
                  <span>(167)</span>
                </li>
                <li className="product-pet-iteam">
                  <a href="">Túi Vận Chuyển</a>
                  <span>(7)</span>
                </li>
              </ul>
            </div>
            <div className="price">
              <h3>Giá</h3>
              <form
                method="get"
                action="https://matpetfamily.com/danh-muc-san-pham/danh-muc-cun/"
              >
                <div className="function-line-price">
                  <div
                    className="line-price"
                    style={{ left: "0%", width: "100%" }}
                  >
                    <div
                      className="tab-price-left"
                      tabIndex={0}
                      style={{ left: "0%" }}
                    ></div>
                    <div
                      className="tab-price-right"
                      tabIndex={0}
                      style={{ left: "94%" }}
                    ></div>
                  </div>
                </div>
                <div className="function-price">
                  <button>Lọc</button>
                  <div className="span-price">
                    <p>4.500.000₫</p>
                    <i className="space">–</i>
                    <p>90.000.000₫</p>
                  </div>
                </div>
              </form>
              <h3 style={{ marginTop: "10px" }}>Màu Sắc</h3>
            </div>
          </div>
        </aside>
        <article>
          <div className="title-page">
            <h1>DANH MỤC CÚN</h1>
            <ul className="function-page">
              <li className="function-page-iteam">
                <span>Sắp Xếp:</span>
                <select name="select-box" id="select-box">
                  <option value="Sắp Xếp Theo Độ Phổ Biến">
                    Sắp Xếp Theo Độ Phổ Biến
                  </option>
                  <option value="Sắp Xếp Theo Điểm Rating">
                    Sắp Xếp Theo Điểm Rating
                  </option>
                  <option value="Sắp Xếp Theo Sản Phẩm Mới">
                    Sắp Xếp Theo Sản Phẩm Mới
                  </option>
                  <option value="Sắp Xếp Giá Từ: Thấp Đến Cao">
                    Sắp Xếp Giá Từ: Thấp Đến Cao
                  </option>
                  <option value="Sắp Xếp Giá Từ: Cao Đến Thấp">
                    Sắp Xếp Giá Từ: Cao Đến Thấp
                  </option>
                </select>
              </li>
              <li className="function-page-iteam">
                <div className="dropdown-box">
                  <a href="#" className="dropdown-box-title">
                    <span>Số Sản Phẩm: </span>
                    <span className="silver-number">16</span>
                  </a>
                  <ul className="dropdown-list">
                    <li>
                      <a href="https://matpetfamily.com/danh-muc-san-pham/danh-muc-cun/?number=16">
                        16
                      </a>
                    </li>
                    <li>
                      <a href="http://matpetfamily.com/danh-muc-san-pham/danh-muc-cun/?&number=10">
                        10
                      </a>
                    </li>
                    <li>
                      <a href="http://matpetfamily.com/danh-muc-san-pham/danh-muc-cun/?&number=9">
                        {" "}
                        9
                      </a>
                    </li>
                    <li>
                      <a href="http://matpetfamily.com/danh-muc-san-pham/danh-muc-cun/?&number=12">
                        12
                      </a>
                    </li>
                    <li>
                      <a href="http://matpetfamily.com/danh-muc-san-pham/danh-muc-cun/?&number=18">
                        18
                      </a>
                    </li>
                    <li>
                      <a href="http://matpetfamily.com/danh-muc-san-pham/danh-muc-cun/?&number=24">
                        24
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="function-page-iteam">
                <div className="view-type">
                  <span>Chế độ hiển thị: </span>
                  <a href="" className="view-type-grid">
                    <i
                      className="fa-solid fa-table-cells-large"
                      style={{ color: "#fff" }}
                    ></i>
                  </a>
                  <a href="http://matpetfamily.com/danh-muc-san-pham/danh-muc-cun/?&type=list">
                    <i className="fa-solid fa-bars"></i>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div className="product" id="product">
            <div className="article-product">
              <div className="article-iteam">
                <div className="product-iteam">
                  <div className="product-thumb">
                    <div className="product-thumb-img">
                      <a href="#">
                        <div className="img">
                          <img
                            src="../IMG/ThuCung/ThuCung01.jpg"
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
                      <span>ID:12185923</span>
                      <div className="product-info-rate">
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <h3>
                      <a href="#">ALASKA NÂU ĐỎ BÉO Ú</a>
                    </h3>
                    <p>17.000.000₫</p>
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
                            src="../IMG/ThuCung/ThuCung02.jpg"
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
                      <span>ID:SP00083</span>
                      <div className="product-info-rate">
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <h3>
                      <a href="#">Alaska hồng phấn siêu cute</a>
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
                        <div className="img">
                          <img
                            src="../IMG/ThuCung/ThuCung03.jpg"
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
                      <span>ID:SP00085</span>
                      <div className="product-info-rate">
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <h3>
                      <a href="#">Alaska nâu đực đẹp trai siêu cấp</a>
                    </h3>
                    <p>20.000.000₫</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="article-product" id="article-product">
              <div className="article-iteam">
                <div className="product-iteam">
                  <div className="product-thumb">
                    <div className="product-thumb-img">
                      <a href="#">
                        <div className="img">
                          <img
                            src="../IMG/ThuCung/ThuCung04.jpg"
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
                      <span>ID:SP00086</span>
                      <div className="product-info-rate">
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <h3>
                      <a href="#">SAMOYED SIÊU CUTE</a>
                    </h3>
                    <p>12.000.000₫</p>
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
                            src="../IMG/ThuCung/ThuCung05.jpg"
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
                      <span>ID:SP00084</span>
                      <div className="product-info-rate">
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <h3>
                      <a href="#">HUSKY ĐEN</a>
                    </h3>
                    <p>13.000.000₫</p>
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
                            src="../IMG/ThuCung/ThuCung06.jpg"
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
                      <span>ID:17669219</span>
                      <div className="product-info-rate">
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <h3>
                      <a href="#">HUSKY ĐẠI NGÁO Ú NU</a>
                    </h3>
                    <p>15.000.000₫</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="article-product">
              <div className="article-iteam">
                <div className="product-iteam">
                  <div className="product-thumb">
                    <div className="product-thumb-img">
                      <a href="#">
                        <div className="img">
                          <img
                            src="../IMG/ThuCung/ThuCung07.jpg"
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
                      <span>ID:13502862</span>
                      <div className="product-info-rate">
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <h3>
                      <a href="#">Đàn Bắc Kinh Nhật xinh xắn</a>
                    </h3>
                    <p>5.000.000₫</p>
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
                            src="../IMG/ThuCung/ThuCung08.jpg"
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
                      <span>ID:11564578</span>
                      <div className="product-info-rate">
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <h3>
                      <a href="#">ALASKA ĐEN TRẮNG XINH</a>
                    </h3>
                    <p>12.000.000₫</p>
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
                            src="../IMG/ThuCung/ThuCung09.jpg"
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
                      <span>ID:SP00067</span>
                      <div className="product-info-rate">
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <h3>
                      <a href="#">Alaska hồng phấn siêu cưng</a>
                    </h3>
                    <p>20.000.000₫</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="article-product">
              <div className="article-iteam">
                <div className="product-iteam">
                  <div className="product-thumb">
                    <div className="product-thumb-img">
                      <a href="#">
                        <div className="img">
                          <img
                            src="../IMG/ThuCung/ThuCung10.jpg"
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
                      <span>ID:SP00032</span>
                      <div className="product-info-rate">
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <h3>
                      <a href="#">HUSKY SIÊU CUTE</a>
                    </h3>
                    <p>12.000.000₫</p>
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
                            src="../IMG/ThuCung/ThuCung11.jpg"
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
                      <span>ID:SP00005</span>
                      <div className="product-info-rate">
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <h3>
                      <a href="#">ALASKA HỒNG PHẤN</a>
                    </h3>
                    <p>20.000.000₫</p>
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
                            src="../IMG/ThuCung/ThuCung12.jpeg"
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
                      <span>ID:SP00028</span>
                      <div className="product-info-rate">
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <h3>
                      <a href="#">ALASKA XIU CƯNG</a>
                    </h3>
                    <p>18.000.000₫</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="next-page">
            <span className="next-page-one">1</span>
            <a href="">2</a>
            <span>...</span>
            <a href="">55</a>
            <a href="">56</a>
            <a href="" className="function-next">
              <i className="fa-solid fa-chevron-right"></i>
            </a>
          </div>
        </article>
      </section>
    </main>
  );
};

export default CategoryList;
