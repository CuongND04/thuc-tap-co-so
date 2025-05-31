import { create } from "zustand";
import toast from "react-hot-toast";
import { setAuthToken } from "../utils/auth";
import axiosInstance from "../lib/axios";

// just create it in one place and use it in any other components
export const useAuthStore = create((set, get) => ({
  authUser: JSON.parse(localStorage.getItem("auth_user") || "null"),
  userProfile: null,
  favors: [], // danh sách sản phẩm yêu thích

  isAdding: false,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true, // mặc định là true, sau khi xác thực xong mới set trạng thái là false
  isFetchingProfile: false,
  // đây là hàm để lấy ra thông tin user đã đăng nhập từ local storage
  isFetchingFavors: false,
  checkAuth: async () => {
    try {
      const storedUser = localStorage.getItem("auth_user");
      const storedToken = localStorage.getItem("auth_token");

      if (storedUser && storedToken) {
        set({ authUser: JSON.parse(storedUser) });

        // Gọi lấy thông tin người dùng chi tiết
        const profile = await get().getProfile();
        set({ userProfile: profile });

        // Lấy danh sách yêu thích theo mã người dùng từ userProfile
        const favors = await get().getFavourites(profile?.maNguoiDung);
        set({ favors });
      } else {
        set({ authUser: null, userProfile: null });
      }
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({ authUser: null, userProfile: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      // Lưu token và user sơ bộ vào localStorage
      localStorage.setItem("auth_user", JSON.stringify(res.data.data));
      setAuthToken(res.data.data.token);
      set({ authUser: res.data.data });

      toast.success("Đăng nhập thành công");

      // Gọi lấy thông tin người dùng chi tiết
      const profile = await get().getProfile();
      set({ userProfile: profile });

      // Lấy danh sách yêu thích từ profile.maNguoiDung
      const favors = await get().getFavourites(profile.maNguoiDung);
      set({ favors });

      return true;
    } catch (error) {
      // Xử lý lỗi và reset state nếu login fail
      localStorage.removeItem("auth_user");
      localStorage.removeItem("auth_token");

      set({
        authUser: null,
        userProfile: null,
        favors: [],
      });

      const rawMsg =
        error?.response?.data?.message ??
        error?.response?.data?.error ??
        "Đã xảy ra lỗi";

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
      localStorage.setItem("userProfile", profileData);
      // console.log("res getProfile: ", res);

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
      toast.success("Cập nhật thông tin  thành công");

      return updatedProfile;
    } catch (error) {
      toast.error("Cập nhật thông tin  thất bại");
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
      // localStorage.removeItem("currentUserCart");
      localStorage.removeItem("userProfile");
      set({ authUser: null });
      set({ userProfile: null });
      set({ favors: [] });
      toast.success("Đăng xuất thành công");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  },

  // lấy danh sách sản phẩm yêu thích của người dùng đang đăng nhập
  // Get Profile
  getFavourites: async (maNguoiDung) => {
    set({ isFetchingFavors: true });

    try {
      const res = await axiosInstance.get(`/yeu-thich/${maNguoiDung}`);
      const favors = res.data.data;
      console.log("res favors: ", res);
      set({ favors: favors });

      return favors;
    } catch (error) {
      // mục đích là để xóa trạng thái vẫn đăng nhập được nhưng không láy được profile
      set({ favors: null });
      return null;
    } finally {
      set({ isFetchingFavors: false });
    }
  },

  // thêm sản phẩm vào ds yêu thíhc
  addToFavorites: async (customerID, productID) => {
    set({ isAdding: true });
    try {
      const res = await axiosInstance.post(
        `/yeu-thich/${customerID}/them/${productID}`
      );
      console.log("res: ", res);
      const updatedFavors = await get().getFavourites(customerID);
      set({ favors: updatedFavors }); // ✅ Cập nhật lại Zustand
      toast.success("Đã thêm vào danh sách yêu thích!");
    } catch (error) {
      toast.error("Thêm vào yêu thích thất bại!");
      return null;
    } finally {
      set({ isAdding: false });
    }
  },
  // xóa sản phẩm khỏi danh sách yêu thích
  removeFromFavorites: async (customerID, productID) => {
    set({ isAdding: true });
    try {
      const res = await axiosInstance.delete(
        `/yeu-thich/${customerID}/xoa/${productID}`
      );
      console.log("res: ", res);
      const updatedFavors = await get().getFavourites(customerID);
      set({ favors: updatedFavors }); // ✅ Cập nhật lại Zustand
      toast.success("Đã xóa khỏi danh sách yêu thích!");
    } catch (error) {
      toast.error("Xóa khỏi yêu thích thất bại!");
      return null;
    } finally {
      set({ isAdding: false });
    }
  },
}));
