import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

// a hook that returns a function that check if department has employees in it
export const useDepartmentEmployees = () => {
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );

  const departments = employees.map((employee) => employee.departmentId);

  const departmentWithEmployees = (departmentId: string) => {
    return departments.includes(departmentId);
  };
  return departmentWithEmployees;
};
