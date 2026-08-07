import React, { useState } from "react";

import {
  Layout,
  theme,
  Breadcrumb,
  Menu,
  Button,
  Space,
  Typography,
  Dropdown,
  Avatar,
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
} from "@ant-design/icons";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

const { Header, Footer, Content, Sider } = Layout;
const { Title, Text } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

const userMenu = {
  items: [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
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
  { key: "help", icon: <QuestionCircleOutlined />, label: "Help" },
];

const DashboardLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const [collsapsed, setCollapsed] = useState(false);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigate(`/dashboard/${e.key}`);
  };

  return (
    <Layout
      style={{
        position: "sticky",
        height: "100vh",
        overflowY: "hidden",
      }}
    >
      <Header
        style={{
          background: colorBgContainer,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Space align="center">
          {/* <img
            style={{ display: "inline-block" }}
            src={logo}
            alt="EIU"
            // height={"24px"}
          /> */}
          <Title>EIU Archive</Title>
        </Space>
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
      <Layout hasSider>
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
          ></Menu>
        </Sider>
        <Layout>
          <Breadcrumb
            style={{ margin: "16px" }}
            items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
          ></Breadcrumb>
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "auto",
            }}
          >
            <Outlet></Outlet>
            <Footer style={{ textAlign: "center" }}>
              EIU Archive ©{currentYear}
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
