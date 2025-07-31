import bcrypt from "bcryptjs";
import Employee from "../models/employee.model.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  try {
    const user = await Employee.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });

    // You can set a cookie or return user data here
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const signup = async (req, res) => {
  const { name, email, password, role, salary } = req.body;

  if (!name || !email || !password || !role || !salary) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = new Employee({
      name,
      email,
      role,
      salary,
      password: hashedPassword, // ✅ store hashed password
    });

    await employee.save();

    res.status(201).json({ message: "Signup successful", employee });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};