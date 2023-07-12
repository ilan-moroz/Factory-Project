import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { Box, IconButton } from "@mui/material";
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

interface ColumnData {
  dataKey: keyof Employee | string;
  label: string;
  numeric?: boolean;
  width: number;
}

const columns: ColumnData[] = [
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

const VirtuosoTableComponents: TableComponents<Employee> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

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

  const employees = useEmployeeDepartmentNames();
  const [searchedEmployees, setSearchedEmployees] = React.useState(employees);
  const [isSearchActive, setIsSearchActive] = React.useState(false);

  React.useEffect(() => {
    // Only update searchedEmployees if a search is not active
    if (!isSearchActive) {
      setSearchedEmployees(employees);
    }
  }, [employees, isSearchActive]); // When employees changes, update searchedEmployees

  return (
    <Box
      className="background"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ p: 3 }}>
        <AddEmployee />
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          marginBottom: 400,
        }}
      >
        <Box sx={{ mb: 3 }}>
          <EmployeeSearch
            employees={employees}
            setSearchedEmployees={setSearchedEmployees}
            setIsSearchActive={setIsSearchActive}
          />
        </Box>
        <Paper style={{ height: 400, width: "70%" }}>
          <TableVirtuoso
            data={searchedEmployees}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </Box>
    </Box>
  );
}
