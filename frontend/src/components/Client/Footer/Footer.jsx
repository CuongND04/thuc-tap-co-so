import React from "react";
// import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="bg-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Thông tin */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Thông tin
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="flex items-start gap-2">
                <i className="fa-regular fa-map mt-1 text-blue-600"></i>
                <span>
                  <strong>Địa Chỉ:</strong> 96A Đ. Trần Phú, P. Mộ Lao, Hà Đông,
                  Hà Nội
                </span>
              </p>
              <p className="flex items-start gap-2">
                <i className="fa-solid fa-phone-volume mt-1 text-green-600"></i>
                <span>
                  <strong>Điện thoại:</strong>{" "}
                  <a
                    href="tel:02437562186"
                    className="text-blue-500 hover:underline"
                  >
                    024 3756 2186
                  </a>
                </span>
              </p>
              <p className="flex items-start gap-2">
                <i className="fa-solid fa-envelope mt-1 text-red-600"></i>
                <span>
                  <strong>Email:</strong>{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    nhom5ttcs@gmail.com
                  </a>
                </span>
              </p>
            </div>
          </div>

          {/* Follow */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">FOLLOW</h2>
            <div className="flex items-center space-x-4 text-2xl">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#" className="text-red-600 hover:text-red-800">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-700">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Nút hotline nổi */}
      <div className="fixed bottom-6 right-6 z-50">
        <a id="hotline" href="tel:02437562186">
          <img src="/IMG/LienHe5.png" width="200" height="200" alt="Hotline" />
        </a>
      </div>
    </>
  );
};

export default Footer;
