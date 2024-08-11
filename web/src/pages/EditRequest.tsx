import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, Container, Typography } from "@mui/material";
import useRequestForm from "../hooks/useRequestForm";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import ProjectDetails from "../components/Request/ProjectDetails";
import CollaborationDetails from "../components/Request/CollaborationDetails";
import SpecificsDetails from "../components/Request/SpecificsDetail";
import { RequestResInterface } from "../../../shared-types/requestData";
import { getRequestByIdAction } from "../actions/request/request";
import { initialResponseState } from "../types/formData.type";

const EditRequest: React.FC = () => {
  const { id } = useParams();
  const [inputAutoComplete, setInputAutoComplete] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const classes = useStyles();
  const [requestDetailsEdit, setRequestDetailsEdit] =
    useState<RequestResInterface>(initialResponseState);
  const {
    request,
    handleUpdateRequest,
    handleNestedChange,
    handleNestedChip,
    handleDoubleNestedChip,
    handleDoubleNestedChange,
  } = useRequestForm({
    onSuccessUpdateRequest: () =>
      enqueueSnackbar("Request edited successful", { variant: "success" }),
    onErrorUpdateRequest: () =>
      enqueueSnackbar("Failed to edit the request", { variant: "error" }),
    initialRequest: requestDetailsEdit,
  });

  const handleDateChange = (index: number, newDate: Date | null) => {
    const updatedDates = [...request.project.projectStartEndEstimation];
    if (newDate) {
      updatedDates[index] = newDate;
    }
    handleNestedChange("project", "projectStartEndEstimation", updatedDates);
  };

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        if (id) {
          const response = await getRequestByIdAction(id);
          setRequestDetailsEdit(response);
        }
      } catch (error) {
        console.error("Failed to fetch request details", error);
      }
    };

    fetchRequestDetails();
  }, [id]);

  const handleEditRequest = () => {
    const requestToUpdate: RequestResInterface = {
      ...request,
      _id: requestDetailsEdit._id,
    };
    handleUpdateRequest(requestDetailsEdit._id, requestToUpdate);
    navigate(`/request/details/${requestDetailsEdit._id}`);
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
            Edit a collaboration request
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
          <Box display="flex" justifyContent="flex-end">
            <Button
              sx={{
                textTransform: "none",
                color: "#008080",
                fontWeight: 700,
                textDecoration: "underline",
                marginRight: "25px",
                "&:hover": {
                  background: "none",
                },
              }}
              onClick={() =>
                navigate(`/request/details/${requestDetailsEdit._id}`)
              }
            >
              Go back
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
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
              onClick={() => handleEditRequest()}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </Container>
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

export default EditRequest;
