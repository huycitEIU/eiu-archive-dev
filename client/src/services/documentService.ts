import axios from "axios";
import type { CreateDocumentRequestBody, Document } from "../types/document";

const documentService = {
  createDocument: async (document: CreateDocumentRequestBody) => {
    try {
      console.log("Sending document data:", document); // Log the document data being sent

      const documentData = {
        title: document.title,
        description: document.description,
        categoryId: document.categoryId,
        tags: document.tags,
        files: document.files.map((file) => ({
          name: file.name,
          type: file.type,
        })),
      };

      const response = await axios.post(
        "http://localhost:3000/api/document/create",
        documentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const presignedUrls = response.data.data.presignedUrls;

      await Promise.all(
        document.files.map(async (file, index) => {
          const presignedUrl = presignedUrls[index].url;

          await axios.put(presignedUrl, file, {
            headers: {
              "Content-Type": file.type,
            },
          });
        }),
      );

      return response.data;
    } catch (error) {
      throw new Error("Document upload failed");
    }
  },

  getDocuments: async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/document/list",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const documents = response.data.data.map((doc: Document) => ({
        key: doc.id,
        name: doc.title,
        category: doc.categoryId, // Adjust this based on your actual data structure
        tags: doc.tags || [], // Adjust this based on your actual data structure
        createdAt: new Date(doc.createdAt).toLocaleDateString(),
      }));

      return documents;
    } catch (error) {
      throw new Error("Failed to fetch documents");
    }
  },
};

export default documentService;
