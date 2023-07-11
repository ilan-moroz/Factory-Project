import * as React from "react";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { fetchUpdateDepartment } from "../utils/fetchData";
import { store } from "../redux/Store";
import { updateDepartmentAction } from "../redux/DepartmentReducer";
import EditIcon from "@mui/icons-material/Edit";
import { FormDialogBase } from "./FormDialogBase";
import { useEditDepartment } from "../hooks/useEditDepartment";
import { decreaseActionNumberAction } from "../redux/UserReducer";

//  what data we need from the main component
interface EditDepartmentFormDialogProps {
  departmentId: string;
}

const EditDepartment: React.FC<EditDepartmentFormDialogProps> = ({
  departmentId,
}) => {
  const { employees, departmentToEdit, manager, handleManagerChange } =
    useEditDepartment(departmentId);

  // onSubmit function to update the department in backend and dispatch change to redux
  const onSubmit = async (data: any) => {
    const response = await fetchUpdateDepartment(
      data._id,
      data.name,
      data.manager
    );
    if (response) {
      store.dispatch(updateDepartmentAction(response));
      store.dispatch(decreaseActionNumberAction());
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
};

export default EditDepartment;
