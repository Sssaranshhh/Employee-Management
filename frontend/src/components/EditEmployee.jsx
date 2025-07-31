import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [employeeData, setEmployeeData] = useState({
    name: "",
    position: "",
    department: "",
    salary: "",
    dateJoined: "",
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
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={employeeData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border rounded px-4 py-2"
          required
        />
        <input
          type="text"
          name="position"
          value={employeeData.position}
          onChange={handleChange}
          placeholder="Position"
          className="w-full border rounded px-4 py-2"
          required
        />
        <input
          type="text"
          name="department"
          value={employeeData.department}
          onChange={handleChange}
          placeholder="Department"
          className="w-full border rounded px-4 py-2"
        />
        <input
          type="number"
          name="salary"
          value={employeeData.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full border rounded px-4 py-2"
          required
        />
        <input
          type="date"
          name="dateJoined"
          value={
            employeeData.dateJoined ? employeeData.dateJoined.slice(0, 10) : ""
          }
          onChange={handleChange}
          placeholder="Date Joined"
          className="w-full border rounded px-4 py-2"
          required
        />
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
