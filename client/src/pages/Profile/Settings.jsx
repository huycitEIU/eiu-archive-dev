import React from "react";
import {
  Card,
  Tabs,
  Form,
  Switch,
  Select,
  Button,
  Typography,
  Divider,
  Row,
  Col,
  App,
} from "antd";
import {
  GlobalOutlined,
  BellOutlined,
  SafetyCertificateOutlined,
  SaveOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

const Settings = () => {
  const { message } = App.useApp();

  const onFinish = (values) => {
    console.log("Settings saved:", values);
  };

  const tabItems = [
    {
      key: "1",
      label: (
        <span>
          <GlobalOutlined />
          Hệ thống
        </span>
      ),
      children: (
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ language: "vi", theme: "light" }}
        >
          <Title level={5}>Tùy chọn giao diện & Ngôn ngữ</Title>
          <Text type="secondary">
            Tùy chỉnh cách hệ thống hiển thị với bạn.
          </Text>
          <Divider />

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Ngôn ngữ" name="language">
                <Select size="large">
                  <Option value="vi">Tiếng Việt</Option>
                  <Option value="en">English</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Giao diện" name="theme">
                <Select size="large">
                  <Option value="light">Sáng (Light Mode)</Option>
                  <Option value="dark">Tối (Dark Mode)</Option>
                  <Option value="system">Theo hệ thống</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              style={{ backgroundColor: "#144069" }}
            >
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <BellOutlined />
          Thông báo
        </span>
      ),
      children: (
        <Form layout="vertical">
          <Title level={5}>Cài đặt thông báo</Title>
          <Text type="secondary">Chọn các loại thông báo bạn muốn nhận.</Text>
          <Divider />

          <Form.Item label="Thông báo Email" valuePropName="checked">
            <Switch defaultChecked />{" "}
            <Text style={{ marginLeft: 10 }}>
              Nhận email khi có tài liệu mới
            </Text>
          </Form.Item>

          <Form.Item label="Thông báo Hệ thống" valuePropName="checked">
            <Switch defaultChecked />{" "}
            <Text style={{ marginLeft: 10 }}>
              Hiển thị pop-up thông báo trong ứng dụng
            </Text>
          </Form.Item>

          <Form.Item label="Báo cáo hàng tuần" valuePropName="checked">
            <Switch />{" "}
            <Text style={{ marginLeft: 10 }}>
              Gửi tóm tắt hoạt động qua email mỗi tuần
            </Text>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "3",
      label: (
        <span>
          <SafetyCertificateOutlined />
          Bảo mật
        </span>
      ),
      children: (
        <div>
          <Title level={5}>Bảo mật tài khoản</Title>
          <Text type="secondary">
            Quản lý cài đặt bảo mật và quyền truy cập.
          </Text>
          <Divider />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <Text strong style={{ display: "block" }}>
                Xác thực 2 yếu tố (2FA)
              </Text>
              <Text type="secondary">
                Thêm một lớp bảo mật phụ cho tài khoản của bạn.
              </Text>
            </div>
            <Button type="default">Bật 2FA</Button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Text strong style={{ display: "block" }}>
                Lịch sử đăng nhập
              </Text>
              <Text type="secondary">
                Kiểm tra các thiết bị đã truy cập vào tài khoản này.
              </Text>
            </div>

            {/* // TODO: Implement the functionality for viewing login history */}
            <Button
              type="default"
              onClick={() => {
                message.info(
                  "Chức năng xem lịch sử đăng nhập đang được phát triển.",
                );
              }}
            >
              Xem lịch sử
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Card bordered={false} style={{ borderRadius: "8px", minHeight: "80vh" }}>
        <Title level={3} style={{ color: "#144069", marginBottom: "24px" }}>
          Cài đặt hệ thống
        </Title>
        <Tabs tabPosition="left" defaultActiveKey="1" items={tabItems} />
      </Card>
    </div>
  );
};

export default Settings;
