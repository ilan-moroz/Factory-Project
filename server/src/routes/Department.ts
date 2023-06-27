import express from "express";
import { verifyToken } from "../middlewares/Auth";
import {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
} from "../controllers/Department";

const router = express.Router();

router.post("/addDepartment", verifyToken, createDepartment);
router.get("/getAllDepartments", verifyToken, getAllDepartments);
router.put("/updateDepartment/:id", verifyToken, updateDepartment);
router.delete("/deleteDepartment/:id", verifyToken, deleteDepartment);

export default router;
