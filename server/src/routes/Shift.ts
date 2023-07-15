import express from "express";
import { verifyToken } from "../middleware/Auth";
import {
  getAllShifts,
  createShift,
  addShiftToEmployee,
} from "../controllers/Shift";
import { userActionLimit } from "../middleware/userActionLimit";

const router = express.Router();

router.get("/getAllShifts", verifyToken, getAllShifts);
router.post("/createShift", verifyToken, userActionLimit, createShift);
router.post(
  "/addShiftToEmployee",
  verifyToken,
  userActionLimit,
  addShiftToEmployee
);

export default router;
