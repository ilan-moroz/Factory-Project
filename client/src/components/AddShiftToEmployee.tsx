import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { RootState, store } from "../redux/Store";
import { useSelector } from "react-redux";
import { FormDialogBase } from "./FormDialogBase";
import { rearrangeDate } from "../utils/rearrangeDate";
import { addEmployeeToShiftAction } from "../redux/ShiftReducer";
import { addShiftToEmployeeAction } from "../redux/EmployeeReducer";
import { decreaseActionNumberAction } from "../redux/UserReducer";
import { addShiftToEmployee } from "../api/shiftApi";
import { Shift } from "../models/Shifts";

// Props required by the addShiftToEmployee component
type shiftProps = {
  employeeId: string;
};

export default function ShiftEmployeeFormDialog(props: shiftProps) {
  const shifts = useSelector((state: RootState) => state.shifts.allShifts);

  //onSubmit function to be used when the form is submitted
  const onSubmit = async (data: { shift: string }) => {
    const { employeeId } = props;
    try {
      // Attempt to add shift to employee in the database
      const response = await addShiftToEmployee(data.shift, employeeId);
      if (response) {
        // If successful, dispatch data to Redux store
        store.dispatch(addEmployeeToShiftAction(employeeId, data.shift));
        store.dispatch(addShiftToEmployeeAction(employeeId, data.shift));
        store.dispatch(decreaseActionNumberAction());
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormDialogBase
      title="Add Shift To Employee"
      contentText="To add a new shift to the employee, please choose a shift from the list."
      onSubmit={onSubmit}
      icon={<AddIcon color="success" />}
    >
      {(register, errors) => (
        <>
          {/* input for select the shift to add */}
          <TextField
            sx={{ mt: 2 }}
            {...register("shift", { required: true })}
            id="shift"
            select
            label="Shift"
            fullWidth
            defaultValue=""
            error={errors.shift ? true : false}
            helperText={errors.shift && "Shift is required"}
          >
            {shifts.map((option: Shift) => (
              <MenuItem key={option._id} value={option._id}>
                {rearrangeDate(option.date)} : {option.startTime}-
                {option.endTime}
              </MenuItem>
            ))}
          </TextField>
        </>
      )}
    </FormDialogBase>
  );
}
