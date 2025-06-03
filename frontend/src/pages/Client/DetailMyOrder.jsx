import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Descriptions,
  Table,
  Select,
  Button,
  Space,
  Steps,
} from "antd";
import {
  CheckCircleOutlined,
  LoadingOutlined,
  TruckOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Loader } from "lucide-react";
import { useSaleOrdersStore } from "../../store/useSaleOrdersStore";
import toast from "react-hot-toast";

const { Title } = Typography;
const { Option } = Select;

const DetailMyOrder = () => {
  const { maDonHang } = useParams();
  const { getSaleOrderDetail, isGettingAllSaleOrders, updateSaleOrderStatus } =
    useSaleOrdersStore();

  const [saleDetail, setSaleDetail] = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState(null);

  const parseNgayDatHang = (rawDate) => {
    if (!rawDate) return null;
    if (Array.isArray(rawDate)) {
      const [year, month, day, hour, minute] = rawDate;
      return dayjs(new Date(year, month - 1, day, hour, minute));
    }
    return dayjs(rawDate);
  };

  useEffect(() => {
    const fetchDetail = async () => {
      const data = await getSaleOrderDetail(maDonHang);
      if (data) {
        setSaleDetail(data);
        setNewStatus(data.trangThaiDonHang);
      }
    };
    fetchDetail();
  }, [maDonHang, getSaleOrderDetail]);

  if (isGettingAllSaleOrders || !saleDetail) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "maSanPham",
      key: "maSanPham",
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
      dataIndex: "donGia",
      key: "donGia",
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

  const handleUpdateStatus = async () => {
    if (!newStatus || newStatus === saleDetail.trangThaiDonHang) {
      toast("Trạng thái không thay đổi");
      return;
    }
    setIsUpdatingStatus(true);
    const updated = await updateSaleOrderStatus(maDonHang, newStatus);
    if (updated) {
      setSaleDetail((prev) => ({
        ...prev,
        trangThaiDonHang: updated.trangThaiDonHang,
      }));
    }
    setIsUpdatingStatus(false);
  };

  const orderStatuses = ["Đang xử lý", "Đang giao", "Đã giao"];
  const khachHang = saleDetail.khachHang;

  const statusSteps = [
    {
      title: "Đang xử lý",
      icon: <ShoppingOutlined />,
    },
    {
      title: "Đang giao",
      icon: <TruckOutlined />,
    },
    {
      title: "Đã giao",
      icon: <CheckCircleOutlined />,
    },
  ];

  const currentStep = statusSteps.findIndex(
    (s) => s.title === saleDetail.trangThaiDonHang
  );
  return (
    <div className="flex justify-center items-center">
      <Card className="w-[1200px]">
        <h2 className="text-3xl font-[Coiny] font-bold text-center mb-4 text-pink-600">
          CHI TIẾT ĐƠN HÀNG SỐ {saleDetail.maDonHang}
        </h2>

        <Descriptions
          bordered
          column={1}
          size="middle"
          style={{ marginBottom: 24 }}
        >
          <Descriptions.Item label="Mã đơn hàng">
            {saleDetail.maDonHang}
          </Descriptions.Item>
          <Descriptions.Item label="Mã khách hàng">
            {khachHang?.maKhachHang}
          </Descriptions.Item>
          <Descriptions.Item label="Tên khách hàng">
            {khachHang?.hoTen}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {khachHang?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {khachHang?.soDienThoai}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {khachHang?.diaChi}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày đặt hàng">
            {parseNgayDatHang(saleDetail.ngayDatHang)?.format(
              "DD/MM/YYYY HH:mm"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng tiền">
            {saleDetail.tongTien.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái đơn hàng">
            <div className="custom-steps">
              <Steps
                current={currentStep}
                size="default" // "default" là lớn hơn "small"
                items={statusSteps}
                responsive={false}
              />
            </div>
          </Descriptions.Item>
        </Descriptions>

        <Table
          dataSource={saleDetail.chiTietDonHangs}
          columns={columns}
          rowKey={(record) => record.maSanPham}
          pagination={false}
          bordered
          title={() => "Chi tiết sản phẩm trong đơn hàng"}
        />
      </Card>
    </div>
  );
};

export default DetailMyOrder;
