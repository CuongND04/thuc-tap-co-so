import { Loader } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Typography,
  Card,
  Button,
  Select,
} from "antd";
import toast from "react-hot-toast";
import { useCategoryStore } from "../../store/useCategoryStore";
import { uploadImageToCloudinary } from "../../lib/uploadImage";
import { useProductStore } from "../../store/useProductStore";

const { Title } = Typography;

const CreateAccessoryProduct = () => {
  const [form] = Form.useForm();
  const { getAllCategories, isGettingAllCategories } = useCategoryStore();
  const { createProduct } = useProductStore();
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      try {
        const response = await uploadImageToCloudinary(file);
        form.setFieldsValue({ hinhAnh: response.secure_url });
        toast.success("Upload ảnh thành công!");
      } catch {
        toast.error("Lỗi upload ảnh");
      } finally {
        setUploading(false);
      }
    }
  };

  const onFinish = async (values) => {
    setIsSubmitting(true);
    const data = {
      tenSanPham: values.tenSanPham,
      hinhAnh: values.hinhAnh,
      moTa: values.moTa,
      giaBan: values.giaBan,
      danhMuc: { maDanhMuc: values.maDanhMuc },
      phuKien: {
        soLuongTonKho: values.soLuongTonKho,
      },
    };
    try {
      await createProduct(data);
      toast.success("Thêm phụ kiện thành công!");
      form.resetFields();
    } catch {
      toast.error("Lỗi khi thêm sản phẩm");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isGettingAllCategories) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <Card>
      <Title level={2}>Thêm sản phẩm Phụ kiện</Title>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="tenSanPham"
          label="Tên sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="moTa"
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="giaBan"
          label="Giá bán"
          rules={[{ required: true, message: "Vui lòng nhập giá bán" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="hinhAnh"
          label="Ảnh sản phẩm"
          rules={[{ required: true, message: "Vui lòng chọn ảnh sản phẩm" }]}
        >
          <div className="flex items-center gap-4">
            {form.getFieldValue("hinhAnh") && (
              <img
                src={form.getFieldValue("hinhAnh")}
                className="w-40 h-40 object-cover"
              />
            )}
            <label htmlFor="file-upload" className="cursor-pointer">
              <span>Chọn ảnh</span>
            </label>
            <input
              id="file-upload"
              type="file"
              hidden
              onChange={handleFileChange}
            />
            {uploading && <p>Đang tải ảnh...</p>}
          </div>
        </Form.Item>

        <Form.Item
          name="maDanhMuc"
          label="Danh mục"
          rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
        >
          <Select placeholder="Chọn danh mục">
            {categories
              .filter((cat) => cat.kieu === "phu_kien") // lọc theo kiểu "thu_cung"
              .map((cat) => (
                <Select.Option key={cat.maDanhMuc} value={cat.maDanhMuc}>
                  {cat.tenDanhMuc}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="soLuongTonKho"
          label="Số lượng"
          rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Tạo phụ kiện
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateAccessoryProduct;
