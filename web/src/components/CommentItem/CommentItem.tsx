import React from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import CustomTextField from "../../components/CustomTextField/CustomTextField";
import { CollaborationVote } from "../../../../shared-types/user";
import { RequestResComment } from "../../../../shared-types/requestData"; // Ou autre type pour les commentaires
import UserInfo from "../UserInfo/UserInfo";
import { QuestionResComment } from "../../../../shared-types/questionData";

export interface CommentRequestWithUser extends RequestResComment {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    privacyLevel: { mode: boolean; username: string };
    avatar: string;
    organizationAffiliated: string;
  };
}

export interface CommentQuestionWithUser extends QuestionResComment {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    privacyLevel: { mode: boolean; username: string };
    avatar: string;
    organizationAffiliated: string;
  };
}

interface CommentItemProps {
  comment: CommentRequestWithUser | CommentQuestionWithUser;
  userHasVotedPositive: boolean;
  userHasVotedNegative: boolean;
  editingComment: { isEditing: boolean; editedText: string };
  userContextId: string | undefined;
  submitVoteComment: (commentId: string, vote: CollaborationVote) => void;
  handleTextChange: (commentId: string, newText: string) => void;
  handleSaveCommentClick: (commentId: string) => void;
  handleEditClick: (commentId: string, currentText: string) => void;
  cancelEditComment: () => void;
  setOpenDialogDeleteComment: (dialogState: {
    open: boolean;
    commentId: string;
  }) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  userHasVotedPositive,
  userHasVotedNegative,
  editingComment,
  userContextId,
  submitVoteComment,
  handleTextChange,
  handleSaveCommentClick,
  handleEditClick,
  cancelEditComment,
  setOpenDialogDeleteComment,
}) => {
  return (
    <React.Fragment>
      <Box display="flex" alignItems="center" mb={2}>
        <Grid container>
          <Grid item xs={12} md={1}>
            <Box display="flex" flexDirection="column">
              <Box display="flex" alignItems="center" mr={2} my={2}>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    minWidth: 0,
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "10px",
                    borderColor: "black",
                    backgroundColor: userHasVotedPositive
                      ? "#C8E6C9"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: "#197278",
                      borderColor: "black",
                    },
                  }}
                  onClick={() =>
                    submitVoteComment(comment._id, CollaborationVote.positive)
                  }
                >
                  <ThumbUpOffAltIcon sx={{ color: "black" }} />
                </Button>
                <Typography variant="h6" color="gray">
                  {comment.positiveVotes}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mr={2} flexGrow={1}>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    minWidth: 0,
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "10px",
                    borderColor: "black",
                    backgroundColor: userHasVotedNegative
                      ? "#C8E6C9"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: "#197278",
                      borderColor: "black",
                    },
                  }}
                  onClick={() =>
                    submitVoteComment(comment._id, CollaborationVote.negative)
                  }
                >
                  <ThumbDownOffAltIcon
                    sx={{
                      color: "black",
                      transform: "scaleX(-1)",
                    }}
                  />
                </Button>
                <Typography variant="h6" color="gray">
                  {comment.negativeVotes}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={11} mt={2}>
            {editingComment.isEditing ? (
              <CustomTextField
                label="Update your comment"
                placeholder=""
                type="text"
                value={editingComment.editedText}
                multiline
                onChange={(e) => handleTextChange(comment._id, e.target.value)}
              />
            ) : (
              <Typography variant="subtitle2" paragraph>
                {comment.text}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
      {editingComment.isEditing && (
        <Box display="flex" justifyContent="center">
          <Button
            onClick={cancelEditComment}
            sx={{
              textTransform: "none",
              color: "#008080",
              fontWeight: 700,
              textDecoration: "underline",
              marginRight: "25px",
              "&:hover": {
                background: "none",
              },
            }}
          >
            Cancel edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => handleSaveCommentClick(comment._id)}
            sx={{
              width: "120px",
              borderRadius: "8px",
              textTransform: "none",
              height: "50px",
              fontWeight: 700,
              backgroundColor: "#008080",
              "&:hover": {
                backgroundColor: "#006666",
              },
              marginY: "20px",
            }}
          >
            Save edit
          </Button>
        </Box>
      )}
      <Box display="flex" sx={{ alignSelf: "flex-end" }} mt={-5} mb={5}>
        <Box display="flex" alignItems="center">
          {comment.userId === userContextId && (
            <Box display="flex" mr={2}>
              <Button
                title="Edit Comment"
                size="small"
                variant="outlined"
                sx={{
                  minWidth: 0,
                  width: "35px",
                  height: "35px",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "10px",
                  borderColor: "#197278",
                  color: "#197278",
                  "&:hover": {
                    borderColor: "black",
                  },
                  alignSelf: "flex-end",
                }}
                onClick={() => handleEditClick(comment._id, comment.text)}
              >
                <EditOutlinedIcon />
              </Button>

              <Button
                title="Delete Comment"
                size="small"
                variant="outlined"
                sx={{
                  minWidth: 0,
                  width: "35px",
                  height: "35px",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "20px",
                  borderColor: "#197278",
                  color: "#197278",
                  "&:hover": {
                    borderColor: "black",
                  },
                  alignSelf: "flex-end",
                }}
                onClick={() =>
                  setOpenDialogDeleteComment({
                    open: true,
                    commentId: comment._id,
                  })
                }
              >
                <DeleteForeverOutlinedIcon />
              </Button>
            </Box>
          )}
          <UserInfo
            avatar={comment.user.avatar}
            firstName={comment.user.firstName}
            lastName={comment.user.lastName}
            privacyLevel={comment.user.privacyLevel}
            organization={comment.user.organizationAffiliated}
            createdAt={comment.createdAt}
          />
        </Box>
      </Box>
      <Box mb={8}>
        <Divider
          sx={{
            width: "60%",
            borderBottomWidth: 1.5,
            backgroundColor: "black",
            margin: "0 auto",
          }}
        />
      </Box>
    </React.Fragment>
  );
};

export default CommentItem;
