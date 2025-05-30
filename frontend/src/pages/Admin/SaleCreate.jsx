import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Select,
  Button,
  InputNumber,
  Space,
  Typography,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useAccountStore } from "../../store/useAccountStore";
import { useProductStore } from "../../store/useProductStore";
import { useSaleOrdersStore } from "../../store/useSaleOrdersStore";

const { Title } = Typography;

const SaleCreate = () => {
  const [form] = Form.useForm();

  const { accounts, getAllAccounts, isGettingAllAccounts } = useAccountStore();
  const { getAllProducts, isGettingAllProducts } = useProductStore();
  const { createSaleOrder } = useSaleOrdersStore();

  const [products, setProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getAllAccounts();
    getAllProducts().then((data) => {
      if (data) setProducts(data);
    });
  }, [getAllAccounts, getAllProducts]);

  const onFinish = async (values) => {
    if (!values.chiTietDonHangs || values.chiTietDonHangs.length === 0) {
      message.error("Vui lòng thêm ít nhất một sản phẩm");
      return;
    }

    const payload = {
      maNguoiDung: values.maNguoiDung,
      chiTietDonHangs: values.chiTietDonHangs.map((item) => ({
        maSanPham: item.maSanPham,
        soLuong: item.soLuong,
      })),
    };

    setIsSubmitting(true);
    try {
      const result = await createSaleOrder(payload);
      if (result) {
        form.resetFields();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <Title level={2}>Tạo đơn bán hàng</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        disabled={isGettingAllAccounts || isGettingAllProducts}
      >
        <Form.Item
          label="Người dùng"
          name="maNguoiDung"
          rules={[{ required: true, message: "Vui lòng chọn người dùng" }]}
        >
          <Select
            placeholder="Chọn người dùng"
            allowClear
            loading={isGettingAllAccounts}
          >
            {accounts?.map((user) => (
              <Select.Option key={user.maNguoiDung} value={user.maNguoiDung}>
                {user.hoTen + " - " + user.email + " - " + user.diaChi}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.List name="chiTietDonHangs">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "maSanPham"]}
                    rules={[{ required: true, message: "Chọn sản phẩm" }]}
                  >
                    <Select
                      placeholder="Chọn sản phẩm"
                      style={{ width: 250 }}
                      allowClear
                      loading={isGettingAllProducts}
                    >
                      {products.map((p) => (
                        <Select.Option key={p.maSanPham} value={p.maSanPham}>
                          {p.tenSanPham}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "soLuong"]}
                    rules={[
                      { required: true, message: "Nhập số lượng" },
                      {
                        type: "number",
                        min: 1,
                        message: "Số lượng phải lớn hơn hoặc bằng 1",
                      },
                    ]}
                  >
                    <InputNumber placeholder="Số lượng" min={1} />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm sản phẩm
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Tạo đơn bán hàng
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SaleCreate;
