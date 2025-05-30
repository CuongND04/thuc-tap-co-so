import { Loader } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Form,
  InputNumber,
  Typography,
  Card,
  Button,
  DatePicker,
  Select,
} from "antd";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useProductStore } from "../../store/useProductStore";
import { useImportOrderStore } from "../../store/useImportOrderStore";
import { useSupplyStore } from "../../store/useSupplyStore";

const { Title } = Typography;

const ImportCreate = () => {
  const [form] = Form.useForm();
  const { getAllSupplies, isLoading: isGettingAllSupplies } = useSupplyStore();
  const { getAllProducts, isLoading: isGettingAllProducts } = useProductStore();
  const { createCungCap } = useImportOrderStore(); // Hàm tạo hóa đơn cung cấp
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getAllSupplies().then(setSuppliers);
    getAllProducts().then(setProducts);
  }, []);

  const onFinish = async (values) => {
    setIsSubmitting(true);
    const data = {
      maNhaCungCap: values.maNhaCungCap,
      maSanPham: values.maSanPham,
      giaCungCap: values.giaCungCap,
      soLuong: values.soLuong,
      ngayCungCap: values.ngayCungCap.toISOString(), // Chuyển sang ISO string
    };
    try {
      await createCungCap(data);
      toast.success("Tạo hóa đơn cung cấp thành công!");
      form.resetFields();
    } catch {
      toast.error("Lỗi khi tạo hóa đơn cung cấp");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isGettingAllSupplies || isGettingAllProducts) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <Card>
      <Title level={2}>Tạo hóa đơn cung cấp</Title>
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
          rules={[{ required: true, message: "Vui lòng chọn ngày cung cấp" }]}
        >
          <DatePicker
            showTime
            style={{ width: "100%" }}
            format="YYYY-MM-DD HH:mm:ss"
            defaultValue={dayjs()}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Tạo hóa đơn
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ImportCreate;
