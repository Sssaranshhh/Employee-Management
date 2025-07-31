import React, { useState } from "react";
import api from "../api";

export default function Signup({ onSignup }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    salary: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/signup", {
        ...form,
        salary: Number(form.salary),
      });

      // ✅ Store token
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      alert("Signup successful! You can now log in.");
      if (onSignup) onSignup();
    } catch (err) {
      console.error("Signup error:", err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 to-teal-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-indigo-700">
          Signup
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="text"
          name="role"
          placeholder="Role (e.g. Developer)"
          value={form.role}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition duration-200 font-medium"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
