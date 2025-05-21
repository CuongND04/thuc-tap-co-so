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
import toast from "react-hot-toast";
import { useCategoryStore } from "../../store/useCategoryStore";

const { Title } = Typography;

const CreateCategory = () => {
  const { id } = useParams();
  const { createCategory } = useCategoryStore();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateCategory = async () => {
    try {
      setIsSubmitting(true);

      const values = await form.validateFields();

      const newCate = await createCategory(values);

      if (newCate) {
        toast.success("Thêm danh mục thành công");
      } else {
        toast.error("Thêm danh mục thất bại");
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
          Thêm mới danh mục
        </Title>
        <Form layout="vertical" form={form} onFinish={handleCreateCategory}>
          <Form.Item
            name="tenDanhMuc"
            label="Tên danh mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="moTa" label="Mô tả">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="kieu"
            label="Kiểu"
            rules={[{ required: true, message: "Vui lòng chọn kiểu" }]}
          >
            <Select>
              <Select.Option value="thu_cung">Thú cưng</Select.Option>
              <Select.Option value="phu_kien">Phụ kiện</Select.Option>
            </Select>
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

export default CreateCategory;
