import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem("token");

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(res.data);
    } catch (error) {
      console.error("Failed to fetch employees", error.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchEmployees();
    } catch (error) {
      console.error("Failed to delete employee", error.message);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Employee List</h2>
      <button
        onClick={() => navigate("/add")}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Employee
      </button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {[
              "Name",
              "Email",
              "Position",
              "Department",
              "Salary",
              "Actions",
            ].map((h) => (
              <th key={h} className="border px-4 py-2">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id} className="text-center">
              <td className="border px-4 py-2">{emp.name}</td>
              <td className="border px-4 py-2">{emp.email}</td>
              <td className="border px-4 py-2">{emp.position}</td>
              <td className="border px-4 py-2">{emp.department}</td>
              <td className="border px-4 py-2">{emp.salary}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => navigate(`/edit/${emp._id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEmployee(emp._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
