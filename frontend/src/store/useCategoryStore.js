import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useCategoryStore = create((set, get) => ({
  isGettingAllCategories: false,
  isGettingDetailCategory: false,
  categories: [],
  getAllCategories: async () => {
    set({ isGettingAllCategories: true });
    try {
      const res = await axiosInstance.get(`/admin/categories`);
      set({ categories: res.data.data });
      return res.data.data;
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách danh mục!");
      set({ categories: null });
      return null;
    } finally {
      set({ isGettingAllCategories: false });
    }
  },
  getDetailCategory: async (id) => {
    set({ isGettingDetailCategory: true });
    try {
      const res = await axiosInstance.get(`/admin/categories/${id}`);
      const cateDetail = res.data.data;

      return cateDetail;
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết danh mục:", error);
      toast.error("Không thể tải chi tiết danh mục");
      return null;
    } finally {
      set({ isGettingDetailCategory: false });
    }
  },
  createCategory: async (data) => {
    try {
      const res = await axiosInstance.post(`/admin/categories/create`, data);
      const newCate = res.data.data;

      return newCate;
    } catch (error) {
      console.error("Lỗi khi tạo danh mục:", error);
      // toast.error("Không thể tạo danh mục");
      return null;
    }
  },
  updateCategory: async (id, data) => {
    try {
      const res = await axiosInstance.put(
        `/admin/categories/update/${id}`,
        data
      );
      const updatedCate = res.data.data;

      return updatedCate;
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
      toast.error("Không thể cập nhật danh mục");
      return null;
    }
  },
  deleteCategory: async (id) => {
    try {
      const res = await axiosInstance.delete(`/admin/categories/delete/${id}`);

      return res.data.status == "success";
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết danh mục:", error);
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      return null;
    }
  },
}));
