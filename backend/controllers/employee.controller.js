import Employee from '../models/employee.model.js';

export const getAll = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

export const create = async (req, res) => {
  const newEmployee = new Employee(req.body);
  await newEmployee.save();
  res.status(201).json(newEmployee);
};

export const update = async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.json(updated);
};

export const remove = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({message: 'Deleted'});
};