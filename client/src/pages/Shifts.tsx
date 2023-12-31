import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Shift } from "../models/Shifts";
import { TableBase } from "../components/TableBase";
import AddShiftFormDialog from "../components/AddShift";
import { ColumnData } from "../models/ColumnData";
import { rearrangeDate } from "../utils/rearrangeDate";
import { useShiftsEmployeeNames } from "../hooks/useShiftsEmployeeNames";

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
  function rowContent(index: number, row: Shift) {
    return (
      <React.Fragment>
        <TableCell>{index + 1}</TableCell>
        {columns.map((column) => {
          if (column.dataKey === "date") {
            const date = rearrangeDate(row[column.dataKey]);
            return (
              <TableCell
                key={column.dataKey}
                align={column.numeric || false ? "right" : "left"}
              >
                {date}
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

  const shifts = useShiftsEmployeeNames();

  return (
    <TableBase
      columns={columns}
      fixedHeaderContent={fixedHeaderContent}
      rowContent={rowContent}
      data={shifts}
      ExtraComponent={AddShiftFormDialog}
    />
  );
}
