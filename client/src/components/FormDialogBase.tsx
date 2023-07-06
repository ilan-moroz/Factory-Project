import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useForm } from "react-hook-form";

// This is a reusable form dialog component
interface FormDialogProps {
  title: string;
  contentText: string;
  children: (register: any, errors: any) => React.ReactNode;
  onSubmit: (data: any) => Promise<void>;
}

export function FormDialogBase({
  title,
  contentText,
  children,
  onSubmit,
}: FormDialogProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClickOpen = () => {
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
      <Fab variant="extended" size="medium" onClick={handleClickOpen}>
        <AddIcon sx={{ mr: 1 }} />
        {title}
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
          <form onSubmit={handleSubmit(submitForm)}>
            {children(register, errors)}
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
