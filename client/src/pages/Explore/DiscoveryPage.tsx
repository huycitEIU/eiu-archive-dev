import { Flex } from "antd";
import React, { useState } from "react";
import DocumentCard, {
  type DocumentCardProps,
} from "./components/DocumentCard";

import documentService from "../../services/documentService";
import categoryService from "../../services/categoryService";
import { userService } from "../../services/userService";

const handleCardClick = (id: string) => {
  console.log("Clicked: ", id);
};

const DiscoveryPage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentCardProps[]>([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);

        const docs = await documentService.getAllDocuments();
        const cats = await categoryService.getCategories();
        const users = await userService.getAllUsers();

        const categoryMap = new Map(
          cats.map((category: any) => [category.id, category.name]),
        );

        const userMap = new Map(users.map((user) => [user.id, user.username]));

        const result: DocumentCardProps[] = docs.map((doc) => ({
          id: doc.id,
          name: doc.title,
          category: categoryMap.get(doc.categoryId) || "Unknown",
          downloadCount: doc.downloadCount,
          bookmarkCount: doc.bookmarkCount,
          username: userMap.get(doc.userId) || "Unknown",
          coverUrl: doc.coverUrl,
          averageRating: doc.averageRating,
        }));
        setDocuments(result);
      } catch (error) {
        throw new Error("Faild to fecth documents.");
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  return (
    <>
      <Flex gap={"medium"} wrap style={{ width: "100%" }}>
        {documents.map((document) => (
          <DocumentCard
            key={document.id}
            {...document}
            onClick={handleCardClick}
          ></DocumentCard>
        ))}
      </Flex>
    </>
  );
};

export default DiscoveryPage;
