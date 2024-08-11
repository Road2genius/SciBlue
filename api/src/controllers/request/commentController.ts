import { NextFunction, Request, Response } from "express";
import { CommentRequestModel, ICommentRequest } from "../../models/requests/Comment";
import { RequestModel } from "../../models/requests/Request";
import { successHandler } from "../../middleware/responseHandler";
import { CustomError } from "../../types/error/customError";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../constants/error/errorCodes";
import { convertToPlainObject } from "../../utils/convertPlainObject";
import mongoose from "mongoose";
import { io } from "../../server";
import UserModel from "../../models/user/User";
const dot = require("dot-object");

// createRequestComment request the server to create a new comment in a request.
export const createRequestComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId, text } = req.body;
  const requestId = req.params.requestId;
  try {
    const request = await RequestModel.findById(requestId);
    if (!request) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.REQUEST_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.REQUEST_NOT_FOUND;
      throw error;
    }

    if (!userId) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      error.details = [ERROR_MESSAGES[ERROR_CODES.REQUEST_COMMENT_MISSING_USER_ID]];
      throw error;
    }

    if (!text) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      error.details = [ERROR_MESSAGES[ERROR_CODES.REQUEST_COMMENT_EMPTY_TEXT]];
      throw error;
    }

    const comment = new CommentRequestModel({ userId, requestId, text });
    await comment.save();

    request.comments.push(comment._id);
    await request.save();

    const user = await UserModel.findById(userId);

    io.emit("commentCreated", {
      requestId,
      comment: {
        _id: comment._id,
        userId: comment.userId,
        text: comment.text,
        votes: comment.votes,
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

    successHandler<ICommentRequest>(req, res, convertToPlainObject(comment), HTTP_STATUS_CODES.CREATED);
  } catch (error) {
    next(error);
  }
};

// deleteRequestComment requests the server to delete a request comment.
export const deleteRequestComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const commentId: string = req.params.commentId;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    const comment: ICommentRequest | null = await CommentRequestModel.findByIdAndDelete(commentId);

    if (!comment) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.REQUEST_COMMENT_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.REQUEST_COMMENT_NOT_FOUND;
      throw error;
    }

    await RequestModel.findByIdAndUpdate(comment.requestId, {
      $pull: { comments: comment._id },
    });

    io.emit("commentDeleted", { commentId: comment._id });

    successHandler<{ message: string }>(
      req,
      res,
      {
        message: "Request comment deleted successfully",
      },
      HTTP_STATUS_CODES.OK
    );
  } catch (error) {
    next(error);
  }
};

// updateRequestComment requests the server to update comment of a request.
export const updateRequestComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const commentId: string = req.params.commentId;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    const updatedRequestCommentData: ICommentRequest = dot.dot(req.body);

    const comment: ICommentRequest | null = await CommentRequestModel.findByIdAndUpdate(
      commentId,
      { $set: updatedRequestCommentData },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );

    if (!comment) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.REQUEST_COMMENT_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.REQUEST_COMMENT_NOT_FOUND;
      throw error;
    }

    const user = await UserModel.findById(comment.userId);

    io.emit("commentUpdated", {
      comment: {
        _id: comment._id,
        userId: comment.userId,
        text: comment.text,
        votes: comment.votes,
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

    successHandler<ICommentRequest>(req, res, convertToPlainObject(comment), HTTP_STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};

// getRequestCommentsList requests the server to get a list of comments of a request.
export const getRequestCommentsList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const requestId: string = req.params.requestId;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    const comments: ICommentRequest[] = await CommentRequestModel.find({ requestId: requestId });

    successHandler<ICommentRequest[]>(req, res, comments, HTTP_STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};
