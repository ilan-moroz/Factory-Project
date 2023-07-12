import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { RootState } from "../redux/Store";
import { useSelector } from "react-redux";
import { Shift } from "../models/Shifts";
import { Employee } from "../models/Employee";
import { TableBase } from "../components/TableBase";
import AddShiftFormDialog from "../components/AddShift";
import { ColumnData } from "../models/ColumnData";

const columns: ColumnData<Shift>[] = [
  {
    width: 50,
    label: "Date",
    dataKey: "date",
  },
  {
    width: 50,
    label: "Start Time",
    dataKey: "startTime",
  },
  {
    width: 50,
    label: "End Time",
    dataKey: "endTime",
  },
  {
    width: 120,
    label: "Employees",
    dataKey: "employeeIds",
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
          if (column.dataKey === "date") {
            const dateParts = String(row[column.dataKey])
              .split("T")[0]
              .split("-"); // ['yyyy', 'mm', 'dd']
            const rearrangedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // 'dd-mm-yyyy'
            return (
              <TableCell
                key={column.dataKey}
                align={column.numeric || false ? "right" : "left"}
              >
                {rearrangedDate}
              </TableCell>
            );
          }
          const cellContent =
            column.dataKey === "employeeIds"
              ? row.employeeNames!.join(", ")
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

  return (
    <TableBase
      columns={columns}
      fixedHeaderContent={fixedHeaderContent}
      rowContent={rowContent}
      data={shiftsWithEmployeeNames}
      ExtraComponent={AddShiftFormDialog}
    />
  );
}
