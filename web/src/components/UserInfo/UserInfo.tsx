import React from "react";
import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import { formatDate, getModifiedTimeAgo } from "../../utils/utils";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getAvatar } from "../Navbar/avatar";
import { Trans, useTranslation } from "react-i18next";
import { useTranslatedEnum } from "../../hooks/useTranslatedEnum";
import { TypeOfOrganization } from "../../../../shared-types/user";

interface UserInfoProps {
  listCard?: boolean;
  avatar?: string;
  firstName: string;
  lastName: string;
  organization?: string;
  privacyLevel?: { mode: boolean; username: string };
  createdAt: string | Date;
  updatedAt?: string | Date;
}

const UserInfo: React.FC<UserInfoProps> = ({
  listCard,
  avatar,
  firstName,
  lastName,
  organization,
  privacyLevel,
  createdAt,
  updatedAt,
}) => {
  useTranslation();

  const { translatedOrganizations } = useTranslatedEnum();

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center">
        <Avatar
          src={getAvatar(avatar ?? "")}
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
            <Trans i18nKey="request_card_posted" /> {formatDate(createdAt)}{" "}
            <Trans i18nKey="request_card_by" />
          </Typography>
          {!privacyLevel?.mode ? (
            <Typography variant="body2" sx={{ color: "#197278" }}>
              {firstName} - {lastName}
            </Typography>
          ) : (
            <Box display="flex" alignItems="center">
              <Typography variant="body2" sx={{ color: "#197278" }}>
                {privacyLevel?.username}
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
            {translatedOrganizations[organization as TypeOfOrganization]}
          </Typography>
        </Box>
      </Box>
      {updatedAt && !listCard && (
        <Typography
          variant="subtitle2"
          color="grey"
          sx={{ marginLeft: "4px", marginTop: "4px" }}
        >
          <Trans i18nKey="request_card_modified" />{" "}
          {getModifiedTimeAgo(updatedAt)} <Trans i18nKey="request_card_ago" />
        </Typography>
      )}
    </Box>
  );
};

export default UserInfo;
