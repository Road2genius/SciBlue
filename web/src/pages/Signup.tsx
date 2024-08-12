import React from "react";
import {
  Avatar,
  Box,
  // Button,
  Container,
  Divider,
  // Divider,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
// import CustomTextField from "../components/CustomTextField/CustomTextField";
import { getTextFieldsConfig } from "../components/CustomTextField/getTextFieldsConfig";
// import { getSkillsOrTechnicalProperties } from "../components/CustomTag/skillsOrTechnicalProperties";
import useSignupForm from "../hooks/useSignupForm";
// import CustomTextField from "../components/CustomTextField/CustomTextField";
import OrganizationChips from "../components/OrganizationChips/OrganizationChips";
import PrivacyLevel from "../components/PrivacyLevel/PrivacyLevel";
// import CustomTextField from "../components/CustomTextField/CustomTextField";
import LoginInformation from "../components/LoginInformation/LoginInformation";
import ConditionalTextFields from "../components/ConditionalTextFields/ConditionalTextFields";
// import CustomTagInput from "../components/CustomTag/CustomTag";

const Signup: React.FC = () => {
  const classes = useStyles();
  const {
    user,
    getAvatarByOrganization,
    handleChangeChip,
    organizationIsResearcher,
    handleChange,
    // handleNestedChip,
    handleNestedChange,
    // handleValidate,
  } = useSignupForm();
  const textFields = getTextFieldsConfig(user);
  // const skillsOrTechnicalProperties = getSkillsOrTechnicalProperties(user);
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
          Sign up
        </Typography>
        <Typography variant="body2" mb={4} color="grey">
          *Required information
        </Typography>
        <Grid container>
          <Grid item xs={12} md={9}>
            <Typography variant="h5" fontWeight={600} my={2}>
              Type of organization you are affiliated with*
            </Typography>
            <OrganizationChips
              selectedOrganizations={user.organizationAffiliated}
              handleChange={(label) =>
                handleChangeChip("organizationAffiliated", label)
              }
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
                handlePrivacyModeChange={(checked) =>
                  handleNestedChange("privacyLevel", "mode", checked)
                }
                handleUsernameChange={(username) =>
                  handleNestedChange("privacyLevel", "username", username)
                }
              />
            )}
            <LoginInformation
              textFields={textFields}
              handleChange={handleChange}
              user={user}
            />
            <ConditionalTextFields
              user={user}
              handleChange={handleChange}
              organizationIsResearcher={organizationIsResearcher(
                user.organizationAffiliated
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            justifyContent="center"
            sx={{ display: "flex" }}
          >
            <Avatar
              variant="square"
              src={getAvatarByOrganization(user.organizationAffiliated)}
              sx={{ width: 146, height: 146, borderRadius: "5px" }}
            ></Avatar>
          </Grid>
        </Grid>

        {/* <Box>
          <Typography variant="h5" fontWeight={600} mb={2}>
            Login information
          </Typography>
          {textFields.slice(0, 2).map((field, index) => (
            <CustomTextField
              short={true}
              key={index + 4}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              value={field.value}
              onChange={(e) =>
                handleChange(
                  field.textfield as keyof typeof user,
                  e.target.value
                )
              }
              required={field.required}
              multiline={field.multiline}
            />
          ))}
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
        </Box> */}
        {/* <Box my={3}>
          {textFields.slice(4).map((field, index) => (
            <CustomTextField
              key={index + 4}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              value={field.value}
              onChange={(e) =>
                handleChange(
                  field.textfield as keyof typeof user,
                  e.target.value
                )
              }
              required={field.required}
              multiline={field.multiline}
            />
          ))}
        </Box>
        <CustomTagInput
          title="Add relevant keywords to your activity"
          label="add a keyword"
          customTags={user.keywordsActivity}
          setCustomTags={(newCustomTags) =>
            handleChange("keywordsActivity", newCustomTags)
          }
        />
        <Typography variant="body1" fontWeight={600} mt={2}>
          Which field(s) might your professional activity be relevant to?
        </Typography>
        <Box className={classes.chipContainer} my={2}>
          <>
            {Object.values(FieldsEnvironmentalArea).map((label) => (
              <Chip
                key={label}
                label={label}
                onClick={() =>
                  handleNestedChip(
                    "fieldsEnvironmentalArea",
                    "generic",
                    label
                  )
                }
                sx={{
                  margin: "5px",
                  backgroundColor:
                    user.fieldsEnvironmentalArea.generic.includes(
                      label as FieldsEnvironmentalArea
                    )
                      ? "#C8E6C9"
                      : "transparent",
                  color: user.fieldsEnvironmentalArea.generic.includes(
                    label as FieldsEnvironmentalArea
                  )
                    ? "#000"
                    : "",
                  border: "1px solid black",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#C8E6C9",
                  },
                }}
                clickable
              />
            ))}
            <CustomTagInput
              label="add your tag"
              customTags={user.fieldsEnvironmentalArea.custom ?? []}
              setCustomTags={(newCustomTags) =>
                handleNestedChange(
                  "fieldsEnvironmentalArea",
                  "custom",
                  newCustomTags
                )
              }
            />
          </>
        </Box>
        <Typography variant="h6" fontWeight={600} mt={3} mb={2}>
          Inform any skills or technical specifics that would be interesting to
          mention for a potential collaborator
        </Typography>
        {skillsOrTechnicalProperties.map((section) => (
          <Box my={1} key={section.key}>
            <CustomTagInput
              subtitle={section.subtitle}
              label={section.label}
              customTags={section.keywords}
              setCustomTags={(newCustomTags) =>
                handleNestedChange(
                  "skillsOrTechnical",
                  section.key as SkillsOrTechnicalKeys,
                  newCustomTags
                )
              }
            />
          </Box>
        ))}
      </Box>
      <Divider
        variant="middle"
        sx={{
          marginTop: "40px",
          marginBottom: "20px",
          width: "80%",
          marginLeft: "40px",
        }}
      />
      <Box className={classes.root}>
        <Typography variant="h6" fontWeight={600} mt={1}>
          Inform the community for what kind of collaboration would you like to
          be contacted for :
        </Typography>

        <Typography variant="body1" fontWeight={600} mt={4}>
          Type of collaboration you are interested in
        </Typography>
        <Box className={classes.chipContainer}>
          {Object.values(TypeOfCollaboration).map((collaboration) => (
            <Chip
              key={collaboration}
              label={collaboration}
              onClick={() =>
                handleNestedChip(
                  "kindOfCollaborationWanted",
                  "typeOfCollaboration",
                  collaboration
                )
              }
              sx={{
                margin: "5px",
                backgroundColor:
                  user.kindOfCollaborationWanted.typeOfCollaboration.includes(
                    collaboration as TypeOfCollaboration
                  )
                    ? "#C8E6C9"
                    : "transparent",
                color:
                  user.kindOfCollaborationWanted.typeOfCollaboration.includes(
                    collaboration as TypeOfCollaboration
                  )
                    ? "#000"
                    : "",
                border: "1px solid black",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#C8E6C9",
                },
              }}
              clickable
            />
          ))}
        </Box>
        <Typography variant="body1" fontWeight={600}>
          With what type of organization would you be willing to collaborate?
        </Typography>
        <Box className={classes.chipContainer}>
          {Object.values(TypeOfOrganization).map((organization) => (
            <Chip
              key={organization}
              label={organization}
              onClick={() =>
                handleNestedChip(
                  "kindOfCollaborationWanted",
                  "typeOfOrganization",
                  organization
                )
              }
              sx={{
                margin: "5px",
                backgroundColor:
                  user.kindOfCollaborationWanted.typeOfOrganization.includes(
                    organization as TypeOfOrganization
                  )
                    ? "#C8E6C9"
                    : "transparent",
                color:
                  user.kindOfCollaborationWanted.typeOfOrganization.includes(
                    organization as TypeOfOrganization
                  )
                    ? "#000"
                    : "",
                border: "1px solid black",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#C8E6C9",
                },
              }}
              clickable
            />
          ))}
        </Box>
        <Typography variant="body1" fontWeight={600}>
          Project’s progress status
        </Typography>
        <Box className={classes.chipContainer}>
          {Object.values(ProjectProgressStatus).map((status) => (
            <Chip
              key={status}
              label={status}
              onClick={() =>
                handleNestedChange(
                  "kindOfCollaborationWanted",
                  "projectProgressStatus",
                  status
                )
              }
              sx={{
                margin: "5px",
                backgroundColor:
                  user.kindOfCollaborationWanted.projectProgressStatus ===
                  status
                    ? "#C8E6C9"
                    : "transparent",
                color:
                  user.kindOfCollaborationWanted.projectProgressStatus ===
                  status
                    ? "#000"
                    : "",
                border: "1px solid black",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#C8E6C9",
                },
              }}
              clickable
            />
          ))}
        </Box>
        <Typography variant="body1" fontWeight={600}>
          Collaboration duration
        </Typography>
        <Box className={classes.chipContainer}>
          {Object.values(CollaborationDuration).map((collabDuration) => (
            <Chip
              key={collabDuration}
              label={collabDuration}
              onClick={() =>
                handleNestedChange(
                  "kindOfCollaborationWanted",
                  "collaborationDuration",
                  collabDuration
                )
              }
              sx={{
                margin: "5px",
                backgroundColor:
                  user.kindOfCollaborationWanted.collaborationDuration ===
                  collabDuration
                    ? "#C8E6C9"
                    : "transparent",
                color:
                  user.kindOfCollaborationWanted.collaborationDuration ===
                  collabDuration
                    ? "#000"
                    : "",
                border: "1px solid black",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#C8E6C9",
                },
              }}
              clickable
            />
          ))}
        </Box>
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
          onClick={() => handleValidate()}
        >
          Validate
        </Button> */}
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
