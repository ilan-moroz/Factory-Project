import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Employee } from "../models/Employee";

// Props required by the EmployeeSearch component
interface EmployeeSearchProps {
  employees: Employee[];
  setSearchedEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EmployeeSearch({
  employees,
  setSearchedEmployees,
  setIsSearchActive,
}: EmployeeSearchProps) {
  //triggered whenever the user types in the search input and filters employees based first/last name and department
  const searchEmployee = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm === "") {
      setIsSearchActive(false);
    } else {
      setIsSearchActive(true);
      const filteredEmployees = employees.filter(
        (employee) =>
          employee.firstName.toLowerCase().includes(searchTerm) ||
          employee.lastName.toLowerCase().includes(searchTerm) ||
          employee.departmentName!.toLowerCase().includes(searchTerm)
      );
      setSearchedEmployees(filteredEmployees); // Update the state with the filtered employees
    }
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
