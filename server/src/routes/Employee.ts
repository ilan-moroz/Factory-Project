import express from "express";
import { verifyToken } from "../middlewares/Auth";
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeShifts,
  addShiftToEmployee,
} from "../controllers/employee";

const router = express.Router();

router.get("/getAllEmployees", verifyToken, getAllEmployees);
router.post("/createEmployee", verifyToken, createEmployee);
router.put("/updateEmployee/:id", verifyToken, updateEmployee);
router.delete("/deleteEmployee/:id", verifyToken, deleteEmployee);
router.get("/getEmployeeShifts/:id/shifts", verifyToken, getEmployeeShifts);
router.post("/addShiftToEmployee/:id/shifts", verifyToken, addShiftToEmployee);

export default router;
