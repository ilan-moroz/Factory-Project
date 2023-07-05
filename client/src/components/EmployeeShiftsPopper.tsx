import * as React from "react";
import {
  Popper,
  Paper,
  Button,
  ClickAwayListener,
  Typography,
} from "@mui/material";
import { useEmployeeShifts } from "../hooks/useEmployeeShifts";

interface EmployeeShiftsPopperProps {
  employeeId: string;
}

const EmployeeShiftsPopper: React.FC<EmployeeShiftsPopperProps> = ({
  employeeId,
}) => {
  // get all shifts from the hook
  const employeeShifts = useEmployeeShifts(employeeId);

  // for the popper to display the shifts
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <ClickAwayListener onClickAway={handleClickAway}>
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
              }}
            >
              {employeeShifts.map((shift) => (
                <Typography key={shift.id}>
                  {`${shift.date} : ${shift.startTime}-${shift.endTime}`}
                </Typography>
              ))}
            </Paper>
          </Popper>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default EmployeeShiftsPopper;
