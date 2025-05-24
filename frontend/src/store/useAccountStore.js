import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useAccountStore = create((set, get) => ({
  isGettingAllAccounts: false,
  isGettingDetailAccount: false,
  accounts: [],

  getAllAccounts: async () => {
    set({ isGettingAllAccounts: true });
    try {
      const res = await axiosInstance.get(`/admin/users`);
      set({ accounts: res.data.data });
      return res.data.data;
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách tài khoản!");
      set({ accounts: null });
      return null;
    } finally {
      set({ isGettingAllAccounts: false });
    }
  },
  getDetailAccount: async (id) => {
    set({ isGettingDetailAccount: true });
    try {
      const res = await axiosInstance.get(`/admin/users/detail/${id}`);
      const accountDetail = res.data.data;
      return accountDetail;
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết tài khoản:", error);
      toast.error("Không thể tải chi tiết tài khoản");
      return null;
    } finally {
      set({ isGettingDetailAccount: false });
    }
  },
  createAccount: async (data) => {
    try {
      const res = await axiosInstance.post(`/admin/users`, data);
      const newAccount = res.data.data;
      return newAccount;
    } catch (error) {
      console.error("Lỗi khi tạo tài khoản:", error);
      // toast.error("Không thể tạo tài khoản");
      return null;
    }
  },

  updateAccount: async (id, data) => {
    try {
      const res = await axiosInstance.put(`/admin/users/${id}`, data);
      const updatedAccount = res.data.data;
      return updatedAccount;
    } catch (error) {
      console.error("Lỗi khi cập nhật tài khoản:", error);
      toast.error("Không thể cập nhật tài khoản");
      return null;
    }
  },

  deleteAccount: async (id) => {
    try {
      const res = await axiosInstance.delete(`/admin/users/${id}`);
      return res.data.status === "success";
    } catch (error) {
      console.error("Lỗi khi xóa tài khoản:", error);
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      return null;
    }
  },
}));
