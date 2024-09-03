import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Container, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import VoteButtons from "../components/VoteButtons/VoteButtons";
import { getQuestionByIdAction, getQuestionCommentListAction } from "../actions/question/question";
import { QuestionResComment, QuestionResInterface, Vote } from "../../../shared-types/questionData";
import { initialQuestionResponseState } from "../types/formData.type";
import { CollaborationVote, DiscussionStatus } from "../../../shared-types/user";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import socket from "../services/socket";
import { useUserContext } from "../context/UserContext";
import useQuestionForm from "../hooks/useQuestionForm";
import { useSnackbar } from "notistack";
import UserInfo from "../components/UserInfo/UserInfo";
import { UserQuestion } from "./QuestionsList";
import { getUserByIdAction } from "../actions/user/user";
import EntityActions from "../components/EntityActions/EntityActions";
import DeleteEntityDialog from "../components/DeleteEntityDialog/DeleteEntityDialog";
import CommentItem, { CommentQuestionWithUser } from "../components/CommentItem/CommentItem";
import DeleteCommentDialog from "../components/DeleteCommentDialog/DeleteCommentDialog";
import CustomTextField from "../components/CustomTextField/CustomTextField";
import { Trans, useTranslation } from "react-i18next";
import { useTranslatedEnum } from "../hooks/useTranslatedEnum";

const questionCreatorInitial = {
  id: "",
  firstName: "",
  lastName: "",
  privacyLevel: { mode: false, username: "" },
  avatar: "",
  organization: undefined,
};

const QuestionDetail: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { translatedDiscussionStatus, translatedFieldsEnvironmentalArea } = useTranslatedEnum();
  const { questionId } = useParams();
  const { userContext } = useUserContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [commentsList, setCommentsList] = useState<CommentQuestionWithUser[]>([]);
  const [openDialogDeleteComment, setOpenDialogDeleteComment] = useState<{
    open: boolean;
    commentId: string;
  }>({ open: false, commentId: "" });
  const [questionDetails, setQuestionDetails] = useState<QuestionResInterface>(initialQuestionResponseState);
  const [questionCreator, setQuestionCreator] = useState<UserQuestion>(questionCreatorInitial);
  const [openDialogDeleteQuestion, setOpenDialogDeleteQuestion] = useState<boolean>(false);
  const [editingComments, setEditingComments] = useState<{
    [key: string]: { isEditing: boolean; editedText: string };
  }>({});
  const [handleComment, setHandleComment] = useState<string>("");

  const {
    submitVoteQuestion,
    handleUpdateQuestion,
    handleDeleteQuestion,
    submitVoteQuestionComment,
    handleCreateQuestionComment,
    deleteQuestionComment,
    updateQuestionComment,
  } = useQuestionForm({
    onSuccessVoteQuestion: () =>
      enqueueSnackbar("Vote question successfully recorded", {
        variant: "success",
      }),
    onErrorVoteQuestion: () =>
      enqueueSnackbar("Failed to submit a vote on question", {
        variant: "error",
      }),
    onSuccessUpdateQuestion: () =>
      enqueueSnackbar("Question successfully updated", {
        variant: "success",
      }),
    onErrorUpdateQuestion: () =>
      enqueueSnackbar("Failed to update the question", {
        variant: "error",
      }),
  });

  useEffect(() => {
    socket.on("voteQuestionUpdate", (data) => {
      if (data.questionId === questionDetails._id) {
        setQuestionDetails((prevDetails) => ({
          ...prevDetails,
          votes: data.votes,
          positiveVotes: data.positiveVotes,
          negativeVotes: data.negativeVotes,
        }));
      }
    });

    return () => {
      socket.off("voteQuestionUpdate");
    };
  }, [questionDetails._id, setQuestionDetails]);

  const handleEditClick = (commentId: string, currentText: string) => {
    setEditingComments({
      ...editingComments,
      [commentId]: { isEditing: true, editedText: currentText },
    });
  };

  const handleTextChange = (commentId: string, newText: string) => {
    setEditingComments({
      ...editingComments,
      [commentId]: { ...editingComments[commentId], editedText: newText },
    });
  };

  const handleSaveCommentClick = async (commentId: string) => {
    const { editedText } = editingComments[commentId];
    await updateQuestionComment(commentId, editedText);
    setEditingComments({});
  };

  const handleDeleteCommentDialog = () => {
    deleteQuestionComment(openDialogDeleteComment.commentId);
    setOpenDialogDeleteComment({ open: false, commentId: "" });
  };

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        if (questionId) {
          const response = await getQuestionByIdAction(questionId);
          setQuestionDetails(response);
        }
      } catch (error) {
        console.error("Failed to fetch question details", error);
      }
    };

    fetchQuestionDetails();

    const handleQuestionUpdated = (data: { updatedQuestion: QuestionResInterface }) => {
      if (data.updatedQuestion._id === questionId) {
        setQuestionDetails(data.updatedQuestion);
      }
    };

    socket.on("questionUpdated", handleQuestionUpdated);

    return () => {
      socket.off("questionUpdated", handleQuestionUpdated);
    };
  }, [questionId]);

  useEffect(() => {
    const fetchQuestionCreator = async () => {
      try {
        if (questionDetails.userId) {
          const responseUser = await getUserByIdAction(questionDetails.userId);
          setQuestionCreator({
            id: responseUser._id,
            firstName: responseUser.firstName,
            lastName: responseUser.lastName,
            privacyLevel: responseUser.privacyLevel,
            avatar: responseUser.avatar,
            organization: responseUser.organizationAffiliated,
          });
        }
      } catch (error) {
        console.error("Failed to fetch request creator", error);
      }
    };

    fetchQuestionCreator();
  }, [questionDetails.userId]);

  useEffect(() => {
    const fetchQuestionCommentsWithUserDetails = async () => {
      try {
        if (questionDetails._id) {
          const comments = await getQuestionCommentListAction(questionDetails._id);

          const userCache = new Map();

          const commentsWithUserDetails = await Promise.all(
            comments.map(async (comment) => {
              if (!userCache.has(comment.userId)) {
                const user = await getUserByIdAction(comment.userId);
                userCache.set(comment.userId, user);
              }

              return {
                ...comment,
                user: userCache.get(comment.userId),
              };
            })
          );

          setCommentsList(commentsWithUserDetails);
        }
      } catch (error) {
        console.error("Failed to fetch comments and user details", error);
      }
    };

    fetchQuestionCommentsWithUserDetails();

    const handleCommentCreated = (data: { questionId: string; comment: CommentQuestionWithUser }) => {
      if (data.questionId === questionDetails._id) {
        setCommentsList((prevComments) => [...prevComments, data.comment]);
      }
    };

    const handleCommentUpdated = (data: { comment: CommentQuestionWithUser }) => {
      setCommentsList((prevComments) =>
        prevComments.map((comment) => (comment._id === data.comment._id ? data.comment : comment))
      );
    };

    const handleCommentDeleted = (data: { commentId: string }) => {
      setCommentsList((prevComments) => prevComments.filter((comment) => comment._id !== data.commentId));
    };

    const handleVoteCommentUpdate = (data: { comment: CommentQuestionWithUser }) => {
      setCommentsList((prevComments) =>
        prevComments.map((comment) => (comment._id === data.comment._id ? data.comment : comment))
      );
    };

    socket.on("questionCommentCreated", handleCommentCreated);
    socket.on("questionCommentUpdated", handleCommentUpdated);
    socket.on("questionCommentDeleted", handleCommentDeleted);
    socket.on("voteQuestionCommentUpdate", handleVoteCommentUpdate);

    return () => {
      socket.off("questionCommentCreated", handleCommentCreated);
      socket.off("questionCommentUpdated", handleCommentUpdated);
      socket.off("questionCommentDeleted", handleCommentDeleted);
      socket.off("voteQuestionCommentUpdate", handleVoteCommentUpdate);
    };
  }, [questionDetails._id]);

  const userHasVotedPositiveOnQuestion: boolean = questionDetails.votes.some(
    (vote: Vote) => vote.userId === userContext?.userId && vote.vote === CollaborationVote.positive
  );

  const userHasVotedNegativeOnQuestion: boolean = questionDetails.votes.some(
    (vote: Vote) => vote.userId === userContext?.userId && vote.vote === CollaborationVote.negative
  );

  const userHasVotedPositiveOnComment = (comment: QuestionResComment): boolean => {
    return comment.votes.some(
      (vote: Vote) => vote.userId === userContext?.userId && vote.vote === CollaborationVote.positive
    );
  };

  const userHasVotedNegativeOnComment = (comment: QuestionResComment): boolean => {
    return comment.votes.some(
      (vote: Vote) => vote.userId === userContext?.userId && vote.vote === CollaborationVote.negative
    );
  };

  const handleUpdateQuestionStatus = () => {
    let newCollaborationStatus: DiscussionStatus;
    if (questionDetails.discussionStatus === DiscussionStatus.open) {
      newCollaborationStatus = DiscussionStatus.closed;
    } else {
      newCollaborationStatus = DiscussionStatus.open;
    }
    handleUpdateQuestion(questionDetails._id, {
      ...questionDetails,
      discussionStatus: newCollaborationStatus,
    });
  };

  const handleDeleteQuestionDialog = () => {
    handleDeleteQuestion(questionDetails._id);
    setOpenDialogDeleteQuestion(false);
    navigate("/discussions/list");
  };

  const handleCreateQuestionCommentAndClean = () => {
    handleCreateQuestionComment(questionDetails._id, handleComment);
    setHandleComment("");
  };

  return (
    <Container maxWidth="xl">
      <Box
        mt={10}
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
        <Box display="flex" flexDirection="column">
          <Box display="flex">
            <VoteButtons
              entityId={questionDetails._id}
              positiveVotes={questionDetails.positiveVotes}
              negativeVotes={questionDetails.negativeVotes}
              userHasVotedPositive={userHasVotedPositiveOnQuestion}
              userHasVotedNegative={userHasVotedNegativeOnQuestion}
              submitVote={submitVoteQuestion}
            />
            <UserInfo
              avatar={questionCreator.avatar}
              firstName={questionCreator.firstName}
              lastName={questionCreator.lastName}
              privacyLevel={questionCreator.privacyLevel}
              organization={questionCreator.organization}
              createdAt={questionDetails.createdAt}
              updatedAt={questionDetails.updatedAt}
            />
          </Box>
          <Box display="flex" my={2} alignItems="center">
            <Typography variant="body2">
              <Trans i18nKey="questions_detail_statut" />
            </Typography>
            <Chip
              size="small"
              label={translatedDiscussionStatus[questionDetails.discussionStatus]}
              icon={
                questionDetails.discussionStatus === DiscussionStatus.closed ? (
                  <DoneRoundedIcon sx={{ color: "#197278", marginRight: "2px" }} />
                ) : undefined
              }
              sx={{
                backgroundColor:
                  questionDetails.discussionStatus === DiscussionStatus.closed ? "#C8E6C9" : "transparent",
                border: "1px solid black",
                borderRadius: "8px",
                marginLeft: "5px",
              }}
            />
          </Box>
          <Box my={4}>
            <Typography variant="h5" fontWeight={600} sx={{ marginBottom: "15px" }}>
              {questionDetails.title}
            </Typography>
            <Box display="flex" gap={1} my={1} flexWrap="wrap" mb={8}>
              {questionDetails.fieldsEnvironmentalArea.generic?.map((genericField, index) => (
                <Chip
                  size="small"
                  key={index}
                  label={translatedFieldsEnvironmentalArea[genericField]}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#C8E6C9",
                    border: "1px solid black",
                    borderRadius: "8px",
                  }}
                />
              ))}
              {questionDetails.fieldsEnvironmentalArea.custom?.map((customField, index) => (
                <Chip
                  size="small"
                  key={index}
                  label={customField}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#C8E6C9",
                    border: "1px solid black",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </Box>
            <Typography variant="subtitle2" paragraph>
              {questionDetails.body}
            </Typography>
          </Box>
          <EntityActions
            entityId={questionDetails._id}
            userId={questionDetails.userId}
            currentUserId={userContext?.userId}
            entityType="question"
            status={questionDetails.discussionStatus}
            handleUpdateStatus={handleUpdateQuestionStatus}
            setOpenDialogDelete={setOpenDialogDeleteQuestion}
          />
        </Box>
        <Divider
          sx={{
            marginY: "50px",
            borderBottomWidth: 2,
            backgroundColor: "black",
          }}
        />
        <Box mb={3}>
          <Typography variant="h6" fontWeight={600}>
            {questionDetails.comments.length}
            {questionDetails.comments.length <= 1 ? (
              <Trans i18nKey="questions_detail_answer" />
            ) : (
              <Trans i18nKey="questions_detail_answers" />
            )}
          </Typography>
        </Box>
        {commentsList.map((comment: CommentQuestionWithUser, index: number) => (
          <CommentItem
            key={index}
            comment={comment}
            userHasVotedPositive={userHasVotedPositiveOnComment(comment)}
            userHasVotedNegative={userHasVotedNegativeOnComment(comment)}
            editingComment={
              editingComments[comment._id] || {
                isEditing: false,
                editedText: "",
              }
            }
            userContextId={userContext?.userId}
            submitVoteComment={submitVoteQuestionComment}
            handleTextChange={handleTextChange}
            handleSaveCommentClick={handleSaveCommentClick}
            handleEditClick={handleEditClick}
            cancelEditComment={() => setEditingComments({})}
            setOpenDialogDeleteComment={setOpenDialogDeleteComment}
          />
        ))}
        <CustomTextField
          label={t("questions_detail_comment_label_textfield")}
          placeholder=""
          type="text"
          value={handleComment}
          multiline
          onChange={(e) => setHandleComment(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "180px",
            borderRadius: "8px",
            textTransform: "none",
            height: "50px",
            fontWeight: 700,
            backgroundColor: "#008080",
            "&:hover": {
              backgroundColor: "#006666",
            },
            alignSelf: "flex-end",
            marginY: "20px",
          }}
          onClick={handleCreateQuestionCommentAndClean}
        >
          <Trans i18nKey="questions_detail_button_post_comment" />
        </Button>
      </Box>
      <DeleteCommentDialog
        open={openDialogDeleteComment.open}
        onClose={() => setOpenDialogDeleteComment({ open: false, commentId: "" })}
        onConfirm={handleDeleteCommentDialog}
      />
      <DeleteEntityDialog
        open={openDialogDeleteQuestion}
        onClose={() => setOpenDialogDeleteQuestion(false)}
        onConfirm={handleDeleteQuestionDialog}
        entityType="question"
      />
    </Container>
  );
};

export default QuestionDetail;

const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
});
