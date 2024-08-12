import React from "react";
import { Box, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { TypeOfOrganization } from "../../../../shared-types/user";

interface OrganizationChipsProps {
  selectedOrganizations: TypeOfOrganization;
  handleChange: (organization: TypeOfOrganization) => void;
}

const OrganizationChips: React.FC<OrganizationChipsProps> = ({
  selectedOrganizations,
  handleChange,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.chipContainer}>
      {Object.values(TypeOfOrganization).map((label) => (
        <Chip
          key={label}
          label={label}
          onClick={() => handleChange(label)}
          sx={{
            margin: "5px",
            marginLeft: "0",
            backgroundColor: selectedOrganizations.includes(label)
              ? "#C8E6C9"
              : "transparent",
            color: selectedOrganizations.includes(label) ? "#000" : "",
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
  );
};

export default OrganizationChips;

const useStyles = makeStyles({
  chipContainer: {
    maxWidth: "900px",
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "5px",
    alignItems: "center",
  },
});
