import React from "react";

import {
  Form,
  Input,
  Button,
  Card,
  theme,
  Divider,
  Space,
  Splitter,
  Layout,
  Grid,
} from "antd";
import type { FormProps } from "antd";

import { GoogleOutlined } from "@ant-design/icons";

import { Typography } from "antd";

import authService from "../services/authService";

import { useNavigate } from "react-router-dom";

const { useBreakpoint } = Grid;

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
};

const onFinishFaild: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed: ", errorInfo);
};

const { Text, Title, Paragraph, Link } = Typography;

const RegisterPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const screens = useBreakpoint();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success: ", values);
    await authService.register(
      values.username!,
      values.password!,
      values.email!,
    );
    navigate("/login");
  };

  if (!screens.md) {
    return (
      <Card
        style={{
          margin: "auto",
          border: 0,
        }}
      >
        <div
          style={{
            background: "#144069",
            textAlign: "center",
            padding: "16px 24px",
            borderRadius: borderRadiusLG,
          }}
        >
          <Title
            style={{
              fontSize: "48px",
              color: "#ffffff",
            }}
          >
            EIU Archive
          </Title>
          <Title
            style={{
              fontSize: "24px",
              color: "#efb31d",
            }}
          >
            Learn. Share. Inherit.
          </Title>
        </div>
        <Title level={4}>Welcome!</Title>
        <Paragraph>
          Sign up to access to dasdboard and finding resources.
        </Paragraph>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFaild}
          autoComplete="on"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item label={null}>
            <Button block type="primary" htmlType="submit" size="large">
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>Or</Divider>

        <Space
          orientation="vertical"
          size={"medium"}
          style={{ display: "flex", alignItems: "center", width: "100%" }}
        >
          <Button block size="large">
            <GoogleOutlined /> Countinue with Google
          </Button>
          <Text>
            Already have an Account?{" "}
            <Link
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign in
            </Link>
          </Text>
        </Space>
      </Card>
    );
  }

  return (
    <Layout
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Splitter>
        <Splitter.Panel
          resizable={false}
          style={{
            background: colorBgContainer,
            display: "flex",
          }}
        >
          <Card
            style={{
              margin: "auto",
              border: 0,
            }}
          >
            <Title level={4}>Welcome!</Title>
            <Paragraph>
              Sign up to access to dasdboard and finding resources.
            </Paragraph>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFaild}
              autoComplete="on"
              layout="vertical"
            >
              <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item label={null}>
                <Button block type="primary" htmlType="submit" size="large">
                  Sign Up
                </Button>
              </Form.Item>
            </Form>

            <Divider plain>Or</Divider>

            <Space
              orientation="vertical"
              size={"medium"}
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <Button block size="large">
                <GoogleOutlined /> Countinue with Google
              </Button>
              <Text>
                Already have an Account?{" "}
                <Link
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign in
                </Link>
              </Text>
            </Space>
          </Card>
        </Splitter.Panel>
        <Splitter.Panel
          resizable={false}
          style={{ background: "#144069", display: "flex" }}
        >
          <div
            style={{
              margin: "auto",
              textAlign: "center",
            }}
          >
            <Title
              style={{
                fontSize: "48px",
                color: "#ffffff",
              }}
            >
              EIU Archive
            </Title>
            <Title
              style={{
                fontSize: "24px",
                color: "#efb31d",
              }}
            >
              Learn. Share. Inherit.
            </Title>
          </div>
        </Splitter.Panel>
      </Splitter>
    </Layout>
  );
};

export default RegisterPage;
