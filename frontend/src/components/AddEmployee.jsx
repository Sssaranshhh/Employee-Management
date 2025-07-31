import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // use your wrapper

const AddEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    salary: "",
    dateJoined: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/employees",
        {
          ...formData,
          salary: Number(formData.salary),
          dateJoined: formData.dateJoined
            ? new Date(formData.dateJoined)
            : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/");
    } catch (error) {
      console.error(
        "Error adding employee:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="salary"
          type="number"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="dateJoined"
          type="date"
          value={formData.dateJoined}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
