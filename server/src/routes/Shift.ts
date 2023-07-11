import express from "express";
import { verifyToken } from "../middleware/Auth";
import {
  getAllShifts,
  createShift,
  addShiftToEmployee,
} from "../controllers/shift";

const router = express.Router();

router.get("/getAllShifts", verifyToken, getAllShifts);
router.post("/createShift", verifyToken, createShift);
router.post("/addShiftToEmployee", verifyToken, addShiftToEmployee);

export default router;
