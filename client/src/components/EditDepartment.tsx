import * as React from "react";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { fetchUpdateDepartment } from "../utils/fetchData";
import { RootState, store } from "../redux/Store";
import { updateDepartmentAction } from "../redux/DepartmentReducer";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { FormDialogBase } from "./FormDialogBase";

interface EditDepartmentFormDialogProps {
  departmentId: string;
}

const EditDepartment: React.FC<EditDepartmentFormDialogProps> = ({
  departmentId,
}) => {
  const departments = useSelector(
    (state: RootState) => state.departments.departments
  );
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );
  const departmentToEdit = departments.find(
    (dep: any) => dep._id === departmentId
  );

  // onSubmit function to update the department in backend and dispatch change to redux
  const onSubmit = async (data: any) => {
    const response = await fetchUpdateDepartment(
      data._id,
      data.name,
      data.manager
    );
    store.dispatch(updateDepartmentAction(response));
  };

  return (
    <FormDialogBase
      title="Edit Department"
      contentText="To edit the department, change the desired fields."
      onSubmit={onSubmit}
      icon={<EditIcon color="secondary" />}
      initialData={{
        _id: departmentToEdit?._id ?? "",
        name: departmentToEdit?.name ?? "",
      }}
    >
      {(register, errors, trigger) => (
        <>
          <TextField
            {...register("name", { required: true })}
            defaultValue={departmentToEdit?.name ?? ""} // set the default value
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
          <TextField
            sx={{ mt: 2 }}
            {...register("manager", { required: true })}
            id="manager"
            defaultValue={departmentToEdit?.manager ?? ""} // set the default value
            select
            label="manager"
            fullWidth
            onChange={async (e) => {
              await register("manager").onChange(e); // update the form state
              trigger("manager"); // manually trigger validation
            }}
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
};

export default EditDepartment;
