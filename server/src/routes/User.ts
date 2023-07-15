import express from "express";
import { login, userNumOfActions } from "../controllers/User";

const router = express.Router();

router.post("/login", login);
router.get("/numOfActions", userNumOfActions);

export default router;
