import { useEffect } from "react";
import { store } from "../redux/Store";
import { resetNumOfActionsAction } from "../redux/UserReducer";

export const useResetNumOfActions = () => {
  useEffect(() => {
    const resetNumOfActions = () => {
      store.dispatch(resetNumOfActionsAction());
    };

    // Get the last use date from local storage
    const lastUseDate = new Date(localStorage.getItem("lastUseDate") || "");
    const today = new Date();

    // If the app hasn't been used today, reset the actions
    if (
      lastUseDate.getDate() !== today.getDate() ||
      lastUseDate.getMonth() !== today.getMonth() ||
      lastUseDate.getFullYear() !== today.getFullYear()
    ) {
      resetNumOfActions();
    }

    // Update the last use date in local storage
    localStorage.setItem("lastUseDate", today.toISOString());

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
