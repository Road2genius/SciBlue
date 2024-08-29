import React from "react";
import { Box, Chip } from "@mui/material";
import { FieldsEnvironmentalArea } from "../../../../shared-types/user";
import { UserReq } from "../../../../shared-types/userData";
import { makeStyles } from "@mui/styles";
import CustomTagInput from "../CustomTag/CustomTag";
import { useTranslatedEnum } from "../../hooks/useTranslatedEnum";
import { useTranslation } from "react-i18next";

interface FieldsEnvironmentalAreaSelectorProps {
  user: UserReq;
  activity: "researchActivityAndExpertise" | "professionalActivityAndExpertise";
  handleDoubleNestedChip: (
    section:
      | "researchActivityAndExpertise"
      | "professionalActivityAndExpertise",
    nestedSection: "fieldsEnvironmentalArea",
    field: "generic" | "custom",
    item: FieldsEnvironmentalArea | string
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
  const { translatedFieldsEnvironmentalArea } = useTranslatedEnum()
  const { t } = useTranslation();

  return (
    <Box className={classes.chipContainer} mb={2}>
      <Box display="flex" flexWrap="wrap" alignItems="center">
        {Object.values(FieldsEnvironmentalArea).map((label) => (
          <Chip
            key={label}
            label={translatedFieldsEnvironmentalArea[label]}
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
                backgroundColor: user[
                  activity
                ].fieldsEnvironmentalArea.generic.includes(
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
        {user[activity].fieldsEnvironmentalArea.custom.map((label, index) => (
          <Chip
            key={index}
            label={label}
            onDelete={() =>
              handleDoubleNestedChip(
                activity,
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
        ))}
      </Box>
      <CustomTagInput
        label={t('research_activity_and_expertise_environmental_area_button')}
        environmental
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
    </Box>
  );
};

const useStyles = makeStyles({
  chipContainer: {
    maxWidth: "800px",
  },
});

export default FieldsEnvironmentalAreaSelector;
