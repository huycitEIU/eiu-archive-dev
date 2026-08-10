import React, { useState } from "react";

import {
  Layout,
  theme,
  Menu,
  Button,
  Space,
  Typography,
  Dropdown,
  Avatar,
  FloatButton,
  Grid,
  Drawer,
  message,
} from "antd";
import type { MenuProps } from "antd";
import {
  BellOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  LogoutOutlined,
  UserOutlined,
  FileOutlined,
  PlusCircleOutlined,
  DatabaseOutlined,
  PieChartOutlined,
  SettingOutlined,
  ControlOutlined,
  CommentOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";

import logo from "../assets/Logo_EIU.png";

const { Header, Footer, Content, Sider } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

type MenuItem = Required<MenuProps>["items"][number];

const userMenu = {
  items: [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      },
    },
  ],
};

const siderItems: MenuItem[] = [
  {
    key: "overview",
    icon: <PieChartOutlined />,
    label: "Overview",
  },
  {
    key: "document",
    icon: <FileOutlined />,
    label: "Document",
    children: [
      {
        key: "upload",
        icon: <PlusCircleOutlined />,
        label: "Upload",
      },
      {
        key: "manage",
        icon: <DatabaseOutlined />,
        label: "Manage",
      },
    ],
  },
  {
    key: "setting",
    icon: <SettingOutlined />,
    label: "Setting",
    children: [
      {
        key: "user",
        icon: <UserOutlined />,
        label: "User",
      },
      {
        key: "config",
        icon: <ControlOutlined />,
        label: "Config",
      },
    ],
  },
  {
    key: "help",
    icon: <QuestionCircleOutlined />,
    label: "Help",
    children: [
      {
        key: "feedback",
        icon: <CommentOutlined />,
        label: "Feedback",
      },
    ],
  },
];

const DashboardLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const screens = useBreakpoint();

  const currentYear = new Date().getFullYear();
  const [collsapsed, setCollapsed] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key == "config") {
      messageApi.warning("This feature is currently under development.");
      return;
    }
    navigate(`/dashboard/${e.key}`);
  };

  if (!screens.md) {
    const showDrawer = () => {
      setOpenDrawer(true);
    };

    const onCloseDrawer = () => {
      setOpenDrawer(false);
    };
    return (
      <Layout
        style={{
          position: "sticky",
          height: "100vh",
          overflowY: "hidden",
          background: colorBgContainer,
        }}
      >
        {contextHolder}
        <FloatButton
          icon={<CommentOutlined />}
          type="primary"
          style={{ right: 24, bottom: 24 }}
          onClick={() => {
            navigate("/dashboard/feedback");
          }}
        />
        <Header
          style={{
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
          }}
        >
          {/* // Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginRight: "16px",
            }}
          >
            <img src={logo} alt="Logo" style={{ height: "30px" }} />
            <Title level={4} style={{ margin: 0 }}>
              EIU Archive
            </Title>
          </div>
          <div style={{ flex: 1 }}></div>
          <Button type="primary" onClick={showDrawer}>
            <MenuOutlined />
          </Button>
        </Header>
        <Layout
          hasSider
          style={{
            background: colorBgContainer,
          }}
        >
          <Layout
            style={{
              borderRadius: borderRadiusLG,
            }}
          >
            <Content
              style={{
                margin: "8px 8px 0",
                overflow: "auto",
                borderRadius: borderRadiusLG,
                background: colorBgContainer,
              }}
            >
              <Outlet></Outlet>
              <Footer
                style={{
                  textAlign: "center",
                  marginTop: "16px",
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                EIU Archive ©{currentYear}
              </Footer>
            </Content>
          </Layout>
        </Layout>
        <Drawer
          placement="bottom"
          closable={{ "aria-label": "Close Button" }}
          onClose={onCloseDrawer}
          open={openDrawer}
        >
          <Menu
            items={siderItems}
            mode="inline"
            onClick={handleMenuClick}
            style={{
              border: 0,
            }}
          ></Menu>
        </Drawer>
      </Layout>
    );
  }

  return (
    <Layout
      style={{
        position: "sticky",
        height: "100vh",
        overflowY: "hidden",
        background: colorBgContainer,
      }}
    >
      {contextHolder}
      <FloatButton
        icon={<CommentOutlined />}
        type="primary"
        style={{ right: 24, bottom: 24 }}
        onClick={() => {
          navigate("/dashboard/feedback");
        }}
      />
      <Header
        style={{
          background: colorBgContainer,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
        }}
      >
        {/* // Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginRight: "16px",
          }}
        >
          <img src={logo} alt="Logo" style={{ height: "30px" }} />
          <Title level={4} style={{ margin: 0 }}>
            EIU Archive
          </Title>
        </div>
        <div style={{ flex: 1 }}></div>
        <Space>
          <Button icon={<SearchOutlined />}></Button>
          <Button icon={<BellOutlined />}></Button>
          <Button icon={<QuestionCircleOutlined />}></Button>
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
                <Avatar icon={<UserOutlined />} />
              </div>
            </Dropdown>
          </div>
        </Space>
      </Header>
      <Layout
        hasSider
        style={{
          background: colorBgContainer,
        }}
      >
        <Sider
          theme="light"
          collapsible
          collapsed={collsapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            scrollbarWidth: "thin",
            scrollbarGutter: "stable",
            overflow: "auto",
          }}
        >
          <Menu
            items={siderItems}
            mode="inline"
            onClick={handleMenuClick}
            style={{
              border: 0,
            }}
          ></Menu>
        </Sider>
        <Layout
          style={{
            borderRadius: borderRadiusLG,
          }}
        >
          <Content
            style={{
              margin: "8px 8px 0",
              overflow: "auto",
              borderRadius: borderRadiusLG,
              background: colorBgContainer,
              padding: "16px",
            }}
          >
            <Outlet></Outlet>
            <Footer
              style={{
                textAlign: "center",
                marginTop: "16px",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              EIU Archive ©{currentYear}
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
