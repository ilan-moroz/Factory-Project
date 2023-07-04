import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { Box, IconButton, Popper, Typography } from "@mui/material";
import { Employee } from "../models/Employee";
import { RootState, store } from "../redux/Store";
import { useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddEmployeeFormDialog from "../components/AddEmployee";
import { Department } from "../models/Department";
import { fetchDeleteEmployee } from "../utils/fetchData";
import { deleteEmployeeAction } from "../redux/EmployeeReducer";
import ShiftEmployeeFormDialog from "../components/AddShiftToEmployee";

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
  const shifts = useSelector((state: RootState) => state.shifts.allShifts);

  const handleDelete = (id: string) => {
    fetchDeleteEmployee(id);
    store.dispatch(deleteEmployeeAction(id));
  };
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

  // get all employee shifts
  function getEmployeeShifts(employeeId: string) {
    const employeeShifts = shifts.filter((shift) =>
      shift.employeeIds.includes(employeeId)
    );
    return employeeShifts.map((shift, index) => {
      const dateParts = shift.date.split("T")[0].split("-"); // ['yyyy', 'mm', 'dd']
      const rearrangedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // 'dd/mm/yyyy'
      return (
        <Typography>
          {`${rearrangedDate} : ${shift.startTime}-${shift.endTime}`}
        </Typography>
      );
    });
  }

  // for the popper to display the shifts
  const [anchorEls, setAnchorEls] = React.useState<{
    [key: string]: null | HTMLElement;
  }>({});

  const handleClick =
    (id: string) => (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEls((prev) => ({
        ...prev,
        [id]: prev[id] ? null : event.currentTarget,
      }));
    };

  const open = Boolean(anchorEls);
  const id = open ? "simple-popper" : undefined;

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
          <button
            aria-describedby={id}
            type="button"
            onClick={handleClick(row._id)}
          >
            Open shifts
          </button>
          <Popper
            id={id}
            open={Boolean(anchorEls[row._id])}
            anchorEl={anchorEls[row._id]}
          >
            <Paper
              sx={{
                p: 1,
                backgroundColor: "black",
                color: "white",
                overflow: "auto",
              }}
            >
              {getEmployeeShifts(row._id)}
            </Paper>
          </Popper>
        </TableCell>
        <TableCell>
          <ShiftEmployeeFormDialog employeeId={row._id} />
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
