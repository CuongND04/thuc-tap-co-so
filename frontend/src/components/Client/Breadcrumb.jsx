import React from "react";
import { Link, useLocation } from "react-router-dom";

const pathNameMap = {
  "": "Trang chủ",
  "trang-ca-nhan": "Trang cá nhân",
  "danh-muc-cun": "Danh mục cún",
  "dang-nhap": "Đăng nhập",
  "dang-ky": "Đăng ký",
  "san-pham": "Sản phẩm",
  "gioi-thieu": "Giới thiệu",
  "lien-he": "Liên hệ",
  "yeu-thich": "Danh sách yêu thích",
  "don-hang": "Đơn hàng",
  success: "Thành công",
  payment: "Thanh toán",
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="bg-gray-100 py-3 px-4 text-sm text-gray-600 mt-5">
      <div className="max-w-[1200px] mx-auto">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-blue-600 hover:underline">
              Trang chủ
            </Link>
          </li>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const label = pathNameMap[value] || decodeURIComponent(value);

            return (
              <li key={to} className="flex items-center space-x-2">
                <span>/</span>
                {isLast ? (
                  <span className="text-gray-800 font-medium">{label}</span>
                ) : (
                  <Link to={to} className="text-blue-600 hover:underline">
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
