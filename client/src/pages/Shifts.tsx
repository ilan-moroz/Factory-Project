import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { Box } from "@mui/material";
import { RootState, store } from "../redux/Store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AddShiftFormDialog from "../components/AddShift";
import { Shift } from "../models/Shifts";
import { getAllShiftsAction } from "../redux/ShiftReducer";
import { fetchGetAllShifts } from "../utils/fetchData";
import { Employee } from "../models/Employee";

interface ColumnData {
  dataKey: keyof Shift;
  label: string;
  numeric?: boolean;
  width: number;
}

const columns: ColumnData[] = [
  {
    width: 80,
    label: "Date",
    dataKey: "date",
  },
  {
    width: 80,
    label: "Start Time",
    dataKey: "startTime",
  },
  {
    width: 120,
    label: "End Time",
    dataKey: "endTime",
  },
  {
    width: 50,
    label: "Employees",
    dataKey: "employeeIds",
  },
];

const VirtuosoTableComponents: TableComponents<Shift> = {
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
    </TableRow>
  );
}

export default function ReactVirtualizedTable() {
  const shifts = useSelector((state: RootState) => state.shifts.allShifts);
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );

  const employeeIdNameMap: { [key: string]: string } = {};
  employees.forEach((employee: Employee) => {
    employeeIdNameMap[
      employee._id
    ] = `${employee.firstName} ${employee.lastName}`;
  });

  const shiftsWithEmployeeNames = shifts.map((shift) => ({
    ...shift,
    employeeNames: shift.employeeIds.map((id) => employeeIdNameMap[id]),
  }));

  function rowContent(index: number, row: Shift) {
    return (
      <React.Fragment>
        <TableCell>{index + 1}</TableCell>
        {columns.map((column) => {
          const cellContent =
            column.dataKey === "employeeIds"
              ? row.employeeNames.join(", ")
              : row[column.dataKey];
          return (
            <TableCell
              key={column.dataKey}
              align={column.numeric || false ? "right" : "left"}
            >
              {cellContent}
            </TableCell>
          );
        })}
      </React.Fragment>
    );
  }

  // get data from database and save in redux
  const fetchShifts = () => {
    console.log("getting shifts from backend....");
    fetchGetAllShifts()
      .then((response) => {
        store.dispatch(getAllShiftsAction(response));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  //if shifts is empty get all departments from database and save in redux
  useEffect(() => {
    if (store.getState().shifts.allShifts.length < 1) {
      fetchShifts();
    }
  }, []);

  return (
    <Box
      className="department"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ p: 3 }}>
        <AddShiftFormDialog />
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
            data={shiftsWithEmployeeNames}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </Box>
    </Box>
  );
}
