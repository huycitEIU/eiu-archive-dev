import React from "react";
import axios from "axios";

import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import type { UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import type { CreateDocumentRequestBody, File } from "../../types/document";
import documentService from "../../services/documentService";

const { Dragger } = Upload;

const UploadPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [fileList, setFileList] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleUpload = async (
    values: CreateDocumentRequestBody,
    fileList: File[],
  ) => {
    try {
      setLoading(true);
      await documentService.createDocument({
        ...values,
        files: fileList,
      });
      setFileList([]);
      form.resetFields();
      messageApi.success("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      messageApi.error("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const props: UploadProps = {
    name: "file",
    multiple: true,
    fileList: fileList,
    onRemove: (file) => {
      setFileList((prevFileList) =>
        prevFileList.filter((f) => f.uid !== file.uid),
      );
    },
    beforeUpload: (file) => {
      setFileList((prevFileList) => [...prevFileList, file]);
      return false; // Prevent automatic upload
    },
  };

  return (
    <Card
      style={{
        border: 0,
      }}
    >
      <Form form={form} layout="vertical" style={{ width: "100%" }}>
        <Form.Item label="Upload Files" required>
          {contextHolder}
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item
          label="Document Title"
          name={"title"}
          rules={[{ required: true, message: "Please enter document title." }]}
        >
          <Input placeholder="Enter document title" size="large" />
        </Form.Item>
        <Form.Item
          label="Category"
          name={"categoryId"}
          rules={[{ required: true, message: "Please select a category." }]}
        >
          <Select
            placeholder="Select a category"
            size="large"
            options={[
              { value: "1", label: "Category 1" },
              { value: "2", label: "Category 2" },
              { value: "3", label: "Category 3" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Tags"
          name={"tags"}
          rules={[{ required: true, message: "Please enter document tags." }]}
        >
          <Select mode="tags" placeholder="Enter document tags" size="large" />
        </Form.Item>
        <Form.Item label="Document Description" name={"description"}>
          <Input.TextArea
            placeholder="Enter document description"
            size="large"
            rows={4}
          />
        </Form.Item>
        <Form.Item>
          <Space vertical align="end" style={{ width: "100%" }}>
            <Space>
              <Button
                size="large"
                onClick={() => {
                  form.resetFields();
                  setFileList([]);
                }}
              >
                Reset
              </Button>
              <Button
                loading={loading}
                type="primary"
                size="large"
                onClick={() => {
                  form.validateFields().then((values) => {
                    handleUpload(values, fileList as File[]);
                  });
                }}
              >
                Upload
              </Button>
            </Space>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UploadPage;
