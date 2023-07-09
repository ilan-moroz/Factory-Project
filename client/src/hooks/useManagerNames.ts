import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { Employee } from "../models/Employee";
import { Department } from "../models/Department";

export function useManagerNames() {
  const departments = useSelector(
    (state: RootState) => state.departments.departments
  );

  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );

  // Create a map to easily lookup employee names using employee id as key
  const employeeIdNameMap: { [key: string]: string } = {};
  employees.forEach((employee: Employee) => {
    employeeIdNameMap[
      employee._id
    ] = `${employee.firstName} ${employee.lastName}`;
  });

  // Create a new array of departments where each department's manager property
  // is replaced with the corresponding manager's name(s) from the employeeIdNameMap
  const departmentsWithManagerNames = departments.map(
    (department: Department) => ({
      ...department,
      manager: Array.isArray(department.manager)
        ? department.manager.map((id) => employeeIdNameMap[id])
        : [employeeIdNameMap[department.manager]],
    })
  );
  return departmentsWithManagerNames;
}
