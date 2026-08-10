import React, { useState, useRef } from "react";

import {
  Table,
  Tooltip,
  Layout,
  Typography,
  Modal,
  Grid,
  Input,
  Button,
  Flex,
  Radio,
  Space,
} from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  PlusCircleOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import documentService from "../../services/documentService";
import categoryService from "../../services/categoryService";
import type { FilterDropdownProps } from "antd/es/table/interface";
import type { InputRef, TableColumnType, TableColumnsType } from "antd";

const { Title } = Typography;
const { useBreakpoint } = Grid;

interface DataType {
  key: string;
  name: string;
  category: string;
  createdAt: Date;
}

type DataIndex = keyof DataType;

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

  // Feature: Custom filter
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex,
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
  });

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
      ...getColumnSearchProps("name"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
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
          <Radio.Group defaultValue="list" buttonStyle="solid" disabled>
            <Radio.Button value="list">
              <UnorderedListOutlined />
            </Radio.Button>
            <Radio.Button value="grid">
              <AppstoreOutlined />
            </Radio.Button>
          </Radio.Group>
          <Button type="default" disabled>
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
          <Radio.Group defaultValue="list" buttonStyle="solid" disabled>
            <Radio.Button value="list">
              <UnorderedListOutlined />
            </Radio.Button>
            <Radio.Button value="grid">
              <AppstoreOutlined />
            </Radio.Button>
          </Radio.Group>
          <Button type="default" disabled>
            Filter
          </Button>
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
