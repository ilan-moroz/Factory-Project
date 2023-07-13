import { useEffect } from "react";
import { store } from "../redux/Store";
import { resetNumOfActionsAction } from "../redux/UserReducer";

export const useResetNumOfActions = () => {
  useEffect(() => {
    const resetNumOfActions = () => {
      store.dispatch(resetNumOfActionsAction());
    };

    // Calculate the time until the next day
    const now = new Date();
    const nextDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const timeUntilNextDay = nextDay.getTime() - now.getTime();

    // Set a timer to reset the numOfActions property at the beginning of the next day
    const timer = setTimeout(resetNumOfActions, timeUntilNextDay);

    // Clean up the timer when the component unmounts or when the effect is re-triggered
    return () => clearTimeout(timer);
  }, []);
};
