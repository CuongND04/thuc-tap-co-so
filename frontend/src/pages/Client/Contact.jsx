import React from "react";

const Contact = () => {
  return (
    <div>
      <main className="bg-white py-10 px-4">
        <section className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-pink-600">
            LIÊN HỆ
          </h2>

          {/* Bản đồ */}
          {/* Bản đồ */}
          <div className="mb-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.9800770437555!2d105.78524727503004!3d20.98040498065681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accddf313525%3A0x31d6e65cdbaea896!2zOTZhIMSQLiBUcuG6p24gUGjDuiwgUC4gTeG7mSBMYW8sIEjDoCDEkMO0bmcsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e1!3m2!1svi!2s!4v1748676646946!5m2!1svi!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full rounded-lg shadow"
            ></iframe>
          </div>

          {/* Thông tin liên hệ */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="flex items-start gap-4">
              <span className="text-2xl text-blue-500">
                <i className="fa-solid fa-house"></i>
              </span>
              <div>
                <p>
                  <label className="font-semibold">Địa Chỉ 1:</label> 96A Trần
                  Phú, Hà Đông, Hà Nội
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl text-green-600">
                <i className="fa-solid fa-phone"></i>
              </span>
              <div>
                <p>
                  <label className="font-semibold">Điện thoại:</label> 024 3756
                  2186
                </p>
                <p>
                  <label className="font-semibold">Email:</label>{" "}
                  <a
                    href="mailto:nhom5ttcs@gmail.com"
                    className="text-blue-600"
                  >
                    nhom5ttcs@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Form liên hệ */}
          <div className="bg-gray-100 p-6 rounded shadow-md">
            <form className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                FORM LIÊN HỆ
              </h2>
              <div className="flex items-center gap-4 border-b border-gray-300 py-2">
                <label className="text-gray-600 text-xl">
                  <i className="fa-solid fa-user"></i>
                </label>
                <input
                  type="text"
                  placeholder="Họ tên*"
                  className="w-full outline-none bg-transparent"
                />
              </div>
              <div className="flex items-center gap-4 border-b border-gray-300 py-2">
                <label className="text-gray-600 text-xl">
                  <i className="fa-solid fa-envelope"></i>
                </label>
                <input
                  type="email"
                  placeholder="Email*"
                  className="w-full outline-none bg-transparent"
                />
              </div>
              <div className="flex items-start gap-4 border-b border-gray-300 py-2">
                <label className="text-gray-600 text-xl pt-1">
                  <i className="fa-regular fa-pen-to-square"></i>
                </label>
                <textarea
                  rows="5"
                  placeholder="Nội dung tin nhắn..."
                  className="w-full outline-none bg-transparent resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                GỬI LIÊN HỆ
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
