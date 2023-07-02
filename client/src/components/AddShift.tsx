import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { fetchAddShift } from "../utils/fetchData";
import { addShiftAction } from "../redux/ShiftReducer";
import { store } from "../redux/Store";

export default function AddShiftFormDialog() {
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
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>Add new Shift to the factory</DialogContentText>
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
