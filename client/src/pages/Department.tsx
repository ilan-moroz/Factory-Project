import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import AddDepartment from "../components/AddDepartment";
import { store } from "../redux/Store";
import { fetchDeleteDepartment } from "../utils/fetchData";
import { Department } from "../models/Department";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import EditDepartment from "../components/EditDepartment";
import { deleteDepartmentAction } from "../redux/DepartmentReducer";
import { useManagerNames } from "../hooks/useManagerNames";

interface ColumnData {
  dataKey: keyof Department | string;
  label: string;
  numeric?: boolean;
  width: number;
}

const columns: ColumnData[] = [
  {
    width: 10,
    label: "No.",
    dataKey: "id" as keyof Department,
  },
  {
    width: 60,
    label: "Department Name",
    dataKey: "name",
  },
  {
    width: 60,
    label: "Manger Name",
    dataKey: "manager",
  },
  {
    width: 10,
    label: "Edit",
    dataKey: "edit" as keyof Department,
  },
  {
    width: 10,
    label: "Delete",
    dataKey: "delete" as keyof Department,
  },
];

const VirtuosoTableComponents: TableComponents<Department> = {
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
          <div>{column.label}</div>
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: Department) {
  const handleDelete = (id: string) => {
    fetchDeleteDepartment(id)
      .then((response) => {
        if (!response) {
          return;
        }
        store.dispatch(deleteDepartmentAction(id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      {columns.map((column) => {
        if (column.dataKey === "delete") {
          return (
            <TableCell
              key={column.dataKey}
              align={column.numeric || false ? "right" : "left"}
            >
              <IconButton onClick={() => handleDelete(row._id)}>
                <DeleteForeverIcon color="error" />
              </IconButton>
            </TableCell>
          );
        } else if (column.dataKey === "edit") {
          return (
            <TableCell
              key={column.dataKey}
              align={column.numeric || false ? "right" : "left"}
            >
              <EditDepartment departmentId={row._id} />
            </TableCell>
          );
        } else if (column.dataKey === "id") {
          return (
            <TableCell
              key={column.dataKey}
              align={column.numeric || false ? "right" : "left"}
            >
              {_index + 1}
            </TableCell>
          );
        } else {
          return (
            <TableCell
              key={column.dataKey}
              align={column.numeric || false ? "right" : "left"}
            >
              <div>{row[column.dataKey as keyof Department]}</div>
            </TableCell>
          );
        }
      })}
    </React.Fragment>
  );
}

export default function ReactVirtualizedTable() {
  const departmentsWithManagerNames = useManagerNames();
  return (
    <Box
      className="background"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ p: 3 }}>
        <AddDepartment />
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
        <Paper style={{ height: 450, width: "70%" }}>
          <TableVirtuoso
            data={departmentsWithManagerNames}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </Box>
    </Box>
  );
}
