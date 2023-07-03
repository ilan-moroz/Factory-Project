import { Request, Response } from "express";
import { Shift, Employee } from "../models/Factory";

// GET /shifts/getAllShifts
export const getAllShifts = async (req: Request, res: Response) => {
  try {
    const shifts = await Shift.find().populate("employeeIds");
    const processedShifts = shifts.map((shift) => {
      const shiftObject = shift.toObject();
      const employeeIds = shiftObject.employeeIds.map((employee: any) =>
        employee._id.toString()
      );
      return {
        ...shiftObject,
        employeeIds,
      };
    });
    res.status(200).json(processedShifts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// POST /shifts/createShift
export const createShift = async (req: Request, res: Response) => {
  try {
    const { date, startTime, endTime, employeeIds } = req.body;
    const employees = await Employee.find({ _id: { $in: employeeIds } });
    if (employees.length !== employeeIds.length) {
      return res.status(404).json({ error: "One or more employees not found" });
    }

    const newShift = new Shift({
      date,
      startTime,
      endTime,
      employeeIds,
    });
    const savedShift = await newShift.save();

    await Employee.updateMany(
      { _id: { $in: employeeIds } },
      { $push: { shiftIds: savedShift._id } }
    );

    res.status(201).json(savedShift);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// GET /shifts/:id/employees
export const getShiftEmployees = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const shift = await Shift.findById(id);
    if (!shift) {
      return res.status(404).json({ error: "Shift not found" });
    }

    const employees = await Employee.find({ _id: { $in: shift.employeeIds } });
    res.status(200).json(employees);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const addShiftToEmployee = async (req: Request, res: Response) => {
  try {
    const { shiftId, employeeId } = req.body;

    // Find the shift by ID
    const shift = await Shift.findById(shiftId);
    const employee = await Employee.findById(employeeId);

    if (!shift) {
      return res.status(404).json({ message: "Shift not found" });
    }

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Add the employee ID to the shift's employeeIds array
    shift.employeeIds.push(employeeId);
    employee.shiftIds.push(shiftId);

    // Save the updated shift
    await shift.save();
    await employee.save();

    res.status(200).json({ message: "Employee added to shift successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
