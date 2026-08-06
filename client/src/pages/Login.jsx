/* 
TODO:
- [ ] Implement the "Forgot Password" functionality in the login page.
 */

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Typography,
  Row,
  Col,
  ConfigProvider,
  App,
} from "antd";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../style/global.css"; // Import the CSS file for styling

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { message } = App.useApp();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        username: values.username,
        password: values.password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        message.success("Đăng nhập thành công!");
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.error ||
        "Đăng nhập thất bại, vui lòng kiểm tra lại!";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#144069", // --eiu-blue
          colorTextBase: "#4e4e50", // --eiu-neutral
        },
      }}
    >
      <Row style={{ minHeight: "100vh" }}>
        {/* Left Panel - Brand */}
        <Col
          xs={24}
          sm={24}
          md={12}
          style={{
            backgroundColor: "var(--eiu-blue)", // --eiu-blue
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Title style={{ color: "#ffffff", fontSize: "48px", margin: 0 }}>
              {" "}
              {/* --eiu-gold */}
              EIU Archive
            </Title>
            <Text
              style={{
                color: "var(--eiu-yellow)",
                fontSize: "20px",
                letterSpacing: "2px",
              }}
            >
              Learn. Share. Inherit.
            </Text>
          </div>
        </Col>

        {/* Right Panel - Form */}
        <Col
          xs={24}
          sm={24}
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <div style={{ width: "100%", maxWidth: "400px", padding: "20px" }}>
            <Title
              level={2}
              style={{
                color: "var(--eiu-blue)",
                textAlign: "center",
                marginBottom: "30px",
              }}
            >
              LOGIN
            </Title>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label={<span style={{ fontWeight: 500 }}>Username</span>}
                name="username"
                rules={[{ required: true, message: "Vui lòng nhập username!" }]}
              >
                <Input size="large" placeholder="Username" />
              </Form.Item>

              <Form.Item
                label={<span style={{ fontWeight: 500 }}>Password</span>}
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password size="large" placeholder="Password" />
              </Form.Item>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "20px",
                }}
              >
                <Link to="/forgot-password" style={{ color: "var(--eiu-red)" }}>
                  {" "}
                  {/* --eiu-red */}
                  Forget password
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={loading}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <span>Do not have account? </span>
              <Link
                to="/register"
                style={{ color: "var(--eiu-orange)", fontWeight: "bold" }}
              >
                {" "}
                {/* --eiu-orange */}
                Sign up
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default Login;
