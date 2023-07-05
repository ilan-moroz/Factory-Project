import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { Employee } from "../models/Employee";
import { Department } from "../models/Department";

export function ManagerNames() {
  const departments = useSelector(
    (state: RootState) => state.departments.departments
  );

  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );

  const employeeIdNameMap: { [key: string]: string } = {};
  employees.forEach((employee: Employee) => {
    employeeIdNameMap[
      employee._id
    ] = `${employee.firstName} ${employee.lastName}`;
  });

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
