import React from "react";
import { Box, Typography } from "@mui/material";
import CustomTextField from "../CustomTextField/CustomTextField";
import { getTextFieldsConfig } from "../CustomTextField/getTextFieldsConfig";
import { User } from "../../../../shared-types/userData";

interface ConditionalTextFieldsProps {
  user: User;
  handleChange: (field: keyof User, value: string) => void;
  organizationIsResearcher: boolean;
}

const ConditionalTextFields: React.FC<ConditionalTextFieldsProps> = ({
  user,
  handleChange,
  organizationIsResearcher,
}) => {
  const textFields = getTextFieldsConfig(user).filter((field) => {
    if (organizationIsResearcher) {
      return (
        field.researcherLayout ||
        (!field.researcherLayout && !field.professionalLayout)
      );
    } else {
      return (
        field.professionalLayout ||
        (!field.researcherLayout && !field.professionalLayout)
      );
    }
  });

  if (!user.organizationAffiliated) {
    return;
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={2}>
        General Information
      </Typography>
      {textFields.slice(2).map((field, index) => (
        <React.Fragment key={index}>
          <CustomTextField
            key={index}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            value={field.value}
            onChange={(e) =>
              handleChange(field.textfield as keyof User, e.target.value)
            }
            required={field.required}
            multiline={field.multiline}
            short={true}
          />
          {field.textfield === "country" && (
            <p>Language component todo</p>
            // <Language
            //   languages={user.languages}
            //   handleChangeLanguages={handleChangeLanguages}
            // />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ConditionalTextFields;
