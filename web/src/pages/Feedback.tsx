import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, Container, Typography } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import CustomTextField from "../components/CustomTextField/CustomTextField";
import OrganizationChips from "../components/OrganizationChips/OrganizationChips";
import { TypeOfOrganization } from "../../../shared-types/user";
import { Trans, useTranslation } from "react-i18next";

interface Feedback {
  firstname?: string;
  lastname?: string;
  email?: string;
  organizationAffiliated: TypeOfOrganization;
  message: string;
}

const Feedback: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { userContext } = useUserContext();
  const [userFeedback, setUserFeedback] = useState<Feedback>({
    message: "",
    organizationAffiliated: "" as TypeOfOrganization,
  });
  const textfields = [
    {
      label: "feedback_page_firstname",
      placeholder: "feedback_page_firstname_placeholder",
      type: "text",
      value: userFeedback.firstname,
      textfield: "firstname",
    },
    {
      label: "feedback_page_lastname",
      placeholder: "feedback_page_lastname_placeholder",
      type: "text",
      value: userFeedback.lastname,
      textfield: "lastname",
    },
    {
      label: "feedback_page_mail",
      placeholder: "feedback_page_mail_placeholder",
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
        <Typography variant="h4" fontWeight={700} color="#197278" sx={{ marginBottom: "20px" }}>
          <Trans i18nKey="feedback_page_title" />
        </Typography>
        <Box my={2}>
          {!userContext && (
            <>
              {textfields.map((field, index) => (
                <React.Fragment key={index}>
                  <CustomTextField
                    key={index}
                    label={t(field.label)}
                    placeholder={t(field.placeholder)}
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
                <Typography variant="subtitle2" fontWeight={600} sx={{ marginBottom: "5px" }}>
                  <Trans i18nKey="feedback_page_orga_affiliated" />
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
              label={t("feedback_page_label_textfield")}
              placeholder={t("feedback_page_label_textfield_placeholder")}
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
            <Trans i18nKey="feedback_page_submit" />
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
