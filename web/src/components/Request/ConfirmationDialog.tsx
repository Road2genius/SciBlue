import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Box,
} from "@mui/material";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { Trans, useTranslation } from "react-i18next";

interface ConfirmationDialogProps {
  entity: string;
  openDialog: boolean;
  handleCloseDialog: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  entity,
  openDialog,
  handleCloseDialog,
}) => {
  useTranslation();
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      PaperComponent={(props) => (
        <Paper
          {...props}
          elevation={24}
          sx={{ padding: "30px", borderRadius: "8px" }}
        />
      )}
    >
      <DialogTitle sx={{ fontWeight: "700", color: "#197278" }}>
        <Trans i18nKey="create_request_confirmation_dialog_title" />
      </DialogTitle>
      <DialogContent sx={{ marginLeft: "30px", marginY: "20px" }}>
        <DialogContentText>
          <Box display="flex" my={2}>
            <DoneRoundedIcon sx={{ color: "#197278", marginRight: "2px" }} />{" "}
            <Trans i18nKey="create_request_confirmation_dialog_content" />
          </Box>
        </DialogContentText>
        <DialogContentText>
          <Box display="flex" my={1}>
            <DoneRoundedIcon sx={{ color: "#197278", marginRight: "2px" }} />{" "}
            <Trans i18nKey="create_request_confirmation_dialog_first_part_sub_content" />{" "}
            {entity}{" "}
            <Trans i18nKey="create_request_confirmation_dialog_second_part_sub_content" />
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "150px",
            borderRadius: "8px",
            textTransform: "none",
            height: "50px",
            fontWeight: 700,
            backgroundColor: "#008080",
            "&:hover": {
              backgroundColor: "#006666",
            },
            alignSelf: "flex-end",
            marginY: "5px",
          }}
          onClick={handleCloseDialog}
        >
          <Trans i18nKey="create_request_confirmation_dialog_close" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
