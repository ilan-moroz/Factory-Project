import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

// Hook to handle employee edits
export const useEditEmployee = (employeeId: string) => {
  // Fetching data from redux state
  const shifts = useSelector((state: RootState) => state.shifts.allShifts);
  const departments = useSelector(
    (state: RootState) => state.departments.departments
  );
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );

  // Find the employee to edit
  const employeeToEdit = employees.find(
    (employee: any) => employee._id === employeeId
  );

  // handle the department state when changed
  const [department, setDepartment] = useState<string>(
    employeeToEdit?.departmentId ?? ""
  );
  // handle the state of the selected shifts
  const [shiftsArray, setShiftsArray] = useState<string[]>(
    employeeToEdit?.shiftIds ?? []
  );
  // the initial state of the employees shifts
  const [initialShiftsArray, setInitialShiftsArray] = useState<string[]>(
    employeeToEdit?.shiftIds ?? []
  );

  // Map to store shifts information with their ids as keys
  const shiftsMap = new Map(shifts.map((shift) => [shift._id, shift]));

  // Sync state with changes in employeeToEdit
  useEffect(() => {
    setDepartment(employeeToEdit?.departmentId ?? "");
    setShiftsArray(employeeToEdit?.shiftIds ?? []);
    setInitialShiftsArray(employeeToEdit?.shiftIds ?? []);
  }, [employeeToEdit?.departmentId, employeeToEdit?.shiftIds]);

  // Event handlers
  // Handle department selection change
  const handleDepartmentChange = (event: any) => {
    setDepartment(event.target.value);
  };
  // Handle shift selection change
  const handleShiftChange = (event: any) => {
    setShiftsArray(event.target.value);
  };

  return {
    employeeToEdit,
    department,
    handleDepartmentChange,
    departments,
    handleShiftChange,
    shiftsArray,
    shifts,
    shiftsMap,
    initialShiftsArray,
  };
};
