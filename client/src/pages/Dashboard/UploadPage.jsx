import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Typography,
  Upload,
  message,
  Space,
} from "antd";

import { App as AntdApp } from "antd";

import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

import {
  getCategories,
  createDocument,
  uploadDocument,
} from "../../services/documentServices";

import axios from "axios";

const { Title, Text } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

const UploadFile = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { message } = AntdApp.useApp();

  const [categories, setCategories] = useState([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        message.error("Không thể tải danh mục, vui lòng thử lại!");
      }
    };

    fetchCategories();
  }, [message]);

  const handleUpload = async (values) => {
    console.log("Form values:", values);
    if (fileList.length === 0) {
      message.error("Vui lòng chọn ít nhất một file!");
      return;
    }

    setLoading(true);

    try {
      const documentData = {
        title: values.title,
        description: values.description,
        categoryId: values.categoryId,

        files: fileList.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
        })),
      };

      const resCreatedDocument = await createDocument(documentData);
      console.log("Document created:", resCreatedDocument.data);

      const presignedUrls = resCreatedDocument.data.presignedUrls;
      console.log("Presigned URLs:", presignedUrls);

      // use axios without jwt tokeb to upload files directly to S3 using the pre-signed URLs
      const resFromS3 = await Promise.all(
        fileList.map((file, index) => {
          const presignedUrl = presignedUrls[index].url;

          return axios.put(presignedUrl, file, {
            headers: {
              "Content-Type": file.type,
            },
          });
        }),
      );

      // Save file metadata to the database after successful upload to S3
      const documentId = resCreatedDocument.data.documentId;
      console.log("Document ID:", documentId);
      const res = await uploadDocument(
        documentId,
        fileList.map((file, index) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          url: presignedUrls[index].url.split("?")[0], // Remove query params from the URL
          objectKey: presignedUrls[index].objectKey, // Include the object key for reference
        })),
      );
      console.log("File metadata saved:", res);
      if (res.success) {
        message.success("Tải lên thành công!");
        form.resetFields();
        setFileList([]);
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "Tải lên thất bại, vui lòng thử lại!";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    onRemove: (file) => {
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    },
    beforeUpload: (file) => {
      // Lưu file vào state thay vì tự động upload ngay lập tức
      setFileList((prev) => [...prev, file]);
      return false;
    },
    fileList,
    multiple: true,
  };

  return (
    <div style={{ padding: "24px" }}>
      <Card style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Title
          level={3}
          style={{
            color: "#144069",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          Tải Lên Tài Liệu
        </Title>

        <Form form={form} layout="vertical" onFinish={handleUpload}>
          <Form.Item label={<Text strong>Chọn File</Text>} required>
            <Dragger
              {...uploadProps}
              style={{
                padding: "20px 0",
                background: "#f5f8fa",
                borderColor: "#144069",
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined style={{ color: "#144069" }} />
              </p>
              <p className="ant-upload-text">
                Nhấp hoặc kéo thả file vào khu vực này để tải lên
              </p>
              <p className="ant-upload-hint">
                Hỗ trợ tải lên một hoặc nhiều file. Không tải lên các dữ liệu
                nhạy cảm.
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item
            label={<Text strong>Tiêu đề tài liệu</Text>}
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input size="large" placeholder="Nhập tiêu đề..." />
          </Form.Item>

          <Form.Item
            label={<Text strong>Danh mục</Text>}
            name="categoryId"
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <Select size="large" placeholder="Chọn danh mục">
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={<Text strong>Mô tả chi tiết</Text>}
            name="description"
          >
            <Input.TextArea
              rows={4}
              placeholder="Nhập mô tả về tài liệu (không bắt buộc)..."
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "right", marginTop: "24px" }}>
            <Space>
              <Button
                onClick={() => {
                  form.resetFields();
                  setFileList([]);
                }}
              >
                Hủy bỏ
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<UploadOutlined />}
                size="large"
                style={{ backgroundColor: "#144069" }}
              >
                Xác nhận tải lên
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UploadFile;
