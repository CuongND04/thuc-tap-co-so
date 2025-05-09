import { Outlet } from "react-router-dom";

import React, { useState } from "react";
import {
  PieChartOutlined,
  AppstoreOutlined,
  TagsOutlined,
  ShoppingCartOutlined,
  DownloadOutlined,
  UploadOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
import { useNavigate } from "react-router-dom";
const items = [
  getItem("Dashboard", "/admin/dashboard", <PieChartOutlined />),

  getItem("Quản lý sản phẩm", "/admin/products", <AppstoreOutlined />),
  getItem("Quản lý danh mục", "/admin/categories", <TagsOutlined />),

  getItem("Quản lý đơn hàng", "orders", <ShoppingCartOutlined />, [
    getItem("Nhập hàng", "/admin/import", <DownloadOutlined />),
    getItem("Bán hàng", "/admin/sales", <UploadOutlined />),
  ]),

  getItem("Quản lý tài khoản", "/admin/users", <UserOutlined />),
  getItem("Quản lý nhà cung cấp", "/admin/suppliers", <TeamOutlined />),
  getItem("Báo cáo doanh thu", "/admin/reports", <BarChartOutlined />),
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    navigate(key); // key chính là path
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
      >
        <div
          className={`demo-logo-vertical ${
            collapsed ? "collapsed" : ""
          } mb-5 flex justify-center items-center`}
        >
          <img
            className={`${collapsed ? "" : "size-30"} `}
            src="https://matpetfamily.com/wp-content/uploads/2019/11/m%E1%BA%ADt-pet-logo-300x297.png"
            alt="logo"
          />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["/admin/dashboard"]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          PetStore ©{new Date().getFullYear()} Created by Nhom5TTCS
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
