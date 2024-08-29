import React, { useEffect, useRef, useState } from "react";
import { Typography, Chip, Box, IconButton, Grid, Button, Divider } from "@mui/material";
import OpenInNew from "@mui/icons-material/OpenInNew";
import { DiscussionStatus } from "../../../../shared-types/user";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useNavigate } from "react-router-dom";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { truncateText } from "../../utils/utils";
import { QuestionResInterface } from "../../../../shared-types/questionData";
import { UserQuestion } from "../../pages/QuestionsList";
import UserInfo from "../UserInfo/UserInfo";
import { Trans, useTranslation } from "react-i18next";
import { useTranslatedEnum } from "../../hooks/useTranslatedEnum";

const QuestionCard: React.FC<{
  question: QuestionResInterface;
  usersQuestion: { [key: string]: UserQuestion };
}> = ({ question, usersQuestion }) => {
  const navigate = useNavigate();
  useTranslation();
  const handleOpenQuestionDetails = () => {
    navigate(`/question/details/${question._id}`);
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [lineHeight, setLineHeight] = useState<number>(0);

  const { translatedDiscussionStatus, translatedFieldsEnvironmentalArea } = useTranslatedEnum();

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
    <>
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={12} md={1}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Box display="flex" alignItems="center">
              <Box display="flex" alignItems="center">
                {question.positiveVotes}
                <ThumbUpOffAltIcon />
              </Box>
              <Box display="flex" alignItems="center" sx={{ marginLeft: "5px" }}>
                {question.negativeVotes}
                <ThumbDownOffAltIcon
                  sx={{
                    marginTop: "5px",
                    transform: "scaleX(-1)",
                  }}
                />
              </Box>
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#004d40" }}>
              {question.comments?.length} <Trans i18nKey="request_card_answers" />
            </Typography>
            <Chip
              size="small"
              label={translatedDiscussionStatus[question.discussionStatus]}
              icon={
                question.discussionStatus === DiscussionStatus.closed ? (
                  <DoneRoundedIcon sx={{ color: "#197278", marginRight: "2px" }} />
                ) : undefined
              }
              sx={{
                border: "1px solid black",
                borderRadius: "8px",
                marginTop: "7px",
                backgroundColor: question.discussionStatus === DiscussionStatus.closed ? "#C8E6C9" : "transparent",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={11}>
          <Box
            display="flex"
            sx={{
              width: "100%",

              lineHeight: "20px",
            }}
            ref={containerRef}
          >
            <Box display="flex" flexDirection="column" width="100%">
              <Box display="flex" justifyContent="flex-end" alignItems="start" mr={-1}>
                <IconButton aria-label="open" onClick={handleOpenQuestionDetails}>
                  <OpenInNew />
                </IconButton>
              </Box>
              <Box display="flex" flexDirection="column">
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#197278",
                    marginY: "10px",
                  }}
                >
                  {question.title}
                </Typography>
                <Box display="flex">
                  <Typography variant="body2" paragraph>
                    {truncateText(question.body, 3.5, lineHeight, containerWidth)}
                    <Button
                      onClick={handleOpenQuestionDetails}
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
                      <Trans i18nKey="request_card_see_more" />
                    </Button>
                  </Typography>
                </Box>
              </Box>
              <Box display="flex">
                <Grid container spacing={5}>
                  <Grid item xs={12} md={9}>
                    <Box flexWrap="wrap" flexGrow={1}>
                      {question.fieldsEnvironmentalArea.generic.map((genericEnvironmental, index) => (
                        <Chip
                          size="small"
                          key={index}
                          label={translatedFieldsEnvironmentalArea[genericEnvironmental]}
                          variant="outlined"
                          sx={{
                            border: "1px solid black",
                            borderRadius: "8px",
                            marginRight: "10px",
                            marginTop: "5px",
                          }}
                        />
                      ))}
                      {question.fieldsEnvironmentalArea.custom?.map((customEnvironmental, index) => (
                        <Chip
                          size="small"
                          key={index}
                          label={customEnvironmental}
                          variant="outlined"
                          sx={{
                            border: "1px solid black",
                            borderRadius: "8px",
                            marginRight: "10px",
                            marginTop: "5px",
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <UserInfo
                      listCard
                      avatar={usersQuestion[question._id]?.avatar}
                      firstName={usersQuestion[question._id]?.firstName}
                      lastName={usersQuestion[question._id]?.lastName}
                      privacyLevel={usersQuestion[question._id]?.privacyLevel}
                      organization={usersQuestion[question._id]?.organization}
                      createdAt={question.createdAt}
                      updatedAt={question.updatedAt}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box mt={8} mb={5}>
        <Divider
          variant="fullWidth"
          sx={{
            borderBottomWidth: 2,
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

export default QuestionCard;
