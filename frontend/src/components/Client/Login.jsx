import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LabelComp from "./LabelComp";
import { useAuthStore } from "../../store/useAuthStore";
import axiosInstance from "../../lib/axios";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate();

  // **TODO: chỗ này phải góp thông tin rồi gọi hàm login thôi, phần hiển thị lỗi thì dùng react-hot-toast,  và biến trạng thái --ing thì lưu và xử lí ở trong store
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { username, password } = Object.fromEntries(formData);

    login({
        tenDangNhap: username,
        matKhau: password,
      });

    navigate("/");

    // try {
    //   login({
    //     tenDangNhap: username,
    //     matKhau: password,
    //   });

      // const response = await axiosInstance.post("/auth/login", {
      //   tenDangNhap: username,
      //   matKhau: password,
      // });

      //     setLoading(false);
      //     if (errMsg) setErrMsg("");
      //     setSuccessMsg(response.data.message);
      //     console.log(response.data.data.token);
      //     updateILI(true);

      //     if (isLoggingIn) {
      //       navigate("/");
      //     }
      //   } catch (error) {
      //     if (successMsg) setSuccessMsg("");
      //     if (error.response.data.message) setErrMsg(error.response.data.message);
      //   } finally {
      //     setLoading(false);
      //     updateILI(false);
      //   }
      // };

      // setLoading(false);
      // if (errMsg) setErrMsg("");
      // setSuccessMsg(response.data.message);
      // updateILI(true);
      // updateUserName(response.data.data.hoTen);

  //     navigate("/");
  //   } catch (error) {
  //     if (successMsg) setSuccessMsg("");
  //     if (error.response.data.message) setErrMsg(error.response.data.message);
  //   } finally {
  //     setLoading(false);
  //   }
  };
  // b977d416f3af3f71f040;

  return (
    <div>
      <div>
        <form onSubmit={handleLogin} className="max-w-3xl mx-auto">
          <div>
            <h1 className="block text-center font-bold text-3xl pt-6">
              Đăng nhập
            </h1>
            <p className="text-xl text-center pt-5 leading-3">
              Đăng nhập để bắt đầu sắm đồ cho thú cưng cùng chúng tôi!
            </p>
          </div>

          <div>
            <div className="mt-5 grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
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
            </div>
            <button
              type="submit"
              className="mt-7 py-2 bg-[#de8ebe] text-white w-full uppercase font-bold text-lg tracking-wider rounded-md hover:text-white hover:bg-[#de8ebe]/87 duration-200"
            >
              Đăng nhập
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
          Chưa có tài khoản?{" "}
          <a href="/dang-ky">
            <button className="text-blue-500 hover:text-blue-900 duration-200">
              Đăng ký
            </button>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
