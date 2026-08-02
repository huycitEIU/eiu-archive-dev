import React from "react";
import {
  Layout,
  Menu,
  Typography,
  ConfigProvider,
  Avatar,
  Dropdown,
} from "antd";

import {
  AppstoreOutlined,
  FileTextOutlined,
  UploadOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const userMenu = {
    items: [
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Đăng xuất",
        onClick: handleLogout,
      },
    ],
  };

  // State để quản lý việc thu gọn menu bên trái
  const [collapsed, setCollapsed] = React.useState(false);

  // Các mục menu bên trái của Dashboard
  const siderMenuItems = [
    {
      key: "overview",
      icon: <AppstoreOutlined />,
      label: "Tổng quan",
    },
    {
      key: "upload",
      icon: <UploadOutlined />,
      label: "Tải lên tài liệu",
    },
    {
      key: "documents",
      icon: <FileTextOutlined />,
      label: "Quản lý tài liệu",
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Hồ sơ cá nhân",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Cài đặt hệ thống",
    },
  ];

  // Xử lý sự kiện khi người dùng chọn một mục trong menu bên trái
  const handleMenuClick = (e) => {
    navigate(`/dashboard/${e.key}`);
  };

  // Gọi handleMenuClick với key "overview" khi Dashboard được tải lần đầu
  React.useEffect(() => {
    handleMenuClick({ key: "overview" });
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Top Bar */}
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "var(--eiu-blue)",
          padding: "0 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Title style={{ color: "#ffffff", margin: 0 }} level={3}>
            EIU Archive
          </Title>
        </div>
        <div>
          <Dropdown menu={userMenu} placement="bottomRight">
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Text style={{ color: "#ffffff", fontWeight: 500 }}>
                Admin User
              </Text>
              <Avatar
                icon={<UserOutlined />}
                style={{ backgroundColor: "var(--eiu-gold)" }}
              />
            </div>
          </Dropdown>
        </div>
      </Header>

      <Layout>
        {/* Left Panel (Tính năng) */}
        <Sider
          width={250}
          theme="light"
          style={{ borderRight: "1px solid #f0f0f0" }}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["overview"]}
            style={{ height: "100%", borderRight: 0, paddingTop: "16px" }}
            items={siderMenuItems}
            onClick={handleMenuClick}
          />
        </Sider>

        {/* Right Panel (Khung hiển thị chính) */}
        <Layout style={{ padding: "24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
