import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Employee } from "../models/Employee";

//  what data we need from the main component
interface EmployeeSearchProps {
  employees: Employee[];
  setFilteredEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

export function EmployeeSearch({
  employees,
  setFilteredEmployees,
}: EmployeeSearchProps) {
  // search function activated on change of the search input and searches for employees based first/last name and department
  const searchEmployee = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredEmployees = employees.filter(
      (employee) =>
        employee.firstName
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        employee.lastName
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        employee
          .departmentName!.toLowerCase()
          .includes(event.target.value.toLowerCase())
    );
    setFilteredEmployees(filteredEmployees); // Update the state with the filtered employees
  };

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Employee"
        inputProps={{ "aria-label": "search employee" }}
        onChange={searchEmployee}
      />
      <SearchIcon sx={{ p: "10px" }} />
    </Paper>
  );
}
