import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Typography, Card, Button } from "antd";
import toast from "react-hot-toast";
import { useSupplyStore } from "../../store/useSupplyStore";

const { Title } = Typography;

const DetailSuppliers = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const { getDetailSupply, isGettingDetailSupply, updateSupply } =
    useSupplyStore();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDetailSupply(id);
      if (data) {
        setSupplier(data);
        form.setFieldsValue(data); // set giá trị ban đầu cho form
      }
    };
    fetchData();
  }, [id]);

  const handleUpdateSupply = async () => {
    try {
      setIsSubmitting(true);

      const values = await form.validateFields();

      const updated = await updateSupply(id, values);

      if (updated) {
        toast.success("Cập nhật nhà cung cấp thành công");
        setSupplier(updated);
      } else {
        toast.error("Cập nhật nhà cung cấp thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi xử lý form:", error);
      toast.error("Vui lòng kiểm tra lại thông tin nhập");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isGettingDetailSupply) {
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
          Chỉnh sửa nhà cung cấp
        </Title>
        <Form layout="vertical" form={form} onFinish={handleUpdateSupply}>
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
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default DetailSuppliers;
