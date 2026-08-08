import axios from "axios";
import type { Document, UploadDocument } from "../types/document";
import type { UploadFile } from "../types/file";

const documentService = {
  createDocument: async (document: UploadDocument, files: UploadFile[]) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/document/create",
        {
          ...document,
          files: files,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const documentId = response.data.data.documentId;
      const presignUrls = response.data.data.presignedUrls;
      const uploadBody = {
        documentId: documentId,
        files: files.map((file, index) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          url: presignUrls[index].url.split("?")[0],
          objectKey: presignUrls[index].objectKey,
        })),
      };

      console.log(uploadBody);

      await axios.post(
        "http://localhost:3000/api/document/upload",
        uploadBody,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
    } catch (error) {
      console.log("Error while creating document.");
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
        id: doc.id,
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

  deleteDocument: async (documentId: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/document/${documentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      throw new Error("Failed to delete document");
    }
  },
};

export default documentService;
