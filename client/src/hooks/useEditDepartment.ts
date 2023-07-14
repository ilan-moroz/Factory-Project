import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

export const useEditDepartment = (departmentId: string) => {
  const departments = useSelector(
    (state: RootState) => state.departments.departments
  );
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );

  // Find the department to edit
  const departmentToEdit = departments.find(
    (dep: any) => dep._id === departmentId
  );

  // State for the manager value
  const [manager, setManager] = useState(departmentToEdit?.manager ?? "");

  // Update the manager state when the initial value changes
  useEffect(() => {
    setManager(departmentToEdit?.manager ?? "");
  }, [departmentToEdit?.manager]);

  // Handle manager selection change
  const handleManagerChange = (event: any) => {
    setManager(event.target.value);
  };

  return {
    employees,
    departmentToEdit,
    manager,
    handleManagerChange,
  };
};
