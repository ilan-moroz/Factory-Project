import * as React from "react";
import TextField from "@mui/material/TextField";
import { Checkbox, ListItemText, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { FormDialogBase } from "./FormDialogBase";
import { useEditEmployee } from "../hooks/useEditEmployee";
import { store } from "../redux/Store";
import { updateEmployeeAction } from "../redux/EmployeeReducer";
import { rearrangeDate } from "../utils/rearrangeDate";
import { decreaseActionNumberAction } from "../redux/UserReducer";
import { updateEmployee } from "../api/employeeApi";
import { Department } from "../models/Department";
import { Shift } from "../models/Shifts";
import { Employee } from "../models/Employee";
import { handleShiftsChange } from "../utils/handleShiftsChange";

// Props required by the EditEmployee component
interface EditEmployeeProps {
  employeeId: string;
}

const EditEmployee = (props: EditEmployeeProps) => {
  // Using custom hook to provide needed data and handlers
  const {
    employeeToEdit,
    department,
    handleDepartmentChange,
    departments,
    shiftsArray,
    shifts,
    shiftsMap,
    handleShiftChange,
    initialShiftsArray,
  } = useEditEmployee(props.employeeId);

  //onSubmit function to be used when the form is submitted
  const onSubmit = async (data: Employee) => {
    try {
      // Attempt to Update the employee in the database
      const response = await updateEmployee(data._id, {
        firstName: data.firstName,
        lastName: data.lastName,
        startWorkYear: data.startWorkYear,
        departmentId: data.departmentId,
        shiftIds: data.shiftIds,
      });
      if (response) {
        // If successful, dispatch the response data to Redux store
        store.dispatch(updateEmployeeAction(response));
        store.dispatch(decreaseActionNumberAction());
        // handle shifts changes
        if (data.shiftIds) {
          handleShiftsChange(data, initialShiftsArray);
        }
      }
    } catch (err) {
      console.error(err);
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
            {departments.map((option: Department) => (
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
            value={shiftsArray}
            SelectProps={{
              multiple: true,
              renderValue: (selected: string[]) =>
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
            {shifts.map((option: Shift) => (
              <MenuItem key={option._id} value={option._id}>
                <Checkbox checked={shiftsArray.indexOf(option._id) > -1} />
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
