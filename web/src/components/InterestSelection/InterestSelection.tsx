import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import { UserReq } from "../../../../shared-types/userData";
import { makeStyles } from "@mui/styles";
import { ProjectFunding, ProjectProgressStatus, TypeOfOrganization } from "../../../../shared-types/user";
import { Trans, useTranslation } from "react-i18next";
import { useTranslatedEnum } from "../../hooks/useTranslatedEnum";

interface InterestSelectorProps {
  user: UserReq;
  handleNestedChip: <K extends keyof UserReq, NK extends keyof UserReq[K]>(
    section: K,
    field: NK,
    value: UserReq[K][NK] extends Array<infer U> ? U : UserReq[K][NK]
  ) => void;
}

const InterestSelector: React.FC<InterestSelectorProps> = ({ user, handleNestedChip }) => {
  const classes = useStyles();
  useTranslation();
  const { translatedOrganizations, translatedProjectProgressStatus, translatedProjectFunding } = useTranslatedEnum();

  if (!user.organizationAffiliated) {
    return;
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600}>
        <Trans i18nKey="interest_selection_title" />
      </Typography>
      <Typography variant="body2" fontWeight={600} mt={3}>
        <Trans i18nKey="interest_selection_type_organization_title" />
      </Typography>
      <Box className={classes.chipContainer} mb={2}>
        {Object.values(TypeOfOrganization).map((label) => (
          <Chip
            key={label}
            label={translatedOrganizations[label]}
            onClick={() => handleNestedChip("kindOfCollaborationWanted", "typeOfOrganization", label)}
            sx={{
              marginRight: "10px",
              marginTop: "10px",
              backgroundColor: user.kindOfCollaborationWanted.typeOfOrganization.includes(label as TypeOfOrganization)
                ? "#C8E6C9"
                : "transparent",
              color: user.kindOfCollaborationWanted.typeOfOrganization.includes(label as TypeOfOrganization)
                ? "#000"
                : "",
              border: "1px solid black",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: user.kindOfCollaborationWanted.typeOfOrganization.includes(label as TypeOfOrganization)
                  ? "#C8E6C9"
                  : "transparent",
              },
            }}
            clickable
          />
        ))}
      </Box>
      <Typography variant="body2" fontWeight={600} mt={3}>
        <Trans i18nKey="interest_selection_project_progress_status_title" />
      </Typography>
      <Box className={classes.chipContainer} mb={2}>
        <>
          {Object.values(ProjectProgressStatus).map((label) => (
            <Chip
              key={label}
              label={translatedProjectProgressStatus[label]}
              onClick={() => handleNestedChip("kindOfCollaborationWanted", "projectProgressStatus", label)}
              sx={{
                marginRight: "10px",
                marginTop: "10px",
                backgroundColor: user.kindOfCollaborationWanted.projectProgressStatus.includes(
                  label as ProjectProgressStatus
                )
                  ? "#C8E6C9"
                  : "transparent",
                color: user.kindOfCollaborationWanted.projectProgressStatus.includes(label as ProjectProgressStatus)
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
        <Trans i18nKey="interest_selection_project_funding_title" />
      </Typography>
      <Box className={classes.chipContainer} mb={2}>
        <>
          {Object.values(ProjectFunding).map((label) => (
            <Chip
              key={label}
              label={translatedProjectFunding[label]}
              onClick={() => handleNestedChip("kindOfCollaborationWanted", "projectFunding", label)}
              sx={{
                marginRight: "10px",
                marginTop: "10px",
                backgroundColor: user.kindOfCollaborationWanted.projectFunding.includes(label as ProjectFunding)
                  ? "#C8E6C9"
                  : "transparent",
                color: user.kindOfCollaborationWanted.projectFunding.includes(label as ProjectFunding) ? "#000" : "",
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

export default InterestSelector;
