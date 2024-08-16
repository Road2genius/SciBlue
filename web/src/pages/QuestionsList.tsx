import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { getUserByIdAction } from "../actions/user/user";
import { TypeOfOrganization } from "../../../shared-types/user";
import { useUserContext } from "../context/UserContext";
import { UserRes } from "../../../shared-types/userData";
import { QuestionResInterface } from "../../../shared-types/questionData";
import {
  getQuestionCommentListAction,
  getQuestionListAction,
} from "../actions/question/question";
import TabsQuestionComponent from "../components/Tabs/TabsQuestion";

export interface UserQuestion {
  id: string;
  firstName: string;
  lastName: string;
  privacyLevel: { mode: boolean; username: string };
  avatar?: string;
  organization?: TypeOfOrganization;
}

const QuestionsList: React.FC = () => {
  const classes = useStyles();
  const [questionsList, setQuestionsList] = useState<QuestionResInterface[]>(
    []
  );
  const [usersList, setUsersList] = useState<{ [key: string]: UserQuestion }>(
    {}
  );
  const [userCommentedQuestions, setUserCommentedQuestions] = useState<
    QuestionResInterface[]
  >([]);
  const [userSubmittedQuestions, setUserSubmittedQuestions] = useState<
    QuestionResInterface[]
  >([]);
  const { userContext } = useUserContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuestionsAndUsers = async () => {
      try {
        const questions = await getQuestionListAction();
        setQuestionsList(questions);

        const uniqueUserIds = [
          ...new Set(questions.map((question) => question.userId)),
        ];

        const usersData = await Promise.all(
          uniqueUserIds.map((id) => getUserByIdAction(id))
        );

        const usersMap: { [key: string]: UserQuestion } = questions.reduce(
          (acc, question) => {
            const user = usersData.find(
              (user: UserRes) => user._id === question.userId
            );
            if (user) {
              acc[question._id] = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                privacyLevel: user.privacyLevel,
                avatar: user.avatar,
                organization: user.organizationAffiliated,
              };
            }
            return acc;
          },
          {} as { [key: string]: UserQuestion }
        );
        setUsersList(usersMap);

        const commentedQuestions = [];
        const submittedQuestions = [];
        for (const question of questions) {
          const comments = await getQuestionCommentListAction(question._id);
          if (
            comments.some((comment) => comment.userId === userContext?.userId)
          ) {
            commentedQuestions.push(question);
          }
          if (question.userId === userContext?.userId) {
            submittedQuestions.push(question);
          }
        }

        setUserCommentedQuestions(commentedQuestions);
        setUserSubmittedQuestions(submittedQuestions);
      } catch (err) {
        console.log("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionsAndUsers();
  }, []);

  if (loading)
    return (
      <Box
        className={classes.root}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress sx={{ color: "#197278" }} />
      </Box>
    );

  return (
    <Container maxWidth="xl">
      <Box
        className={classes.root}
        sx={{
          minWidth: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "1200px",
          },
        }}
      >
        <Typography variant="h4" fontWeight={700} color="#197278">
          Questions and dicussions
        </Typography>
        <Typography variant="subtitle2" color="gray" mb={4}>
          Put your expertise to good use by taking part to discussions or
          answering a technical question posted by the community
        </Typography>
        <TabsQuestionComponent
          titles={[
            "All questions",
            "Questions you answered",
            "Questions you asked",
          ]}
          questionsList={questionsList}
          usersQuestion={usersList}
          userCommentedQuestions={userCommentedQuestions}
          userSubmittedQuestions={userSubmittedQuestions}
        />
      </Box>
    </Container>
  );
};

export default QuestionsList;

const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
});
