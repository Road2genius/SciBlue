import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { avatars, getAvatarKey } from "../../components/Navbar/avatar";
import { formatDate, getModifiedTimeAgo } from "../../utils/utils";

interface UserInfoProps {
  avatar?: string;
  firstName: string;
  lastName: string;
  organization?: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
}

const UserInfo: React.FC<UserInfoProps> = ({
  avatar,
  firstName,
  lastName,
  organization,
  createdAt,
  updatedAt,
}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center">
        <Avatar
          src={avatars[getAvatarKey(avatar)]}
          alt="User Avatar"
          sx={{ width: 64, height: 64, marginRight: "10px" }}
        />
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle2" color="grey">
            Posted {formatDate(createdAt)} by
          </Typography>
          <Typography variant="body2" sx={{ color: "#197278" }}>
            {firstName} - {lastName}
          </Typography>
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
