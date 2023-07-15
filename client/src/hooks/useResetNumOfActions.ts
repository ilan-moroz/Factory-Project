import { useEffect } from "react";
import { store } from "../redux/Store";
import { resetNumOfActionsAction } from "../redux/UserReducer";

export const useResetNumOfActions = () => {
  useEffect(() => {
    const resetNumOfActions = () => {
      store.dispatch(resetNumOfActionsAction());
    };

    const today = new Date();

    // Calculate the time until the next day
    const nextDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );
    const timeUntilNextDay = nextDay.getTime() - today.getTime();

    // Set a timer to reset the numOfActions property at the beginning of the next day
    const timer = setTimeout(resetNumOfActions, timeUntilNextDay);

    // Clean up the timer when the component unmounts or when the effect is re-triggered
    return () => clearTimeout(timer);
  }, []);
};
