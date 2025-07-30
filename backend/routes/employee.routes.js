import express from "express";
import {
  getAll,
  create,
  update,
  remove,
} from "../controllers/employee.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticateToken); // Protect all routes

router.get("/", getAll);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
