import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

export function EmployeeSearch() {
  // search function activated on change of the search input and searches for employees based first/last name and department
  const searchEmployee = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
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
