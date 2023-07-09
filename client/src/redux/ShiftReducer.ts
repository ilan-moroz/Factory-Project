import { Shift } from "../models/Shifts";

export interface ShiftState {
  allShifts: Shift[];
}

export enum ShiftActionType {
  getAllShifts = "getAllShifts",
  addShift = "addShift",
  addEmployeeToShift = "addEmployeeToShift",
}

export interface ShiftAction {
  type: ShiftActionType;
  payload?: any;
}

export const getAllShiftsAction = (shifts: Shift[]): ShiftAction => {
  return { type: ShiftActionType.getAllShifts, payload: shifts };
};

export const addShiftAction = (shift: Shift): ShiftAction => {
  return { type: ShiftActionType.addShift, payload: shift };
};

export const addEmployeeToShiftAction = (
  employeeId: string,
  shiftId: string
): ShiftAction => {
  return {
    type: ShiftActionType.addEmployeeToShift,
    payload: { shiftId, employeeId },
  };
};

export const shiftReducer = (
  currentState: ShiftState = { allShifts: [] },
  action: ShiftAction
): ShiftState => {
  const state = { ...currentState };

  switch (action.type) {
    case ShiftActionType.getAllShifts:
      state.allShifts = action.payload;
      break;

    case ShiftActionType.addShift:
      state.allShifts = [...state.allShifts, action.payload];
      break;

    case ShiftActionType.addEmployeeToShift:
      state.allShifts = state.allShifts.map((shift) =>
        shift._id === action.payload.shiftId
          ? {
              ...shift,
              employeeIds: [...shift.employeeIds, action.payload.employeeId],
            }
          : shift
      );
      break;

    default:
      return currentState;
  }

  return state;
};
