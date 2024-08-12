import React from "react";
import { Box, Typography, Switch, Divider } from "@mui/material";
import CustomTextField from "../CustomTextField/CustomTextField";

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
  return (
    <>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Privacy level
      </Typography>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" fontWeight={600} mr={2}>
          Privacy mode
        </Typography>
        <Typography variant="body1" ml={2}>
          No
        </Typography>
        <Switch
          checked={privacyMode}
          onChange={(event) => handlePrivacyModeChange(event.target.checked)}
        />
        <Typography variant="body1" ml={2}>
          Yes
        </Typography>
      </Box>
      <Typography
        variant="body1"
        color="GrayText"
        sx={{ marginBottom: "20px" }}
      >
        Information you provide us to verify your profile will be hidden with
        private mode enabled. Only your username will be shown to the
        community. Be aware that others won’t be able to see your email address
        and get in touch with you.
      </Typography>
      {privacyMode && (
        <CustomTextField
          label="Choose your username"
          placeholder="Choose a username that will not allow others to identify you."
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
