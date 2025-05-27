import { create } from "zustand";
import toast from "react-hot-toast";
import { setAuthToken } from "../utils/auth";
import axiosInstance from "../lib/axios";

// just create it in one place and use it in any other components
export const useAuthStore = create((set, get) => ({
  authUser: JSON.parse(localStorage.getItem("auth_user") || "null"),
  userProfile: null,

  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true, // mặc định là true, sau khi xác thực xong mới set trạng thái là false
  isFetchingProfile: false,
  // đây là hàm để lấy ra thông tin user đã đăng nhập từ local storage

  checkAuth: async () => {
    try {
      const storedUser = localStorage.getItem("auth_user");
      const storedToken = localStorage.getItem("auth_token");

      if (storedUser && storedToken) {
        set({ authUser: JSON.parse(storedUser) });
      } else {
        set({ authUser: null });
      }

      // Gọi lấy thông tin người dùng chi tiết
      const profile = await get().getProfile();
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

      // lưu vào auth user vào local storage
      localStorage.setItem("auth_user", JSON.stringify(res.data.data));
      // lưu token vào local storage
      setAuthToken(res.data.data.token);

      set({ authUser: res.data.data });
      toast.success("Đăng nhập thành công");
      // Gọi lấy thông tin người dùng chi tiết
      const profile = await get().getProfile();

      return !!profile; // true nếu profile lấy được
    } catch (error) {
      // chỗ này là phòng trường hợp mà jwt ở backend đã hết hạn rồi mà
      localStorage.removeItem("auth_user"); // Xóa user trong localStorage
      localStorage.removeItem("auth_token");
      set({ authUser: null });
      set({ userProfile: null });

      const rawMsg =
        error?.response?.data?.message ??
        error?.response?.data?.error ??
        "Đã xảy ra lỗi";

      // Thân thiện hơn nếu là lỗi hết hạn token
      const friendlyMsg = rawMsg.includes("Token has expired")
        ? "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."
        : rawMsg;

      toast.error(friendlyMsg);

      console.log("error: ", error);

      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },
  // Get Profile
  getProfile: async () => {
    set({ isFetchingProfile: true });

    try {
      const res = await axiosInstance.get("/auth/profile");
      const profileData = res.data.data;

      set({ userProfile: profileData });

      return profileData;
    } catch (error) {
      // mục đích là để xóa trạng thái vẫn đăng nhập được nhưng không láy được profile
      set({ authUser: null });
      return null;
    } finally {
      set({ isFetchingProfile: false });
    }
  },
  updateProfile: async (updatedData) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.put("/auth/update-info", updatedData);
      const updatedProfile = res.data.data;

      set({ userProfile: updatedProfile });
      toast.success("Cập nhật thông tin người dùng thành công");

      return updatedProfile;
    } catch (error) {
      toast.error("Cập nhật thông tin người dùng thất bại");
      console.error(error);
      return null;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  changePassword: async (passwordData) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.post(
        "/auth/change-password",
        passwordData
      );

      toast.success("Đổi mật khẩu thành công");
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Đổi mật khẩu thất bại");
      console.error(error);
      return null;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  //**TODO: sau phải gọi api logout để xác thực chứ không được làm thô như này */
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      localStorage.removeItem("auth_user"); // Xóa user trong localStorage
      localStorage.removeItem("auth_token");
      localStorage.removeItem("currentUserCart");
      set({ authUser: null });
      set({ userProfile: null });
      toast.success("Đăng xuất thành công");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  },
}));
