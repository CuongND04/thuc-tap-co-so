import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { formatValues } from "../utils/formatValues";
import { createLucideIcon } from "lucide-react";

export const useCartStore = create((set, get) => ({
  userCart: localStorage.getItem("currentUserCart") || null,
  isGettingCart: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,

  getCart: async (id) => {
    set({ isGettingCart: true });
    try {
      const res = await axiosInstance.get(`/gio-hang/${id}`);
      set({ userCart: res.data.data });
      return res.data.data;
      // localStorage.setItem("currentUserCart", res.data.data);
    } catch (error) {
      toast.error("Tải giỏ hàng thất bại!");
      return null;
    } finally {
      set({ isGettingCart: false });
    }
  },

  addItem: async (cartID, prodID, amount) => {
    set({ isAdding: true });
    try {
      const res = await axiosInstance.post(
        `/gio-hang/them-vao-gio?maGioHang=${cartID}&maSanPham=${prodID}&soLuong=${amount}`
      );
      toast.success("Thêm vào giỏ hàng thành công!");
    } catch (error) {
      toast.error("Thêm vào giỏ hàng thất bại!");
      return null;
    } finally {
      set({ isAdding: false });
    }
  },

  updateItem: async (userID, prodID, amount) => {
    set({ isUpdating: true });
    try {
      const res = await axiosInstance.put(
        `/gio-hang/${userID}/cap-nhat/${prodID}`,
        { soLuong: amount }
      );
      toast.success("Cập nhật số lượng thành công!");
    } catch (error) {
      toast.error("Cập nhật thất bại!");
      return null;
    } finally {
      set({ isUpdating: false });
    }
  },

  deleteItem: async (userID, prodID) => {
    set({ isDeleting: true });
    try {
      const res = await axiosInstance.delete(
        `/gio-hang/${userID}/xoa/${prodID}`
      );
      toast.success("Xóa sản phẩm khỏi giỏ thành công!");
      console.log(res);
    } catch (error) {
      toast.error("Xóa thất bại!");
      return null;
    } finally {
      set({ isDeleting: false });
    }
  },

  deleteAllItem: async (userID) => {
    set({ isDeleting: true });
    try {
      const res = await axiosInstance.delete(`/gio-hang/${userID}/xoa-tat-ca`);
      // toast.success("Xóa tất cả sản phẩm khỏi giỏ thành công!");
      console.log(res);
    } catch (error) {
      toast.error("Xóa thất bại!");
      return null;
    } finally {
      set({ isDeleting: false });
    }
  },
}));
