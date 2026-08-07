import React from "react";

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
const { Dragger } = Upload;

const UploadPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [fileList, setFileList] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const props: UploadProps = {
    name: "file",
    multiple: true,
    fileList: fileList,

    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (status === "done") {
        messageApi.success(`${info.file.name} file uploaded successfully.`);
      }

      if (status === "error") {
        messageApi.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
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
                type="primary"
                size="large"
                onClick={() => {
                  form.validateFields().then((values) => {
                    console.log("Form Values:", values);
                    console.log("Files to upload:", fileList);
                    // Handle the upload logic here
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
