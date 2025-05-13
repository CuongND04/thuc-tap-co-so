import React, {useState} from "react";
import LabelComp from "./LabelComp";

const Login = () => {
  const [errMsg, setErrMsg] = useState("");
  const handleLogin = () => {
    
  };
  return (
      <div>
            <div>
            <form onSubmit={handleLogin} className="max-w-3xl mx-auto">
            <div>
                <h1 className="block text-center font-bold text-3xl pt-6">Đăng nhập</h1>
            </div>

            <div>
                <div className="mt-5 grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">

                    <div> 
                        <LabelComp title="Tên đăng nhập" htmlFor="username"/>
                        <input type="text" name="username" className="block w-full rounded-md border-0 bg-black/10 py-1 ring-1 outline-none ring-inset focus:ring-2 focus:ring-[#de8ebe] px-3 mt-1 text-lg" />
                    </div>

                    <div> 
                        <LabelComp title="Mật khẩu" htmlFor="password"/>
                        <input type="password" name="password" className="block w-full rounded-md border-0 bg-black/10 py-1 ring-1 outline-none ring-inset focus:ring-2 focus:ring-[#de8ebe] px-3 mt-1 text-lg" />
                    </div>

                </div>

                <button type="submit" className="mt-7 py-2 bg-[#de8ebe] text-white w-full uppercase font-bold text-lg tracking-wider rounded-md hover:text-white hover:bg-[#de8ebe]/87 duration-200">Đăng nhập</button>

                <p className="mt-5 py-2 bg-red-400 text-red-800 text-center rounded-md text-lg tracking-wide font-semibold">Error msg here!</p>
            </div>
            </form>
            <p className="text-center py-2 text-lg">Chưa có tài khoản? <a href="/dang-ky"><button className="text-blue-500 hover:text-blue-900 duration-200">Đăng ký</button></a></p>
            </div>
            
        </div>
  );
};

export default Login;
