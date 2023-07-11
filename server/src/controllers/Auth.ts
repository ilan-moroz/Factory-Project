import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/Factory";

export const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user || !user.password)
      return res
        .status(404)
        .json({ error: "User not found or no password provided" });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    if (user.numOfActions === 0) {
      return res
        .status(400)
        .json({ error: "You have exceeded your allowed actions for the day" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
    if (user.password) delete user.password;

    await user.save();

    res.status(200).json({ token, user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
