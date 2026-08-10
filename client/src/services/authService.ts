import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const authService = {
  login: async (username: string, password: string) => {
    console.log("API_URL:", API_URL); // Log the API_URL to verify it's being set correctly

    const response = await axios.post(`${API_URL}/api/auth/login`, {
      username,
      password,
    });

    const token = response.data.token;
    localStorage.setItem("token", token);
  },
  logout: async () => {
    try {
      await axios.post("/api/auth/logout");
    } catch (error) {
      throw new Error("Logout failed");
    }
  },
  register: async (username: string, password: string, email: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        username,
        password,
        email,
      });
      return response.data;
    } catch (error) {
      throw new Error("Registration failed");
    }
  },
};

export default authService;
