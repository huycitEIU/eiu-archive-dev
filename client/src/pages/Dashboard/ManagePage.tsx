import { Button, Flex, Radio, Space } from "antd";
import React from "react";

import { Table, Tooltip, Layout, Typography, Modal, Grid } from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  PlusCircleOutlined,
  FilterOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import documentService from "../../services/documentService";
import categoryService from "../../services/categoryService";

const { Title } = Typography;
const { useBreakpoint } = Grid;

const ManagePage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState<any[]>([]);
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const handleDeleteDocument = async (documentId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this document?",
      content: `Document: ${dataSource.find((doc) => doc.id === documentId)?.name}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await documentService.deleteDocument(documentId);
          setDataSource((prevDataSource) =>
            prevDataSource.filter((doc) => doc.id !== documentId),
          );
        } catch (error) {
          console.error("Failed to delete document:", error);
        }
      },
    });
  };

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
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 100,
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              console.log("Edit document:", record);
            }}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => {
              handleDeleteDocument(record.key);
            }}
          />
        </Space>
      ),
    },
  ];

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

  if (!screens.md) {
    const mobileColumns = [
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
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        width: 100,
        render: (_: any, record: any) => (
          <Space size={"small"}>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                console.log("Edit document:", record);
              }}
            />
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDeleteDocument(record.key);
              }}
            />
          </Space>
        ),
      },
    ];

    return (
      <Layout
        style={{
          padding: "8px 24px",
          background: "transparent",
        }}
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
          <Button type="default">
            <FilterOutlined />
          </Button>
          <Button
            type="primary"
            onClick={() => {
              navigate("/dashboard/upload");
            }}
          >
            <PlusCircleOutlined />
          </Button>
        </Space>

        <Table
          rowSelection={{
            type: "checkbox",
          }}
          dataSource={dataSource}
          columns={mobileColumns}
          scroll={{ y: "calc(100vh - 200px)" }}
          loading={loading}
        />
      </Layout>
    );
  }

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
          <Button
            type="primary"
            onClick={() => {
              navigate("/dashboard/upload");
            }}
          >
            Create Document
          </Button>
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
