import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Select,
  Typography,
} from "antd";
import type React from "react";
import { useEffect, useState } from "react";
import documentService from "../../services/documentService";
import { useNavigate, useParams } from "react-router-dom";
import categoryService from "../../services/categoryService";
import type { Category } from "../../types/category";

const { Title } = Typography;

export const EditInformationPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  useEffect(() => {
    const fectDocument = async () => {
      if (!id) return;
      try {
        const document = await documentService.getDocumentById(id);
        const categories = await categoryService.getCategories();

        setTitle(document.title);
        setDescription(document.description);
        setCategoryId(document.categoryId);
        setCategories(categories);
      } catch (err) {
        console.log(err);
      }
    };
    fectDocument();
  }, []);

  async function handleUpdateDocumentInfo() {
    const newTitle = form.getFieldValue("title");
    const newDescription = form.getFieldValue("description");
    const newCategoryId = form.getFieldValue("categoryId");

    if (!title && !newDescription && !newCategoryId) {
      messageApi.warning("Please enter new document information");
      return;
    }

    if (!id) {
      messageApi.error("Cannot update document.");
      return;
    }

    const isSuccess = await documentService.updateDocumentInformation(
      id,
      newTitle || title,
      newDescription || description,
      newCategoryId || categoryId,
    );
    if (isSuccess) {
      messageApi.success("Updated successful.");
      navigate(-1);
    } else {
      messageApi.error("Failed to update document.");
    }
  }

  return (
    <>
      {contextHolder}
      <Form form={form} layout="vertical">
        <Form.Item name={"title"} label={<Title level={3}>Title</Title>}>
          <Input placeholder={title}></Input>
        </Form.Item>

        <Form.Item
          label={<Title level={3}>Description</Title>}
          initialValue={description}
          name={"description"}
        >
          <Input.TextArea placeholder={description} />
        </Form.Item>
        <Form.Item label={<Title level={3}>Category</Title>} name="categoryId">
          <Select
            // loading={loading}
            defaultValue={
              categories.find((category) => category.id == categoryId)?.name
            }
            options={categories.map((c) => ({ label: c.name, value: c.id }))}
            placeholder={
              categories.find((category) => category.id == categoryId)?.name
            }
          />
        </Form.Item>
        <Divider></Divider>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            onClick={() => handleUpdateDocumentInfo()}
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
