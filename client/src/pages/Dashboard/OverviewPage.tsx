import React from "react";

import {
  Layout,
  Typography,
  Card,
  Progress,
  Flex,
  Button,
  Divider,
  Table,
} from "antd";

const { Title, Link } = Typography;

const columns = [
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Activity",
    dataIndex: "activity",
    key: "activity",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: () => (
      <Button type="link" size="small">
        View
      </Button>
    ),
  },
];

const dataSource: any[] = [];

const OverviewPage: React.FC = () => {
  return (
    <Layout
      style={{
        background: "transparent",
      }}
    >
      <Flex
        style={{ marginBottom: "16px" }}
        justify="space-between"
        align="center"
      >
        <Title level={3}>Recent Documents</Title>
        <Link>See All</Link>
      </Flex>
      <Divider />

      <Flex
        style={{ marginBottom: "16px" }}
        justify="space-between"
        align="center"
      >
        <Title level={3}>Storage Usage</Title>
        <Link>See All</Link>
      </Flex>
      <Card>
        <Progress percent={70} />
      </Card>

      <Divider />
      <Flex
        style={{ marginBottom: "16px" }}
        justify="space-between"
        align="center"
      >
        <Title level={3}>Recent Activities</Title>
        <Link>See All</Link>
      </Flex>
      <Table
        rowSelection={{
          type: "checkbox",
        }}
        dataSource={dataSource}
        columns={columns}
        scroll={{ y: "calc(100vh - 400px)" }}
      />
      <Divider />
    </Layout>
  );
};

export default OverviewPage;
