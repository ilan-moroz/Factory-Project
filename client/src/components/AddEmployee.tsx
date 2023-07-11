import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, store } from "../redux/Store";
import { fetchAddEmployee } from "../utils/fetchData";
import { addEmployeeAction } from "../redux/EmployeeReducer";
import { FormDialogBase } from "./FormDialogBase";
import { decreaseActionNumberAction } from "../redux/UserReducer";

export default function AddEmployee() {
  // onSubmit function to add the employee to backend and dispatch to redux
  const onSubmit = async (data: any) => {
    const response = await fetchAddEmployee(data);
    if (response) {
      store.dispatch(addEmployeeAction(response));
      store.dispatch(decreaseActionNumberAction());
    }
  };

  // departments state
  const departments = useSelector(
    (state: RootState) => state.departments.departments
  );

  return (
    <FormDialogBase
      title="Add Employee"
      contentText="To add a new employee, please fill up all the fields."
      onSubmit={onSubmit}
    >
      {(register, errors, trigger) => (
        <>
          {/* first name input */}
          <TextField
            {...register("firstName", { required: true })}
            error={errors.firstName ? true : false}
            helperText={errors.firstName && "First Name is required"}
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
            error={errors.lastName ? true : false}
            helperText={errors.lastName && "Last Name is required"}
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
            error={errors.startWorkYear ? true : false}
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
            defaultValue=""
            error={errors.departmentId ? true : false}
            helperText={errors.departmentId && "Department is required"}
            onChange={async (e) => {
              await register("departmentId").onChange(e); // update the form state
              trigger("departmentId"); // manually trigger validation
            }}
          >
            {departments.map((option: any) => (
              <MenuItem key={option._id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </>
      )}
    </FormDialogBase>
  );
}
