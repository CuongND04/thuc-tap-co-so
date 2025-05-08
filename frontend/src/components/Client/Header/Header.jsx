import React, { useEffect, useState } from "react";
import "./Header.css";

const images = [
  "https://github.com/DoanQuocHuy2308/MatPetFamiLy/blob/master/IMG/TrangChu/TrangChu09.jpg?raw=true",
  "https://github.com/DoanQuocHuy2308/MatPetFamiLy/blob/master/IMG/TrangChu/TrangChu10.jpg?raw=true",
  "https://github.com/DoanQuocHuy2308/MatPetFamiLy/blob/master/IMG/TrangChu/TrangChu11.jpg?raw=true",
  "https://github.com/DoanQuocHuy2308/MatPetFamiLy/blob/master/IMG/TrangChu/TrangChu12.jpg?raw=true",
];
const Header = () => {
  const Cart = () => {};
  const DangNhap = () => {};
  const dongform = () => {};
  const ThanhToan = () => {};
  // const comeback = () => {};
  // const next = () => {};
  const toggleDropdown = () => {};

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const comeback = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <header>
        <div className="container">
          <div className="logo">
            <a href="/">
              <img
                src="https://raw.githubusercontent.com/DoanQuocHuy2308/MatPetFamiLy/refs/heads/master/IMG/TrangChu/TrangChu08.png"
                style={{ width: "215px", height: "213px" }}
                alt="logo"
              />
            </a>
          </div>
          <nav>
            <div className="function">
              <div className="menu">
                <ul className="function-menu">
                  <li style={{ backgroundColor: "#de8ebe" }}>
                    <a href="#" style={{ color: "#fff" }}>
                      TRANG CHỦ
                    </a>
                  </li>
                  <li>
                    <a href="" className="dropdown">
                      THÚ CƯNG
                    </a>
                    <ul className="dropdown-menu">
                      {[
                        "Chó Alaska Malamute",
                        "Chó Beagle",
                        "Chó Corgi",
                        "Chó Golden Retriever",
                        "Chó Husky Siberian",
                        "Chó Phốc Sóc – Pomeranian",
                        "Chó Poodle",
                        "Chó Pug",
                        "Chó Samoyed",
                        "Mèo Anh (Dài + Ngắn)",
                        "Mèo Chân Ngắn",
                        "Mèo Tai Cụp",
                      ].map((item, index) => (
                        <li key={index}>
                          <a href="/danh-muc-cun">{item}</a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <a href="">PHỤ KIỆN</a>
                  </li>
                  <li>
                    <a href="" className="dropdown">
                      DỊCH VỤ
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="">ĐẤU GIÁ THÚ CƯNG - TỪ THIỆN</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="">GIỚI THIỆU</a>
                  </li>
                  <li>
                    <a href="">LIÊN HỆ</a>
                  </li>
                </ul>
              </div>
              <div className="menu_Cart">
                <div className="menu_Cart_Boder">
                  <button type="button">
                    <i className="fa-solid fa-bag-shopping fa-fw"></i>
                  </button>
                </div>
              </div>
              <div className="function-login">
                <div className="login">
                  <a href="/dang-nhap">Đăng Nhập</a>
                  <a href="">Đăng Ký</a>
                </div>
                <p>{/* Hiển thị tên user nếu có */}</p>
              </div>

              <div className="cart">
                <div className="function-close">
                  <button>
                    <i className="fa-regular fa-circle-xmark"></i>
                  </button>
                </div>
                <h2>Giỏ Hàng</h2>
                <ul>{/* Danh sách sản phẩm trong giỏ hàng */}</ul>
                <p>Tổng tiền: 0₫</p>
                <button>Thanh Toán</button>
              </div>
            </div>
            <div className="panel">
              <div className="panel-item">
                <img src={images[currentIndex]} alt="Slider" />
                <div className="panel-button">
                  <button className="comeback" onClick={comeback}>
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button className="next" onClick={next}>
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="function-search">
              <div className="select" onClick={toggleDropdown}>
                <span>All Categories</span>
                <ul className="dropdown-combobox">
                  {[
                    "All Categories",
                    "Chó",
                    "Mèo",
                    "Phụ Kiện",
                    "Thức Ăn",
                    "Dịch Vụ",
                  ].map((category, index) => (
                    <li key={index} className={index === 0 ? "active" : ""}>
                      <a className="select-search" href="#">
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="search">
                <input type="text" placeholder="Tìm Kiếm..." />
                <button type="button">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
