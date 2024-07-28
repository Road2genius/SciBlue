import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../types/error/customError";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../constants/error/errorCodes";
import { RequestModel } from "../../models/requests/Request";
import { VoteRequestModel, IVoteRequest } from "../../models/requests/Vote";
import { successHandler } from "../../middleware/responseHandler";

// submitVoteRequest requests the server to handle vote on a request.
export const submitVoteRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId, vote } = req.body;
  const requestId: string = req.params.requestId;
  try {
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    if (!vote) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.REQUEST_VOTE_IS_REQUIRED]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.REQUEST_VOTE_IS_REQUIRED;
      throw error;
    }

    const request = await RequestModel.findById(requestId);
    if (!request) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.REQUEST_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.REQUEST_NOT_FOUND;
      throw error;
    }

    let voteRequest = await VoteRequestModel.findOne({ userId, requestId });

    if (request.userId.toString() === userId) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.USER_CANNOT_VOTE_OWN_REQUEST]);
      error.statusCode = HTTP_STATUS_CODES.FORBIDDEN;
      error.code = ERROR_CODES.USER_CANNOT_VOTE_OWN_REQUEST;
      throw error;
    }

    if (voteRequest) {
      if (voteRequest.vote === vote) {
        successHandler<{ message: string }>(
          req,
          res,
          {
            message: "Vote already recorded",
          },
          HTTP_STATUS_CODES.OK
        );
      }
      voteRequest.vote = vote;
      await voteRequest.save();
    } else {
      voteRequest = new VoteRequestModel({ userId, requestId, vote });
      await voteRequest.save();
    }

    successHandler<IVoteRequest>(req, res, voteRequest, HTTP_STATUS_CODES.CREATED);
  } catch (error) {
    next(error);
  }
};

// getRequestVotes requests the server to get a list of comments of a request.
export const getRequestVotes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const requestId: string = req.params.requestId;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    const positiveVotes = await VoteRequestModel.countDocuments({ requestId, vote: "positive" });
    const negativeVotes = await VoteRequestModel.countDocuments({ requestId, vote: "negative" });

    const voteSummary = {
      positiveVotes,
      negativeVotes,
    };

    successHandler(req, res, voteSummary, HTTP_STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};
