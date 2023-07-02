import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Checkbox,
  Fab,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { fetchAddShift } from "../utils/fetchData";
import { addShiftAction } from "../redux/ShiftReducer";
import { RootState, store } from "../redux/Store";
import { useSelector } from "react-redux";

export default function AddShiftFormDialog() {
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );

  const [open, setOpen] = React.useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await fetchAddShift(data);
      store.dispatch(addShiftAction(response));
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  const [employeeIds, setEmployeeIds] = React.useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setEmployeeIds(event.target.value as string[]);
  };

  // Create a map of employee ids to employee names
  const employeeNameMap: { [key: string]: string } = {};
  employees.forEach((employee) => {
    employeeNameMap[
      employee._id
    ] = `${employee.firstName} ${employee.lastName}`;
  });

  return (
    <div>
      <Fab
        variant="extended"
        size="medium"
        aria-label="add"
        onClick={handleClickOpen}
      >
        <AddIcon sx={{ mr: 1 }} />
        Add Shift
      </Fab>
      <Dialog sx={{ mb: 20 }} open={open} onClose={handleClose}>
        <DialogTitle>Add Shift</DialogTitle>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: 500 }}
        >
          <DialogContent>
            <DialogContentText>Add new Shift to the factory</DialogContentText>
            <InputLabel
              htmlFor="date"
              sx={{ display: "flex", justifyContent: "start", marginTop: 2 }}
            >
              Date
            </InputLabel>
            <TextField
              {...register("date", { required: true })}
              error={errors.date ? true : false}
              helperText={errors.date && "Date is required"}
              autoFocus
              margin="dense"
              id="date"
              type="date"
              fullWidth
              variant="standard"
            />
            <InputLabel
              htmlFor="startTime"
              sx={{ display: "flex", justifyContent: "start", marginTop: 2 }}
            >
              Start Time
            </InputLabel>
            <TextField
              {...register("startTime", { required: true })}
              error={errors.startTime ? true : false}
              helperText={errors.startTime && "Start time is required"}
              autoFocus
              margin="dense"
              id="startTime"
              type="time"
              fullWidth
              variant="standard"
            />
            <InputLabel
              htmlFor="endTime"
              sx={{ display: "flex", justifyContent: "start", marginTop: 2 }}
            >
              End Time
            </InputLabel>
            <TextField
              {...register("endTime", { required: true })}
              error={errors.endTime ? true : false}
              helperText={errors.endTime && "End time year is required"}
              autoFocus
              margin="dense"
              id="endTime"
              type="time"
              fullWidth
              variant="standard"
            />
            <Select
              id="employeesNames"
              multiple
              value={employeeIds}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) =>
                selected.map((value) => employeeNameMap[value]).join(", ")
              }
            >
              {employees.map((employee) => (
                <MenuItem key={employee._id} value={employee._id}>
                  <Checkbox checked={employeeIds.indexOf(employee._id) > -1} />
                  <ListItemText
                    primary={`${employee.firstName} ${employee.lastName}`}
                  />
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button type="reset" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
