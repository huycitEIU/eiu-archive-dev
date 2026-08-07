import axios from "axios";

const authService = {
  login: async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        },
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      return response.data;
    } catch (error) {
      throw new Error("Login failed");
    }
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
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          username,
          password,
          email,
        },
      );
      return response.data;
    } catch (error) {
      throw new Error("Registration failed");
    }
  },
};

export default authService;
