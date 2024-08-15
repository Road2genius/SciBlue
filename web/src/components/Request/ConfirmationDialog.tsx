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
        Thank you for posting!
      </DialogTitle>
      <DialogContent sx={{ marginLeft: "30px", marginY: "20px" }}>
        <DialogContentText>
          <Box display="flex" my={2}>
            <DoneRoundedIcon sx={{ color: "#197278", marginRight: "2px" }} />{" "}
            You will receive an e-mail if someone posts an answer.
          </Box>
        </DialogContentText>
        <DialogContentText>
          <Box display="flex" my={1}>
            <DoneRoundedIcon sx={{ color: "#197278", marginRight: "2px" }} />{" "}
            You can edit, close, or delete your {entity} at any time.
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
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
