import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import employeeRoutes from "./routes/employee.routes.js";

dotenv.config({ path: './backend/.env'});
console.log("MONGO_URI", process.env.MONGO_URI);
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((err) => console.error(err));
