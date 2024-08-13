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

interface ConfirmationDialogProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
}

const ConfirmationUserDialog: React.FC<ConfirmationDialogProps> = ({
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
        Thank you for registering !
      </DialogTitle>
      <DialogContent sx={{ marginLeft: "30px", marginY: "20px" }}>
        <Typography variant="body2" fontWeight={700}>
          Protecting our members is our priority
        </Typography>
        <Box display="flex" my={2}>
          <DoneRoundedIcon sx={{ color: "#197278", marginRight: "2px" }} />
          <Typography variant="body2">
            Your profile will be reviewed within a few working hours
          </Typography>
        </Box>
        <Box display="flex" my={2}>
          <DoneRoundedIcon sx={{ color: "#197278", marginRight: "2px" }} />
          <Typography variant="body2">
            Should we need any further information to confirm your identity, we
            will contact you via email
          </Typography>
        </Box>
        <Box display="flex" my={2}>
          <DoneRoundedIcon sx={{ color: "#197278", marginRight: "2px" }} />
          <Typography variant="body2">
            SciBlue wants to ensure the reliability of its members and protect
            the action of those who choose to fight against environmental
            crisis. We will remove access to any fake profil or any member who
            do not meet with the purpose of these plateform
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
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationUserDialog;
