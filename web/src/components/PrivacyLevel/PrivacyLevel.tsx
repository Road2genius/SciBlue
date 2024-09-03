import React from "react";
import { Box, Typography, Switch, Divider } from "@mui/material";
import CustomTextField from "../CustomTextField/CustomTextField";
import { Trans, useTranslation } from "react-i18next";

interface PrivacyLevelProps {
  privacyMode: boolean;
  username: string;
  handlePrivacyModeChange: (checked: boolean) => void;
  handleUsernameChange: (username: string) => void;
}

const PrivacyLevel: React.FC<PrivacyLevelProps> = ({
  privacyMode,
  username,
  handlePrivacyModeChange,
  handleUsernameChange,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h5" fontWeight={600} mb={2}>
        <Trans i18nKey="privacy_level_title"/>
      </Typography>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" fontWeight={600} mr={2}>
        <Trans i18nKey="privacy_level_subtitle"/>
        </Typography>
        <Typography variant="body1" ml={2}>
          <Trans i18nKey="privacy_level_no"/>
        </Typography>
        <Switch
          checked={privacyMode}
          onChange={(event) => handlePrivacyModeChange(event.target.checked)}
        />
        <Typography variant="body1" ml={2}>
          <Trans i18nKey="privacy_level_yes"/>
        </Typography>
      </Box>
      <Typography
        variant="body1"
        color="GrayText"
        sx={{ marginBottom: "20px" }}
      >
        <Trans i18nKey="privacy_level_information"/>
      </Typography>
      {privacyMode && (
        <CustomTextField
          label={t("privacy_username")}
          placeholder={t("privacy_username_placeholder")}
          type="text"
          value={username}
          short={true}
          onChange={(e) => handleUsernameChange(e.target.value)}
          required={true}
        />
      )}
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
    </>
  );
};

export default PrivacyLevel;
