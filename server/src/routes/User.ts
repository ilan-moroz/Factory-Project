import express from "express";
import { createNewUser, login, userNumOfActions } from "../controllers/User";

const router = express.Router();

router.post("/login", login);
router.post("/register", createNewUser);
router.get("/numOfActions", userNumOfActions);

export default router;
