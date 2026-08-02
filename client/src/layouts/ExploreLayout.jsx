import React from "react";

import {
  Typography,
  Card,
  Statistic,
  Row,
  Col,
  Calendar,
  Collapse,
  Layout,
  Menu,
  Dropdown,
  Avatar,
  App,
} from "antd";

import { Outlet, useNavigate } from "react-router-dom";

import {
  CompassOutlined,
  UserOutlined,
  FolderOutlined,
  StarFilled,
  ClockCircleOutlined,
  LikeOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Panel } = Collapse;
const { Title } = Typography;
const { Text } = Typography;

const siderMenuItems = [
  {
    key: "explore",
    icon: <CompassOutlined />,
    label: "Khám phá",
  },
  {
    key: "category",
    icon: <FolderOutlined />,
    label: "Danh mục",
  },
  {
    key: "subject",
    icon: <AppstoreOutlined />,
    label: "Môn học",
  },
  {
    key: "major",
    icon: <AppstoreOutlined />,
    label: "Ngành học",
  },
  {
    key: "trending",
    icon: <StarFilled />,
    label: "Xu hướng",
  },
  {
    key: "recent",
    icon: <ClockCircleOutlined />,
    label: "Mới nhất",
  },
  {
    key: "recommended",
    icon: <LikeOutlined />,
    label: "Đề xuất",
  },
];

const ExploreLayout = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const navigate = useNavigate();

  const userMenu = {
    items: [
      {
        key: "login",
        label: "Đăng nhập",
        onClick: () => navigate("/login"),
      },
      {
        key: "register",
        label: "Đăng ký",
        onClick: () => navigate("/register"),
      },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
        <Sider
          width={250}
          style={{ background: "#fff" }}
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["explore"]}
            items={siderMenuItems}
          />
        </Sider>
        <Layout>
          <Content style={{ margin: "16px" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ExploreLayout;
