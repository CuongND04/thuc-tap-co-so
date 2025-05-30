import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useSaleOrdersStore = create((set, get) => ({
  isGettingAllSaleOrders: false,
  isGettingSaleOrderDetail: false,
  saleOrders: [],

  // Lấy tất cả đơn hàng
  getAllSaleOrders: async () => {
    set({ isGettingAllSaleOrders: true });
    try {
      const res = await axiosInstance.get(`/don-hang`);
      set({ saleOrders: res.data.data });
      return res.data.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      toast.error("Không thể tải danh sách đơn hàng");
      return null;
    } finally {
      set({ isGettingAllSaleOrders: false });
    }
  },

  // Lấy chi tiết đơn hàng
  getSaleOrderDetail: async (maDonHang) => {
    set({ isGettingSaleOrderDetail: true });
    try {
      const res = await axiosInstance.get(`/don-hang/${maDonHang}`);
      return res.data.data;
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
      toast.error("Không thể tải chi tiết đơn hàng");
      return null;
    } finally {
      set({ isGettingSaleOrderDetail: false });
    }
  },

  updateSaleOrderStatus: async (maDonHang, trangThai) => {
    try {
      const res = await axiosInstance.patch(
        `/don-hang/${maDonHang}/trang-thai`,
        null,
        {
          params: { trangThai },
        }
      );
      toast.success("Cập nhật trạng thái thành công");
      return res.data.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      toast.error("Không thể cập nhật trạng thái đơn hàng");
      return null;
    }
  },

  // Tạo đơn hàng mới
  createSaleOrder: async (data) => {
    try {
      const res = await axiosInstance.post(`/don-hang`, data);
      toast.success("Tạo đơn hàng thành công");
      return res.data.data;
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      toast.error("Không thể tạo đơn hàng");
      return null;
    }
  },

  // Xóa đơn hàng
  deleteSaleOrder: async (maDonHang) => {
    try {
      const res = await axiosInstance.delete(`/don-hang/${maDonHang}`);
      toast.success("Xóa đơn hàng thành công");
      return res.data.status === "success";
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error);
      if (error?.response?.data?.message)
        toast.error(error.response.data.message);
      else toast.error("Không thể xóa đơn hàng");
      return null;
    }
  },
}));
