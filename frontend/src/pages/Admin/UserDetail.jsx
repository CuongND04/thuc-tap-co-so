import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { useAccountStore } from "../../store/useAccountStore";

const { Title } = Typography;

const UserDetail = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const { getDetailAccount, isGettingDetailAccount, updateAccount } =
    useAccountStore();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDetailAccount(id);
      if (data) {
        setAccount(data);
        form.setFieldsValue(data);
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

  const handleUpdateAccount = async () => {
    try {
      setIsSubmitting(true);

      const values = await form.validateFields();
      console.log("values: ", values);
      const updated = await updateAccount(id, values);

      if (updated) {
        toast.success("Cập nhật tài khoản thành công");
        setAccount(updated); // nếu muốn cập nhật lại state hiển thị
      } else {
        toast.error("Cập nhật tài khoản thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi xử lý form:", error);
      toast.error("Vui lòng kiểm tra lại thông tin nhập");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isGettingDetailAccount) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  console.log("account: ", account);
  return (
    <div className="">
      <Card>
        <Title className="mb-2" level={2}>
          Chỉnh sửa thông tin
        </Title>
        <Form layout="vertical" form={form} onFinish={handleUpdateAccount}>
          <Form.Item
            name="tenDangNhap"
            label="Tên đăng nhập"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="hoTen"
            label="Họ tên"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="soDienThoai"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                pattern: /^[0-9]{9,11}$/,
                message: "Số điện thoại không hợp lệ",
              },
            ]}
          >
            <Input maxLength={11} placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            name="avatar"
            label="Ảnh đại diện"
            className="col-span-2"
            rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
          >
            <div className="flex items-center gap-4">
              {form.getFieldValue("avatar") && (
                <img
                  src={form.getFieldValue("avatar")}
                  alt="avatar"
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

          <Form.Item
            name="email"
            label="Địa chỉ email"
            rules={[{ required: true, message: "Vui lòng chọn địa chỉ email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="diaChi"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="quyenTruyCap"
            label="Quyền truy cập"
            rules={[
              { required: true, message: "Vui lòng chọn quyền truy cập" },
            ]}
          >
            <Select placeholder="Chọn giới tính">
              <Select.Option value="ADMIN">Quản trị viên</Select.Option>
              <Select.Option value="CUSTOMER">Khách hàng</Select.Option>
            </Select>
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

export default UserDetail;
