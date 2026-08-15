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
  Modal,
} from "antd";
import type { MenuProps } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  CommentOutlined,
  MenuOutlined,
  StarOutlined,
  ClockCircleOutlined,
  AppstoreOutlined,
  ShareAltOutlined,
  FileSearchOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";

import logo from "../assets/Logo_EIU.png";

const { Header, Footer, Content, Sider } = Layout;
const { Title, Paragraph } = Typography;
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
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    key: "discovery",
    label: "Discovery",
    icon: <FileSearchOutlined />,
  },
  {
    key: "recommend",
    label: "Recommend",
    icon: <StarOutlined />,
    disabled: true,
  },
  {
    key: "recent",
    label: "Recent",
    icon: <ClockCircleOutlined />,
    disabled: true,
  },
  {
    key: "categories",
    label: "Categories",
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    key: "shared",
    label: "Shared with me",
    icon: <ShareAltOutlined />,
    disabled: true,
  },
];

const ExploreLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const screens = useBreakpoint();

  const currentYear = new Date().getFullYear();

  const [isModalOpen, setModalOpen] = useState(false);
  const [collsapsed, setCollapsed] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key == "dashboard") {
      navigate("/dashboard");
      return;
    }
    navigate(`/explore/${e.key}`);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Responsive cho mobile
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
        <Modal
          title="Version Notification"
          onCancel={handleCloseModal}
          open={isModalOpen}
          footer={[]}
        >
          <Paragraph>What's news? - First thing - Second thing</Paragraph>
        </Modal>
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
            <Button
              type="text"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              v1.0.2
            </Button>
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
      <Modal
        title="Version Notification"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={[]}
      >
        <Paragraph>What's news? - First thing - Second thing</Paragraph>
      </Modal>
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
          <Button
            type="text"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            v1.0.2
          </Button>
        </div>
        <div style={{ flex: 1 }}></div>
        <Space>
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

export default ExploreLayout;
