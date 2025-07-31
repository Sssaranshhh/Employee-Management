import express from "express";

import {
  create,
  getAll,
  update,
  remove,
} from "../controllers/employee.controller.js"; 
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect routes
router.post("/", authenticateToken, create);
router.get("/", authenticateToken, getAll);
router.put("/:id", authenticateToken, update);
router.delete("/:id", authenticateToken, remove);

export default router;
