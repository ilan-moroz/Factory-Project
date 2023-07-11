import express from "express";
import { verifyToken } from "../middleware/Auth";
import {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
} from "../controllers/Department";
import { userActionLimit } from "../middleware/userActionLimit";

const router = express.Router();

router.post("/addDepartment", verifyToken, userActionLimit, createDepartment);
router.get("/getAllDepartments", verifyToken, getAllDepartments);
router.put(
  "/updateDepartment/:id",
  verifyToken,
  userActionLimit,
  updateDepartment
);
router.delete(
  "/deleteDepartment/:id",
  verifyToken,
  userActionLimit,
  deleteDepartment
);

export default router;
