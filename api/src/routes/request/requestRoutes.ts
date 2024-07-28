import express from "express";
import { ENDPOINT } from "../http";
import {
  createRequest,
  deleteRequest,
  getRequestById,
  getRequestsList,
  updateRequest,
} from "../../controllers/request/requestController";
import { authenticateJWT } from "../../middleware/auth";
import { validateCreateRequest } from "../../middleware/validateRequest";
import { mappingErrors } from "../../middleware/validateUser";
import {
  createRequestComment,
  deleteRequestComment,
  updateRequestComment,
  getRequestCommentsList,
} from "../../controllers/request/commentController";
import { getRequestVotes, submitVoteRequest } from "../../controllers/request/voteController";

const requestRouter = express.Router();

// request
requestRouter.post(
  ENDPOINT.REQUEST.CREATE_REQUEST_PATH,
  authenticateJWT,
  validateCreateRequest(),
  mappingErrors,
  createRequest
);
requestRouter.get(ENDPOINT.REQUEST.GET_REQUEST_BY_ID_PATH, authenticateJWT, getRequestById);
requestRouter.delete(ENDPOINT.REQUEST.DELETE_REQUEST_PATH, authenticateJWT, deleteRequest);
requestRouter.patch(ENDPOINT.REQUEST.UPDATE_REQUEST_PATH, authenticateJWT, updateRequest);
requestRouter.get(ENDPOINT.REQUEST.GET_REQUESTS_LIST_PATH, getRequestsList);

// comment
requestRouter.post(ENDPOINT.REQUEST_COMMENT.CREATE_REQUEST_COMMENT_PATH, authenticateJWT, createRequestComment);
requestRouter.delete(ENDPOINT.REQUEST_COMMENT.DELETE_REQUEST_COMMENT_PATH, authenticateJWT, deleteRequestComment);
requestRouter.patch(ENDPOINT.REQUEST_COMMENT.UPDATE_REQUEST_COMMENT_PATH, authenticateJWT, updateRequestComment);
requestRouter.get(ENDPOINT.REQUEST_COMMENT.GET_REQUEST_COMMENT_LIST_PATH, getRequestCommentsList);

// vote
requestRouter.post(ENDPOINT.REQUEST_VOTE.SUBMIT_REQUEST_VOTE_PATH, authenticateJWT, submitVoteRequest);
requestRouter.get(ENDPOINT.REQUEST_VOTE.GET_REQUEST_VOTES_PATH, authenticateJWT, getRequestVotes);

export default requestRouter;
