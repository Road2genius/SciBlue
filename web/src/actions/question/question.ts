import {
  QuestionCommentVote,
  QuestionReqComment,
  QuestionReqInterface,
  QuestionResComment,
  QuestionResInterface,
  QuestionVote,
} from "../../../../shared-types/questionData";
import { ERROR_CODES, ERROR_MESSAGES } from "../../constants/error/errorCodes";
import { refreshTokenService } from "../../services/auth/auth";
import {
  createCommentQuestion,
  createQuestion,
  deleteQuestion,
  deleteQuestionComment,
  getQuestionById,
  getQuestionCommentList,
  getQuestionList,
  submitVoteComment,
  submitVoteQuestion,
  updateQuestion,
  updateQuestionComment,
} from "../../services/question/question";
import { CustomError } from "../../types/error/customError";
import { getErrorMessage } from "../../utils/handleError";

export const createQuestionAction = async (
  dataQuestion: QuestionReqInterface
): Promise<QuestionResInterface> => {
  try {
    const question: QuestionResInterface = await createQuestion(dataQuestion);
    return question;
  } catch (error) {
    const err: CustomError = error as CustomError;
    if (err.message === ERROR_MESSAGES[ERROR_CODES.UNAUTHORIZED]) {
      await refreshTokenService();
      return await createQuestionAction(dataQuestion);
    } else {
      throw new Error(getErrorMessage(error));
    }
  }
};

export const updateQuestionAction = async (
  questionId: string,
  dataQuestion: QuestionResInterface
): Promise<QuestionResInterface> => {
  try {
    const question: QuestionResInterface = await updateQuestion(
      questionId,
      dataQuestion
    );
    return question;
  } catch (error) {
    const err: CustomError = error as CustomError;
    if (err.message === ERROR_MESSAGES[ERROR_CODES.UNAUTHORIZED]) {
      await refreshTokenService();
      return await updateQuestionAction(questionId, dataQuestion);
    } else {
      throw new Error(getErrorMessage(error));
    }
  }
};

export const deleteQuestionAction = async (
  questionId: string
): Promise<void> => {
  try {
    await deleteQuestion(questionId);
  } catch (error) {
    const err: CustomError = error as CustomError;
    if (err.message === ERROR_MESSAGES[ERROR_CODES.UNAUTHORIZED]) {
      await refreshTokenService();
      await deleteQuestionAction(questionId);
    } else {
      throw new Error(getErrorMessage(error));
    }
  }
};

export const getQuestionListAction = async (): Promise<
  QuestionResInterface[]
> => {
  try {
    const questions: QuestionResInterface[] = await getQuestionList();
    return questions;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getQuestionByIdAction = async (
  questionId: string
): Promise<QuestionResInterface> => {
  try {
    const question: QuestionResInterface = await getQuestionById(questionId);
    return question;
  } catch (error) {
    const err: CustomError = error as CustomError;
    if (err.message === ERROR_MESSAGES[ERROR_CODES.UNAUTHORIZED]) {
      await refreshTokenService();
      return await getQuestionByIdAction(questionId);
    } else {
      throw new Error(getErrorMessage(error));
    }
  }
};

export const submitVoteQuestionAction = async (
  questionVote: QuestionVote
): Promise<QuestionResInterface> => {
  try {
    const question: QuestionResInterface =
      await submitVoteQuestion(questionVote);
    return question;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const submitVoteQuestionCommentAction = async (
  commentVote: QuestionCommentVote
): Promise<void> => {
  try {
    await submitVoteComment(commentVote);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const createCommentQuestionAction = async (
  questionComment: QuestionReqComment
): Promise<QuestionResComment> => {
  try {
    const comment: QuestionResComment =
      await createCommentQuestion(questionComment);
    return comment;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getQuestionCommentListAction = async (
  questionId: string
): Promise<QuestionResComment[]> => {
  try {
    const comments: QuestionResComment[] =
      await getQuestionCommentList(questionId);
    return comments;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteQuestionCommentAction = async (
  commentId: string
): Promise<void> => {
  try {
    await deleteQuestionComment(commentId);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const updateQuestionCommentAction = async (
  commentId: string,
  text: string
): Promise<QuestionResComment> => {
  try {
    const comment: QuestionResComment = await updateQuestionComment(
      commentId,
      text
    );
    return comment;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
