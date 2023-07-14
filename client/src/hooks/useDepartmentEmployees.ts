import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

// Custom hook to check if a department has employees
export const useDepartmentEmployees = () => {
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );

  // Create an array of departmentIds based on the employees list
  const departments = employees.map((employee) => employee.departmentId);

  // Function to check if a department has employees
  const departmentWithEmployees = (departmentId: string) => {
    return departments.includes(departmentId);
  };
  return departmentWithEmployees;
};
