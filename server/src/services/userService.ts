import { userRepository } from "../repositories/userRepository.js";
import logger from "../utils/logger.js";

export const userService = {
  getAllUsers: async () => {
    const users = await userRepository.findAllUser();
    return users;
  },

  getUserById: async (id: string) => {
    const user = await userRepository.findUserById(id);
    return user;
  },
};
