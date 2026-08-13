import { userController } from "../controllers/userController.js";

import express from "express";

const router = express.Router();

router.get("/all", userController.getAllUsers);
router.get("/:id", userController.getUserById);

export default router;
