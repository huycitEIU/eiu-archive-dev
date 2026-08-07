import axios from "axios";

const documentService = {
  uploadDocument: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:3000/api/documents/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
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
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch documents");
    }
  },
};

export default documentService;
