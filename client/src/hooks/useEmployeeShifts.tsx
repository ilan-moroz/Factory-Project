import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { Typography } from "@mui/material";

export const useEmployeeShifts = (employeeId: string) => {
  const shifts = useSelector((state: RootState) => state.shifts.allShifts);

  // get all employees shifts and rearrange them for display in popper
  const getEmployeeShifts = shifts
    .filter((shift) => shift.employeeIds.includes(employeeId))
    .map((shift) => {
      const dateParts = shift.date.split("T")[0].split("-"); // ['yyyy', 'mm', 'dd']
      const rearrangedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // 'dd/mm/yyyy'
      return (
        <Typography key={shift._id}>
          {`${rearrangedDate} : ${shift.startTime}-${shift.endTime}`}
        </Typography>
      );
    });

  return getEmployeeShifts;
};
