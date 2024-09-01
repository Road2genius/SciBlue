import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import { useUserContext } from "../context/UserContext";
import CustomTextField from "../components/CustomTextField/CustomTextField";
import OrganizationChips from "../components/OrganizationChips/OrganizationChips";
import { TypeOfOrganization } from "../../../shared-types/user";
import { useSendFeedback } from "../hooks/useFeedback";
import { FeedbackForm } from "../../../shared-types/feedback";
import { useSnackbar } from "notistack";

const Feedback: React.FC = () => {
  const classes = useStyles();
  const { userContext } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();
  const [userFeedback, setUserFeedback] = useState<FeedbackForm>({
    message: "",
    organizationAffiliated: "" as TypeOfOrganization,
  });
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

  const textfields = [
    {
      label: "First name",
      placeholder: "Enter first name",
      type: "text",
      value: userFeedback.firstname,
      textfield: "firstname",
    },
    {
      label: "Last name",
      placeholder: "Enter last name",
      type: "text",
      value: userFeedback.lastname,
      textfield: "lastname",
    },
    {
      label: "Mail address",
      placeholder: "Enter mail address",
      type: "email",
      value: userFeedback.email,
      textfield: "email",
    },
  ];

  const { submitSendFeedback } = useSendFeedback({
    onSuccessSendFeedback: () => setFeedbackSent(true),
    onErrorSendFeedback: (errorMessage: string) =>
      enqueueSnackbar(errorMessage, { variant: "error" }),
  });

  const handleSubmitFeedback = async () => {
    let userFeedbackWithUserIdIfAny: FeedbackForm = userFeedback;
    if (userContext?.userId) {
      userFeedbackWithUserIdIfAny = {
        ...userFeedback,
        userId: userContext.userId,
      };
    }
    await submitSendFeedback(userFeedbackWithUserIdIfAny);
    enqueueSnackbar("Feedback email sent, Thanks!", {
      variant: "success",
    });
  };

  return (
    <>
      <Container maxWidth="lg">
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
          <Typography
            variant="h4"
            fontWeight={700}
            color="#197278"
            sx={{ marginBottom: "20px" }}
          >
            Contact us or share all your comments and wishes that we
            <br /> should implement to SciBlue
          </Typography>
          <Box my={2}>
            {!userContext && (
              <>
                {textfields.map((field, index) => (
                  <React.Fragment key={index}>
                    <CustomTextField
                      key={index}
                      label={field.label}
                      placeholder={field.placeholder}
                      type={field.type}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        setUserFeedback({
                          ...userFeedback,
                          [field.textfield]: e.target.value,
                        })
                      }
                      short
                    />
                  </React.Fragment>
                ))}
                <Box my={2} mb={4}>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    sx={{ marginBottom: "5px" }}
                  >
                    What type of structure are you affiliated with?
                  </Typography>
                  <OrganizationChips
                    selectedOrganizations={userFeedback.organizationAffiliated}
                    handleChange={(label) =>
                      setUserFeedback({
                        ...userFeedback,
                        organizationAffiliated: label,
                      })
                    }
                  />
                </Box>
              </>
            )}
            <Box my={2}>
              <CustomTextField
                label="We need your feedback to improve SciBlue"
                placeholder="What could we do for you :) ?"
                type="text"
                value={userFeedback.message}
                onChange={(e) =>
                  setUserFeedback({
                    ...userFeedback,
                    message: e.target.value,
                  })
                }
                multiline
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" mr={-1}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitFeedback}
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
            >
              Send feedback
            </Button>
          </Box>
        </Box>
      </Container>
      <Dialog
        open={feedbackSent}
        onClose={() => setFeedbackSent(false)}
        PaperComponent={(props) => (
          <Paper
            {...props}
            elevation={24}
            sx={{ padding: "30px", borderRadius: "8px" }}
          />
        )}
      >
        <DialogTitle sx={{ fontWeight: "700", color: "#197278" }}>
          Thanks you!
        </DialogTitle>
        <DialogContent sx={{ marginLeft: "30px", marginY: "5px" }}>
          <Typography variant="body2" fontWeight={700}>
            Your feedback has been sent.
          </Typography>
          <Box display="flex" my={2}>
            <Typography variant="body2">
              Sciblue team will examinate your feedback and we let you know if
              we need more precisions.
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
            }}
            onClick={() => setFeedbackSent(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Feedback;

const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
});
