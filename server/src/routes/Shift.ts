import express from "express";
import { verifyToken } from "../middlewares/Auth";
import {
  getAllShifts,
  createShift,
  getShiftEmployees,
} from "../controllers/shift";

const router = express.Router();

router.get("/getAllShifts", verifyToken, getAllShifts);
router.post("/createShift", verifyToken, createShift);
router.get("/:id/employees", verifyToken, getShiftEmployees);

export default router;
