import * as React from "react";
import { Popper, Paper, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

interface EmployeeShiftsPopperProps {
  employeeId: string;
}

const EmployeeShiftsPopper: React.FC<EmployeeShiftsPopperProps> = ({
  employeeId,
}) => {
  const shifts = useSelector((state: RootState) => state.shifts.allShifts);

  // get all employee shifts
  const getEmployeeShifts = () => {
    const employeeShifts = shifts.filter((shift) =>
      shift.employeeIds.includes(employeeId)
    );
    return employeeShifts.map((shift, index) => {
      const dateParts = shift.date.split("T")[0].split("-"); // ['yyyy', 'mm', 'dd']
      const rearrangedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // 'dd/mm/yyyy'
      return (
        <Typography key={index}>
          {`${rearrangedDate} : ${shift.startTime}-${shift.endTime}`}
        </Typography>
      );
    });
  };

  // for the popper to display the shifts
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <Button
        variant="outlined"
        aria-describedby={id}
        size="small"
        onClick={handleClick}
        sx={{
          borderColor: "black",
          color: "black",
        }}
      >
        Open shifts
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Paper
          sx={{
            p: 1,
            backgroundColor: "black",
            color: "white",
            overflow: "auto",
          }}
        >
          {getEmployeeShifts()}
        </Paper>
      </Popper>
    </div>
  );
};

export default EmployeeShiftsPopper;
