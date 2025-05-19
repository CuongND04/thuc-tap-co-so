import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../../store/useProductStore";
import { Form, Input, InputNumber, Typography, Card, Button } from "antd";
import { uploadImageToCloudinary } from "../../lib/uploadImage";
import toast from "react-hot-toast";

const { Title } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { getDetailProduct, isGettingDetailProduct } = useProductStore();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDetailProduct(id);
      if (data) {
        setProduct(data);
        form.setFieldsValue(data); // set giá trị ban đầu cho form
      }
    };
    fetchData();
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

  if (isGettingDetailProduct) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="">
      <Card>
        <Title className="mb-2" level={2}>
          Chi tiết sản phẩm
        </Title>
        <Form layout="vertical" form={form}>
          <Form.Item name="tenSanPham" label="Tên sản phẩm">
            <Input />
          </Form.Item>

          <Form.Item name="moTa" label="Mô tả">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item name="giaBan" label="Giá bán">
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₫"
              }
              parser={(value) => value.replace(/[^\d]/g, "")}
            />
          </Form.Item>

          <Form.Item label="Ảnh sản phẩm" className="col-span-2">
            <div className="flex items-center gap-4">
              {/* Ảnh hiện tại hoặc preview ảnh mới */}
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
              {uploading && <p>Uploading...</p>}
            </div>
          </Form.Item>

          {product?.giong && (
            <Form.Item name="giong" label="Giống">
              <Input />
            </Form.Item>
          )}

          {product?.gioiTinh && (
            <Form.Item name="gioiTinh" label="Giới tính">
              <Input />
            </Form.Item>
          )}

          {product?.tuoi && (
            <Form.Item name="tuoi" label="Tuổi">
              <Input />
            </Form.Item>
          )}

          {product?.trangThaiTiem && (
            <Form.Item name="trangThaiTiem" label="Trạng thái tiêm">
              <Input />
            </Form.Item>
          )}

          {product?.loaiPhuKien && (
            <Form.Item name="loaiPhuKien" label="Loại phụ kiện">
              <Input />
            </Form.Item>
          )}

          <Form.Item
            name={
              product?.soLuongThuCung !== null
                ? "soLuongThuCung"
                : "soLuongPhuKien"
            }
            label="Số lượng"
          >
            <InputNumber min={0} style={{ width: "100%" }} />
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
