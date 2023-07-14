import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useForm } from "react-hook-form";

// FormDialogProps interface is defining the shape of props the component expects
interface FormDialogProps {
  title: string;
  contentText: string;
  children: (register: any, errors: any, trigger: any) => React.ReactNode;
  onSubmit: (data: any) => Promise<void>;
  icon?: React.ReactNode;
  initialData?: any;
}

// FormDialogBase is a reusable component that generates a dialog containing a form
export function FormDialogBase({
  title,
  contentText,
  children,
  onSubmit,
  icon,
  initialData,
}: FormDialogProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm();

  const handleClickOpen = () => {
    if (initialData) {
      reset(initialData);
    }
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const submitForm = async (data: any) => {
    try {
      await onSubmit(data);
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {icon ? (
        <IconButton onClick={handleClickOpen}>{icon}</IconButton>
      ) : (
        <Fab variant="extended" size="medium" onClick={handleClickOpen}>
          <AddIcon sx={{ mr: 1 }} />
          {title}
        </Fab>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
          <form onSubmit={handleSubmit(submitForm)}>
            {children(register, errors, trigger)}
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
