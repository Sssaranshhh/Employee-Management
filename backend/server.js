import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import employeeRoutes from "./routes/employee.routes.js"; // FIXED: correct filename

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo Error:", err));

app.use("/api", authRoutes);
app.use("/api/employees", employeeRoutes); // Now matches the correct file

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
