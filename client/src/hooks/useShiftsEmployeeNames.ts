import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { Employee } from "../models/Employee";

export const useShiftsEmployeeNames = () => {
  const shifts = useSelector((state: RootState) => state.shifts.allShifts);
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );

  const employeeIdNameMap: { [key: string]: string } = {};
  employees.forEach((employee: Employee) => {
    employeeIdNameMap[
      employee._id
    ] = `${employee.firstName} ${employee.lastName}`;
  });

  const shiftsWithEmployeeNames = shifts.map((shift) => ({
    ...shift,
    employeeNames: shift.employeeIds.map((id) => employeeIdNameMap[id]),
  }));
  return shiftsWithEmployeeNames;
};
