import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { Employee } from "../models/Employee";
import { Department } from "../models/Department";

export const useEmployeeDepartmentNames = (): Employee[] => {
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );
  const departments = useSelector(
    (state: RootState) => state.departments.departments
  );

  const departmentIdNameMap: { [key: string]: string } = {};
  departments.forEach((department: Department) => {
    departmentIdNameMap[department._id] = department.name;
  });

  const employeesWithDepartmentNames = employees.map((employee) => {
    let departmentName;
    if (typeof employee.departmentId === "string") {
      departmentName = departmentIdNameMap[employee.departmentId];
    } else {
      departmentName = (employee.departmentId as any).name;
    }
    return {
      ...employee,
      departmentName,
    };
  });

  return employeesWithDepartmentNames;
};
