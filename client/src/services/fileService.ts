import axios from "axios";
import type { FileInfo } from "../types/file";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const fileService = {
  getFilesByDocumentId: async (id: string): Promise<FileInfo[]> => {
    try {
      const res = await axios.get(`${API_URL}/api/document/${id}/files`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data.files;
    } catch (error) {
      throw new Error("Failed to fetch files.");
    }
  },

  downloadFileById: async (id: string): Promise<void> => {
    try {
      const res = await axios.get(`${API_URL}/api/file/${id}/download`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const downloadUrl = res.data.downloadUrl;

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "fileName";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.log(err);
    }
  },

  uploadFile: async (documentId: string, files: File[]) => {
    try {
      const uploadFileInfo = files.map((file) => {
        return { name: file.name, type: file.type };
      });
      const res = await axios.post(
        `${API_URL}/api/file/upload`,
        {
          documentId,
          files: uploadFileInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const fileData = res.data.files.map((file: any, index: number) => ({
        ...file,
        name: files[index].name,
        type: files[index].type,
      }));
      console.log("Uploaded files data:", fileData);

      await Promise.all(
        files.map(async (file, index) => {
          const uploadUrl = fileData[index].uploadUrl;
          return axios.put(uploadUrl, file, {
            headers: {
              "Content-Type": file.type,
            },
          });
        }),
      );

      await axios.post(
        `${API_URL}/api/file/confirm-upload`,
        {
          documentId,
          files: files.map((file: any, index: number) => ({
            name: file.name,
            type: file.type,
            objectKey: fileData[index].objectKey,
            size: file.size,
            url: "",
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log("Files uploaded successfully.");
    } catch (err) {
      console.error("Failed to upload files");
    }
  },
};
