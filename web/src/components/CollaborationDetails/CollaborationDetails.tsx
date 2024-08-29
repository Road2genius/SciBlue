import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import { RequestResInterface } from "../../../../shared-types/requestData";
import { Trans, useTranslation } from "react-i18next";
import { useTranslatedEnum } from "../../hooks/useTranslatedEnum";

interface CollaborationDetailsProps {
  kindOfCollaborationWanted: RequestResInterface["kindOfCollaborationWanted"];
  specificsSkills: RequestResInterface["specificsSkills"];
}

const CollaborationDetails: React.FC<CollaborationDetailsProps> = ({
  kindOfCollaborationWanted,
  specificsSkills,
}) => {
  const uniquePrimaryDisciplines = Array.from(
    new Set(specificsSkills.disciplines.map((discipline) => discipline.primary))
  );

  useTranslation();
  const { translatedCollaborationsType, translatedOrganizations } =
    useTranslatedEnum();

  return (
    <Box>
      <Typography variant="h6" fontWeight={600}>
        <Trans i18nKey="request_detail_collab_detail_title" />
      </Typography>
      <Box display="flex" gap={1} my={2} flexWrap="wrap" flexGrow={1}>
        {kindOfCollaborationWanted.typeOfCollaboration?.map(
          (typeOfCollab, index) => (
            <Chip
              size="small"
              key={index}
              label={translatedCollaborationsType[typeOfCollab]}
              variant="outlined"
              sx={{
                backgroundColor: "#197278",
                color: "#DAD7CD",
                border: "1px solid black",
                borderRadius: "8px",
              }}
            />
          )
        )}
      </Box>
      <Typography
        variant="body2"
        fontWeight={600}
        sx={{ marginTop: "30px", marginBottom: "25px" }}
      >
        {kindOfCollaborationWanted.requestTitle}
      </Typography>
      <Typography variant="subtitle2" paragraph sx={{ marginBottom: "50px" }}>
        {kindOfCollaborationWanted.description}
      </Typography>
      <Box display="flex" alignItems="center" my={2}>
        <Typography variant="body2" sx={{ marginRight: "8px" }}>
          <Trans i18nKey="request_detail_collab_detail_orga_requested" />
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap">
          {specificsSkills.organizationRequested.map((typeOfOrg, index) => (
            <Chip
              key={index}
              size="small"
              label={translatedOrganizations[typeOfOrg]}
              sx={{
                backgroundColor: "#fff",
                border: "1px solid black",
                borderRadius: "8px",
                flexWrap: "nowrap",
              }}
            />
          ))}
        </Box>
      </Box>
      <Box display="flex" alignItems="center" my={2}>
        <Typography variant="body2" sx={{ marginRight: "8px" }}>
          <Trans i18nKey="research_activity_and_expertise_disciplines" />:
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap">
          {uniquePrimaryDisciplines.map((discipline, index) => (
            <Chip
              key={index}
              size="small"
              label={discipline}
              sx={{
                backgroundColor: "#fff",
                border: "1px solid black",
                borderRadius: "8px",
                flexWrap: "nowrap",
              }}
            />
          ))}
        </Box>
      </Box>

      <Box display="flex" alignItems="center" my={2}>
        <Typography variant="body2" sx={{ marginRight: "8px" }}>
          <Trans i18nKey="research_activity_and_expertise_skills_and_expertise_title" />
          :
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap">
          {specificsSkills.expertisesAndSkills.map((skill, index) => (
            <Chip
              key={index}
              size="small"
              label={skill}
              sx={{
                backgroundColor: "#fff",
                border: "1px solid black",
                borderRadius: "8px",
                flexWrap: "nowrap",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CollaborationDetails;
