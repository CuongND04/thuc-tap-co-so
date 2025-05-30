import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useImportOrderStore = create((set, get) => ({
  isGettingAllCungCap: false,
  isGettingDetailCungCap: false,
  cungCaps: [],

  getAllCungCap: async () => {
    set({ isGettingAllCungCap: true });
    try {
      const res = await axiosInstance.get(`/cung-cap`);
      set({ cungCaps: res.data.data });
      return res.data.data;
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách cung cấp!");
      set({ cungCaps: null });
      return null;
    } finally {
      set({ isGettingAllCungCap: false });
    }
  },

  getDetailCungCap: async (maNhaCungCap, maSanPham) => {
    set({ isGettingDetailCungCap: true });
    try {
      const res = await axiosInstance.get(
        `/cung-cap/${maNhaCungCap}/${maSanPham}`
      );
      return res.data.data;
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết cung cấp:", error);
      toast.error("Không thể tải chi tiết cung cấp");
      return null;
    } finally {
      set({ isGettingDetailCungCap: false });
    }
  },

  createCungCap: async (data) => {
    try {
      const res = await axiosInstance.post(`/cung-cap`, data);
      return res.data.data;
    } catch (error) {
      console.error("Lỗi khi tạo cung cấp:", error);
      toast.error("Không thể tạo cung cấp");
      return null;
    }
  },

  updateCungCap: async (maNhaCungCap, maSanPham, data) => {
    try {
      const res = await axiosInstance.put(
        `/cung-cap/${maNhaCungCap}/${maSanPham}`,
        data
      );
      return res.data.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật cung cấp:", error);
      toast.error("Không thể cập nhật cung cấp");
      return null;
    }
  },

  deleteCungCap: async (maNhaCungCap, maSanPham) => {
    try {
      const res = await axiosInstance.delete(
        `/cung-cap/${maNhaCungCap}/${maSanPham}`
      );
      return res.data.status === "success";
    } catch (error) {
      console.error("Lỗi khi xóa cung cấp:", error);
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      else toast.error("Không thể xóa cung cấp");
      return null;
    }
  },
}));
