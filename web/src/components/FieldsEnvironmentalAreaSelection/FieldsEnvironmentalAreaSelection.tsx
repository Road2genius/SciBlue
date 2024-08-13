import React from "react";
import { Box, Chip } from "@mui/material";
import { FieldsEnvironmentalArea } from "../../../../shared-types/user";
import { User } from "../../../../shared-types/userData";
import { makeStyles } from "@mui/styles";
import CustomTagInput from "../CustomTag/CustomTag";

interface FieldsEnvironmentalAreaSelectorProps {
  user: User;
  activity: "researchActivityAndExpertise" | "professionalActivityAndExpertise";
  handleDoubleNestedChip: (
    section:
      | "researchActivityAndExpertise"
      | "professionalActivityAndExpertise",
    nestedSection: "fieldsEnvironmentalArea",
    field: "generic",
    item: FieldsEnvironmentalArea
  ) => void;
  handleDoubleNestedChange: (
    section:
      | "researchActivityAndExpertise"
      | "professionalActivityAndExpertise",
    nestedSection: "fieldsEnvironmentalArea",
    field: "custom",
    value: string[]
  ) => void;
}

const FieldsEnvironmentalAreaSelector: React.FC<
  FieldsEnvironmentalAreaSelectorProps
> = ({ user, handleDoubleNestedChip, handleDoubleNestedChange, activity }) => {
  const classes = useStyles();
  return (
    <Box className={classes.chipContainer} mb={2}>
      <>
        {Object.values(FieldsEnvironmentalArea).map((label) => (
          <Chip
            key={label}
            label={label}
            onClick={() =>
              handleDoubleNestedChip(
                activity,
                "fieldsEnvironmentalArea",
                "generic",
                label
              )
            }
            sx={{
              marginRight: "10px",
              marginTop: "10px",
              backgroundColor: user[
                activity
              ].fieldsEnvironmentalArea.generic.includes(
                label as FieldsEnvironmentalArea
              )
                ? "#C8E6C9"
                : "transparent",
              color: user[activity].fieldsEnvironmentalArea.generic.includes(
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
          label="add an environmental area"
          customTags={user[activity].fieldsEnvironmentalArea.custom}
          setCustomTags={(newCustomTags) =>
            handleDoubleNestedChange(
              activity,
              "fieldsEnvironmentalArea",
              "custom",
              newCustomTags
            )
          }
        />
      </>
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

export default FieldsEnvironmentalAreaSelector;
