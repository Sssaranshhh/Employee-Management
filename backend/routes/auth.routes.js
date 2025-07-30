import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const admin = {
  email: "admin@example.com",
  password: "admin123",
};

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === admin.email && password === admin.password) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

export default router;
