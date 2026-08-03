import React, { useState } from "react";
import {
  Table,
  Input,
  Select,
  Space,
  Button,
  App,
  Drawer,
  Typography,
  Divider,
  Descriptions,
} from "antd";

import {
  FileOutlined,
  CommentOutlined,
  DownloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import axios from "axios";

import { downloadFile } from "../../services/downloadService";
import {
  getDocumentList,
  getFilesByDocumentId,
  getCategories,
} from "../../services/documentServices";

const { Title, Text, Paragraph } = Typography;

const columns = [
  {
    title: "Tên tài liệu",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Danh mục",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

const normalizeDocuments = (documents, categories) => {
  return documents.map((doc, index) => ({
    key: doc.id,
    title: doc.title,
    category:
      categories.find((cat) => cat.id === doc.categoryId)?.name || "N/A",
    createdAt: new Date(doc.createdAt).toLocaleDateString(),
    description: doc.description,
    bookmarkCount: doc.bookmarkCount,
    downloads: doc.downloadCount,
    documentId: doc.id,
    userId: doc.userId,
    categoryId: doc.categoryId,
  }));
};

const handleDownloadFile = async (fileId) => {
  try {
    await downloadFile(fileId);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

const Documents = () => {
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState(null);

  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const [categories, setCategories] = useState([]);
  let [documents, setDocuments] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [categories, documentList] = await Promise.all([
          getCategories(),
          getDocumentList(),
        ]);

        setCategories(categories);
        setDocuments(normalizeDocuments(documentList, categories));
      } catch (error) {
        message.error("Đã xảy ra lỗi khi lấy danh sách tài liệu.");
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = async (record) => {
    const fileList = await getFilesByDocumentId(record.documentId);

    const documentDetails = {
      ...record,
      files: fileList.map((file) => ({
        key: file.id,
        id: file.id,
        name: file.name,
        type: file.type,
        size: file.size,
        url: file.url,
      })),
    };

    setSelectedDocument(documentDetails);
    setIsDrawerVisible(true);
    console.log("Selected document:", record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setSelectedDocument(null);
  };

  // Hàm lọc dữ liệu dựa vào searchText và filterType
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearchText = doc.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesFilterType = filterType ? doc.category === filterType : true;

    return matchesSearchText && matchesFilterType;
  });

  // Hàm làm mới danh sách tài liệu
  const handleRefresh = async () => {
    try {
      setLoading(true);

      documents = normalizeDocuments(await getDocumentList(), categories);

      message.success("Danh sách tài liệu đã được làm mới.");
    } catch (error) {
      message.error("Đã xảy ra lỗi khi làm mới danh sách tài liệu.");
      console.error("Error refreshing documents:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="middle">
      {/* Thanh tìm kiếm + Filter */}
      <Space wrap>
        <Input.Search
          placeholder="Tìm kiếm tài liệu"
          allowClear
          onSearch={(value) => setSearchText(value)}
          // onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Lọc theo danh mục"
          allowClear
          onChange={(value) => setFilterType(value)}
          style={{ width: 200 }}
        >
          {categories.map((category) => (
            <Select.Option key={category.id} value={category.name}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
        <Button
          type="primary"
          onClick={() => {
            setSearchText("");
            setFilterType(null);
          }}
        >
          Xóa bộ lọc
        </Button>
        <Button type="primary" onClick={handleRefresh}>
          Làm mới danh sách
        </Button>
      </Space>

      {/* Bảng hiển thị tài liệu */}
      <Table
        columns={columns}
        dataSource={filteredDocuments}
        rowKey="key"
        onRow={(record) => ({
          onClick: () => handleRowClick(record), // Mở Drawer khi click vào một hàng
          style: { cursor: "pointer" }, // Thêm con trỏ chuột khi hover
        })}
      />

      {/* Hiển thị chi tiết tài liệu */}
      <Drawer
        title="Thông tin tài liệu"
        maxWidth={600}
        width="100%"
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        visible={isDrawerVisible}
      >
        {/* Nội dung chung về tài liệu */}
        {selectedDocument ? (
          <div>
            <Descriptions title="Thông tin tài liệu">
              <Descriptions.Item label="Tên tài liệu">
                {selectedDocument.title}
              </Descriptions.Item>
              <Descriptions.Item label="Danh mục">
                {selectedDocument.category}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">
                {selectedDocument.createdAt}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Title level={5}>Mô tả</Title>
            <Paragraph>
              {selectedDocument.description || "Không có mô tả."}
            </Paragraph>

            <Divider />

            <Title level={5}>Thống kê</Title>
            <Descriptions>
              <Descriptions.Item label="Số lượt tải xuống">
                {selectedDocument.downloads}
              </Descriptions.Item>
              <Descriptions.Item label="Bookmark">
                {selectedDocument.bookmarkCount}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            {/* Danh sách các file liên quan đến tài liệu */}
            <Title level={5}>Danh sách file</Title>
            <Table
              columns={[
                {
                  title: "Tên file",
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "Kích thước",
                  dataIndex: "size",
                  key: "size",
                  render: (text) => {
                    const sizeInKB = (text / 1024).toFixed(2);
                    if (sizeInKB < 1024) {
                      return `${sizeInKB} KB`;
                    } else {
                      const sizeInMB = (sizeInKB / 1024).toFixed(2);
                      return `${sizeInMB} MB`;
                    }
                  }, // Chuyển đổi từ bytes sang KB hoặc MB
                },
                {
                  title: "Hành động",
                  key: "action",
                  render: (_, record) => (
                    <Space size="middle">
                      <Button
                        type="link"
                        icon={<DownloadOutlined />}
                        onClick={() => {
                          handleDownloadFile(record.id);
                        }}
                      >
                        Tải xuống
                      </Button>
                      <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => {
                          message.info(
                            `Chức năng xem trước cho file ${record.fileName} sẽ được triển khai sau.`,
                          );
                        }}
                      >
                        Xem trước
                      </Button>
                    </Space>
                  ),
                },
              ]}
              dataSource={selectedDocument.files || []}
              pagination={false}
            />
            <Divider />
            <Space>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={() => {
                  message.info("Chức năng tải xuống sẽ được triển khai sau.");
                }}
              >
                Tải xuống toàn bộ tài liệu
              </Button>
              <Button
                type="default"
                icon={<FileOutlined />}
                onClick={() => {
                  message.info(
                    "Chức năng xem chi tiết sẽ được triển khai sau.",
                  );
                }}
              >
                Xem chi tiết
              </Button>
            </Space>
          </div>
        ) : (
          <p>Không có dữ liệu để hiển thị.</p>
        )}
      </Drawer>
    </Space>
  );
};

export default Documents;
