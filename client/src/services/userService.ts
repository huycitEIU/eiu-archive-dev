import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const userService = {
  getAllUsers: async (): Promise<{ id: string; username: string }[]> => {
    try {
      const res = await axios.get(`${API_URL}/api/user/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data.users;
    } catch (error) {
      throw new Error("Faild to get all users");
    }
  },

  getUserById: async (id: string) => {
    try {
      const res = await axios.get(`${API_URL}/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data.user;
    } catch (err) {
      throw new Error("Failed to get user info");
    }
  },
};
