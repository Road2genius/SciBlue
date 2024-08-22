import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import { Project } from "../../../../shared-types/requestData";
import { formatDate } from "../../utils/utils";

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  return (
    <Box my={2}>
      <Typography variant="h6" fontWeight={600}>
        Concerning the project we will be working on
      </Typography>
      <Box display="flex" gap={1} my={1} flexWrap="wrap">
        {project.fieldsEnvironmentalArea.custom?.map((customField, index) => (
          <Chip
            size="small"
            key={index}
            label={customField}
            variant="outlined"
            sx={{
              backgroundColor: "#C8E6C9",
              border: "1px solid black",
              borderRadius: "8px",
            }}
          />
        ))}
        {project.fieldsEnvironmentalArea.generic?.map((genericField, index) => (
          <Chip
            size="small"
            key={index}
            label={genericField}
            variant="outlined"
            sx={{
              backgroundColor: "#C8E6C9",
              border: "1px solid black",
              borderRadius: "8px",
            }}
          />
        ))}
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        {project.projectStartEndEstimation &&
          project.projectStartEndEstimation.length > 1 && (
            <Box display="flex" alignItems="center" mr={5}>
              <Typography variant="body2" sx={{ marginRight: "8px" }}>
                From
              </Typography>
              <Chip
                size="small"
                label={formatDate(project.projectStartEndEstimation[0])}
                sx={{
                  backgroundColor: "#fff",
                  border: "1px solid black",
                  borderRadius: "8px",
                }}
              />
              <Typography variant="body2" sx={{ marginX: "8px" }}>
                To
              </Typography>
              <Chip
                size="small"
                label={formatDate(project.projectStartEndEstimation[1])}
                sx={{
                  backgroundColor: "#fff",
                  border: "1px solid black",
                  borderRadius: "8px",
                }}
              />
            </Box>
          )}
        <Box display="flex" alignItems="center">
          <Typography variant="body2" sx={{ marginRight: "8px" }}>
            Project&apos;s status:
          </Typography>
          <Chip
            size="small"
            label={project.projectProgressStatus}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid black",
              borderRadius: "8px",
            }}
          />
        </Box>
        {project.projectFunding && (
          <Box display="flex" alignItems="center" ml={5}>
            <Typography variant="body2" sx={{ marginX: "8px" }}>
              Funding:
            </Typography>
            <Chip
              size="small"
              label={project.projectFunding}
              sx={{
                backgroundColor: "#fff",
                border: "1px solid black",
                borderRadius: "8px",
              }}
            />
          </Box>
        )}
      </Box>
      <Box mt={8}>
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{ marginBottom: "15px" }}
        >
          {project.projectTitle}
        </Typography>
        <Typography variant="subtitle2" paragraph>
          {project.summary}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProjectDetails;
