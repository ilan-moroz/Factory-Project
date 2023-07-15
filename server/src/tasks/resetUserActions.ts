import cron from "node-cron";
import { User } from "../models/Factory";

// reset user actions at midnight
export const resetUserActions = () => {
  cron.schedule("0 0 * * *", async function () {
    try {
      // Update all users where isAdmin is false
      await User.updateMany(
        { isAdmin: { $ne: true } },
        { $set: { numOfActions: 10 } }
      );
      console.log("User actions reset");
    } catch (err) {
      console.error("Error resetting user actions: ", err);
    }
  });
};
