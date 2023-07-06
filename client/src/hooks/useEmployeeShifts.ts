import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { rearrangeDate } from "../utils/rearrangeDate";

export const useEmployeeShifts = (employeeId: string) => {
  const shifts = useSelector((state: RootState) => state.shifts.allShifts);

  // get all employees shifts and rearrange them for display in popper
  const getEmployeeShifts = shifts
    .filter((shift) => shift.employeeIds.includes(employeeId))
    .map((shift) => {
      const rearrangedDate = rearrangeDate(shift.date);
      return {
        id: shift._id,
        date: rearrangedDate,
        startTime: shift.startTime,
        endTime: shift.endTime,
      };
    });

  return getEmployeeShifts;
};
