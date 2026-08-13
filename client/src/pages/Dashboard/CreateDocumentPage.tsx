import { Form, Input, Select, Upload, Typography, Button } from "antd";
import React from "react";
import type { UploadFile, UploadProps } from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { Category } from "../../types/category";
import categoryService from "../../services/categoryService";
import documentService from "../../services/documentService";
import type { RcFile } from "antd/es/upload";
import type { CreateDocumentData } from "../../types/document";
import { fileService } from "../../services/fileService";

const { Title, Text } = Typography;

const CreateDocumentPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  React.useEffect(() => {
    const fectCategories = async () => {
      try {
        setLoading(true);
        setCategories(await categoryService.getCategories());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fectCategories();
  }, []);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = async () => {
    const values = form.getFieldsValue();
    const document: CreateDocumentData = {
      title: values.title,
      categoryId: values.categoryId,
      coverImage: values.coverImage,
      description: values.description,
    };
    const rcFiles = fileList
      .map((f: UploadFile) => f.originFileObj)
      .filter((f): f is RcFile => !!f);

    try {
      const documentId = await documentService.createDocument(document);
      await fileService.uploadFile(documentId, rcFiles);
    } catch (err) {
      console.log("Failed to creaet document", err);
    }
  };

  return (
    <>
      <Title level={2}>Create Document</Title>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select
            loading={loading}
            options={categories.map((c) => ({ label: c.name, value: c.id }))}
            placeholder="Select a category"
          />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Cover Image" name="coverImage">
          <Upload
            listType="picture-card"
            maxCount={1}
            beforeUpload={() => false}
            accept="image/*"
          >
            <PlusOutlined />
          </Upload>
        </Form.Item>
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
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateDocumentPage;
