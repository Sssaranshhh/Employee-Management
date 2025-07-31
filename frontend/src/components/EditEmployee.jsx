import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    salary: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setEmployeeData(res.data))
      .catch((err) => console.log(err));
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/employees/${id}`, employeeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => navigate("/employees"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "position", "department", "salary"].map((field) => (
          <input
            key={field}
            type={field === "salary" ? "number" : "text"}
            name={field}
            value={employeeData[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full border rounded px-4 py-2"
            required={field !== "department"}
          />
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
