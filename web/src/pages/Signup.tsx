import { Box, Button, Chip, Divider, Typography } from "@mui/material";
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
import CustomTextField from "../components/CustomTextField/CustomTextField";
import { getTextFieldsConfig } from "../components/CustomTextField/getTextFieldsConfig";
import KeywordInput from "../components/KeywordInput/KeywordInput";
import TagInput from "../components/TagInput/TagInput";
import useSignupForm from "../hooks/useSignupForm";

const Signup: React.FC = () => {
  const classes = useStyles();
  const { user, handleChange, handleNestedChange } = useSignupForm();
  const textFields = getTextFieldsConfig(user);

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

        {textFields.slice(0, 4).map((field, index) => (
          <CustomTextField
            key={index}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            value={field.value}
            onChange={(e) =>
              handleChange(field.field as keyof typeof user, e.target.value)
            }
            required={field.required}
          />
        ))}

        <Typography variant="h5" fontWeight={600} mt={1}>
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
                  label as OrganizationAffiliated,
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

        {textFields.slice(4).map((field, index) => (
          <CustomTextField
            key={index + 4}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            value={field.value}
            onChange={(e) =>
              handleChange(field.field as keyof typeof user, e.target.value)
            }
            required={field.required}
          />
        ))}

        <KeywordInput
          keywords={user.keywordsActivity}
          setKeywords={(newKeywords) =>
            handleChange("keywordsActivity", newKeywords)
          }
        />
        <Typography variant="body1" fontWeight={600} mt={4}>
          Which field(s) might your professional activity be relevant to?
        </Typography>
        <Box className={classes.chipContainer}>
          {Object.values(FieldsProfessionalActivity).map((label) => (
            <Chip
              key={label}
              label={label}
              onClick={() =>
                handleNestedChange("fieldsProfessionalActivity", "generic", [
                  ...user.fieldsProfessionalActivity.generic,
                  label as FieldsProfessionalActivity,
                ])
              }
              sx={{
                backgroundColor:
                  user.fieldsProfessionalActivity.generic.includes(
                    label as FieldsProfessionalActivity
                  )
                    ? "#C8E6C9"
                    : "transparent",
                color: user.fieldsProfessionalActivity.generic.includes(
                  label as FieldsProfessionalActivity
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
          <TagInput
            label=""
            placeholder="+ add your tag"
            tags={user.fieldsProfessionalActivity.custom}
            setTags={(newTags) =>
              handleNestedChange(
                "fieldsProfessionalActivity",
                "custom",
                newTags as string[]
              )
            }
          />
        </Box>
        <TagInput
          label="Methods and specific techniques"
          placeholder="+ add a method or a precise technique (e.g imaging, computational models and simulation, ...)"
          tags={user.skillsOrTechnical.specificTechnicsNames}
          setTags={(newTags) =>
            handleNestedChange(
              "skillsOrTechnical",
              "specificTechnicsNames",
              newTags as string[]
            )
          }
        />
        <TagInput
          label="Equipment"
          placeholder="+ add a particular equipment (e.g. UHPLC system, ...)"
          tags={user.skillsOrTechnical.equipment}
          setTags={(newTags) =>
            handleNestedChange(
              "skillsOrTechnical",
              "equipment",
              newTags as string[]
            )
          }
        />
        <TagInput
          label="Models"
          placeholder="+ add a model (e.g. particular mouse model, ...)"
          tags={user.skillsOrTechnical.models}
          setTags={(newTags) =>
            handleNestedChange(
              "skillsOrTechnical",
              "models",
              newTags as string[]
            )
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
              newTags as string[]
            )
          }
        />
        <TagInput
          label="Any other skill that you would like to mention"
          placeholder="+ add a skill"
          tags={user.skillsOrTechnical.otherSkills}
          setTags={(newTags) =>
            handleNestedChange(
              "skillsOrTechnical",
              "otherSkills",
              newTags as string[]
            )
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
                    collaboration as TypeOfCollaboration,
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
                    organization as TypeOfOrganization,
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
                  status as ProjectProgressStatus
                )
              }
              sx={{
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
                  collabDuration as CollaborationDuration
                )
              }
              sx={{
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
          onClick={() => console.log("Validate", user)}
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
