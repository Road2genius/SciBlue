import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../types/error/customError";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../constants/error/errorCodes";
import { successHandler } from "../../middleware/responseHandler";
import { CollaborationVote } from "../../../../shared-types/user";
import { io } from "../../server";
import UserModel from "../../models/user/User";
import QuestionModel, { IQuestion } from "../../models/questions/Question";
import { CommentQuestionModel, ICommentQuestion } from "../../models/questions/Comment";

export const submitVoteQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId, vote } = req.body;
  const questionId: string = req.params.questionId;

  try {
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    if (!vote) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.QUESTION_VOTE_IS_REQUIRED]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.QUESTION_VOTE_IS_REQUIRED;
      throw error;
    }

    const question = await QuestionModel.findById(questionId);
    if (!question) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.QUESTION_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.QUESTION_NOT_FOUND;
      throw error;
    }

    if (question.userId.toString() === userId) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.USER_CANNOT_VOTE_OWN_QUESTION]);
      error.statusCode = HTTP_STATUS_CODES.FORBIDDEN;
      error.code = ERROR_CODES.USER_CANNOT_VOTE_OWN_QUESTION;
      throw error;
    }

    const existingVoteIndex = question.votes.findIndex((v) => v.userId.toString() === userId);

    if (existingVoteIndex > -1) {
      const existingVote = question.votes[existingVoteIndex];

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
        question.positiveVotes -= 1;
      } else if (existingVote.vote === CollaborationVote.negative) {
        question.negativeVotes -= 1;
      }

      if (vote === CollaborationVote.positive) {
        question.positiveVotes += 1;
      } else if (vote === CollaborationVote.negative) {
        question.negativeVotes += 1;
      }

      question.votes[existingVoteIndex].vote = vote;
      question.votes[existingVoteIndex].updatedAt = new Date();
      await question.save();
      successHandler<IQuestion>(req, res, question, HTTP_STATUS_CODES.OK);
    } else {
      question.votes.push({ userId, vote, createdAt: new Date() });

      if (vote === CollaborationVote.positive) {
        question.positiveVotes += 1;
      } else if (vote === CollaborationVote.negative) {
        question.negativeVotes += 1;
      }
    }

    await question.save();

    io.emit("voteQuestionUpdate", {
      questionId: questionId,
      votes: question.votes,
      positiveVotes: question.positiveVotes,
      negativeVotes: question.negativeVotes,
    });

    successHandler<IQuestion>(req, res, question, HTTP_STATUS_CODES.CREATED);
  } catch (error) {
    next(error);
  }
};

export const submitVoteQuestionComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

    const comment = await CommentQuestionModel.findById(commentId);
    if (!comment) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.QUESTION_COMMENT_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.QUESTION_COMMENT_NOT_FOUND;
      throw error;
    }

    if (comment.userId.toString() === userId) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.USER_CANNOT_VOTE_OWN_QUESTION_COMMENT]);
      error.statusCode = HTTP_STATUS_CODES.FORBIDDEN;
      error.code = ERROR_CODES.USER_CANNOT_VOTE_OWN_QUESTION_COMMENT;
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
      successHandler<ICommentQuestion>(req, res, comment, HTTP_STATUS_CODES.OK);
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

    io.emit("voteQuestionCommentUpdate", {
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

    successHandler<ICommentQuestion>(req, res, comment, HTTP_STATUS_CODES.CREATED);
  } catch (error) {
    next(error);
  }
};
