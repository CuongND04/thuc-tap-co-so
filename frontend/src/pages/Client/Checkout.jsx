import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Input,
  InputNumber,
  Space,
  Button,
  Popconfirm,
  Badge,
} from "antd";
import { DeleteOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { CirclePlus, Link, Loader } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useSaleOrdersStore } from "../../store/useSaleOrdersStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore";

const Checkout = () => {
  const { userProfile } = useAuthStore();
  const { createSaleOrder } = useSaleOrdersStore();
  const { deleteAllItem, isDeleting } = useCartStore();

  const [checkoutData, setCheckoutData] = useState([]);
  const [orderDetailArr, setOrderDetailArr] = useState([]);
  const [total, setTotal] = useState([]);

  const navigate = useNavigate();
  const { state } = useLocation();

  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "maSanPham",
      key: "maSanPham",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      width: 150,
      maxWidth: 150,
      render: (t, r) => <img src={`${r.hinhAnh}`} />,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSanPham",
      key: "tenSanPham",
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
    },
    {
      title: "Đơn giá",
      dataIndex: "giaBan",
      key: "giaBan",
      render: (value) =>
        value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      title: "Thành tiền",
      dataIndex: "thanhTien",
      key: "thanhTien",
      render: (value) =>
        value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
  ];

  //   if(!userProfile)
  //   {
  //     toast.error("Bạn chưa đăng nhập!");
  //     navigate("/");
  //     return;
  //   }

  useEffect(() => {
    if (state?.maGioHang) setCheckoutData(state.items);
    else setCheckoutData([{ ...state, thanhTien: state.giaBan, soLuong: 1 }]);
  }, [state]);

  useEffect(() => {
    setTotal(
      checkoutData.reduce(
        (acc, current) => acc + current.giaBan * current.soLuong,
        0
      )
    );
  }, [checkoutData]);

  useEffect(() => {
    const msp = checkoutData.map((data) => data.maSanPham);
    const sl = checkoutData.map((data) => data.soLuong);

    const arr = sl.map((current, index) => ({
      maSanPham: msp[index],
      soLuong: current,
    }));
    setOrderDetailArr(arr);
  }, [checkoutData]);

  if (!state) {
    toast.error("Chưa có dữ liệu!");
    navigate("/");
    return;
  }

  const createOrder = async () => {
    const res = await createSaleOrder({
      maNguoiDung: userProfile.maNguoiDung,
      chiTietDonHangs: orderDetailArr,
    });
    console.log(res);
    if (res) {
      const res2 = await deleteAllItem(userProfile.maNguoiDung);
      navigate("/don-hang");
    }
  };

  if (isDeleting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-4 rounded-xl mb-10 w-[1200px]">
        <main className="bg-white py-5 px-4">
          <section className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl uppercase font-[Coiny] font-bold text-center mb-4 text-pink-600">
              Đặt hàng
            </h2>
          </section>
        </main>
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
          <Table
            dataSource={checkoutData}
            columns={columns}
            rowKey={(record) => record.maSanPham}
            pagination={false}
            bordered
            title={() => "Xác nhận đơn hàng"}
          />
        </div>
        <div>
          <h1 className="justify-self-center font-bold text-[18px]">
            Quý khách có thể chọn thanh toán khi nhận hàng hoặc qua PayPal sau
            khi đặt mua.
          </h1>
          <h1 className="mt-5 justify-self-end text-[24px]">
            <strong className="">Tổng tiền: </strong>{" "}
            {total.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </h1>
        </div>
        <div className="mt-5 ml-[20px] flex justify-center justify-self-end items-center rounded-[10px] h-[60px] w-[180px] border-[1px] border-solid border-[#e5e5e5] bg-[#cf72aa]">
          <button
            className="text-[#000] text-[24px] font-[Coiny] rounded-[10px] h-[95%] w-[97.5%] border-[2px] border-dashed border-[#e5e5e5] bg-[#de8ebe] after:mt-[10px] after:mb-[5px] after:ml-[5px] after:content-['\203A'] hover:bg-[#cf72aa] cursor-pointer"
            name="buy"
            id="buy"
            onClick={createOrder}
            type="button"
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
