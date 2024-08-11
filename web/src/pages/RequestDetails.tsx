import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { useParams } from "react-router-dom";
import {
  getRequestByIdAction,
  getRequestCommentListAction,
} from "../actions/request/request";
import {
  RequestResComment,
  RequestResInterface,
  Vote,
} from "../../../shared-types/requestData";
import useRequestForm from "../hooks/useRequestForm";
import { useSnackbar } from "notistack";
import {
  CollaborationStatus,
  CollaborationVote,
} from "../../../shared-types/user";
import { useUserContext } from "../context/UserContext";
import { UserRequest } from "./RequestsList";
import { getUserByIdAction } from "../actions/user/user";
import CustomTextField from "../components/CustomTextField/CustomTextField";
import socket from "../services/socket";
import { useNavigate } from "react-router-dom";
import { initialResponseState } from "../types/formData.type";
import VoteButtons from "../components/VoteButtons/VoteButtons";
import UserInfo from "../components/UserInfo/UserInfo";
import ProjectDetails from "../components/ProjectDetails/ProjectDetails";
import CollaborationDetails from "../components/CollaborationDetails/CollaborationDetails";
import EntityActions from "../components/EntityActions/EntityActions";
import CommentItem, {
  CommentWithUser,
} from "../components/CommentItem/CommentItem";
import DeleteCommentDialog from "../components/DeleteCommentDialog/DeleteCommentDialog";
import DeleteEntityDialog from "../components/DeleteEntityDialog/DeleteEntityDialog";

const requestCreatorInitial = {
  id: "",
  firstName: "",
  lastName: "",
  avatar: "",
  organization: undefined,
};

const RequestsDetail: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const [requestDetails, setRequestDetails] =
    useState<RequestResInterface>(initialResponseState);
  const [requestCreator, setRequestCreator] = useState<UserRequest>(
    requestCreatorInitial
  );
  const [handleComment, setHandleComment] = useState<string>("");
  const [commentsList, setCommentsList] = useState<CommentWithUser[]>([]);
  const [openDialogDeleteComment, setOpenDialogDeleteComment] = useState<{
    open: boolean;
    commentId: string;
  }>({ open: false, commentId: "" });
  const [openDialogDeleteRequest, setOpenDialogDeleteRequest] =
    useState<boolean>(false);
  const [editingComments, setEditingComments] = useState<{
    [key: string]: { isEditing: boolean; editedText: string };
  }>({});

  const { enqueueSnackbar } = useSnackbar();
  const { userContext } = useUserContext();
  const {
    submitVoteRequest,
    handleCreateComment,
    deleteRequestComment,
    updateRequestComment,
    submitVoteComment,
    handleDeleteRequest,
    handleUpdateRequest,
  } = useRequestForm({
    onSuccessVoteRequest: () =>
      enqueueSnackbar("Vote request successfully recorded", {
        variant: "success",
      }),
    onErrorVoteRequest: () =>
      enqueueSnackbar("Failed to submit a vote on request", {
        variant: "error",
      }),
    onSuccessCreateComment: () =>
      enqueueSnackbar("Comment successfully created", { variant: "success" }),
    onErrorCreateComment: () =>
      enqueueSnackbar("Failed to create a new comment", { variant: "error" }),
    onSuccessDeleteComment: () =>
      enqueueSnackbar("Comment successfully deleted", { variant: "success" }),
    onErrorDeleteComment: () =>
      enqueueSnackbar("Failed to delete comment", { variant: "error" }),
    onSuccessUpdateComment: () =>
      enqueueSnackbar("Comment successfully edited", { variant: "success" }),
    onErrorUpdateComment: () =>
      enqueueSnackbar("Failed to edit comment", { variant: "error" }),
    onSuccessVoteComment: () =>
      enqueueSnackbar("Vote comment successfully recorded", {
        variant: "success",
      }),
    onErrorVoteComment: () =>
      enqueueSnackbar("Failed to submit a vote on comment", {
        variant: "error",
      }),
    onSuccessUpdateRequest: () =>
      enqueueSnackbar("Request status successfully updated", {
        variant: "success",
      }),
    onErrorUpdateRequest: () =>
      enqueueSnackbar("Failed to update request status", {
        variant: "error",
      }),
    onSuccessDeleteRequest: () =>
      enqueueSnackbar("Request has been deleted", {
        variant: "warning",
      }),
    onErrorDeleteRequest: () =>
      enqueueSnackbar("Failed to delete request", {
        variant: "error",
      }),
  });

  useEffect(() => {
    socket.on("voteRequestUpdate", (data) => {
      if (data.requestId === requestDetails._id) {
        setRequestDetails((prevDetails) => ({
          ...prevDetails,
          votes: data.votes,
          positiveVotes: data.positiveVotes,
          negativeVotes: data.negativeVotes,
        }));
      }
    });

    return () => {
      socket.off("voteRequestUpdate");
    };
  }, [requestDetails._id, setRequestDetails]);

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
    await updateRequestComment(commentId, editedText);
    setEditingComments({});
  };

  const handleDeleteCommentDialog = () => {
    deleteRequestComment(openDialogDeleteComment.commentId);
    setOpenDialogDeleteComment({ open: false, commentId: "" });
  };

  const handleDeleteRequestDialog = () => {
    handleDeleteRequest(requestDetails._id);
    setOpenDialogDeleteRequest(false);
    navigate("/request/list");
  };

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        if (id) {
          const response = await getRequestByIdAction(id);
          setRequestDetails(response);
        }
      } catch (error) {
        console.error("Failed to fetch request details", error);
      }
    };

    fetchRequestDetails();

    const handleRequestUpdated = (data: {
      updatedRequest: RequestResInterface;
    }) => {
      if (data.updatedRequest._id === id) {
        setRequestDetails(data.updatedRequest);
      }
    };

    socket.on("requestUpdated", handleRequestUpdated);

    return () => {
      socket.off("requestUpdated", handleRequestUpdated);
    };
  }, [id]);

  useEffect(() => {
    const fetchRequestCreator = async () => {
      try {
        if (requestDetails.userId) {
          const responseUser = await getUserByIdAction(requestDetails.userId);
          setRequestCreator({
            id: responseUser._id,
            firstName: responseUser.firstName,
            lastName: responseUser.lastName,
            avatar: responseUser.avatar,
            organization: responseUser.organizationAffiliated[0],
          });
        }
      } catch (error) {
        console.error("Failed to fetch request creator", error);
      }
    };

    fetchRequestCreator();
  }, [requestDetails.userId]);

  useEffect(() => {
    const fetchRequestCommentsWithUserDetails = async () => {
      try {
        if (requestDetails._id) {
          const comments = await getRequestCommentListAction(
            requestDetails._id
          );

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

    fetchRequestCommentsWithUserDetails();

    const handleCommentCreated = (data: {
      requestId: string;
      comment: CommentWithUser;
    }) => {
      if (data.requestId === requestDetails._id) {
        setCommentsList((prevComments) => [...prevComments, data.comment]);
      }
    };

    const handleCommentUpdated = (data: { comment: CommentWithUser }) => {
      setCommentsList((prevComments) =>
        prevComments.map((comment) =>
          comment._id === data.comment._id ? data.comment : comment
        )
      );
    };

    const handleCommentDeleted = (data: { commentId: string }) => {
      setCommentsList((prevComments) =>
        prevComments.filter((comment) => comment._id !== data.commentId)
      );
    };

    const handleVoteCommentUpdate = (data: { comment: CommentWithUser }) => {
      setCommentsList((prevComments) =>
        prevComments.map((comment) =>
          comment._id === data.comment._id ? data.comment : comment
        )
      );
    };

    socket.on("commentCreated", handleCommentCreated);
    socket.on("commentUpdated", handleCommentUpdated);
    socket.on("commentDeleted", handleCommentDeleted);
    socket.on("voteCommentUpdate", handleVoteCommentUpdate);

    return () => {
      socket.off("commentCreated", handleCommentCreated);
      socket.off("commentUpdated", handleCommentUpdated);
      socket.off("commentDeleted", handleCommentDeleted);
      socket.off("voteCommentUpdate", handleVoteCommentUpdate);
    };
  }, [requestDetails._id]);

  const userHasVotedPositiveOnRequest: boolean = requestDetails.votes.some(
    (vote: Vote) =>
      vote.userId === userContext?.userId &&
      vote.vote === CollaborationVote.positive
  );

  const userHasVotedNegativeOnRequest: boolean = requestDetails.votes.some(
    (vote: Vote) =>
      vote.userId === userContext?.userId &&
      vote.vote === CollaborationVote.negative
  );

  const userHasVotedPositiveOnComment = (
    comment: RequestResComment
  ): boolean => {
    return comment.votes.some(
      (vote: Vote) =>
        vote.userId === userContext?.userId &&
        vote.vote === CollaborationVote.positive
    );
  };

  const userHasVotedNegativeOnComment = (
    comment: RequestResComment
  ): boolean => {
    return comment.votes.some(
      (vote: Vote) =>
        vote.userId === userContext?.userId &&
        vote.vote === CollaborationVote.negative
    );
  };

  const handleCreateCommentAndClean = () => {
    handleCreateComment(requestDetails._id, handleComment);
    setHandleComment("");
  };

  const handleUpdateRequestStatus = () => {
    let newCollaborationStatus: CollaborationStatus;
    if (requestDetails.collaborationStatus === CollaborationStatus.open) {
      newCollaborationStatus = CollaborationStatus.closed;
    } else {
      newCollaborationStatus = CollaborationStatus.open;
    }
    handleUpdateRequest(requestDetails._id, {
      ...requestDetails,
      collaborationStatus: newCollaborationStatus,
    });
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
              entityId={requestDetails._id}
              positiveVotes={requestDetails.positiveVotes}
              negativeVotes={requestDetails.negativeVotes}
              userHasVotedPositive={userHasVotedPositiveOnRequest}
              userHasVotedNegative={userHasVotedNegativeOnRequest}
              submitVote={submitVoteRequest}
            />
            <UserInfo
              avatar={requestCreator.avatar}
              firstName={requestCreator.firstName}
              lastName={requestCreator.lastName}
              organization={requestCreator.organization}
              createdAt={requestDetails.createdAt}
              updatedAt={requestDetails.updatedAt}
            />
          </Box>
          <Box display="flex" my={2} alignItems="center">
            <Typography variant="body2">This request is</Typography>
            <Chip
              size="small"
              label={requestDetails.collaborationStatus}
              icon={
                requestDetails.collaborationStatus ===
                CollaborationStatus.closed ? (
                  <DoneRoundedIcon
                    sx={{ color: "#197278", marginRight: "2px" }}
                  />
                ) : undefined
              }
              sx={{
                backgroundColor:
                  requestDetails.collaborationStatus ===
                  CollaborationStatus.closed
                    ? "#C8E6C9"
                    : "transparent",
                border: "1px solid black",
                borderRadius: "8px",
                marginLeft: "5px",
              }}
            />
          </Box>
          <ProjectDetails project={requestDetails.project} />
          <Box my={2}>
            <CollaborationDetails
              kindOfCollaborationWanted={
                requestDetails.kindOfCollaborationWanted
              }
              specificsSkills={requestDetails.specificsSkills}
            />
          </Box>
          <EntityActions
            entityId={requestDetails._id}
            userId={requestDetails.userId}
            currentUserId={userContext?.userId}
            entityType="request"
            collaborationStatus={requestDetails.collaborationStatus}
            handleUpdateStatus={handleUpdateRequestStatus}
            setOpenDialogDelete={setOpenDialogDeleteRequest}
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
            {requestDetails.comments.length}
            {requestDetails.comments.length <= 1 ? " comment" : " comments"}
          </Typography>
        </Box>
        {commentsList.map((comment: CommentWithUser, index: number) => (
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
            submitVoteComment={submitVoteComment}
            handleTextChange={handleTextChange}
            handleSaveCommentClick={handleSaveCommentClick}
            handleEditClick={handleEditClick}
            cancelEditComment={() => setEditingComments({})}
            setOpenDialogDeleteComment={setOpenDialogDeleteComment}
          />
        ))}
        <CustomTextField
          label="Post a comment or say that you are interested"
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
          onClick={handleCreateCommentAndClean}
        >
          Post comment
        </Button>
      </Box>
      <DeleteCommentDialog
        open={openDialogDeleteComment.open}
        onClose={() =>
          setOpenDialogDeleteComment({ open: false, commentId: "" })
        }
        onConfirm={handleDeleteCommentDialog}
      />
      <DeleteEntityDialog
        open={openDialogDeleteRequest}
        onClose={() => setOpenDialogDeleteRequest(false)}
        onConfirm={handleDeleteRequestDialog}
        entityType="request"
      />
    </Container>
  );
};

export default RequestsDetail;

const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
});
