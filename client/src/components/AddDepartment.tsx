import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { RootState, store } from "../redux/Store";
import { addDepartmentAction } from "../redux/DepartmentReducer";
import { useSelector } from "react-redux";
import { FormDialogBase } from "./FormDialogBase";
import { decreaseActionNumberAction } from "../redux/UserReducer";
import { addDepartment } from "../api/departmentApi";
import { Employee } from "../models/Employee";

export default function AddDepartment() {
  //onSubmit function to be used when the form is submitted
  const onSubmit = async (data: { name: string; manager: string }) => {
    try {
      // Attempt to add the department to the database
      const response = await addDepartment(data.name, data.manager);
      if (response) {
        // If successful, dispatch the addDepartmentAction to update the redux store
        store.dispatch(addDepartmentAction(response));
        // Also dispatch the decreaseActionNumberAction to decrease the num of actions for the user
        store.dispatch(decreaseActionNumberAction());
      }
    } catch (err) {
      console.error(err);
    }
  };

  // state of the employees
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );

  return (
    <FormDialogBase
      title="Add Department"
      contentText="To add a new department, please fill up all the fields."
      onSubmit={onSubmit}
    >
      {(register, errors, trigger) => (
        <>
          {/* Department Name input */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Department Name"
            type="text"
            fullWidth
            variant="standard"
            {...register("name", { required: true })}
            error={Boolean(errors.name)}
            helperText={errors.name && "Department Name is required"}
          />
          {/* manager select */}
          <TextField
            sx={{ mt: 2 }}
            {...register("manager", { required: true })}
            id="manager"
            select
            label="manager"
            fullWidth
            defaultValue=""
            error={errors.manager ? true : false}
            helperText={errors.manager && "Manager is required"}
            onChange={async (e) => {
              await register("manager").onChange(e); // update the form state
              trigger("manager"); // manually trigger validation
            }}
          >
            {/* map all the employees */}
            {employees.map((option: Employee) => (
              <MenuItem key={option._id} value={option._id}>
                {option.firstName} {option.lastName}
              </MenuItem>
            ))}
          </TextField>
        </>
      )}
    </FormDialogBase>
  );
}
