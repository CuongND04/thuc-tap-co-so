import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { formatValues } from "../utils/formatValues";

export const useCartStore = create((set, get) => ({
  userCart: (localStorage.getItem("currentUserCart") || null),
  isGettingCart: false,

  getCart: async (id) => {
    set({ isGettingCart: true });
    try {
      const res = await axiosInstance.get(`/gio-hang/${id}`);
      set({ userCart: res.data.data });
    //   localStorage.setItem("currentUserCart", res.data.data);

    } catch (error) {
      toast.error("Tải giỏ hàng thất bại!");
      return null;
    } finally {
      set({ isGettingCart: false });
    }
  },

  addItem: async (data) => {
    set({ isGettingCart: true });
    try {
      const res = await axiosInstance.post(`/them-vao-gio`, data);
    } catch (error) {
      toast.error("Thêm vào giỏ hàng thất bại!");
      return null;
    } finally {
      set({ isGettingCart: false });
    }
  },
  
}));
