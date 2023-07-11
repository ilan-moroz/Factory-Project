import { Request, Response } from "express";
import { Employee, Department, Shift } from "../models/Factory";

// GET /employees
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();

    res.status(200).json(employees);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// POST /employees
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, startWorkYear, departmentId } = req.body;

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    const newEmployee = new Employee({
      firstName,
      lastName,
      startWorkYear,
      departmentId,
      departmentName: department.name,
    });
    const savedEmployee = await newEmployee.save();

    res.status(201).json(savedEmployee);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /employees/updateEmployee/:id
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, startWorkYear, departmentId, shiftIds } =
      req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    // if employee is removed from a shift remove it from the database shift
    for (const oldShiftId of employee.shiftIds) {
      const oldShift = await Shift.findById(oldShiftId);
      if (oldShift) {
        const index = oldShift.employeeIds.indexOf(employee._id);
        if (index > -1) {
          oldShift.employeeIds.splice(index, 1);
          await oldShift.save();
        }
      }
    }
    // if employee is added to a shift add it to the database shift
    for (const newShiftId of shiftIds) {
      const newShift = await Shift.findById(newShiftId);
      if (newShift && !newShift.employeeIds.includes(employee._id)) {
        newShift.employeeIds.push(employee._id);
        await newShift.save();
      }
    }

    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.startWorkYear = startWorkYear;
    employee.departmentId = departmentId;
    employee.shiftIds = shiftIds;

    const updatedEmployee = await employee.save();

    res.status(200).json(updatedEmployee);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /employees/:id
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    await Shift.deleteMany({ employeeId: id });
    await employee.deleteOne();

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
