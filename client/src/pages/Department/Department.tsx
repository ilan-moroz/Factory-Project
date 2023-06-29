import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import FormDialog from "../../components/AddDepartment";
import { RootState, store } from "../../redux/Store";
import { useEffect } from "react";
import {
  deleteDepartmentAction,
  getAllDepartmentsAction,
} from "../../redux/DepartmentReducer";
import {
  fetchDeleteDepartment,
  fetchGetAllDepartments,
} from "../../utils/fetchData";
import { useSelector } from "react-redux";
import { Department } from "../../models/Department";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import "./Department.css";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

interface ColumnData {
  dataKey: keyof Department | string;
  label: string;
  numeric?: boolean;
  width: number;
}

const columns: ColumnData[] = [
  {
    width: 120,
    label: "Department ID",
    dataKey: "_id",
  },
  {
    width: 120,
    label: "Department Name",
    dataKey: "name",
  },
  {
    width: 120,
    label: "Manger Name",
    dataKey: "manager",
  },
  {
    width: 120,
    label: "Edit",
    dataKey: "edit" as keyof Department,
  },
  {
    width: 120,
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
          <Tooltip title={column.label}>
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {column.label}
            </div>
          </Tooltip>
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: Department) {
  const handleDelete = (id: string) => {
    fetchDeleteDepartment(id);
    store.dispatch(deleteDepartmentAction(id));
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
              <EditIcon color="secondary" />
            </TableCell>
          );
        } else {
          return (
            <TableCell
              key={column.dataKey}
              align={column.numeric || false ? "right" : "left"}
            >
              <Tooltip title={row[column.dataKey as keyof Department]}>
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row[column.dataKey as keyof Department]}
                </div>
              </Tooltip>
            </TableCell>
          );
        }
      })}
    </React.Fragment>
  );
}

export default function ReactVirtualizedTable() {
  const departments = useSelector(
    (state: RootState) => state.departments.departments
  );

  // get data from database and save in redux
  const fetchDepartments = () => {
    console.log("getting departments from backend....");
    fetchGetAllDepartments()
      .then((response) => {
        store.dispatch(getAllDepartmentsAction(response));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  //if departments is empty get all departments from database and save in redux
  useEffect(() => {
    if (store.getState().departments.departments.length < 1) {
      fetchDepartments();
    }
  }, []);

  return (
    <Box
      className="department"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ p: 3 }}>
        <FormDialog />
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
            data={departments}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </Box>
    </Box>
  );
}
