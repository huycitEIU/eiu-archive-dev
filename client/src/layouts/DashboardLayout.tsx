import React from "react";

import { Layout, theme, Breadcrumb, Menu } from "antd";

const { Header, Footer, Content, Sider } = Layout;

const DashboardLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const currentYear = new Date().getFullYear();

  return (
    <Layout>
      <Header style={{ background: colorBgContainer }}></Header>
      <Layout hasSider>
        <Sider theme="light"></Sider>
        <Content style={{ background: colorBgContainer }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
          ></Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 380,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
          </div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        EIU Archive ©{currentYear}
      </Footer>
    </Layout>
  );
};

export default DashboardLayout;
