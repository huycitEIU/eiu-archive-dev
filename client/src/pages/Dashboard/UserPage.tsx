import React from "react";

import {
  Card,
  Avatar,
  Typography,
  Tag,
  Space,
  Tabs,
  Button,
  Descriptions,
  theme,
} from "antd";

import type { DescriptionsProps } from "antd";

import { EditOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const personalInfo: DescriptionsProps["items"] = [
  {
    key: "username",
    label: "Username",
    children: "Tran Gia Huy",
  },
  {
    key: "dateOfBirth",
    label: "Date of birth",
    children: "24 Feb, 2005",
  },
  {
    key: "phoneNumber",
    label: "Phone number",
    children: "0123456789",
  },
  {
    key: "email",
    label: "Email",
    children: "huy.trangia.cit23@eiu.edu.vn",
  },
  {
    key: "address",
    label: "Address",
    children: "Ho Chi Minh City",
  },
];

const items = [
  {
    label: "Personal",
    key: "personal",
    children: (
      <Card
        title="Personal infomation"
        extra={
          <Button>
            <EditOutlined />
          </Button>
        }
      >
        <Descriptions items={personalInfo}></Descriptions>
      </Card>
    ),
  },
];

const UserPage: React.FC = () => {
  const {
    token: { colorSuccess },
  } = theme.useToken();

  const currentDate = new Date().getFullYear();

  return (
    <>
      <Space>
        <Avatar size={90} icon={<UserOutlined />}></Avatar>
        <Space vertical>
          <Space>
            <Title level={3} style={{ margin: 0 }}>
              Tran Gia Huy
            </Title>
            <Tag>Student</Tag>
          </Space>
          <Text>huy.trangia.cit23@eiu.edu.vn</Text>
          <Space>
            <Text>Started on {currentDate}</Text>
            <Tag color={colorSuccess}>Active</Tag>
          </Space>
        </Space>
      </Space>
      <Tabs items={items}></Tabs>
    </>
  );
};

export default UserPage;
