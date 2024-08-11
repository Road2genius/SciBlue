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
} from "@mui/material";
import OpenInNew from "@mui/icons-material/OpenInNew";
import {
  CollaborationStatus,
  FieldsProfessionalActivity,
  TypeOfCollaboration,
} from "../../../../shared-types/user";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { UserRequest } from "../../pages/RequestsList";
import { avatars, getAvatarKey } from "../Navbar/avatar";
import { useNavigate } from "react-router-dom";
import { truncateText } from "../../utils/utils";

const RequestCard: React.FC<{
  requestId: string;
  requestTitle: string;
  description: string;
  typeOfCollaboration: TypeOfCollaboration[];
  projectStartEndEstimation?: Date[];
  fieldsOfApplicationCustom?: string[];
  fieldsOfApplicationGeneric?: FieldsProfessionalActivity[];
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
  fieldsOfApplicationCustom,
  fieldsOfApplicationGeneric,
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
              label={collaborationStatus}
              sx={{
                backgroundColor: "#fff",
                border: "1px solid black",
                borderRadius: "8px",
                marginTop: "7px",
                "&:hover": {
                  backgroundColor: "#C8E6C9",
                  flexWrap: "nowrap",
                },
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
                    {fieldsOfApplicationCustom?.map(
                      (customApplication, index) => (
                        <Chip
                          size="small"
                          key={index}
                          label={customApplication}
                          variant="outlined"
                          sx={{
                            backgroundColor: "#C8E6C9",
                            border: "1px solid black",
                            borderRadius: "8px",
                          }}
                        />
                      )
                    )}
                    {fieldsOfApplicationGeneric?.map(
                      (genericApplication, index) => (
                        <Chip
                          size="small"
                          key={index}
                          label={genericApplication}
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
                  <Typography variant="body2" paragraph>
                    Request description:{" "}
                    {truncateText(description, 3.5, lineHeight, containerWidth)}
                  </Typography>
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
                            label={new Date(
                              projectStartEndEstimation[0]
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            })}
                            sx={{
                              backgroundColor: "#fff",
                              border: "1px solid black",
                              borderRadius: "8px",
                              marginTop: "7px",
                              "&:hover": {
                                backgroundColor: "#C8E6C9",
                                flexWrap: "nowrap",
                              },
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
                            label={new Date(
                              projectStartEndEstimation[1]
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            })}
                            sx={{
                              backgroundColor: "#fff",
                              border: "1px solid black",
                              borderRadius: "8px",
                              marginTop: "7px",
                              "&:hover": {
                                backgroundColor: "#C8E6C9",
                                flexWrap: "nowrap",
                              },
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
                      sx={{ marginRight: "10px" }}
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
                      <Typography variant="body2" sx={{ color: "#197278" }}>
                        {usersRequest[requestId]?.firstName} -{" "}
                        {usersRequest[requestId]?.lastName}
                      </Typography>
                      <Typography variant="caption" flexWrap="wrap" width="80%">
                        {usersRequest[requestId]?.organization?.split(",")[0]}
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
