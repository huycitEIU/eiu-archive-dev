import { Descriptions, Divider, Skeleton, Typography } from "antd";
import type { Document } from "../../../types/document";
import type { Category } from "../../../types/category";

interface DescriptionProps {
  documentData: Document | null;
  categoryData: Category[] | null;
}

const { Paragraph } = Typography;

const Description = ({ documentData, categoryData }: DescriptionProps) => {
  if (!documentData || !categoryData) {
    return <Skeleton active></Skeleton>;
  }

  const categoryName =
    categoryData.find((category) => category.id == documentData.categoryId)
      ?.name ?? "Unknown";
  return (
    <>
      <Paragraph>{documentData.description}</Paragraph>
      <Divider></Divider>
      <Descriptions>
        <Descriptions.Item label={"Bookmarks"}>
          {documentData.bookmarkCount}
        </Descriptions.Item>
        <Descriptions.Item label={"Downloads"}>
          {documentData.downloadCount}
        </Descriptions.Item>
        <Descriptions.Item label={"Category"}>{categoryName}</Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default Description;
