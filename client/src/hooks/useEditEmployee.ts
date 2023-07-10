import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

export const useEditEmployee = (employeeId: string) => {
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

  // Update the employee state when the initial value changes
  useEffect(() => {
    setDepartment(employeeToEdit?.departmentId ?? "");
  }, [employeeToEdit?.departmentId]);

  // Handle manager selection change
  const handleDepartmentChange = (event: any) => {
    setDepartment(event.target.value);
  };

  return {
    employeeToEdit,
    department,
    handleDepartmentChange,
    departments,
  };
};
