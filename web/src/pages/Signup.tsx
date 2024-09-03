import React, { useState } from "react";
import { Avatar, Box, Button, Checkbox, Container, Divider, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getTextFieldsConfig } from "../components/CustomTextField/getTextFieldsConfig";
import useSignupForm from "../hooks/useSignupForm";
import OrganizationChips from "../components/OrganizationChips/OrganizationChips";
import PrivacyLevel from "../components/PrivacyLevel/PrivacyLevel";
import LoginInformation from "../components/LoginInformation/LoginInformation";
import ConditionalTextFields from "../components/ConditionalTextFields/ConditionalTextFields";
import ResearchActivity from "../components/ResearchActivity/ResearchActivity";
import ProfessionalActivity from "../components/ProfessionalActivity/ProfessionalActiviy";
import InterestSelector from "../components/InterestSelection/InterestSelection";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import ConfirmationUserDialog from "../components/ConfirmationUserDialog/ConfirmationUserDialog";
import { Trans, useTranslation } from "react-i18next";

const Signup: React.FC = () => {
  const classes = useStyles();
  useTranslation();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [termsOfService, setTermsOfService] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    user,
    getAvatarByOrganization,
    handleChangeChip,
    organizationIsResearcher,
    handleChange,
    handleChangeLanguage,
    handleNestedChip,
    handleNestedChange,
    handleDeleteChipLanguage,
    handleDeleteChipCountry,
    handleDeleteChipDiscipline,
    handleDoubleNestedChip,
    handleDoubleNestedChange,
    handleValidate,
  } = useSignupForm({
    onSuccessSignIn: () => setOpenDialog(true),
  });

  const handleCloseDialog = () => {
    setOpenDialog(false);
    enqueueSnackbar("User account created successful", { variant: "success" });
    navigate("/login");
  };
  const textFields = getTextFieldsConfig(user);

  return (
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
        <Typography variant="h4" fontWeight={700} color="#197278">
          <Trans i18nKey="signup_title" />
        </Typography>
        <Typography variant="body2" mb={4} color="grey">
          <Trans i18nKey="signup_information" />
        </Typography>
        <Grid container>
          <Grid item xs={12} md={11}>
            <Typography variant="h5" fontWeight={600} my={2}>
              <Trans i18nKey="signup_organization_affiliated_subtitle" />
            </Typography>
            <OrganizationChips
              selectedOrganizations={user.organizationAffiliated}
              handleChange={(label) => handleChangeChip("organizationAffiliated", label)}
            />
            <Box mt={8} mb={5} ml={8}>
              <Divider
                variant="fullWidth"
                sx={{
                  borderBottomWidth: 1.5,
                  minWidth: {
                    xs: "100%",
                    sm: "100%",
                    md: "100%",
                    lg: "100%",
                    xl: "1250px",
                  },
                }}
              />
            </Box>
            {organizationIsResearcher(user.organizationAffiliated) && (
              <PrivacyLevel
                privacyMode={user.privacyLevel.mode}
                username={user.privacyLevel.username}
                handlePrivacyModeChange={(checked) => handleNestedChange("privacyLevel", "mode", checked)}
                handleUsernameChange={(username) => handleNestedChange("privacyLevel", "username", username)}
              />
            )}
            <LoginInformation textFields={textFields} handleChange={handleChange} user={user} />
            <ConditionalTextFields
              user={user}
              handleChange={handleChange}
              handleChangeChip={handleChangeChip}
              handleChangeLanguage={handleChangeLanguage}
              handleDeleteChipLanguage={handleDeleteChipLanguage}
              handleDeleteChipCountry={handleDeleteChipCountry}
              organizationIsResearcher={organizationIsResearcher(user.organizationAffiliated)}
            />
            {organizationIsResearcher(user.organizationAffiliated) ? (
              <ResearchActivity
                user={user}
                handleNestedChange={handleNestedChange}
                handleDeleteChipDiscipline={handleDeleteChipDiscipline}
                handleDoubleNestedChip={handleDoubleNestedChip}
                handleDoubleNestedChange={handleDoubleNestedChange}
              />
            ) : (
              <ProfessionalActivity
                user={user}
                handleChange={handleChange}
                handleNestedChange={handleNestedChange}
                handleDoubleNestedChip={handleDoubleNestedChip}
                handleDeleteChipDiscipline={handleDeleteChipDiscipline}
                handleDoubleNestedChange={handleDoubleNestedChange}
              />
            )}
            <InterestSelector user={user} handleNestedChip={handleNestedChip} />
          </Grid>
          <Grid item xs={12} md={1} justifyContent="center" sx={{ display: "flex" }}>
            <Avatar
              variant="square"
              src={getAvatarByOrganization(user.organizationAffiliated)}
              sx={{ width: 146, height: 146, borderRadius: "5px" }}
            />
          </Grid>
        </Grid>
        <ConfirmationUserDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog} />
        {user.organizationAffiliated && (
          <>
            <Box display="flex" alignItems="center" justifyContent="flex-end" mr={-1}>
              <Typography variant="body2">
                <Trans i18nKey="terms_of_service_message" components={{ 1: <u style={{ fontWeight: "bold" }} /> }} />
              </Typography>
              <Checkbox
                onChange={(e) => setTermsOfService(e.target.checked)}
                sx={{
                  color: "#008080",
                  "&.Mui-checked": {
                    color: "#008080",
                  },
                }}
              />
            </Box>
            <Box display="flex" justifyContent="flex-end" mr={-1}>
              <Button
                disabled={!termsOfService}
                variant="contained"
                color="primary"
                sx={{
                  width: "140px",
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
                onClick={() => handleValidate()}
              >
                <Trans i18nKey="signup_validate_button" />
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Signup;

const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
  chipContainer: {
    maxWidth: "900px",
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "5px",
    alignItems: "center",
  },
  chip: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid black",
  },
  selectedChip: {
    backgroundColor: "#C8E6C9",
  },
});
