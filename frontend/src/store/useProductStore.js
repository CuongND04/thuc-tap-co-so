import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { formatValues } from "../utils/formatValues";

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
  createProduct: async (data) => {
    try {
      const res = await axiosInstance.post(`/san-pham/create`, data);
      const newPro = res.data.data;

      return newPro;
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error);
      // toast.error("Không thể tạo danh mục");
      return null;
    }
  },
  updateProduct: async (id, data, type) => {
    try {
      console.log("rawData: ", data);
      const fmtData = formatValues(data, type);
      console.log("fmtData: ", fmtData);
      const res = await axiosInstance.put(`/san-pham/update/${id}`, fmtData);

      const updatedProd = res.data.data;

      return updatedProd;
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      toast.error("Không thể cập nhật sản phẩm");
      return null;
    }
  },
  deleteProduct: async (id) => {
    try {
      const res = await axiosInstance.delete(`/san-pham/delete/${id}`);
      console.log("res: ", res);
      return res.data.status == "success";
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      return null;
    }
  },
}));
