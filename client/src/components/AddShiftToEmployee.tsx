import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { RootState } from "../redux/Store";
import { useSelector } from "react-redux";
import { fetchAddShiftToEmployee } from "../utils/fetchData";
import { FormDialogBase } from "./FormDialogBase";

type shiftProps = {
  employeeId: string;
};

export default function ShiftEmployeeFormDialog(props: shiftProps) {
  const shifts = useSelector((state: RootState) => state.shifts.allShifts);

  const onSubmit = async (data: any) => {
    const { employeeId } = props;
    const response = await fetchAddShiftToEmployee(data.shift, employeeId);
    console.log(response);
  };

  function formatDate(dateString: string) {
    const dateParts = dateString.split("T")[0].split("-");
    const rearrangedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    return rearrangedDate;
  }

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
                {formatDate(option.date)} : {option.startTime}-{option.endTime}
              </MenuItem>
            ))}
          </TextField>
        </>
      )}
    </FormDialogBase>
  );
}
