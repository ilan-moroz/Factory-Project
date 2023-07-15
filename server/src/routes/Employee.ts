import { userActionLimit } from "./../middleware/userActionLimit";
import express from "express";
import { verifyToken } from "../middleware/Auth";
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/Employee";

const router = express.Router();

router.get("/getAllEmployees", verifyToken, getAllEmployees);
router.post("/createEmployee", verifyToken, userActionLimit, createEmployee);
router.put("/updateEmployee/:id", verifyToken, userActionLimit, updateEmployee);
router.delete(
  "/deleteEmployee/:id",
  verifyToken,
  userActionLimit,
  deleteEmployee
);

export default router;
