import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

// just create it in one place and use it in any other components
export const useAuthStore = create((set) => ({
  // init value
  authUser: null, // if user is not authenticated

  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,
  userName: "",
  
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

  updateIsSigningUp: (isSigningUp) => set(() => ({ isSigningUp: isSigningUp })),
  updateIsLoggingIn: (isLoggingIn) => set(() => ({ isLoggingIn: isLoggingIn })),
  updateUserName: (userName) => set(() => ({ userName: userName}))
}));
