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
import { Trans, useTranslation } from "react-i18next";
import { useTranslatedEnum } from "../../hooks/useTranslatedEnum";

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
  const { t } = useTranslation();

  const {
    translatedFieldsEnvironmentalArea,
    translatedProjectProgressStatus,
    translatedProjectFunding,
  } = useTranslatedEnum();

  return (
    <Box mb={3}>
      <Typography variant="h5" fontWeight={600}>
        <Trans i18nKey="create_request_project_detail_title" />
      </Typography>
      <Typography variant="body2" mb={4} color="grey">
        <Trans i18nKey="create_request_project_detail_subtitle" />
      </Typography>
      <CustomTextField
        label={t("create_request_project_detail_title_project_label")}
        placeholder={t(
          "create_request_project_detail_title_project_placeholder"
        )}
        type="text"
        value={request.project.projectTitle}
        onChange={(e) =>
          handleNestedChange("project", "projectTitle", e.target.value)
        }
        required
      />
      <CustomTextField
        label={t("create_request_project_detail_summary")}
        placeholder={t("create_request_project_detail_summary_placeholder")}
        type="text"
        value={request.project.summary}
        onChange={(e) =>
          handleNestedChange("project", "summary", e.target.value)
        }
        required
        multiline
      />
      <Typography variant="body2" fontWeight={600} mt={2}>
        <Trans i18nKey="create_request_project_detail_fields_of_application" />
      </Typography>
      <Box className={classes.chipContainer} mb={2}>
        <Box display="flex" flexWrap="wrap" alignItems="center">
          {Object.values(FieldsEnvironmentalArea).map((label) => (
            <Chip
              key={label}
              label={translatedFieldsEnvironmentalArea[label]}
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
                  backgroundColor:
                    request.project.fieldsEnvironmentalArea.generic.includes(
                      label as FieldsEnvironmentalArea
                    )
                      ? "#C8E6C9"
                      : "transparent",
                },
                flexWrap: "wrap",
              }}
              clickable
            />
          ))}
          {request.project.fieldsEnvironmentalArea.custom.map(
            (label, index) => (
              <Chip
                key={index}
                label={label}
                onDelete={() =>
                  handleDoubleNestedChip(
                    "project",
                    "fieldsEnvironmentalArea",
                    "custom",
                    label
                  )
                }
                sx={{
                  backgroundColor: "#C8E6C9",
                  border: "1px solid black",
                  borderRadius: "8px",
                  marginRight: "10px",
                  marginTop: "10px",
                  "&:hover": {
                    backgroundColor: "#C8E6C9",
                  },
                  flexWrap: "wrap",
                  maxWidth: "100%",
                  ".MuiChip-label": {
                    maxWidth: "90%",
                  },
                }}
              />
            )
          )}
        </Box>
        <CustomTagInput
          label={t("research_activity_and_expertise_environmental_area_button")}
          environmental
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
      </Box>
      <Typography variant="body2" fontWeight={600} mt={3}>
        <Trans i18nKey="create_request_project_detail_progress_status_title" />
      </Typography>
      <Box className={classes.chipContainer} mb={2}>
        <>
          {Object.values(ProjectProgressStatus)
            .map((label) => (
              <Chip
                key={label}
                label={translatedProjectProgressStatus[label]}
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
        <Trans i18nKey="create_request_project_detail_estimate_date" />
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateField
          label={t("create_request_project_detail_estimate_date_from")}
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
          label={t("create_request_project_detail_estimate_date_to")}
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
        <Trans i18nKey="interest_selection_project_funding_title" />
      </Typography>
      <Box className={classes.chipContainer} mb={2}>
        <>
          {Object.values(ProjectFunding)
            .map((label) => (
              <Chip
                key={label}
                label={translatedProjectFunding[label]}
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
  },
});

export default ProjectDetails;
