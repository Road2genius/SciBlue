import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import { LocalizationProvider, DateField } from "@mui/x-date-pickers";
import CustomTextField from "../../components/CustomTextField/CustomTextField";
import CustomTagInput from "../../components/CustomTag/CustomTag";
import {
  FieldsEnvironmentalArea,
  ProjectFunding,
  ProjectProgressStatus,
} from "../../../../shared-types/user";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { makeStyles } from "@mui/styles";
import {
  NestedKeyOf,
  RequestReqInterface,
  RequestResInterface,
} from "../../../../shared-types/requestData";

interface ProjectDetailsProps {
  request: RequestReqInterface | RequestResInterface;
  handleNestedChange: <
    K extends NestedKeyOf<RequestReqInterface>,
    NK extends keyof RequestReqInterface[K],
  >(
    section: K,
    field: NK,
    value: RequestReqInterface[K][NK]
  ) => void;
  handleDoubleNestedChip: <
    K extends keyof RequestReqInterface,
    NK extends keyof RequestReqInterface[K],
    NK2 extends keyof RequestReqInterface[K][NK],
  >(
    section: K,
    field: NK,
    subfield: NK2,
    value: RequestReqInterface[K][NK][NK2] extends Array<infer U> ? U : never
  ) => void;
  handleDoubleNestedChange: <
    K extends keyof RequestReqInterface,
    NK extends keyof RequestReqInterface[K],
    NK2 extends keyof RequestReqInterface[K][NK],
  >(
    section: K,
    field: NK,
    subfield: NK2,
    value: RequestReqInterface[K][NK][NK2]
  ) => void;
  handleNestedChip: <
    K extends keyof RequestReqInterface,
    NK extends keyof RequestReqInterface[K],
  >(
    section: K,
    field: NK,
    value: RequestReqInterface[K][NK] extends Array<infer U>
      ? U
      : RequestReqInterface[K][NK]
  ) => void;
  handleDateChange: (index: number, newDate: Date | null) => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  request,
  handleNestedChange,
  handleDoubleNestedChip,
  handleDoubleNestedChange,
  handleNestedChip,
  handleDateChange,
}) => {
  const classes = useStyles();

  return (
    <Box mb={3}>
      <Typography variant="h5" fontWeight={600}>
        Describe the project you are working on
      </Typography>
      <Typography variant="body2" mb={4} color="grey">
        Explain here the project, and not the request of collaboration needed
      </Typography>
      <CustomTextField
        label="Title of your project"
        placeholder="Title of the project"
        type="text"
        value={request.project.projectTitle}
        onChange={(e) =>
          handleNestedChange("project", "projectTitle", e.target.value)
        }
        required
      />
      <CustomTextField
        label="Summary"
        placeholder="Enter here a description of the project (context, achievements, goal ...) The more details you provide, the more it will make people want to collaborate with you."
        type="text"
        value={request.project.summary}
        onChange={(e) =>
          handleNestedChange("project", "summary", e.target.value)
        }
        required
        multiline
      />
      <Typography variant="body2" fontWeight={600} mt={2}>
        Fields of application *
      </Typography>
      <Box className={classes.chipContainer} mb={2}>
        <>
          {Object.values(FieldsEnvironmentalArea).map((label) => (
            <Chip
              key={label}
              label={label}
              onClick={() =>
                handleDoubleNestedChip(
                  "project",
                  "fieldsEnvironmentalArea",
                  "generic",
                  label
                )
              }
              sx={{
                marginRight: "10px",
                marginTop: "10px",
                backgroundColor:
                  request.project.fieldsEnvironmentalArea.generic.includes(
                    label as FieldsEnvironmentalArea
                  )
                    ? "#C8E6C9"
                    : "transparent",
                color: request.project.fieldsEnvironmentalArea.generic.includes(
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
            customTags={request.project.fieldsEnvironmentalArea.custom ?? []}
            setCustomTags={(newCustomTags) =>
              handleDoubleNestedChange(
                "project",
                "fieldsEnvironmentalArea",
                "custom",
                newCustomTags
              )
            }
          />
        </>
      </Box>
      <Typography variant="body2" fontWeight={600} mt={3}>
        Project&apos;s progress status *
      </Typography>
      <Box className={classes.chipContainer} mb={2}>
        <>
          {Object.values(ProjectProgressStatus)
            .filter((label) => label !== "")
            .map((label) => (
              <Chip
                key={label}
                label={label}
                onClick={() =>
                  handleNestedChip("project", "projectProgressStatus", label)
                }
                sx={{
                  marginRight: "10px",
                  marginTop: "10px",
                  backgroundColor:
                    request.project.projectProgressStatus.includes(
                      label as ProjectProgressStatus
                    )
                      ? "#C8E6C9"
                      : "transparent",
                  color: request.project.projectProgressStatus.includes(
                    label as ProjectProgressStatus
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
        </>
      </Box>
      <Typography variant="body2" fontWeight={600} mt={3}>
        Could you estimate the start and end dates of the project ?
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateField
          label="From"
          size="small"
          value={
            request.project.projectStartEndEstimation[0]
              ? new Date(request.project.projectStartEndEstimation[0])
              : new Date()
          }
          onChange={(newDate) => handleDateChange(0, newDate)}
          sx={{
            borderRadius: "8px",
            borderColor: "black",
            width: "200px",
            marginTop: "10px",
          }}
        />
        <DateField
          label="To"
          size="small"
          value={
            request.project.projectStartEndEstimation[1]
              ? new Date(request.project.projectStartEndEstimation[1])
              : new Date()
          }
          onChange={(newDate) => handleDateChange(1, newDate)}
          sx={{
            marginLeft: "20px",
            borderRadius: "8px",
            width: "200px",
            marginTop: "10px",
          }}
        />
      </LocalizationProvider>
      <Typography variant="body2" fontWeight={600} mt={3}>
        Project&apos;s funding
      </Typography>
      <Box className={classes.chipContainer} mb={2}>
        <>
          {Object.values(ProjectFunding)
            .filter((label) => label !== "")
            .map((label) => (
              <Chip
                key={label}
                label={label}
                onClick={() =>
                  handleNestedChip("project", "projectFunding", label)
                }
                sx={{
                  marginRight: "10px",
                  marginTop: "10px",
                  backgroundColor: request.project.projectFunding.includes(
                    label as ProjectFunding
                  )
                    ? "#C8E6C9"
                    : "transparent",
                  color: request.project.projectFunding.includes(
                    label as ProjectFunding
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
        </>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  chipContainer: {
    maxWidth: "800px",
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "5px",
    alignItems: "center",
  },
});

export default ProjectDetails;
