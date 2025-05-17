import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LabelComp from "./LabelComp";
import { axiosInstance } from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";

const Registeration = () => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const updateISU = useAuthStore((state) => state.updateIsSigningUp);
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { fullName, username, password, email, phoneNumber, address } =
      Object.fromEntries(formData);

    try {
      const response = await axiosInstance.post("/auth/register", {
        hoTen: fullName,
        soDienThoai: phoneNumber,
        email: email,
        diaChi: address,
        matKhau: password,
        tenDangNhap: username,
        quyenTruyCap: "customer",
      });

      setLoading(false);
      if (errMsg) setErrMsg("");
      setSuccessMsg(response.data.message);
      updateISU(true);

      navigate("/dang-nhap");
    } catch (error) {
      if (successMsg) setSuccessMsg("");
      if (error.response.data.message) setErrMsg(error.response.data.message);
    } finally {
      setLoading(false);
      updateISU(false);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleRegistration} className="max-w-3xl mx-auto">
          <div>
            <h1 className="block text-center font-bold text-3xl pt-6">
              Đăng ký
            </h1>
            <p className="text-xl text-center pt-5 leading-3">
              Đăng ký để mua sắm với chúng tôi ngay hôm nay!
            </p>
          </div>

          <div>
            <div className="mt-5 grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div>
                <LabelComp title="Họ và tên" htmlFor="fullName" />
                <input
                  type="text"
                  name="fullName"
                  className="block w-full rounded-md border-0 bg-black/10 py-1 ring-1 outline-none ring-inset focus:ring-2 focus:ring-[#de8ebe] px-3 mt-1 text-lg"
                />
              </div>

              <div>
                <LabelComp title="Tên đăng nhập" htmlFor="username" />
                <input
                  type="text"
                  name="username"
                  className="block w-full rounded-md border-0 bg-black/10 py-1 ring-1 outline-none ring-inset focus:ring-2 focus:ring-[#de8ebe] px-3 mt-1 text-lg"
                />
              </div>

              <div>
                <LabelComp title="Mật khẩu" htmlFor="password" />
                <input
                  type="password"
                  name="password"
                  className="block w-full rounded-md border-0 bg-black/10 py-1 ring-1 outline-none ring-inset focus:ring-2 focus:ring-[#de8ebe] px-3 mt-1 text-lg"
                />
              </div>

              <div>
                <LabelComp title="Email" htmlFor="email" />
                <input
                  type="email"
                  name="email"
                  className="block w-full rounded-md border-0 bg-black/10 py-1 ring-1 outline-none ring-inset focus:ring-2 focus:ring-[#de8ebe] px-3 mt-1 text-lg"
                />
              </div>

              <div>
                <LabelComp title="Số điện thoại" htmlFor="phoneNumber" />
                <input
                  type="text"
                  name="phoneNumber"
                  className="block w-full rounded-md border-0 bg-black/10 py-1 ring-1 outline-none ring-inset focus:ring-2 focus:ring-[#de8ebe] px-3 mt-1 text-lg"
                />
              </div>

              <div>
                <LabelComp title="Địa chỉ" htmlFor="address" />
                <input
                  type="text"
                  name="address"
                  className="block w-full rounded-md border-0 bg-black/10 py-1 ring-1 outline-none ring-inset focus:ring-2 focus:ring-[#de8ebe] px-3 mt-1 text-lg"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-7 py-2 bg-[#de8ebe] text-white w-full uppercase font-bold text-lg tracking-wider rounded-md hover:text-white hover:bg-[#de8ebe]/87 duration-200"
            >
              Đăng ký
            </button>

            {errMsg && (
              <p className="mt-5 py-2 bg-red-400 text-red-800 text-center rounded-md text-lg tracking-wide font-semibold">
                {errMsg}
              </p>
            )}
            {successMsg && (
              <p className="mt-5 py-2 bg-green-400 text-green-800 text-center rounded-md text-lg tracking-wide font-semibold">
                {successMsg}
              </p>
            )}
          </div>
        </form>
        <p className="text-center py-2 text-lg">
          Đã có tài khoản?{" "}
          <a href="/dang-nhap">
            <button className="text-blue-500 hover:text-blue-900 duration-200">
              Đăng nhập
            </button>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registeration;
