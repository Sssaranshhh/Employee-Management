import express from "express";
import {
  getEmployees,
  // getEmployeeById,
  createEmployee,
  updateEmployee,
  removeEmployee,
} from "../controllers/employee.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, getEmployees);
// router.get("/:id", authenticateToken, getEmployeeById);
router.post("/", authenticateToken, createEmployee);
router.put("/:id", authenticateToken, updateEmployee);
router.delete("/:id", authenticateToken, removeEmployee);

export default router;
