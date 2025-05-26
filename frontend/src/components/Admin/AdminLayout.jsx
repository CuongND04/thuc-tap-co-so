import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
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
  SmileOutlined,
  ShoppingOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
import { Header } from "./Header";

const items = [
  getItem("Dashboard", "/admin/dashboard", <PieChartOutlined />),

  // getItem("Quản lý sản phẩm", "/admin/products", <AppstoreOutlined />),
  getItem("Quản lý sản phẩm", "products", <AppstoreOutlined />, [
    getItem("Thú cưng", "/admin/pet", <HeartOutlined />),
    getItem("Phụ kiện", "/admin/accessory", <AppstoreOutlined />),
  ]),

  getItem("Quản lý danh mục", "/admin/categories", <TagsOutlined />),

  getItem("Quản lý đơn hàng", "orders", <ShoppingCartOutlined />, [
    getItem("Nhập hàng", "/admin/import", <DownloadOutlined />),
    getItem("Bán hàng", "/admin/sales", <UploadOutlined />),
  ]),

  getItem("Quản lý tài khoản", "/admin/users", <UserOutlined />),
  getItem("Quản lý nhà cung cấp", "/admin/suppliers", <TeamOutlined />),
  getItem("Báo cáo doanh thu", "/admin/reports", <BarChartOutlined />),
  getItem("Hồ sơ người dùng", "/admin/profile", <BarChartOutlined />),
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        {decodeURIComponent(snippet.charAt(0).toUpperCase() + snippet.slice(1))}
      </Breadcrumb.Item>
    );
  });
  const handleMenuClick = ({ key }) => {
    navigate(key); // key chính là path
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const extractKeys = (menuItems) => {
    const keys = [];

    menuItems.forEach((item) => {
      if (item.key?.startsWith("/")) {
        keys.push(item.key);
      }
      if (item.children) {
        keys.push(...extractKeys(item.children));
      }
    });

    return keys;
  };
  const flatMenuKeys = extractKeys(items);

  // Tìm route phù hợp nhất
  const selectedKey = flatMenuKeys
    .filter((key) => location.pathname.startsWith(key))
    .sort((a, b) => b.length - a.length)[0]; // ưu tiên key dài hơn
  console.log("selectedKey: ", selectedKey);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
      >
        <div
          className={`mt-2 demo-logo-vertical ${
            collapsed ? "collapsed" : ""
          } mb-5 flex justify-center items-center`}
        >
          <img
            className={`transition-all duration-300 ease-in-out ${
              collapsed ? "w-10 h-10" : "w-28 h-28"
            }`}
            src="https://matpetfamily.com/wp-content/uploads/2019/11/m%E1%BA%ADt-pet-logo-300x297.png"
            alt="logo"
          />
        </div>
        <Menu
          theme="dark"
          selectedKeys={selectedKey ? [selectedKey] : []}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {breadcrumbItems}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              // background: colorBgContainer,
              // borderRadius: borderRadiusLG,
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
