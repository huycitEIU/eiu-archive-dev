/* 
TODO:
- [ ] Implement the "Edit Profile" functionality to allow users to update their personal information.
- [ ] Implement the "Change Password" functionality to allow users to change their password securely.
 */

import React from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Tabs,
  Descriptions,
  Statistic,
  Button,
  Tag,
  Divider,
  Space,
  App,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  SettingOutlined,
  ProjectOutlined,
  FileTextOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Profile = () => {
  // Dữ liệu mẫu hiển thị
  const userData = {
    name: "Nguyễn Văn A",
    username: "admin_user",
    role: "Quản trị viên",
    department: "Phòng Công nghệ thông tin",
    email: "admin@eiu.edu.vn",
    phone: "+84 123 456 789",
    status: "Hoạt động",
  };

  const { message } = App.useApp();

  // Nội dung các Tabs bên phải
  const tabItems = [
    {
      key: "1",
      label: "Tổng quan",
      children: (
        <>
          <Descriptions
            title="Thông tin cá nhân"
            bordered
            column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}
          >
            <Descriptions.Item label="Họ và tên">
              {userData.name}
            </Descriptions.Item>
            <Descriptions.Item label="Tên đăng nhập">
              {userData.username}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {userData.email}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {userData.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Phòng ban">
              {userData.department}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color="green">{userData.status}</Tag>
            </Descriptions.Item>
          </Descriptions>
        </>
      ),
    },
    {
      key: "2",
      label: "Bảo mật",
      children: (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Text>
            Cập nhật mật khẩu và thiết lập bảo mật hai lớp (2FA) tại đây.
          </Text>
          {/* // TODO: Implement the functionality for changing password */}
          <Button
            type="default"
            onClick={() => {
              message.info("Chức năng đổi mật khẩu đang được phát triển.");
            }}
          >
            Đổi mật khẩu
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[24, 24]}>
        {/* Cột trái: Thông tin rút gọn & Avatar */}
        <Col xs={24} md={8} xl={6}>
          <Card
            style={{ textAlign: "center", borderRadius: "8px" }}
            bordered={false}
            shadow="sm"
          >
            <Avatar
              size={120}
              icon={<UserOutlined />}
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
              style={{ marginBottom: "16px", border: "2px solid #144069" }}
            />
            <Title level={4} style={{ margin: 0, color: "#144069" }}>
              {userData.name}
            </Title>
            <Text type="secondary">{userData.role}</Text>

            <Divider />

            <Space direction="vertical" style={{ width: "100%" }}>
              <Button
                type="primary"
                block
                icon={<EditOutlined />}
                style={{ backgroundColor: "#144069", borderColor: "#144069" }}
                onClick={() => {
                  message.info(
                    "Chức năng chỉnh sửa hồ sơ đang được phát triển.",
                  );
                }}
              >
                Chỉnh sửa hồ sơ
              </Button>
              <Button
                block
                icon={<SettingOutlined />}
                onClick={() => {
                  message.info(
                    "Chức năng cài đặt tài khoản đang được phát triển.",
                  );
                }}
              >
                Cài đặt tài khoản
              </Button>
            </Space>
          </Card>
        </Col>

        {/* Cột phải: Chi tiết thông tin & Tabs */}
        <Col xs={24} md={16} xl={18}>
          <Card
            style={{ borderRadius: "8px", minHeight: "100%" }}
            bordered={false}
          >
            <Tabs defaultActiveKey="1" items={tabItems} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
