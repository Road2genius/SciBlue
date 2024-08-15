import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Typography,
  Chip,
  Box,
  Avatar,
  IconButton,
  Grid,
  Paper,
  Button,
  Tooltip,
} from "@mui/material";
import OpenInNew from "@mui/icons-material/OpenInNew";
import {
  CollaborationStatus,
  FieldsEnvironmentalArea,
  TypeOfCollaboration,
} from "../../../../shared-types/user";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { UserRequest } from "../../pages/RequestsList";
import { avatars, getAvatarKey } from "../Navbar/avatar";
import { useNavigate } from "react-router-dom";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { formatDate, truncateText } from "../../utils/utils";

const RequestCard: React.FC<{
  requestId: string;
  requestTitle: string;
  description: string;
  typeOfCollaboration: TypeOfCollaboration[];
  projectStartEndEstimation?: Date[];
  fieldsEnvironmentalAreaCustom?: string[];
  fieldsEnvironmentalAreaGeneric?: FieldsEnvironmentalArea[];
  comments?: string[];
  positiveVotes: number;
  negativeVotes: number;
  usersRequest: { [key: string]: UserRequest };
  collaborationStatus: CollaborationStatus;
  createdAt: Date;
}> = ({
  requestId,
  requestTitle,
  description,
  typeOfCollaboration,
  projectStartEndEstimation,
  fieldsEnvironmentalAreaCustom,
  fieldsEnvironmentalAreaGeneric,
  comments,
  positiveVotes,
  negativeVotes,
  usersRequest,
  collaborationStatus,
  createdAt,
}) => {
  const navigate = useNavigate();
  const handleOpenRequestDetails = () => {
    navigate(`/request/details/${requestId}`);
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [lineHeight, setLineHeight] = useState<number>(0);

  useEffect(() => {
    const updateMeasurements = () => {
      if (containerRef.current) {
        const computedStyle = getComputedStyle(containerRef.current);
        setContainerWidth(containerRef.current.clientWidth);
        setLineHeight(parseFloat(computedStyle.lineHeight));
      }
    };

    updateMeasurements();

    const resizeObserver = new ResizeObserver(() => {
      updateMeasurements();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <Box display="flex" alignItems="center">
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={12} md={1}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box display="flex" alignItems="center">
              <Box display="flex" alignItems="center">
                {positiveVotes}
                <IconButton sx={{ padding: "4px" }}>
                  <ThumbUpOffAltIcon />
                </IconButton>
              </Box>
              <Box display="flex" alignItems="center">
                {negativeVotes}
                <IconButton sx={{ padding: "4px" }}>
                  <ThumbDownOffAltIcon
                    sx={{
                      marginTop: "7px",
                      transform: "scaleX(-1)",
                    }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", color: "#004d40" }}
            >
              {comments?.length} answers
            </Typography>
            <Chip
              size="small"
              label={collaborationStatus}
              icon={
                collaborationStatus === CollaborationStatus.closed ? (
                  <DoneRoundedIcon
                    sx={{ color: "#197278", marginRight: "2px" }}
                  />
                ) : undefined
              }
              sx={{
                border: "1px solid black",
                borderRadius: "8px",
                marginTop: "7px",
                backgroundColor:
                  collaborationStatus === CollaborationStatus.closed
                    ? "#C8E6C9"
                    : "transparent",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={11}>
          <Box display="flex" justifyContent="center">
            <Card
              component={Paper}
              elevation={3}
              sx={{
                width: "100%",
                minHeight: "200px",
                borderRadius: "8px",
                marginBottom: "16px",
                padding: "15px",
                lineHeight: "20px",
              }}
              ref={containerRef}
            >
              <Box display="flex" flexDirection="column">
                <Box display="flex">
                  <Box
                    display="flex"
                    gap={1}
                    mb={1}
                    flexWrap="wrap"
                    flexGrow={1}
                  >
                    {typeOfCollaboration.map((typeCollab, index) => (
                      <Chip
                        size="small"
                        key={index}
                        label={typeCollab}
                        variant="outlined"
                        sx={{
                          backgroundColor: "#197278",
                          color: "#DAD7CD",
                          border: "1px solid black",
                          borderRadius: "8px",
                        }}
                      />
                    ))}
                    {fieldsEnvironmentalAreaCustom?.map(
                      (customEnvironmental, index) => (
                        <Chip
                          size="small"
                          key={index}
                          label={customEnvironmental}
                          variant="outlined"
                          sx={{
                            backgroundColor: "#C8E6C9",
                            border: "1px solid black",
                            borderRadius: "8px",
                          }}
                        />
                      )
                    )}
                    {fieldsEnvironmentalAreaGeneric?.map(
                      (genericEnvironmental, index) => (
                        <Chip
                          size="small"
                          key={index}
                          label={genericEnvironmental}
                          variant="outlined"
                          sx={{
                            backgroundColor: "#C8E6C9",
                            border: "1px solid black",
                            borderRadius: "8px",
                          }}
                        />
                      )
                    )}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="start"
                    mt={-1}
                    mr={-2}
                  >
                    <IconButton
                      aria-label="open"
                      onClick={handleOpenRequestDetails}
                    >
                      <OpenInNew />
                    </IconButton>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ height: "145px" }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#197278",
                      marginY: "10px",
                    }}
                  >
                    {requestTitle}
                  </Typography>
                  <Box display="flex">
                    <Typography variant="body2" paragraph>
                      Request description:{" "}
                      {truncateText(
                        description,
                        3.5,
                        lineHeight,
                        containerWidth
                      )}
                      <Button
                        onClick={handleOpenRequestDetails}
                        sx={{
                          textTransform: "none",
                          color: "#008080",
                          fontWeight: 700,
                          textDecoration: "underline",
                          marginLeft: "3px",
                          marginTop: "-3.9px",
                          padding: "0",
                          "&:hover": {
                            background: "none",
                          },
                        }}
                      >
                        See more
                      </Button>
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-end"
                >
                  <Box>
                    {projectStartEndEstimation &&
                      projectStartEndEstimation.length > 1 && (
                        <Box display="flex" alignItems="center">
                          <Typography
                            variant="body2"
                            sx={{ marginRight: "8px", marginTop: "5px" }}
                          >
                            From
                          </Typography>
                          <Chip
                            size="small"
                            label={formatDate(projectStartEndEstimation[0])}
                            sx={{
                              backgroundColor: "#fff",
                              border: "1px solid black",
                              borderRadius: "8px",
                              marginTop: "5px",
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ marginX: "8px", marginTop: "5px" }}
                          >
                            To
                          </Typography>
                          <Chip
                            size="small"
                            label={formatDate(projectStartEndEstimation[1])}
                            sx={{
                              backgroundColor: "#fff",
                              border: "1px solid black",
                              borderRadius: "8px",
                              marginTop: "5px",
                            }}
                          />
                        </Box>
                      )}
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src={
                        avatars[
                          getAvatarKey(usersRequest[requestId]?.avatar ?? "")
                        ]
                      }
                      alt="User Avatar"
                      sx={{ marginRight: "10px", border: "solid 1px gray" }}
                    />
                    <Box display="flex" flexDirection="column">
                      <Typography variant="body2">
                        Posted{" "}
                        {new Date(createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}{" "}
                        by
                      </Typography>
                      {!usersRequest[requestId].privacyLevel.mode ? (
                        <Typography variant="body2" sx={{ color: "#197278" }}>
                          {usersRequest[requestId]?.firstName} -
                          {usersRequest[requestId]?.lastName}
                        </Typography>
                      ) : (
                        <Box display="flex" alignItems="center">
                          <Typography
                            variant="subtitle2"
                            sx={{ marginBottom: "5px" }}
                          >
                            {usersRequest[requestId]?.privacyLevel.username}
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
                      <Typography variant="caption" flexWrap="wrap" width="80%">
                        {usersRequest[requestId]?.organization}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequestCard;
