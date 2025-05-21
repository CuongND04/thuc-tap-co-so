import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../../store/useProductStore";
import {
  Form,
  Input,
  InputNumber,
  Typography,
  Card,
  Button,
  Select,
} from "antd";
import { uploadImageToCloudinary } from "../../lib/uploadImage";
import toast from "react-hot-toast";
import { useCategoryStore } from "../../store/useCategoryStore";

const { Title } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { getDetailProduct, isGettingDetailProduct, updateProduct } =
    useProductStore();
  const { getAllCategories, isGettingAllCategories } = useCategoryStore();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDetailProduct(id);
      if (data) {
        setProduct(data);
        form.setFieldsValue({
          ...data,
          // do backend tách riêng 2 phần ra mà lại chung api tạo nên cần phải xử lí
          soLuongTonKho:
            data.soLuongThuCung !== null
              ? data.soLuongThuCung
              : data.soLuongPhuKien,
        });
      }
    };
    fetchData();
    const fetchCategories = async () => {
      const listCate = await getAllCategories();
      setCategories(listCate);
    };
    fetchCategories();
  }, [id]);

  // xử lí khi up ảnh lên để hiển thị preview
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Upload to Cloudinary
      setUploading(true);
      try {
        const response = await uploadImageToCloudinary(file);
        console.log("response:", response);
        // set giá trị cho trường avatar trong form nhặt thông tin
        form.setFieldsValue({ avatar: response.secure_url });

        toast.success("Upload ảnh thành công!");
      } catch (error) {
        toast.error("Có lỗi xảy ra khi upload ảnh. Vui lòng thử lại.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleUpdateCategory = async () => {
    try {
      setIsSubmitting(true);

      const values = await form.validateFields();
      console.log("values: ", values);
      const updated = await updateProduct(id, values);

      if (updated) {
        toast.success("Cập nhật sản phẩm thành công");
        setProduct(updated); // nếu muốn cập nhật lại state hiển thị
      } else {
        toast.error("Cập nhật sản phẩm thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi xử lý form:", error);
      toast.error("Vui lòng kiểm tra lại thông tin nhập");
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log("product: ", product);
  if (isGettingDetailProduct || isGettingAllCategories) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  console.log("categories:", categories);
  return (
    <div className="">
      <Card>
        <Title className="mb-2" level={2}>
          Chi tiết sản phẩm
        </Title>
        <Form layout="vertical" form={form} onFinish={handleUpdateCategory}>
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
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₫"
              }
              parser={(value) => value.replace(/[^\d]/g, "")}
            />
          </Form.Item>

          <Form.Item
            label="Ảnh sản phẩm"
            className="col-span-2"
            rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
          >
            <div className="flex items-center gap-4">
              {(form.getFieldValue("avatar") || product?.hinhAnh) && (
                <img
                  src={form.getFieldValue("avatar") || product?.hinhAnh}
                  alt={product?.tenSanPham}
                  className="w-40 h-40 object-cover rounded"
                />
              )}
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex items-center justify-center p-2 border border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition duration-300"
              >
                <i className="fas fa-upload text-blue-500 mr-2"></i>
                <span className="text-blue-500 font-medium">Chọn tệp</span>
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              {uploading && <p>Đang tải ảnh...</p>}
            </div>
          </Form.Item>

          {product?.gioiTinh && (
            <Form.Item
              name="gioiTinh"
              label="Giới tính"
              rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
            >
              <Select placeholder="Chọn giới tính">
                <Select.Option value="Đực">Đực</Select.Option>
                <Select.Option value="Cái">Cái</Select.Option>
              </Select>
            </Form.Item>
          )}
          <Form.Item
            name="maDanhMuc"
            label="Danh mục"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
            initialValue={product?.maDanhMuc} // mặc định là mã danh mục hiện tại
          >
            <Select placeholder="Chọn danh mục">
              {categories.map((cat) => (
                <Select.Option key={cat.maDanhMuc} value={cat.maDanhMuc}>
                  {cat.tenDanhMuc}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {product?.tuoi && (
            <Form.Item
              name="tuoi"
              label="Tuổi"
              rules={[{ required: true, message: "Vui lòng nhập tuổi" }]}
            >
              <InputNumber
                min={0}
                max={360}
                placeholder="Ví dụ: 12"
                formatter={(value) => `${value} tháng`}
                parser={(value) => value.replace(/\D/g, "")}
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}

          {product?.trangThaiTiem && (
            <Form.Item
              name="trangThaiTiem"
              label="Trạng thái tiêm"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập trạng thái tiêm chủng",
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item
            name="soLuongTonKho"
            label="Số lượng"
            rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
          >
            <InputNumber
              min={0}
              max={10000}
              step={1}
              style={{ width: "100%" }}
              placeholder="Nhập số lượng"
              controls={true}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              className="mt-2"
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProductDetail;
