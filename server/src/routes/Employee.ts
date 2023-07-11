import express from "express";
import { verifyToken } from "../middleware/Auth";
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee";

const router = express.Router();

router.get("/getAllEmployees", verifyToken, getAllEmployees);
router.post("/createEmployee", verifyToken, createEmployee);
router.put("/updateEmployee/:id", verifyToken, updateEmployee);
router.delete("/deleteEmployee/:id", verifyToken, deleteEmployee);

export default router;
