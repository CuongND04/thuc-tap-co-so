import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import dayjs from "dayjs";

const formatDateTimeLocal = (date) => date.format("YYYY-MM-DDTHH:mm:ss");

export const useRevenueStore = create((set, get) => ({
  isGettingRevenue: false,
  revenueData: null,

  getRevenue: async (
    startDate = dayjs().startOf("year"),
    endDate = dayjs().endOf("year")
  ) => {
    set({ isGettingRevenue: true });
    try {
      console.log("startDate getRevenue: ", startDate);
      console.log("endDate getRevenue: ", endDate);

      const res = await axiosInstance.get("/doanh-thu", {
        params: {
          startDate: formatDateTimeLocal(startDate),
          endDate: formatDateTimeLocal(endDate),
        },
      });

      console.log("res getRevenue: ", res);
      if (res.data.status === "success") {
        set({ revenueData: res.data.data });
        return res.data.data;
      } else {
        toast.error(res.data.message || "Không lấy được dữ liệu doanh thu!");
        set({ revenueData: null });
        return null;
      }
    } catch (error) {
      toast.error("Lỗi khi lấy dữ liệu doanh thu!");
      set({ revenueData: null });
      return null;
    } finally {
      set({ isGettingRevenue: false });
    }
  },
}));
