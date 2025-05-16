import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

// just create it in one place and use it in any other components
export const useAuthStore = create((set) => ({
  // init value
  authUser: null, // if user is not authenticated

  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      // build api to check if user is authenticated
      // don't write base url because it is indicated in axios.js
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
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
      set({ authUser: res.data.data });
      toast.success("Đăng nhập thành công");

      return true;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error.response.data.message: ", error.response.data.message);

      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");

      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateIsSigningUp: (isSigningUp) => set(() => ({ isSigningUp: isSigningUp })),
  updateIsLoggingIn: (isLoggingIn) => set(() => ({ isLoggingIn: isLoggingIn })),
}));
