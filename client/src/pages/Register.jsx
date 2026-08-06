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
} from "antd";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../style/global.css"; // Import the CSS file for styling

const { Title, Text } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      if (res.data.success) {
        message.success("Đăng ký thành công!");
        navigate("/login");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Đã xảy ra lỗi khi đăng ký.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#144069",
          colorTextBase: "#4e4e50",
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
            backgroundColor: "var(--eiu-blue)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Title style={{ color: "#ffffff", fontSize: "48px", margin: 0 }}>
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
              SIGN UP
            </Title>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label={<span style={{ fontWeight: 500 }}>Username</span>}
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tên người dùng!" },
                ]}
              >
                <Input size="large" placeholder="Username" />
              </Form.Item>

              <Form.Item
                label={<span style={{ fontWeight: 500 }}>Email</span>}
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input size="large" placeholder="Email" />
              </Form.Item>

              <Form.Item
                label={<span style={{ fontWeight: 500 }}>Password</span>}
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password size="large" placeholder="Password" />
              </Form.Item>

              <Form.Item style={{ marginTop: "30px" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={loading}
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <span>Already have an account? </span>
              <Link
                to="/login"
                style={{ color: "var(--eiu-orange)", fontWeight: "bold" }}
              >
                Login
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default Register;
