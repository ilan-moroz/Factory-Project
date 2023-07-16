// hooks/useEmployee.ts

import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export const useEmployeeIdToName = () => {
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );

  // State to hold selected employee IDs
  const [employeeIds, setEmployeeIds] = useState<string[]>([]);
  // reset function
  const resetEmployeeIds = () => setEmployeeIds([]);

  // Handler for changes in employee selection
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    // Set the selected employee IDs state
    setEmployeeIds(event.target.value as string[]);
  };

  // Create a map of employee ids to employee names
  const employeeNameMap: { [key: string]: string } = {};
  employees.forEach((employee) => {
    employeeNameMap[
      employee._id
    ] = `${employee.firstName} ${employee.lastName}`;
  });

  return {
    employeeIds,
    employeeNameMap,
    handleChange,
    employees,
    resetEmployeeIds,
  };
};
