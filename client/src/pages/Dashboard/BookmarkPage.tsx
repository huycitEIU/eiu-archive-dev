import React, { useRef } from "react";

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
  UnorderedListOutlined,
  AppstoreOutlined,
  PlusCircleOutlined,
  FilterOutlined,
  SearchOutlined,
  BookTwoTone,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import documentService from "../../services/documentService";
import type { FilterDropdownProps } from "antd/es/table/interface";
import type { InputRef, TableColumnType } from "antd";

const { Title } = Typography;
const { useBreakpoint } = Grid;

interface DataType {
  key: string;
  name: string;
  category: string;
  createdAt: Date;
}

type DataIndex = keyof DataType;

const BookmarkPage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState<any[]>([]);
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const handleRemoveBookmark = async (record: any) => {
    Modal.confirm({
      title: "Are you sure you want to remove bookmark in this document?",
      content: `Document: ${record.name}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await documentService.bookmark(record.id);
          setDataSource((prevDataSource) =>
            prevDataSource.filter((doc) => doc.id !== record.id),
          );
        } catch (error) {
          console.error("Failed to remove bookmark document:", error);
        }
      },
    });
  };

  // Feature: Custom filter
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (confirm: FilterDropdownProps["confirm"]) => {
    confirm();
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
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
          onPressEnter={() => handleSearch(confirm)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
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
      title: "Author",
      dataIndex: "author",
      key: "author",
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
            danger
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => {
              handleRemoveBookmark(record);
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
        const documents = await documentService.getBookmarkedDocuments();

        console.log(documents);
        setDataSource(documents);
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
              icon={<BookTwoTone />}
              onClick={() => {
                handleRemoveBookmark(record.key);
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
        <Title level={3}>Bookmarks</Title>

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
        <Title level={3}>Bookmarks</Title>

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
              navigate("/dashboard/create");
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

export default BookmarkPage;
