import express from "express";
import { verifyToken } from "../middleware/Auth";
import {
  getAllShifts,
  createShift,
  getShiftEmployees,
  addShiftToEmployee,
} from "../controllers/shift";

const router = express.Router();

router.get("/getAllShifts", verifyToken, getAllShifts);
router.post("/createShift", verifyToken, createShift);
router.post("/addShiftToEmployee", verifyToken, addShiftToEmployee);
router.get("/:id/employees", verifyToken, getShiftEmployees);

export default router;
