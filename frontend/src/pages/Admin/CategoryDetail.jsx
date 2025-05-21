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

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const { getDetailCategory, isGettingDetailCategory, updateCategory } =
    useCategoryStore();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDetailCategory(id);
      if (data) {
        setCategory(data);
        form.setFieldsValue(data); // set giá trị ban đầu cho form
      }
    };
    fetchData();
  }, [id]);
  const handleUpdateCategory = async () => {
    try {
      setIsSubmitting(true);

      const values = await form.validateFields();

      const updated = await updateCategory(id, values);

      if (updated) {
        toast.success("Cập nhật danh mục thành công");
        setCategory(updated); // nếu muốn cập nhật lại state hiển thị
      } else {
        toast.error("Cập nhật danh mục thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi xử lý form:", error);
      toast.error("Vui lòng kiểm tra lại thông tin nhập");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isGettingDetailCategory) {
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
          Chỉnh sửa danh mục
        </Title>
        <Form layout="vertical" form={form} onFinish={handleUpdateCategory}>
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
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CategoryDetail;
