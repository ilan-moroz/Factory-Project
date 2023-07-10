import * as React from "react";
import TextField from "@mui/material/TextField";
import { Checkbox, ListItemText, MenuItem } from "@mui/material";
import { fetchUpdateEmployee } from "../utils/fetchData";
import EditIcon from "@mui/icons-material/Edit";
import { FormDialogBase } from "./FormDialogBase";
import { useEditEmployee } from "../hooks/useEditEmployee";
import { store } from "../redux/Store";
import { updateEmployeeAction } from "../redux/EmployeeReducer";
import { rearrangeDate } from "../utils/rearrangeDate";
import { removeEmployeeFromShiftAction } from "../redux/ShiftReducer";

//  what data we need from the main component
interface EditEmployeeProps {
  employeeId: string;
}

const EditEmployee: React.FC<EditEmployeeProps> = ({ employeeId }) => {
  const {
    employeeToEdit,
    department,
    handleDepartmentChange,
    departments,
    shift,
    shifts,
    shiftsMap,
    handleShiftChange,
  } = useEditEmployee(employeeId);

  // onSubmit function to update the employee in backend and dispatch change to redux
  const onSubmit = async (data: any) => {
    const response = await fetchUpdateEmployee(
      data._id,
      data.firstName,
      data.lastName,
      data.startWorkYear,
      data.departmentId,
      data.shiftIds
    );
    if (response) {
      store.dispatch(updateEmployeeAction(response));
      // Get the shift IDs that were removed
      const removedShifts = shifts.filter(
        (shift) => !data.shiftIds.includes(shift._id)
      );
      removedShifts.forEach((shift) => {
        store.dispatch(removeEmployeeFromShiftAction(data._id, shift._id));
      });
    }
  };

  return (
    <FormDialogBase
      title="Edit Employee"
      contentText="To edit an employee, change the desired fields."
      onSubmit={onSubmit}
      icon={<EditIcon color="secondary" />}
      // initialize the inputs
      initialData={{
        _id: employeeToEdit?._id ?? "",
        firstName: employeeToEdit?.firstName ?? "",
        lastName: employeeToEdit?.lastName ?? "",
        startWorkYear: employeeToEdit?.startWorkYear ?? "",
      }}
    >
      {(register, errors) => (
        <>
          {/* first name input */}
          <TextField
            {...register("firstName", { required: true })}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName && "First name is required"}
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="Text"
            fullWidth
            variant="standard"
          />
          {/* last name input */}
          <TextField
            {...register("lastName", { required: true })}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName && "Last name is required"}
            autoFocus
            margin="dense"
            id="lastName"
            label="Last Name"
            type="Text"
            fullWidth
            variant="standard"
          />
          {/* "Start Year of Employment input */}
          <TextField
            {...register("startWorkYear", { required: true })}
            error={Boolean(errors.startWorkYear)}
            helperText={
              errors.startWorkYear && "Start Year of Employment is required"
            }
            autoFocus
            margin="dense"
            id="startWorkYear"
            label="Start Year of Employment"
            type="number"
            fullWidth
            variant="standard"
          />
          {/* department select */}
          <TextField
            sx={{ mt: 2 }}
            {...register("departmentId", { required: true })}
            id="department"
            select
            label="Department"
            fullWidth
            value={department}
            onChange={handleDepartmentChange}
          >
            {departments.map((option: any) => (
              <MenuItem key={option._id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          {/* shift select */}
          <TextField
            sx={{ mt: 2 }}
            {...register("shiftIds")}
            id="shifts"
            select
            label="Shifts"
            fullWidth
            value={shift}
            SelectProps={{
              multiple: true,
              renderValue: (selected: any) =>
                selected
                  .map((shiftId: string) => {
                    const shiftInfo = shiftsMap.get(shiftId);
                    return `${rearrangeDate(shiftInfo!.date)} - ${
                      shiftInfo!.startTime
                    }:${shiftInfo!.endTime}`;
                  })
                  .join(", "),
            }}
            onChange={handleShiftChange}
          >
            {shifts.map((option: any) => (
              <MenuItem key={option._id} value={option._id}>
                <Checkbox checked={shift.indexOf(option._id) > -1} />
                <ListItemText
                  primary={`${rearrangeDate(option.date)} - ${
                    option.startTime
                  }:${option.endTime}`}
                />
              </MenuItem>
            ))}
          </TextField>
        </>
      )}
    </FormDialogBase>
  );
};

export default EditEmployee;
