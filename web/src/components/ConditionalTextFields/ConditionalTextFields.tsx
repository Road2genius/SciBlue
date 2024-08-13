import React from "react";
import { Box, Chip, Divider, Typography } from "@mui/material";
import CustomTextField from "../CustomTextField/CustomTextField";
import { getTextFieldsConfig } from "../CustomTextField/getTextFieldsConfig";
import { UserReq } from "../../../../shared-types/userData";
import LanguageSelector from "../LanguageSelection/LanguageSelection";

interface ConditionalTextFieldsProps {
  user: UserReq;
  handleChange: (field: keyof UserReq, value: string) => void;
  handleChangeLanguage: (field: keyof UserReq, value: UserReq[keyof UserReq]) => void;
  handleDeleteChipLanguage: (lang: string) => void;
  organizationIsResearcher: boolean;
}

const ConditionalTextFields: React.FC<ConditionalTextFieldsProps> = ({
  user,
  handleChange,
  handleChangeLanguage,
  handleDeleteChipLanguage,
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
              handleChange(field.textfield as keyof UserReq, e.target.value)
            }
            required={field.required}
            multiline={field.multiline}
            short={true}
          />
          {field.textfield === "country" && (
            <Box sx={{ marginBottom: "20px" }}>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                sx={{ marginBottom: "5px" }}
              >
                Spoken languages:
              </Typography>
              <Box display="flex">
                <Box>
                  {user.languages?.map((lang, index) => (
                    <Chip
                      key={index}
                      label={lang}
                      onDelete={() => handleDeleteChipLanguage(lang)}
                      sx={{
                        backgroundColor: "#C8E6C9",
                        border: "1px solid black",
                        borderRadius: "8px",
                        marginRight: "10px",
                        marginTop: "10px",
                        "&:hover": {
                          backgroundColor: "#C8E6C9",
                        },
                      }}
                    />
                  ))}
                  <LanguageSelector
                    languages={user.languages}
                    handleChangeLanguages={(newLanguages) =>
                      handleChangeLanguage("languages", newLanguages)
                    }
                  />
                </Box>
              </Box>
            </Box>
          )}
        </React.Fragment>
      ))}
      <Box mt={8} mb={5} ml={8}>
        <Divider
          variant="fullWidth"
          sx={{
            borderBottomWidth: 1.5,
            minWidth: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "100%",
              xl: "1250px",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ConditionalTextFields;
