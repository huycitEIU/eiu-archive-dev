import React from "react";

import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  theme,
  Divider,
  Space,
  Splitter,
  Layout,
} from "antd";
import type { FormProps } from "antd";

import { GoogleOutlined } from "@ant-design/icons";

import { Typography } from "antd";

import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinishFaild: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed: ", errorInfo);
};

const { Text, Title, Paragraph, Link } = Typography;
const LoginPage: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success: ", values);
    await authService.login(values.username!, values.password!);
    navigate("/dashboard");
  };

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
            <Title level={4}>Welcome Back!</Title>
            <Paragraph>
              Sign in to access to dasdboard and finding resources.
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
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                label={null}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item label={null}>
                <Button block type="primary" htmlType="submit" size="large">
                  Sign In
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
                Don't have an Account?{" "}
                <Link
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Sign up
                </Link>{" "}
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

export default LoginPage;
