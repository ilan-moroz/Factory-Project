import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import AddDepartment from "../components/AddDepartment";
import { store } from "../redux/Store";
import { Department } from "../models/Department";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import EditDepartment from "../components/EditDepartment";
import { deleteDepartmentAction } from "../redux/DepartmentReducer";
import { useManagerNames } from "../hooks/useManagerNames";
import { decreaseActionNumberAction } from "../redux/UserReducer";
import { ColumnData } from "../models/ColumnData";
import { TableBase } from "../components/TableBase";
import { useDepartmentEmployees } from "../hooks/useDepartmentEmployees";
import { deleteDepartment } from "../api/departmentApi";

const columns: ColumnData<Department>[] = [
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
];

// Define header content for the department table
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
          <div>{column.label}</div>
        </TableCell>
      ))}
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
  // Use custom hook to fetch departments with employees
  const departmentWithEmployees = useDepartmentEmployees();

  // Define content of each row in the table
  function rowContent(index: number, row: Department) {
    // Function to handle delete department action
    const handleDelete = async (id: string) => {
      // Try to delete department from backend, then update redux store
      try {
        await deleteDepartment(id);
        store.dispatch(deleteDepartmentAction(id));
        store.dispatch(decreaseActionNumberAction());
      } catch (err) {
        console.log(err);
      }
    };

    // check if department has employees
    const hasEmployee = departmentWithEmployees(row._id);
    return (
      <React.Fragment>
        <TableCell>{index + 1}</TableCell>
        {columns.map((column) => {
          return (
            <TableCell
              key={column.dataKey}
              align={column.numeric || false ? "right" : "left"}
            >
              <div>{row[column.dataKey as keyof Department]}</div>
            </TableCell>
          );
        })}
        <TableCell>
          <EditDepartment departmentId={row._id} />
        </TableCell>
        <TableCell>
          {!hasEmployee ? (
            <IconButton onClick={() => handleDelete(row._id)}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          ) : (
            <>
              Can't delete:
              <br />
              Employee exists
            </>
          )}
        </TableCell>
      </React.Fragment>
    );
  }

  // Use custom hook to fetch departments with manager names
  const departmentsWithManagerNames = useManagerNames();

  return (
    <TableBase
      columns={columns}
      fixedHeaderContent={fixedHeaderContent}
      rowContent={rowContent}
      data={departmentsWithManagerNames}
      ExtraComponent={AddDepartment}
    />
  );
}
