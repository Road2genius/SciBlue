import {
  Box,
  Button,
  Chip,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import {
  CollaborationDuration,
  FieldsProfessionalActivity,
  OrganizationAffiliated,
  ProjectProgressStatus,
  TypeOfCollaboration,
  TypeOfOrganization,
} from "../../../shared-types/user";
import KeywordInput from "../components/KeywordInput/KeywordInput";
import TagInput from "../components/TagInput/TagInput";
import useSignupForm from "../hooks/useSignupForm";

const Signup: React.FC = () => {
  const classes = useStyles();
  const { user, handleChange, handleNestedChange } = useSignupForm();

  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h4" fontWeight={700} color="#197278">
          Sign up
        </Typography>

        <Typography variant="body1" fontWeight={700} mb={4}>
          * information requested
        </Typography>

        <Typography variant="h5" fontWeight={600} mb={4}>
          General information
        </Typography>

        <Typography variant="body1" fontWeight={600}>
          First name *
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter first name"
          variant="outlined"
          type="text"
          value={user.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          sx={{ marginBottom: "20px" }}
        />

        <Typography variant="body1" fontWeight={600}>
          Last name *
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter last name"
          type="text"
          variant="outlined"
          value={user.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          sx={{ marginBottom: "20px" }}
        />

        <Typography variant="body1" fontWeight={600}>
          Mail address *
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter mail address"
          type="email"
          variant="outlined"
          value={user.email}
          onChange={(e) => handleChange("email", e.target.value)}
          sx={{ marginBottom: "20px" }}
        />

        <Typography variant="body1" fontWeight={600}>
          Password *
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter password"
          type="password"
          variant="outlined"
          value={user.password}
          onChange={(e) => handleChange("password", e.target.value)}
          sx={{ marginBottom: "20px" }}
        />

        <Typography variant="h5" fontWeight={600} mt={4}>
          Professional activity and expertise
        </Typography>

        <Typography variant="body1" fontWeight={600} mt={4}>
          What type of organization are you affiliated with?
        </Typography>

        <Box className={classes.chipContainer}>
          {Object.values(OrganizationAffiliated).map((label) => (
            <Chip
              key={label}
              label={label}
              onClick={() =>
                handleChange("organizationAffiliated", [
                  ...user.organizationAffiliated,
                  label,
                ])
              }
              sx={{
                backgroundColor: user.organizationAffiliated.includes(
                  label as OrganizationAffiliated
                )
                  ? "#C8E6C9"
                  : "transparent",
                color: user.organizationAffiliated.includes(
                  label as OrganizationAffiliated
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
          Organization name *
        </Typography>
        <TextField
          fullWidth
          type="text"
          variant="outlined"
          value={user.organizationName}
          onChange={(e) => handleChange("organizationName", e.target.value)}
          sx={{ marginBottom: "20px" }}
        />

        <Typography variant="body1" fontWeight={600}>
          Institution (if relevant)
        </Typography>
        <TextField
          fullWidth
          type="text"
          variant="outlined"
          value={user.institution}
          onChange={(e) => handleChange("institution", e.target.value)}
          sx={{ marginBottom: "20px" }}
        />

        <Typography variant="body1" fontWeight={600}>
          Address *
        </Typography>
        <TextField
          fullWidth
          type="text"
          variant="outlined"
          value={user.address}
          onChange={(e) => handleChange("address", e.target.value)}
          sx={{ marginBottom: "20px" }}
        />

        <Typography variant="body1" fontWeight={600}>
          City *
        </Typography>
        <TextField
          fullWidth
          type="text"
          variant="outlined"
          value={user.city}
          onChange={(e) => handleChange("city", e.target.value)}
          sx={{ marginBottom: "20px" }}
        />

        <Typography variant="body1" fontWeight={600}>
          Country *
        </Typography>
        <TextField
          fullWidth
          type="text"
          variant="outlined"
          value={user.country}
          onChange={(e) => handleChange("country", e.target.value)}
          sx={{ marginBottom: "20px" }}
        />

        <Typography variant="body1" fontWeight={600}>
          Describe in a few words your professional activity (e.g your research
          topic for a laboratory, the actions carried out by your NGO, ...)
        </Typography>
        <TextField
          fullWidth
          type="text"
          variant="outlined"
          value={user.description}
          onChange={(e) => handleChange("description", e.target.value)}
          sx={{ marginBottom: "20px" }}
        />

        <KeywordInput
          keywords={user.keywordsActivity}
          setKeywords={(newKeywords) =>
            handleChange("keywordsActivity", newKeywords)
          }
        />

        <TagInput
          label="Which field(s) might your professional activity be relevant to?"
          placeholder="+ add your tag"
          tags={user.fieldsProfessionalActivity}
          setTags={(newTags) =>
            handleChange("fieldsProfessionalActivity", newTags)
          }
          nonDeletableTags={Object.values(FieldsProfessionalActivity)}
        />
        <TagInput
          label="Methods and specific techniques"
          placeholder="+ add a method or a precise technique (e.g imaging, computational models and simulation, ...)"
          tags={user.skillsOrTechnical.specificTechnicsNames}
          setTags={(newTags) =>
            handleNestedChange(
              "skillsOrTechnical",
              "specificTechnicsNames",
              newTags
            )
          }
        />
        <TagInput
          label="Equipment"
          placeholder="+ add a particular equipment (e.g. UHPLC system, ...)"
          tags={user.skillsOrTechnical.equipment}
          setTags={(newTags) =>
            handleNestedChange("skillsOrTechnical", "equipment", newTags)
          }
        />
        <TagInput
          label="Models"
          placeholder="+ add a model (e.g. particular mouse model, ...)"
          tags={user.skillsOrTechnical.models}
          setTags={(newTags) =>
            handleNestedChange("skillsOrTechnical", "models", newTags)
          }
        />
        <TagInput
          label="Chemical and biological products"
          placeholder="+ add a product (e.g. antibodies, cells, small molecules, ...)"
          tags={user.skillsOrTechnical.chemicalAndBiologicalProducts}
          setTags={(newTags) =>
            handleNestedChange(
              "skillsOrTechnical",
              "chemicalAndBiologicalProducts",
              newTags
            )
          }
        />
        <TagInput
          label="Any other skill that you would like to mention"
          placeholder="+ add a skill"
          tags={user.skillsOrTechnical.otherSkills}
          setTags={(newTags) =>
            handleNestedChange("skillsOrTechnical", "otherSkills", newTags)
          }
        />
      </Box>

      <Divider
        variant="middle"
        sx={{
          marginTop: "40px",
          marginBottom: "40px",
        }}
      />
      <Box className={classes.root}>
        <Typography variant="h4" fontWeight={600} mt={4}>
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
                handleNestedChange(
                  "kindOfCollaborationWanted",
                  "typeOfCollaboration",
                  [
                    ...user.kindOfCollaborationWanted.typeOfCollaboration,
                    collaboration,
                  ]
                )
              }
              sx={{
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
                handleNestedChange(
                  "kindOfCollaborationWanted",
                  "typeOfOrganization",
                  [
                    ...user.kindOfCollaborationWanted.typeOfOrganization,
                    organization,
                  ]
                )
              }
              sx={{
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
                  [
                    ...user.kindOfCollaborationWanted.projectProgressStatus,
                    status,
                  ]
                )
              }
              sx={{
                backgroundColor:
                  user.kindOfCollaborationWanted.projectProgressStatus.includes(
                    status as ProjectProgressStatus
                  )
                    ? "#C8E6C9"
                    : "transparent",
                color:
                  user.kindOfCollaborationWanted.projectProgressStatus.includes(
                    status as ProjectProgressStatus
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
                  [
                    ...user.kindOfCollaborationWanted.collaborationDuration,
                    collabDuration,
                  ]
                )
              }
              sx={{
                backgroundColor:
                  user.kindOfCollaborationWanted.collaborationDuration.includes(
                    collabDuration as CollaborationDuration
                  )
                    ? "#C8E6C9"
                    : "transparent",
                color:
                  user.kindOfCollaborationWanted.collaborationDuration.includes(
                    collabDuration as CollaborationDuration
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
          onClick={() => console.log("Validate")}
        >
          Validate
        </Button>
      </Box>
    </>
  );
};

export default Signup;

const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    marginLeft: "80px",
    maxWidth: "720px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "20px",
    marginBottom: "20px",
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
