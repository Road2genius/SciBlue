import express from "express";
import { ENDPOINT } from "../http";
import { authenticateJWT } from "../../middleware/auth";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestionsList,
  updateQuestion,
} from "../../controllers/question/questionController";
import {
  createQuestionComment,
  deleteQuestionComment,
  getQuestionCommentsList,
  updateQuestionComment,
} from "../../controllers/question/commentController";
import { submitVoteQuestion, submitVoteQuestionComment } from "../../controllers/question/voteController";

const questionRouter = express.Router();

// questions
questionRouter.post(ENDPOINT.QUESTION.CREATE_QUESTION_PATH, authenticateJWT, createQuestion);
questionRouter.get(ENDPOINT.QUESTION.GET_QUESTION_BY_ID_PATH, authenticateJWT, getQuestionById);
questionRouter.delete(ENDPOINT.QUESTION.DELETE_QUESTION_PATH, authenticateJWT, deleteQuestion);
questionRouter.patch(ENDPOINT.QUESTION.UPDATE_QUESTION_PATH, authenticateJWT, updateQuestion);
questionRouter.get(ENDPOINT.QUESTION.GET_QUESTIONS_LIST_PATH, getQuestionsList);

// comment
questionRouter.post(ENDPOINT.QUESTION_COMMENT.CREATE_QUESTION_COMMENT_PATH, authenticateJWT, createQuestionComment);
questionRouter.delete(ENDPOINT.QUESTION_COMMENT.DELETE_QUESTION_COMMENT_PATH, authenticateJWT, deleteQuestionComment);
questionRouter.patch(ENDPOINT.QUESTION_COMMENT.UPDATE_QUESTION_COMMENT_PATH, authenticateJWT, updateQuestionComment);
questionRouter.get(ENDPOINT.QUESTION_COMMENT.GET_QUESTION_COMMENT_LIST_PATH, getQuestionCommentsList);

// vote
questionRouter.post(ENDPOINT.QUESTION_VOTE.SUBMIT_QUESTION_VOTE_PATH, authenticateJWT, submitVoteQuestion);
questionRouter.post(
  ENDPOINT.QUESTION_COMMENT_VOTE.SUBMIT_QUESTION_COMMENT_VOTE_PATH,
  authenticateJWT,
  submitVoteQuestionComment
);

export default questionRouter;
