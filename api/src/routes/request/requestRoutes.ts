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

const requestRouter = express.Router();

// request
requestRouter.post(ENDPOINT.REQUEST.CREATE_REQUEST_PATH, authenticateJWT, createRequest);
requestRouter.get(ENDPOINT.REQUEST.GET_REQUEST_BY_ID_PATH, authenticateJWT, getRequestById);
requestRouter.delete(ENDPOINT.REQUEST.DELETE_REQUEST_PATH, authenticateJWT, deleteRequest);
requestRouter.patch(ENDPOINT.REQUEST.UPDATE_REQUEST_PATH, authenticateJWT, updateRequest);
requestRouter.get(ENDPOINT.REQUEST.GET_REQUESTS_LIST_PATH, getRequestsList);

export default requestRouter;
