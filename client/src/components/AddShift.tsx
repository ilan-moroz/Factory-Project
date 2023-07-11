import * as React from "react";
import TextField from "@mui/material/TextField";
import {
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { fetchAddShift } from "../utils/fetchData";
import { addShiftAction } from "../redux/ShiftReducer";
import { store } from "../redux/Store";
import { FormDialogBase } from "./FormDialogBase";
import { useEmployeeIdToName } from "../hooks/useEmployeeIdToName";
import { addShiftToEmployeeAction } from "../redux/EmployeeReducer";
import { decreaseActionNumberAction } from "../redux/UserReducer";

export default function AddShift() {
  // onSubmit function to add the shift to backend and dispatch to redux
  const onSubmit = async (data: any) => {
    // transform the date string to date object
    const formData = {
      ...data,
      date: new Date(data.date),
    };
    const response = await fetchAddShift(formData);
    if (response) {
      store.dispatch(addShiftAction(response));
      store.dispatch(
        addShiftToEmployeeAction(response.employeeIds[0], response._id)
      );
      store.dispatch(decreaseActionNumberAction());
    }
  };

  // useEmployeeIdToName hook manages employee selection and ID-name mapping for the form.
  const { employeeIds, employeeNameMap, handleChange, employees } =
    useEmployeeIdToName();

  return (
    <FormDialogBase
      title="Add Shift"
      contentText="To add a new Shift, please fill up all the fields."
      onSubmit={onSubmit}
    >
      {(register, errors, trigger) => (
        <>
          {/* date of shift input */}
          <InputLabel
            htmlFor="date"
            sx={{ display: "flex", justifyContent: "start", mt: 2 }}
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
          {/* start time of shift input */}
          <InputLabel
            htmlFor="startTime"
            sx={{ display: "flex", justifyContent: "start", mt: 1 }}
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
          {/* end time of shift input */}
          <InputLabel
            htmlFor="endTime"
            sx={{ display: "flex", justifyContent: "start", mt: 1 }}
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
          {/* select employees for shift input */}
          <InputLabel
            htmlFor="employeesNames"
            sx={{ display: "flex", justifyContent: "start", mt: 1 }}
          >
            Choose Employees
          </InputLabel>
          <Select
            {...register("employeeIds", { required: true })}
            id="employeesNames"
            multiple
            value={employeeIds}
            onChange={async (e: React.ChangeEvent<any>) => {
              handleChange(e);
              await register("employeeIds").onChange(e); // update the form state
              trigger("employeeIds"); // manually trigger validation
            }}
            input={<OutlinedInput />}
            fullWidth
            error={errors.employeeIds ? true : false}
            renderValue={(selected: string[]) =>
              // Instead of showing ids, it shows corresponding employee names.
              selected.map((value: string) => employeeNameMap[value]).join(", ")
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
          {errors.employeeIds && (
            <Typography
              variant="body2"
              color="error"
              sx={{ display: "flex", justifyContent: "start", fontSize: 12 }}
            >
              Choose at least one employee
            </Typography>
          )}
        </>
      )}
    </FormDialogBase>
  );
}
