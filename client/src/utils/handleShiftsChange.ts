import { Employee } from "../models/Employee";
import {
  addEmployeeToShiftAction,
  removeEmployeeFromShiftAction,
} from "../redux/ShiftReducer";
import { store } from "../redux/Store";

export const handleShiftsChange = (
  data: Employee,
  initialShiftsArray: string[]
) => {
  // Get the shift IDs that were removed and dispatch the change
  const removedShifts = initialShiftsArray.filter(
    (shiftId) => !data.shiftIds!.includes(shiftId)
  );
  removedShifts.forEach((shiftId) => {
    store.dispatch(removeEmployeeFromShiftAction(data._id, shiftId));
  });

  // Get the shift IDs that were added and dispatch the change
  const addedShiftIds = data.shiftIds!.filter(
    (id: string) => !initialShiftsArray.includes(id)
  );
  addedShiftIds.forEach((shiftId: string) => {
    store.dispatch(addEmployeeToShiftAction(data._id, shiftId));
  });
};
