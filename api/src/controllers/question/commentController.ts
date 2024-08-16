import { NextFunction, Request, Response } from "express";
import QuestionModel from "../../models/questions/Question";
import { CustomError } from "../../types/error/customError";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../constants/error/errorCodes";
import { CommentQuestionModel, ICommentQuestion } from "../../models/questions/Comment";
import { successHandler } from "../../middleware/responseHandler";
import { convertToPlainObject } from "../../utils/convertPlainObject";
import UserModel from "../../models/user/User";
import { io } from "../../server";
import mongoose from "mongoose";
const dot = require("dot-object");

// createQuestionComment request the server to create a new comment in a question/discussion.
export const createQuestionComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId, text } = req.body;
  const questionId = req.params.questionId;
  try {
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.QUESTION_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.QUESTION_NOT_FOUND;
      throw error;
    }

    if (!userId) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      error.details = [ERROR_MESSAGES[ERROR_CODES.QUESTION_COMMENT_MISSING_USER_ID]];
      throw error;
    }

    if (!text) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      error.details = [ERROR_MESSAGES[ERROR_CODES.QUESTION_COMMENT_EMPTY_TEXT]];
      throw error;
    }

    const comment = new CommentQuestionModel({ userId, questionId, text });
    await comment.save();

    question.comments.push(comment._id);
    await question.save();

    const user = await UserModel.findById(userId);

    io.emit("questionCommentCreated", {
      questionId,
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
          privacyLevel: user?.privacyLevel,
          organizationAffiliated: user?.organizationAffiliated,
        },
      },
    });

    successHandler<ICommentQuestion>(req, res, convertToPlainObject(comment), HTTP_STATUS_CODES.CREATED);
  } catch (error) {
    next(error);
  }
};

// deleteQuestionComment requests the server to delete a question/discussion comment.
export const deleteQuestionComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const commentId: string = req.params.commentId;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    const comment: ICommentQuestion | null = await CommentQuestionModel.findByIdAndDelete(commentId);

    if (!comment) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.QUESTION_COMMENT_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.QUESTION_COMMENT_NOT_FOUND;
      throw error;
    }

    await QuestionModel.findByIdAndUpdate(comment.questionId, {
      $pull: { comments: comment._id },
    });

    io.emit("questionCommentDeleted", { commentId: comment._id });

    successHandler<{ message: string }>(
      req,
      res,
      {
        message: "Question comment deleted successfully",
      },
      HTTP_STATUS_CODES.OK
    );
  } catch (error) {
    next(error);
  }
};

// updateQuestionComment requests the server to update comment of a question/discussion.
export const updateQuestionComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const commentId: string = req.params.commentId;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    const updatedQuestionCommentData: ICommentQuestion = dot.dot(req.body);

    const comment: ICommentQuestion | null = await CommentQuestionModel.findByIdAndUpdate(
      commentId,
      { $set: updatedQuestionCommentData },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );

    if (!comment) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.QUESTION_COMMENT_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.QUESTION_COMMENT_NOT_FOUND;
      throw error;
    }

    const user = await UserModel.findById(comment.userId);

    io.emit("questionCommentUpdated", {
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
          privacyLevel: user?.privacyLevel,
          avatar: user?.avatar,
          organizationAffiliated: user?.organizationAffiliated,
        },
      },
    });

    successHandler<ICommentQuestion>(req, res, convertToPlainObject(comment), HTTP_STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};

// getQuestionCommentsList requests the server to get a list of comments of a question/discussion.
export const getQuestionCommentsList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const questionId: string = req.params.questionId;

    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    const comments: ICommentQuestion[] = await CommentQuestionModel.find({ questionId: questionId });

    successHandler<ICommentQuestion[]>(req, res, comments, HTTP_STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};
