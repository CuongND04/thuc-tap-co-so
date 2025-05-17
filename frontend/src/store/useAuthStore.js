import { create } from "zustand";
import toast from "react-hot-toast";
import { setAuthToken } from "../utils/auth";
import axiosInstance from "../lib/axios";

// just create it in one place and use it in any other components
export const useAuthStore = create((set) => ({
  authUser: JSON.parse(localStorage.getItem("auth_user") || "null"),

  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true, // mặc định là true, sau khi xác thực xong mới set trạng thái là false

  // đây là hàm để lấy ra thông tin user đã đăng nhập từ local storage
  isCheckingAuth: true,
  userName: "",

  checkAuth: async () => {
    try {
      const storedUser = localStorage.getItem("auth_user");
      const storedToken = localStorage.getItem("auth_token");

      if (storedUser && storedToken) {
        set({ authUser: JSON.parse(storedUser) });
      } else {
        set({ authUser: null });
      }
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  // useAuthStore.js
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      console.log("data: ", data);
      const res = await axiosInstance.post("/auth/login", data);
      console.log("res: ", res);
      localStorage.setItem("auth_user", JSON.stringify(res.data.data));
      set({ authUser: res.data.data });
      toast.success("Đăng nhập thành công");
      setAuthToken(res.data.data.token);
      return true;
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error.response.data.message);
      console.log("error: ", error);

      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  //**TODO: sau phải gọi api logout để xác thực chứ không được làm thô như này */
  logout: async () => {
    try {
      localStorage.removeItem("auth_user"); // Xóa user trong localStorage
      localStorage.removeItem("auth_token");
      set({ authUser: null });
      toast.success("Đăng xuất thành công");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  },

  updateIsSigningUp: (isSigningUp) => set(() => ({ isSigningUp: isSigningUp })),
  updateIsLoggingIn: (isLoggingIn) => set(() => ({ isLoggingIn: isLoggingIn })),
  updateUserName: (userName) => set(() => ({ userName: userName })),
}));
