// tempSeedUser.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/user.model.js"; // adjust path if needed

dotenv.config();

const createAdminUser = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email: "admin@example.com" });
  if (existing) {
    console.log("User already exists");
    return process.exit();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("admin123", salt);

  const newUser = new User({
    name: "Admin",
    email: "admin@example.com",
    password: hashedPassword,
  });

  await newUser.save();
  console.log("Admin user created");
  process.exit();
};

createAdminUser();
