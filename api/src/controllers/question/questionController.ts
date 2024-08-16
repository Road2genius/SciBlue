import { NextFunction, Request, Response } from "express";
import { successHandler } from "../../middleware/responseHandler";
import QuestionModel, { IQuestion } from "../../models/questions/Question";
import { convertToPlainObject } from "../../utils/convertPlainObject";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../constants/error/errorCodes";
import mongoose from "mongoose";
import { CustomError } from "../../types/error/customError";
import { CommentQuestionModel } from "../../models/questions/Comment";
import { io } from "../../server";

// createQuestion requests the server to create a new question/discussion
export const createQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const question: IQuestion = new QuestionModel({
      ...req.body,
    });

    await question.save();
    successHandler<IQuestion>(req, res, convertToPlainObject(question), HTTP_STATUS_CODES.CREATED);
  } catch (error) {
    next(error);
  }
};

// getQuestionById requests the server to get a question/discussion
export const getQuestionById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const questionId: string = req.params.questionId;

    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    const question: IQuestion | null = await QuestionModel.findById(questionId);

    if (!question) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.QUESTION_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.QUESTION_NOT_FOUND;
      throw error;
    }
    successHandler<IQuestion>(req, res, convertToPlainObject(question), HTTP_STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};

// deleteQuestion requests the server to delete a question/discussion
export const deleteQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const questionId: string = req.params.questionId;

    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    const question: IQuestion | null = await QuestionModel.findByIdAndDelete(questionId);

    await CommentQuestionModel.deleteMany({ questionId });

    if (!question) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.QUESTION_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.QUESTION_NOT_FOUND;
      throw error;
    }

    successHandler<{ message: string }>(
      req,
      res,
      {
        message: "Question deleted successfully",
      },
      HTTP_STATUS_CODES.OK
    );
  } catch (error) {
    next(error);
  }
};

// updateQuestion requests the server to update a question/discussion
export const updateQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const questionId: string = req.params.questionId;

    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    const updatedQuestionData: IQuestion = req.body;

    const question: IQuestion | null = await QuestionModel.findByIdAndUpdate(
      questionId,
      { $set: updatedQuestionData },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );

    if (!question) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.QUESTION_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.QUESTION_NOT_FOUND;
      throw error;
    }

    io.emit("questionUpdated", {
      updatedQuestion: question,
    });

    successHandler<IQuestion>(req, res, convertToPlainObject(question), HTTP_STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};

// getQuestionsList requests the server to get a list of questions/discussions
export const getQuestionsList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const questions: IQuestion[] = await QuestionModel.find();
    successHandler<IQuestion[]>(req, res, questions, HTTP_STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};
