import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { Box } from "@mui/material";

interface ColumnData {
  dataKey: string;
  label: string;
  numeric?: boolean;
  width: number;
}

interface TableBaseProps {
  columns: ColumnData[];
  fixedHeaderContent: () => React.ReactNode;
  rowContent: (index: number, row: any) => React.ReactNode;
  data: any[];
  ExtraComponent: React.ComponentType;
  SearchComp?: React.ComponentType;
}

const VirtuosoTableComponents: TableComponents<any> = {
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

export const TableBase: React.FC<TableBaseProps> = ({
  columns,
  fixedHeaderContent,
  rowContent,
  data,
  ExtraComponent,
  SearchComp,
}) => {
  return (
    <Box
      className="background"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ p: 3 }}>
        <ExtraComponent />
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
        {SearchComp && (
          <Box sx={{ mb: 3 }}>
            <SearchComp />
          </Box>
        )}
        <Paper style={{ height: 400, width: "70%" }}>
          <TableVirtuoso
            data={data}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </Box>
    </Box>
  );
};
