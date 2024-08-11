import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../types/error/customError";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../constants/error/errorCodes";
import { IRequest, RequestModel } from "../../models/requests/Request";
import { successHandler } from "../../middleware/responseHandler";
import { CollaborationVote } from "../../../../shared-types/user";
import { CommentRequestModel, ICommentRequest } from "../../models/requests/Comment";
import { io } from "../../server";
import UserModel from "../../models/user/User";

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

    if (request.userId.toString() === userId) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.USER_CANNOT_VOTE_OWN_REQUEST]);
      error.statusCode = HTTP_STATUS_CODES.FORBIDDEN;
      error.code = ERROR_CODES.USER_CANNOT_VOTE_OWN_REQUEST;
      throw error;
    }

    const existingVoteIndex = request.votes.findIndex((v) => v.userId.toString() === userId);

    if (existingVoteIndex > -1) {
      const existingVote = request.votes[existingVoteIndex];

      if (existingVote.vote === vote) {
        successHandler<{ message: string }>(
          req,
          res,
          {
            message: "Vote already recorded",
          },
          HTTP_STATUS_CODES.OK
        );
        return;
      }

      if (existingVote.vote === CollaborationVote.positive) {
        request.positiveVotes -= 1;
      } else if (existingVote.vote === CollaborationVote.negative) {
        request.negativeVotes -= 1;
      }

      if (vote === CollaborationVote.positive) {
        request.positiveVotes += 1;
      } else if (vote === CollaborationVote.negative) {
        request.negativeVotes += 1;
      }

      request.votes[existingVoteIndex].vote = vote;
      request.votes[existingVoteIndex].updatedAt = new Date();
      await request.save();
      successHandler<IRequest>(req, res, request, HTTP_STATUS_CODES.OK);
    } else {
      request.votes.push({ userId, vote, createdAt: new Date() });

      if (vote === CollaborationVote.positive) {
        request.positiveVotes += 1;
      } else if (vote === CollaborationVote.negative) {
        request.negativeVotes += 1;
      }
    }

    await request.save();

    io.emit("voteRequestUpdate", {
      requestId: requestId,
      votes: request.votes,
      positiveVotes: request.positiveVotes,
      negativeVotes: request.negativeVotes,
    });

    successHandler<IRequest>(req, res, request, HTTP_STATUS_CODES.CREATED);
  } catch (error) {
    next(error);
  }
};

export const submitVoteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId, vote } = req.body;
  const commentId: string = req.params.commentId;

  try {
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    if (!vote) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.COMMENT_VOTE_IS_REQUIRED]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.COMMENT_VOTE_IS_REQUIRED;
      throw error;
    }

    const comment = await CommentRequestModel.findById(commentId);
    if (!comment) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.REQUEST_COMMENTS_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.REQUEST_COMMENTS_NOT_FOUND;
      throw error;
    }

    if (comment.userId.toString() === userId) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.USER_CANNOT_VOTE_OWN_COMMENT]);
      error.statusCode = HTTP_STATUS_CODES.FORBIDDEN;
      error.code = ERROR_CODES.USER_CANNOT_VOTE_OWN_COMMENT;
      throw error;
    }

    const existingVoteIndex = comment.votes.findIndex((v) => v.userId.toString() === userId);

    if (existingVoteIndex > -1) {
      const existingVote = comment.votes[existingVoteIndex];

      if (existingVote.vote === vote) {
        successHandler<{ message: string }>(
          req,
          res,
          {
            message: "Vote already recorded",
          },
          HTTP_STATUS_CODES.OK
        );
        return;
      }

      if (existingVote.vote === CollaborationVote.positive) {
        comment.positiveVotes -= 1;
      } else if (existingVote.vote === CollaborationVote.negative) {
        comment.negativeVotes -= 1;
      }

      if (vote === CollaborationVote.positive) {
        comment.positiveVotes += 1;
      } else if (vote === CollaborationVote.negative) {
        comment.negativeVotes += 1;
      }

      comment.votes[existingVoteIndex].vote = vote;
      comment.votes[existingVoteIndex].updatedAt = new Date();
      await comment.save();
      successHandler<ICommentRequest>(req, res, comment, HTTP_STATUS_CODES.OK);
    } else {
      comment.votes.push({ userId, vote, createdAt: new Date() });

      if (vote === CollaborationVote.positive) {
        comment.positiveVotes += 1;
      } else if (vote === CollaborationVote.negative) {
        comment.negativeVotes += 1;
      }
    }

    await comment.save();

    const user = await UserModel.findById(comment.userId);

    io.emit("voteCommentUpdate", {
      comment: {
        _id: comment._id,
        userId: comment.userId,
        text: comment.text,
        votes: comment.votes,
        positiveVotes: comment.positiveVotes,
        negativeVotes: comment.negativeVotes,
        createdAt: comment.createdAt,
        user: {
          id: user?._id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          avatar: user?.avatar,
          organizationAffiliated: user?.organizationAffiliated,
        },
      },
    });

    successHandler<ICommentRequest>(req, res, comment, HTTP_STATUS_CODES.CREATED);
  } catch (error) {
    next(error);
  }
};
