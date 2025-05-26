import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useSupplyStore = create((set, get) => ({
  isGettingAllSupplies: false,
  isGettingDetailSupply: false,
  supplies: [],
  getAllSupplies: async () => {
    set({ isGettingAllSupplies: true });
    try {
      const res = await axiosInstance.get(`/nha-cung-cap`);
      set({ supplies: res.data.data });
      return res.data.data;
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách nhà cung cấp!");
      set({ supplies: null });
      return null;
    } finally {
      set({ isGettingAllSupplies: false });
    }
  },
  getDetailSupply: async (id) => {
    set({ isGettingDetailSupply: true });
    try {
      const res = await axiosInstance.get(`/nha-cung-cap/${id}`);
      const supplyDetail = res.data.data;

      return supplyDetail;
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết nhà cung cấp:", error);
      toast.error("Không thể tải chi tiết nhà cung cấp");
      return null;
    } finally {
      set({ isGettingDetailSupply: false });
    }
  },
  createSupply: async (data) => {
    try {
      const res = await axiosInstance.post(`/nha-cung-cap`, data);
      const newSupply = res.data.data;

      return newSupply;
    } catch (error) {
      console.error("Lỗi khi tạo nhà cung cấp:", error);
      // toast.error("Không thể tạo nhà cung cấp");
      return null;
    }
  },
  updateSupply: async (id, data) => {
    try {
      const res = await axiosInstance.put(`/nha-cung-cap/${id}`, data);
      const updatedSupply = res.data.data;

      return updatedSupply;
    } catch (error) {
      console.error("Lỗi khi cập nhật nhà cung cấp:", error);
      // toast.error("Không thể cập nhật nhà cung cấp");
      return null;
    }
  },
  deleteSupply: async (id) => {
    try {
      const res = await axiosInstance.delete(`/nha-cung-cap/${id}`);

      return res.data.status == "success";
    } catch (error) {
      console.error("Lỗi khi xóa nhà cung cấp:", error);
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      return null;
    }
  },
}));
