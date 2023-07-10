import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

export const useEditEmployee = (employeeId: string) => {
  const shifts = useSelector((state: RootState) => state.shifts.allShifts);
  const departments = useSelector(
    (state: RootState) => state.departments.departments
  );
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );
  const employeeToEdit = employees.find(
    (employee: any) => employee._id === employeeId
  );

  const [department, setDepartment] = useState(
    employeeToEdit?.departmentId ?? ""
  );
  const [shift, setShift] = useState(employeeToEdit?.shiftIds ?? []);

  // Map to store shifts information with their ids as keys
  const shiftsMap = new Map(shifts.map((shift) => [shift._id, shift]));

  // Update the employee state when the initial value changes
  useEffect(() => {
    setDepartment(employeeToEdit?.departmentId ?? "");
    setShift(employeeToEdit?.shiftIds ?? []);
  }, [employeeToEdit?.departmentId, employeeToEdit?.shiftIds]);

  // Handle department selection change
  const handleDepartmentChange = (event: any) => {
    setDepartment(event.target.value);
  };

  // Handle shift selection change
  const handleShiftChange = (event: any) => {
    setShift(event.target.value);
  };

  return {
    employeeToEdit,
    department,
    handleDepartmentChange,
    departments,
    handleShiftChange,
    shift,
    shifts,
    shiftsMap,
  };
};
