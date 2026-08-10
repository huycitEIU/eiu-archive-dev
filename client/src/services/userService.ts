import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const userService = {
  getAllUsers: async (): Promise<{ id: string; username: string }[]> => {
    try {
      const res = await axios.get(`${API_URL}/api/user/all`, {
        headers: headers,
      });
      return res.data.users;
    } catch (error) {
      throw new Error("Faild to get all users");
    }
  },
};
