import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useProductStore = create((set, get) => ({
  isGettingAllProducts: false,
  isGettingDetailProduct: false,

  getAllProducts: async () => {
    set({ isGettingAllProducts: true });
    try {
      const res = await axiosInstance.get(`/san-pham`);
      return res.data.data;
    } catch (error) {
      // toast.error("Lỗi khi lấy sản phẩm!");
      return null;
    } finally {
      set({ isGettingAllProducts: false });
    }
  },
  getDetailProduct: async (id) => {
    set({ isGettingDetailProduct: true });
    try {
      const res = await axiosInstance.get(`/san-pham/${id}/chi-tiet`);
      const productDetail = res.data.data;

      return productDetail;
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      toast.error("Không thể tải chi tiết sản phẩm");
      return null;
    } finally {
      set({ isGettingDetailProduct: false });
    }
  },
}));
