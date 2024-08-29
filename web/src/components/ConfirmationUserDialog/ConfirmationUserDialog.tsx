import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { Trans, useTranslation } from "react-i18next";

interface ConfirmationDialogProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
}

const ConfirmationUserDialog: React.FC<ConfirmationDialogProps> = ({
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
        <Trans i18nKey="confirmation_dialog_sign_up_title"/>
      </DialogTitle>
      <DialogContent sx={{ marginLeft: "30px", marginY: "20px" }}>
        <Typography variant="body2" fontWeight={700}>
          <Trans i18nKey="confirmation_dialog_sign_up_subtitle"/>
        </Typography>
        <Box display="flex" my={2}>
          <DoneRoundedIcon sx={{ color: "#197278", marginRight: "2px" }} />
          <Typography variant="body2">
            <Trans i18nKey="confirmation_dialog_sign_up_content_one"/>
          </Typography>
        </Box>
        <Box display="flex" my={2}>
          <DoneRoundedIcon sx={{ color: "#197278", marginRight: "2px" }} />
          <Typography variant="body2">
            <Trans i18nKey="confirmation_dialog_sign_up_content_two"/>
          </Typography>
        </Box>
        <Box display="flex" my={2}>
          <DoneRoundedIcon sx={{ color: "#197278", marginRight: "2px" }} />
          <Typography variant="body2">
            <Trans i18nKey="confirmation_dialog_sign_up_content_tree"/>
          </Typography>
        </Box>
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
          <Trans i18nKey="confirmation_dialog_sign_up_close_button"/>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationUserDialog;
