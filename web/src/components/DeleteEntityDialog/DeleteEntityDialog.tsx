import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Paper,
} from "@mui/material";

interface DeleteEntityDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  entityType: "request" | "question" | "user profile"
}

const DeleteEntityDialog: React.FC<DeleteEntityDialogProps> = ({
  open,
  onClose,
  onConfirm,
  entityType,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperComponent={(props) => (
        <Paper
          {...props}
          elevation={24}
          sx={{ padding: "30px", borderRadius: "8px" }}
        />
      )}
    >
      <DialogTitle sx={{ fontWeight: "700", color: "#197278" }}>
        Delete your {entityType} ?
      </DialogTitle>
      <DialogContent sx={{ marginY: "20px" }}>
        <DialogContentText>
          Are you sure you want to <b>delete</b> your {entityType}?
        </DialogContentText>
        <DialogContentText>
          All associated comments will be <b>deleted</b> too.
        </DialogContentText>
        <DialogContentText>
          This action is <b>permanent.</b>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 700,
            backgroundColor: "#008080",
            "&:hover": {
              backgroundColor: "#006666",
            },
            marginY: "5px",
          }}
          onClick={onConfirm}
        >
          Delete {entityType}
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 700,
            backgroundColor: "#008080",
            "&:hover": {
              backgroundColor: "#006666",
            },
            marginY: "5px",
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteEntityDialog;
