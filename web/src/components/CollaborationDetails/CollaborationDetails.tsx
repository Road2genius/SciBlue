import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import { RequestResInterface } from "../../../../shared-types/requestData";

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

  return (
    <Box>
      <Typography variant="h6" fontWeight={600}>
        Concerning the collaboration needed
      </Typography>
      <Box display="flex" gap={1} my={2} flexWrap="wrap" flexGrow={1}>
        {kindOfCollaborationWanted.typeOfCollaboration?.map(
          (typeOfCollab, index) => (
            <Chip
              size="small"
              key={index}
              label={typeOfCollab}
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
          Profile requested:
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap">
          {specificsSkills.organizationRequested.map((typeOfOrg, index) => (
            <Chip
              key={index}
              size="small"
              label={typeOfOrg}
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
          Disciplines:
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
          Skills and expertise:
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
