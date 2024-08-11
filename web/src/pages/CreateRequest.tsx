import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, Container, Typography } from "@mui/material";
import useRequestForm from "../hooks/useRequestForm";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import ProjectDetails from "../components/Request/ProjectDetails";
import CollaborationDetails from "../components/Request/CollaborationDetails";
import SpecificsDetails from "../components/Request/SpecificsDetail";
import ConfirmationDialog from "../components/Request/ConfirmationDialog";

const CreateRequest: React.FC = () => {
  const [inputAutoComplete, setInputAutoComplete] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const classes = useStyles();
  const {
    request,
    handleCreateRequest,
    handleNestedChange,
    handleNestedChip,
    handleDoubleNestedChip,
    handleDoubleNestedChange,
  } = useRequestForm({
    onSuccessCreateRequest: () => setOpenDialog(true),
    onErrorCreateRequest: () =>
      enqueueSnackbar("Failed to create a request", { variant: "error" }),
  });

  const handleCloseDialog = () => {
    setOpenDialog(false);
    enqueueSnackbar("Request created successful", { variant: "success" });
    navigate("/request/list");
  };

  const handleDateChange = (index: number, newDate: Date | null) => {
    const updatedDates = [...request.project.projectStartEndEstimation];
    if (newDate) {
      updatedDates[index] = newDate;
    }
    handleNestedChange("project", "projectStartEndEstimation", updatedDates);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box
          className={classes.root}
          sx={{
            minWidth: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "100%",
              xl: "1200px",
            },
          }}
        >
          <Typography variant="h4" fontWeight={700} color="#197278" mb={4}>
            Submit a collaboration request
          </Typography>
          <ProjectDetails
            request={request}
            handleNestedChange={handleNestedChange}
            handleDoubleNestedChip={handleDoubleNestedChip}
            handleDoubleNestedChange={handleDoubleNestedChange}
            handleNestedChip={handleNestedChip}
            handleDateChange={handleDateChange}
          />
          <CollaborationDetails
            request={request}
            handleNestedChange={handleNestedChange}
            handleNestedChip={handleNestedChip}
          />
          <SpecificsDetails
            request={request}
            inputAutoComplete={inputAutoComplete}
            setInputAutoComplete={setInputAutoComplete}
            handleNestedChange={handleNestedChange}
            handleNestedChip={handleNestedChip}
          />
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
              marginY: "20px",
            }}
            onClick={() => handleCreateRequest()}
          >
            Submit
          </Button>
        </Box>
      </Container>
      <ConfirmationDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
});

export default CreateRequest;
