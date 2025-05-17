import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useProductStore = create((set, get) => ({
  getAllProducts: async () => {
    try {
      const res = await axiosInstance.get(`/api/san-pham`);
      return res.data;
    } catch (error) {
      // toast.error("Lỗi khi lấy sản phẩm!");
      return null;
    }
  },
}));
