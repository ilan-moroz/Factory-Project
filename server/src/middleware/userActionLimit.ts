import { Request, Response, NextFunction } from "express";
import { User } from "../models/Factory";

interface CustomRequest extends Request {
  user?: any;
}

// a middleware function the decrease the user action count for each action he does
export const userActionLimit = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.id;

  // Retrieve the user's record from the database
  const user = await User.findById(userId);

  // If the user doesn't exist or something went wrong, handle the error
  if (!user) {
    return res.status(500).json({ error: "User not found" });
  }

  // Check the user's remaining actions
  if (user.numOfActions <= 0) {
    return res
      .status(429)
      .json({ error: "You have exceeded your daily action limit" });
  }

  // If they still have actions remaining, decrement their actions count
  user.numOfActions--;
  await user.save();

  // Proceed to the next middleware or route handler
  next();
};
