import express from "express";
import { createNewUser, login } from "../controllers/Auth";

const router = express.Router();

router.post("/createUser", createNewUser);
router.post("/login", login);

export default router;
