import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";

const ChangePasswordModal = ({ isModalVisible, setIsModalVisible }) => {
  const { changePassword } = useAuthStore();

  // // Sử dụng Form instance để xóa form sau khi người dùng gửi đi
  const [form] = Form.useForm();
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleOk = async () => {
    const { currentPassword, newPassword, confirmNewPassword } = passwords;
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error("Chưa điền đủ thông tin!");
      return;
    }
    if (currentPassword === newPassword) {
      toast.error("Mật khẩu mới không được giống mật khẩu hiện tại!");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Xác nhận mật khẩu mới không khớp!");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    try {
      const result = changePassword({
        matKhauCu: currentPassword,
        matKhauMoi: newPassword,
      });

      if (result) {
        setIsModalVisible(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      form.resetFields(); // Reset các trường trong form
    }
  };
  // khi bấm hủy modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset các trường trong form
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // console.log("passwords: ", passwords);
  return (
    <Modal
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <div className="pb-4 pr-6  ">
          {" "}
          {/* Thêm padding trên/dưới */}
          <Button
            style={{ marginRight: "10px" }}
            key="back"
            onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button key="submit" type="primary" onClick={handleOk}>
            Xác nhận
          </Button>
        </div>,
      ]}
    >
      <div className="py-6 px-8">
        {" "}
        {/* Thêm padding trên và dưới */}
        <div className="flex justify-center text-xl font-semibold mb-3">
          Đổi mật khẩu
        </div>
        <Form form={form} layout="vertical">
          <Form.Item
            label="Mật khẩu hiện tại"
            name="currentPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
            ]}
          >
            <Input.Password
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
          >
            <Input.Password
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
            />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmNewPassword"
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
            ]}
          >
            <Input.Password
              name="confirmNewPassword"
              value={passwords.confirmNewPassword}
              onChange={handlePasswordChange}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
