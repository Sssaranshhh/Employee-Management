import Employee from "../models/employee.model.js";

// Get all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: err.message });
  }
};

// Create a new employee
export const createEmployee = async (req, res) => {
  try {
    const { name, position, department, salary, dateJoined } = req.body;

    const employee = new Employee({
      name,
      position,
      department,
      salary,
      dateJoined,
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating employee", error: err.message });
  }
};

// Update employee
export const updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating employee", error: err.message });
  }
};

// Delete employee
export const removeEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting employee", error: err.message });
  }
};
