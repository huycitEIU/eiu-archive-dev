import { Button, Flex, Radio, Space } from "antd";
import React from "react";

import { Table, Tag, Tooltip, Layout, Typography } from "antd";

import {
  MoreOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

import documentService from "../../services/documentService";
import categoryService from "../../services/categoryService";

const { Title } = Typography;

let dataSource = Array.from({ length: 20 }, (_, index) => ({
  key: index,
  name: `Document ${index + 1}`,
  tags: ["Tag1", "Tag2", "Tag3"],
  createdAt: new Date().toLocaleDateString(),
}));

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    ellipsis: {
      showTitle: false,
    },
    render: (name: string) => (
      <Tooltip placement="topLeft" title={name}>
        {name}
      </Tooltip>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    ellipsis: {
      showTitle: false,
    },
    render: (tags: string[]) => (
      <Flex gap={8} wrap="wrap">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Flex>
    ),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 150,
  },
  {
    title: "",
    dataIndex: "",
    key: "actions",
    width: 50,
    render: () => <Button type="text" icon={<MoreOutlined />} />,
  },
];

const ManagePage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const documents = await documentService.getDocuments();
        const categories = await categoryService.getCategories();

        const categoryMap = new Map(
          categories.map((category: any) => [category.id, category.name]),
        );

        const documentsWithCategoryNames = documents.map((doc: any) => ({
          ...doc,
          category: categoryMap.get(doc.category) || "Unknown",
        }));

        setDataSource(documentsWithCategoryNames);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  return (
    <Layout
      style={{
        padding: "8px 24px",
        background: "transparent",
      }}
    >
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "16px" }}
      >
        <Title level={3}>Documents</Title>

        <Space>
          <Radio.Group defaultValue="list" buttonStyle="solid">
            <Radio.Button value="list">
              <UnorderedListOutlined />
            </Radio.Button>
            <Radio.Button value="grid">
              <AppstoreOutlined />
            </Radio.Button>
          </Radio.Group>
          <Button type="default">Filter</Button>
          <Button type="primary">Create Document</Button>
        </Space>
      </Flex>
      <Table
        rowSelection={{
          type: "checkbox",
        }}
        dataSource={dataSource}
        columns={columns}
        scroll={{ y: "calc(100vh - 200px)" }}
        loading={loading}
      />
    </Layout>
  );
};

export default ManagePage;
