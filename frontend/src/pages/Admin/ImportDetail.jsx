import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Form,
  InputNumber,
  Typography,
  Card,
  Button,
  DatePicker,
  Select,
} from "antd";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useSupplyStore } from "../../store/useSupplyStore";
import { useProductStore } from "../../store/useProductStore";
import { useImportOrderStore } from "../../store/useImportOrderStore";

const { Title } = Typography;

const ImportDetail = () => {
  const { maNhaCungCap, maSanPham } = useParams();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState(null);

  const { getAllSupplies, isLoading: isGettingSuppliers } = useSupplyStore();
  const { getAllProducts, isLoading: isGettingProducts } = useProductStore();
  const { getDetailCungCap, updateCungCap, isGettingDetailCungCap } =
    useImportOrderStore();
  const parseNgayCungCap = (rawDate) => {
    if (!rawDate) return null;

    if (Array.isArray(rawDate)) {
      // Mảng [year, month, day, hour, minute], nhớ tháng trong JS bắt đầu từ 0, dayjs cũng vậy
      const [year, month, day, hour, minute] = rawDate;
      // Tạo dayjs object từ các tham số (month - 1 vì mảng bạn cho tháng 4 là index 4, trong dayjs tháng bắt đầu từ 0)
      const dateObj = dayjs(new Date(year, month - 1, day, hour, minute));
      return dateObj.isValid() ? dateObj : null;
    }

    // Các kiểu khác bạn xử lý tùy theo như trước
    if (typeof rawDate === "string") {
      const cleanedDate = rawDate.split(".")[0];
      const parsedDate = dayjs(cleanedDate, "YYYY-MM-DD HH:mm:ss");
      return parsedDate.isValid() ? parsedDate : null;
    }

    // Nếu là Date object hoặc dayjs object
    const dayjsDate = dayjs(rawDate);
    return dayjsDate.isValid() ? dayjsDate : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const [suppliersData, productsData, invoiceData] = await Promise.all([
        getAllSupplies(),
        getAllProducts(),
        getDetailCungCap(maNhaCungCap, maSanPham),
      ]);

      setSuppliers(suppliersData);
      setProducts(productsData);

      if (invoiceData) {
        setCurrentInvoice(invoiceData);
        console.log(invoiceData.ngayCungCap);
        form.setFieldsValue({
          ...invoiceData,
          ngayCungCap: parseNgayCungCap(invoiceData.ngayCungCap),
        });
      }
    };
    fetchData();
  }, [maNhaCungCap, maSanPham]);

  const onFinish = async (values) => {
    setIsSubmitting(true);
    const data = {
      maNhaCungCap: values.maNhaCungCap,
      maSanPham: values.maSanPham,
      giaCungCap: values.giaCungCap,
      soLuong: values.soLuong,
      ngayCungCap: values.ngayCungCap.toISOString(),
    };
    try {
      const updated = await updateCungCap(maNhaCungCap, maSanPham, data);
      if (updated) {
        toast.success("Cập nhật hóa đơn cung cấp thành công!");
        setCurrentInvoice(updated);
      } else {
        toast.error("Cập nhật thất bại");
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra khi cập nhật");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isGettingSuppliers || isGettingProducts || isGettingDetailCungCap) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <Title level={2}>Chỉnh sửa hóa đơn cung cấp</Title>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="maNhaCungCap"
          label="Nhà cung cấp"
          rules={[{ required: true, message: "Vui lòng chọn nhà cung cấp" }]}
        >
          <Select placeholder="Chọn nhà cung cấp">
            {suppliers.map((s) => (
              <Select.Option key={s.maNhaCungCap} value={s.maNhaCungCap}>
                {s.ten}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="maSanPham"
          label="Sản phẩm"
          rules={[{ required: true, message: "Vui lòng chọn sản phẩm" }]}
        >
          <Select placeholder="Chọn sản phẩm">
            {products.map((p) => (
              <Select.Option key={p.maSanPham} value={p.maSanPham}>
                {p.tenSanPham}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="giaCungCap"
          label="Giá cung cấp"
          rules={[{ required: true, message: "Vui lòng nhập giá" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="soLuong"
          label="Số lượng"
          rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="ngayCungCap"
          label="Ngày cung cấp"
          rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
        >
          <DatePicker
            showTime
            style={{ width: "100%" }}
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Cập nhật hóa đơn
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ImportDetail;
