import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import { Employee } from "../models/Employee";
import { store } from "../redux/Store";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddEmployee from "../components/AddEmployee";
import { fetchDeleteEmployee } from "../utils/fetchData";
import { deleteEmployeeAction } from "../redux/EmployeeReducer";
import ShiftEmployeeFormDialog from "../components/AddShiftToEmployee";
import EmployeeShiftsPopper from "../components/EmployeeShiftsPopper";
import { useEmployeeDepartmentNames } from "../hooks/useEmployeeDepartmentNames";
import EditEmployee from "../components/EditEmployee";
import { EmployeeSearch } from "../components/EmployeeSearch";
import { decreaseActionNumberAction } from "../redux/UserReducer";
import { ColumnData } from "../models/ColumnData";
import { TableBase } from "../components/TableBase";

const columns: ColumnData<Employee>[] = [
  {
    width: 60,
    label: "First Name",
    dataKey: "firstName",
  },
  {
    width: 60,
    label: "Last Name",
    dataKey: "lastName",
  },
  {
    width: 60,
    label: "Department",
    dataKey: "departmentName",
  },
  {
    width: 40,
    label: "Year Started",
    dataKey: "startWorkYear",
  },
];

function fixedHeaderContent() {
  return (
    <TableRow>
      <TableCell
        sx={{
          width: 10,
          backgroundColor: "background.paper",
          color: "InfoText",
          fontWeight: "bold",
        }}
        variant="head"
      >
        No.
      </TableCell>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? "right" : "left"}
          style={{ width: column.width }}
          sx={{
            backgroundColor: "background.paper",
            color: "InfoText",
            fontWeight: "bold",
          }}
        >
          {column.label}
        </TableCell>
      ))}
      <TableCell
        sx={{
          width: 66,
          backgroundColor: "background.paper",
          color: "InfoText",
          fontWeight: "bold",
        }}
        variant="head"
      >
        Shifts
      </TableCell>
      <TableCell
        sx={{
          width: 10,
          backgroundColor: "background.paper",
          color: "InfoText",
          fontWeight: "bold",
        }}
        variant="head"
      >
        Add shift
      </TableCell>
      <TableCell
        sx={{
          width: 10,
          backgroundColor: "background.paper",
          color: "InfoText",
          fontWeight: "bold",
        }}
        variant="head"
      >
        Edit
      </TableCell>
      <TableCell
        sx={{
          width: 10,
          backgroundColor: "background.paper",
          color: "InfoText",
          fontWeight: "bold",
        }}
        variant="head"
      >
        Delete
      </TableCell>
    </TableRow>
  );
}

export default function ReactVirtualizedTable() {
  // handle the delete of an employee
  const handleDelete = (id: string) => {
    fetchDeleteEmployee(id);
    store.dispatch(deleteEmployeeAction(id));
    store.dispatch(decreaseActionNumberAction());
  };

  function rowContent(index: number, row: Employee) {
    return (
      <React.Fragment>
        <TableCell>{index + 1}</TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? "right" : "left"}
          >
            {
              row[
                column.dataKey as keyof (Employee & { departmentName: string })
              ]
            }
          </TableCell>
        ))}
        <TableCell>
          <EmployeeShiftsPopper employeeId={row._id} />
        </TableCell>
        <TableCell>
          <ShiftEmployeeFormDialog employeeId={row._id} />
        </TableCell>
        <TableCell>
          <EditEmployee employeeId={row._id} />
        </TableCell>
        <TableCell>
          <IconButton onClick={() => handleDelete(row._id)}>
            <DeleteForeverIcon color="error" />
          </IconButton>
        </TableCell>
      </React.Fragment>
    );
  }
  // Get the employees using a custom hook that returns the employees with their department names
  const employees = useEmployeeDepartmentNames();
  // Initialize the state for searched employees and search activity
  const [searchedEmployees, setSearchedEmployees] = React.useState(employees);
  const [isSearchActive, setIsSearchActive] = React.useState(false);

  React.useEffect(() => {
    // Update searchedEmployees when the employees change, but only if a search is not active
    if (!isSearchActive) {
      setSearchedEmployees(employees);
    }
  }, [employees, isSearchActive]); // When employees changes, update searchedEmployees

  // Create a memoized search component using React.useCallback
  const searchComponent = React.useCallback(
    () => (
      <EmployeeSearch
        employees={employees}
        setSearchedEmployees={setSearchedEmployees}
        setIsSearchActive={setIsSearchActive}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <TableBase
      columns={columns}
      fixedHeaderContent={fixedHeaderContent}
      rowContent={rowContent}
      data={searchedEmployees}
      ExtraComponent={AddEmployee}
      SearchComp={searchComponent}
    />
  );
}
