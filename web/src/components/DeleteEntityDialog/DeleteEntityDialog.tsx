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
import { Trans, useTranslation } from "react-i18next";

interface DeleteEntityDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  entityType: "request" | "question" | "user profile";
}

const DeleteEntityDialog: React.FC<DeleteEntityDialogProps> = ({
  open,
  onClose,
  onConfirm,
  entityType,
}) => {
  useTranslation();
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
        <Trans i18nKey="request_detail_dialog_delete_entity_title" />{" "}
        {entityType} ?
      </DialogTitle>
      <DialogContent sx={{ marginY: "20px" }}>
        <DialogContentText>
          <Trans
            i18nKey="request_detail_dialog_delete_entity_subtitle"
            components={{ 1: <b /> }}
          />{" "}
          {entityType}?
        </DialogContentText>
        <DialogContentText>
          <Trans
            i18nKey="request_detail_dialog_delete_entity_first_content"
            components={{ 1: <b /> }}
          />
        </DialogContentText>
        <DialogContentText>
          <Trans
            i18nKey="request_detail_dialog_delete_entity_second_content"
            components={{ 1: <b /> }}
          />
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
          <Trans i18nKey="request_detail_dialog_delete_entity_button_delete" />{" "}
          {entityType}
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
          <Trans i18nKey="request_detail_dialog_delete_entity_button_cancel" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteEntityDialog;
