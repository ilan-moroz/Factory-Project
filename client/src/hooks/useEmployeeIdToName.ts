// hooks/useEmployee.ts

import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export const useEmployeeIdToName = () => {
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );

  const [employeeIds, setEmployeeIds] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setEmployeeIds(event.target.value as string[]);
  };

  // Create a map of employee ids to employee names
  const employeeNameMap: { [key: string]: string } = {};
  employees.forEach((employee) => {
    employeeNameMap[
      employee._id
    ] = `${employee.firstName} ${employee.lastName}`;
  });

  return { employeeIds, employeeNameMap, handleChange, employees };
};
