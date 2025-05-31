import React from "react";

const Intro = () => {
  return (
    <div>
      <main className="px-6 py-10 max-w-6xl mx-auto text-gray-800">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
            GIỚI THIỆU
          </h2>
          <p className="text-lg leading-relaxed">
            <strong>Mật Pet</strong> là cửa hàng chuyên cung cấp các sản phẩm
            dành cho thú cưng, đặc biệt là chó và mèo. Với mong muốn mang đến
            những trải nghiệm mua sắm tiện lợi, sản phẩm chất lượng và giá cả
            hợp lý cho cộng đồng yêu thú cưng tại Việt Nam.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-semibold text-pink-500 mb-2">
              TẦM NHÌN
            </h3>
            <p>
              Trở thành thương hiệu bán lẻ sản phẩm thú cưng đáng tin cậy nhất
              tại Việt Nam vào năm 2030.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-pink-500 mb-2">
              SỨ MỆNH
            </h3>
            <p>
              Cung cấp sản phẩm chất lượng, dịch vụ tận tâm, và đồng hành cùng
              khách hàng trong hành trình chăm sóc thú cưng mỗi ngày.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-pink-500 mb-4">
            GIÁ TRỊ CỐT LÕI
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Trung thực và minh bạch trong mọi hoạt động kinh doanh.</li>
            <li>Luôn lắng nghe và phục vụ khách hàng tận tâm.</li>
            <li>Hợp tác và tôn trọng đồng nghiệp, đối tác.</li>
            <li>
              Không ngừng cải tiến để mang lại giá trị tốt nhất cho khách hàng.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-pink-500 mb-4">
            VỀ MẬT PET
          </h3>
          <p className="mb-4">
            Mật Pet là nơi bạn có thể tìm thấy mọi thứ cần thiết cho thú cưng
            của mình – từ thức ăn, phụ kiện, đồ chơi cho đến các sản phẩm chăm
            sóc sức khỏe và làm đẹp. Chúng tôi cam kết chỉ cung cấp các sản phẩm
            chính hãng, an toàn và phù hợp với từng giống loài thú cưng.
          </p>
          <p className="mb-4">
            Với hệ thống cửa hàng online tiện lợi và đội ngũ tư vấn viên thân
            thiện, Mật Pet giúp bạn lựa chọn sản phẩm phù hợp cho bé yêu của
            mình chỉ trong vài bước đơn giản.
          </p>
          <h4 className="text-xl font-medium mt-6 mb-2">Chúng tôi cam kết:</h4>
          <ul className="list-decimal list-inside space-y-2">
            <li>Chỉ bán sản phẩm chính hãng, rõ nguồn gốc.</li>
            <li>Giao hàng nhanh chóng, đúng hẹn.</li>
            <li>Hỗ trợ đổi trả nếu sản phẩm không đúng mô tả hoặc bị lỗi.</li>
            <li>Giá cả minh bạch, không phát sinh chi phí ẩn.</li>
            <li>Luôn ưu tiên trải nghiệm và sự hài lòng của khách hàng.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-pink-500 mb-4">
            ĐỐI TÁC CỦA CHÚNG TÔI
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                ten: "Công ty TNHH PetLife",
                diaChi: "Số 12, đường Lê Văn Lương, Hà Nội",
                soDienThoai: "02438234567",
                email: "info@petlife.com.vn",
              },
              {
                ten: "Trại chó giống Vạn Lộc",
                diaChi: "Thôn 3, xã Vạn Phúc, Hà Đông, Hà Nội",
                soDienThoai: "0987654321",
                email: "vanlocdog@gmail.com",
              },
              {
                ten: "Cửa hàng thú cưng Happy Pet",
                diaChi: "Số 45, phố Nguyễn Chí Thanh, Hà Nội",
                soDienThoai: "02437345678",
                email: "happypet@gmail.com",
              },
              {
                ten: "Nhập khẩu phụ kiện PetStyle",
                diaChi: "Số 78, đường Trần Duy Hưng, Hà Nội",
                soDienThoai: "02438245679",
                email: "petstyle@yahoo.com",
              },
              {
                ten: "Công ty Royal Canin Việt Nam",
                diaChi: "Lô A2, KCN Bắc Thăng Long, Hà Nội",
                soDienThoai: "02438567890",
                email: "contact@royalcanin.com.vn",
              },
              {
                ten: "Đại lý thức ăn Whiskas",
                diaChi: "Số 23, phố Hoàng Đạo Thúy, Hà Nội",
                soDienThoai: "02437123456",
                email: "whiskasvn@gmail.com",
              },
              {
                ten: "Xưởng sản xuất chuồng trại PetHouse",
                diaChi: "Số 56, đường Phạm Văn Đồng, Hà Nội",
                soDienThoai: "0987123456",
                email: "pethouse@gmail.com",
              },
              {
                ten: "Cửa hàng phụ kiện PetCare",
                diaChi: "Số 89, phố Kim Mã, Hà Nội",
                soDienThoai: "02438456789",
                email: "petcare@gmail.com",
              },
              {
                ten: "Nhà phân phối cát vệ sinh",
                diaChi: "Số 34, đường Nguyễn Văn Huyên, Hà Nội",
                soDienThoai: "0978234567",
                email: "catsbestvn@yahoo.com",
              },
              {
                ten: "Xưởng may đồ thú cưng PetFashion",
                diaChi: "Số 67, phố Đội Cấn, Hà Nội",
                soDienThoai: "02437654321",
                email: "petfashion@gmail.com",
              },
            ].map((dt, index) => (
              <div
                key={index}
                className="p-4 border rounded shadow hover:shadow-md transition"
              >
                <h4 className="text-lg font-semibold text-pink-600">
                  {dt.ten}
                </h4>
                <p>📍 {dt.diaChi}</p>
                <p>📞 {dt.soDienThoai}</p>
                <p>✉️ {dt.email}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Intro;
