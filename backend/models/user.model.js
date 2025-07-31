import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: true },
    role: String,
    salary: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", adminSchema);
