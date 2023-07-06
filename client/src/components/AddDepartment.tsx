import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { fetchAddDepartment } from "../utils/fetchData";
import { RootState, store } from "../redux/Store";
import { addDepartmentAction } from "../redux/DepartmentReducer";
import { useSelector } from "react-redux";
import { FormDialogBase } from "./FormDialogBase";

export default function AddDepartment() {
  const onSubmit = async (data: any) => {
    const response = await fetchAddDepartment(data.name, data.manager);
    store.dispatch(addDepartmentAction(response));
  };

  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );

  return (
    <FormDialogBase
      title="Add Department"
      contentText="To add a new department, please enter the department name here and choose the manager."
      onSubmit={onSubmit}
    >
      {(register, errors) => (
        <>
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
          >
            {employees.map((option: any) => (
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
