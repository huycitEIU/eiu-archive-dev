import { Form, Upload, Typography, Button } from "antd";

import type { UploadFile, UploadProps } from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { RcFile } from "antd/es/upload";

import { fileService } from "../../services/fileService";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;

const UploadFilePage = () => {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { id } = useParams<{ id: string }>();

  const handleChange: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = async () => {
    if (!id) {
      throw "Not found document id";
    }

    const rcFiles = fileList
      .map((f: UploadFile) => f.originFileObj)
      .filter((f): f is RcFile => !!f);

    try {
      await fileService.uploadFile(id, rcFiles);
    } catch (err) {
      console.log("Failed to creaet document", err);
    }
  };

  return (
    <>
      <Title level={2}>Upload File</Title>
      <Form form={form} layout="vertical">
        <Form.Item label="Files" name="files">
          <Upload
            listType="text"
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={() => false}
            type="drag"
            style={{ height: "100px" }}
          >
            <Text>
              <PlusOutlined /> Click or drag to add files
            </Text>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            size="large"
            onClick={handleSubmit}
          >
            Upload
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UploadFilePage;
