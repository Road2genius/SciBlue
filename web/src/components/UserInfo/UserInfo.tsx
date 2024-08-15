import React from "react";
import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import { avatars, getAvatarKey } from "../../components/Navbar/avatar";
import { formatDate, getModifiedTimeAgo } from "../../utils/utils";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface UserInfoProps {
  avatar?: string;
  firstName: string;
  lastName: string;
  organization?: string;
  privacyLevel: { mode: boolean; username: string };
  createdAt: string | Date;
  updatedAt?: string | Date;
}

const UserInfo: React.FC<UserInfoProps> = ({
  avatar,
  firstName,
  lastName,
  organization,
  privacyLevel,
  createdAt,
  updatedAt,
}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center">
        <Avatar
          src={avatars[getAvatarKey(avatar)]}
          alt="User Avatar"
          sx={{
            width: 64,
            height: 64,
            marginRight: "10px",
            border: "solid 1px gray",
          }}
        />
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle2" color="grey">
            Posted {formatDate(createdAt)} by
          </Typography>
          {!privacyLevel.mode ? (
            <Typography variant="body2" sx={{ color: "#197278" }}>
              {firstName} - {lastName}
            </Typography>
          ) : (
            <Box display="flex" alignItems="center">
              <Typography variant="body2" sx={{ color: "#197278" }}>
                {privacyLevel.username}
              </Typography>
              <Tooltip title="This user has activated private mode">
                <VisibilityOffIcon
                  fontSize="inherit"
                  sx={{
                    fontSize: "24px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                />
              </Tooltip>
            </Box>
          )}
          <Typography variant="caption" flexWrap="wrap" width="100%">
            {organization}
          </Typography>
        </Box>
      </Box>
      {updatedAt && (
        <Typography
          variant="subtitle2"
          color="grey"
          sx={{ marginLeft: "4px", marginTop: "4px" }}
        >
          Modified {getModifiedTimeAgo(updatedAt)} ago
        </Typography>
      )}
    </Box>
  );
};

export default UserInfo;
