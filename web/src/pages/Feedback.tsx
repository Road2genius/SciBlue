import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, Container, Typography } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import CustomTextField from "../components/CustomTextField/CustomTextField";
import OrganizationChips from "../components/OrganizationChips/OrganizationChips";
import { TypeOfOrganization } from "../../../shared-types/user";

interface Feedback {
  firstname?: string;
  lastname?: string;
  email?: string;
  organizationAffiliated: TypeOfOrganization;
  message: string;
}

const Feedback: React.FC = () => {
  const classes = useStyles();
  const { userContext } = useUserContext();
  const [userFeedback, setUserFeedback] = useState<Feedback>({
    message: "",
    organizationAffiliated: "" as TypeOfOrganization,
  });
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

  return (
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
