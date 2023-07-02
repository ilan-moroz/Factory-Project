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
import { RootState, store } from "../redux/Store";
import { useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AddEmployeeFormDialog from "../components/AddEmployee";
import { Department } from "../models/Department";
import { fetchDeleteEmployee, fetchGetAllEmployees } from "../utils/fetchData";
import {
  deleteEmployeeAction,
  getAllEmployeesAction,
} from "../redux/EmployeeReducer";
import { useEffect } from "react";

interface ColumnData {
  dataKey: keyof Employee | string;
  label: string;
  numeric?: boolean;
  width: number;
}

const columns: ColumnData[] = [
  {
    width: 80,
    label: "First Name",
    dataKey: "firstName",
  },
  {
    width: 80,
    label: "Last Name",
    dataKey: "lastName",
  },
  {
    width: 120,
    label: "Department",
    dataKey: "departmentName",
  },
  {
    width: 50,
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
          width: 30,
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
          width: 30,
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
          width: 30,
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
          width: 30,
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
          width: 30,
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
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );
  const departments = useSelector(
    (state: RootState) => state.departments.departments
  );

  const handleDelete = (id: string) => {
    fetchDeleteEmployee(id);
    store.dispatch(deleteEmployeeAction(id));
  };
  const departmentIdNameMap: { [key: string]: string } = {};
  departments.forEach((department: Department) => {
    departmentIdNameMap[department._id] = department.name;
  });

  const employeesWithDepartmentNames = employees.map((employee) => ({
    ...employee,
    departmentName: departmentIdNameMap[employee.departmentId],
  }));

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
        <TableCell>shifts</TableCell>
        <TableCell>
          <IconButton>
            <AddIcon color="success" />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton>
            <EditIcon color="secondary" />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton onClick={() => handleDelete(row._id)}>
            <DeleteForeverIcon color="error" />
          </IconButton>
        </TableCell>
      </React.Fragment>
    );
  }

  // get data from database and save in redux
  const fetchDepartments = () => {
    console.log("getting employees from backend....");
    fetchGetAllEmployees()
      .then((response) => {
        store.dispatch(getAllEmployeesAction(response));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  //if employees is empty get all departments from database and save in redux
  useEffect(() => {
    if (store.getState().employees.employees.length < 1) {
      fetchDepartments();
    }
  }, []);

  return (
    <Box
      className="department"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ p: 3 }}>
        <AddEmployeeFormDialog />
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
        <Paper style={{ height: 400, width: "70%" }}>
          <TableVirtuoso
            data={employeesWithDepartmentNames} // Use the new array here
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </Box>
    </Box>
  );
}
