import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { RootState, store } from "../redux/Store";
import { useSelector } from "react-redux";
import { fetchAddShiftToEmployee } from "../utils/fetchData";
import { FormDialogBase } from "./FormDialogBase";
import { rearrangeDate } from "../utils/rearrangeDate";
import { addEmployeeToShiftAction } from "../redux/ShiftReducer";
import { addShiftToEmployeeAction } from "../redux/EmployeeReducer";

type shiftProps = {
  employeeId: string;
};

export default function ShiftEmployeeFormDialog(props: shiftProps) {
  const shifts = useSelector((state: RootState) => state.shifts.allShifts);

  const onSubmit = async (data: any) => {
    const { employeeId } = props;
    console.log(data);
    await fetchAddShiftToEmployee(data.shift, employeeId);
    store.dispatch(addEmployeeToShiftAction(employeeId, data.shift));
    store.dispatch(addShiftToEmployeeAction(employeeId, data.shift));
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
            {shifts.map((option: any) => (
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
