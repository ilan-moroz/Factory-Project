import * as React from "react";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { store } from "../redux/Store";
import { updateDepartmentAction } from "../redux/DepartmentReducer";
import EditIcon from "@mui/icons-material/Edit";
import { FormDialogBase } from "./FormDialogBase";
import { useEditDepartment } from "../hooks/useEditDepartment";
import { decreaseActionNumberAction } from "../redux/UserReducer";
import { updateDepartment } from "../api/departmentApi";
import { Department } from "../models/Department";
import { Employee } from "../models/Employee";

// Props required by the EditDepartment component
interface EditDepartmentFormDialogProps {
  departmentId: string;
}

const EditDepartment = (props: EditDepartmentFormDialogProps) => {
  const { employees, departmentToEdit, manager, handleManagerChange } =
    useEditDepartment(props.departmentId);

  //onSubmit function to be used when the form is submitted
  const onSubmit = async (data: Department) => {
    try {
      // Attempt to edit the department in the database
      const response = await updateDepartment(
        data._id,
        data.name,
        data.manager
      );
      if (response) {
        // If successful, dispatch the response data to Redux store
        store.dispatch(updateDepartmentAction(response));
        // Also dispatch the decreaseActionNumberAction to decrease the num of actions for the user
        store.dispatch(decreaseActionNumberAction());
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormDialogBase
      title="Edit Department"
      contentText="To edit the department, change the desired fields."
      onSubmit={onSubmit}
      icon={<EditIcon color="secondary" />}
      // initialize the inputs
      initialData={{
        _id: departmentToEdit?._id ?? "",
        name: departmentToEdit?.name ?? "",
        manager: departmentToEdit?.manager ?? "",
      }}
    >
      {(register, errors) => (
        <>
          {/* department name input */}
          <TextField
            {...register("name", { required: true })}
            error={errors.name ? true : false}
            helperText={errors.name && "Department name is required"}
            autoFocus
            margin="dense"
            id="name"
            label="Department Name"
            type="Text"
            fullWidth
            variant="standard"
          />
          {/* manager name input */}
          <TextField
            sx={{ mt: 2 }}
            {...register("manager", { required: true })}
            id="manager"
            value={manager}
            onChange={handleManagerChange}
            select
            label="manager"
            fullWidth
          >
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
};

export default EditDepartment;
