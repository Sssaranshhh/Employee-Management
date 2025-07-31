import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String },
  salary: { type: Number, required: true },
  dateJoined: { type: Date, required: true },
});

export default mongoose.model("Employee", employeeSchema);
