import { Loader } from "lucide-react";
import React, { useState } from "react";
import { Form, Input, Typography, Card, Button } from "antd";
import toast from "react-hot-toast";
import { useSupplyStore } from "../../store/useSupplyStore";

const { Title } = Typography;

const CreateSuppliers = () => {
  const { createSupply } = useSupplyStore();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateSupplier = async () => {
    try {
      setIsSubmitting(true);

      const values = await form.validateFields();

      const newSupplier = await createSupply(values);

      if (newSupplier) {
        toast.success("Thêm nhà cung cấp thành công");
        form.resetFields();
      } else {
        toast.error("Thêm nhà cung cấp thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi xử lý form:", error);
      toast.error("Vui lòng kiểm tra lại thông tin nhập");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      <Card>
        <Title className="mb-2" level={2}>
          Thêm mới nhà cung cấp
        </Title>
        <Form layout="vertical" form={form} onFinish={handleCreateSupplier}>
          <Form.Item
            name="ten"
            label="Tên nhà cung cấp"
            rules={[
              { required: true, message: "Vui lòng nhập tên nhà cung cấp" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="diaChi"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item
            name="soDienThoai"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                pattern: /^\d{10,11}$/,
                message: "Số điện thoại phải gồm 10 hoặc 11 chữ số",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              className="mt-2"
            >
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateSuppliers;
