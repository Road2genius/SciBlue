import {
  CommentVote,
  RequestReqComment,
  RequestReqInterface,
  RequestResComment,
  RequestResInterface,
  RequestVote,
} from "../../../../shared-types/requestData";
import { ERROR_CODES, ERROR_MESSAGES } from "../../constants/error/errorCodes";
import { refreshTokenService } from "../../services/auth/auth";
import {
  createCommentRequest,
  createRequest,
  deleteRequest,
  deleteRequestComment,
  getRequestById,
  getRequestCommentList,
  getRequestList,
  submitVoteComment,
  submitVoteRequest,
  updateRequest,
  updateRequestComment,
} from "../../services/request/request";
import { CustomError } from "../../types/error/customError";
import { getErrorMessage } from "../../utils/handleError";

export const createRequestAction = async (
  dataRequest: RequestReqInterface
): Promise<RequestResInterface> => {
  try {
    const request: RequestResInterface = await createRequest(dataRequest);
    return request;
  } catch (error) {
    const err: CustomError = error as CustomError;
    if (err.message === ERROR_MESSAGES[ERROR_CODES.UNAUTHORIZED]) {
      await refreshTokenService();
      return await createRequestAction(dataRequest);
    } else {
      throw new Error(getErrorMessage(error));
    }
  }
};

export const updateRequestAction = async (
  requestId: string,
  dataRequest: RequestResInterface
): Promise<RequestResInterface> => {
  try {
    const request: RequestResInterface = await updateRequest(
      requestId,
      dataRequest
    );
    return request;
  } catch (error) {
    const err: CustomError = error as CustomError;
    if (err.message === ERROR_MESSAGES[ERROR_CODES.UNAUTHORIZED]) {
      await refreshTokenService();
      return await updateRequestAction(requestId, dataRequest);
    } else {
      throw new Error(getErrorMessage(error));
    }
  }
};

export const deleteRequestAction = async (requestId: string): Promise<void> => {
  try {
    await deleteRequest(requestId);
  } catch (error) {
    const err: CustomError = error as CustomError;
    if (err.message === ERROR_MESSAGES[ERROR_CODES.UNAUTHORIZED]) {
      await refreshTokenService();
      await deleteRequestAction(requestId);
    } else {
      throw new Error(getErrorMessage(error));
    }
  }
};

export const getRequestListAction = async (): Promise<
  RequestResInterface[]
> => {
  try {
    const requests: RequestResInterface[] = await getRequestList();
    return requests;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getRequestByIdAction = async (
  requestId: string
): Promise<RequestResInterface> => {
  try {
    const request: RequestResInterface = await getRequestById(requestId);
    return request;
  } catch (error) {
    const err: CustomError = error as CustomError;
    if (err.message === ERROR_MESSAGES[ERROR_CODES.UNAUTHORIZED]) {
      await refreshTokenService();
      return await getRequestById(requestId);
    } else {
      throw new Error(getErrorMessage(error));
    }
  }
};

export const submitVoteRequestAction = async (
  requestVote: RequestVote
): Promise<RequestResInterface> => {
  try {
    const request: RequestResInterface = await submitVoteRequest(requestVote);
    return request;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const submitVoteCommentAction = async (
  commentVote: CommentVote
): Promise<void> => {
  try {
    await submitVoteComment(commentVote);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const createCommentRequestAction = async (
  requestComment: RequestReqComment
): Promise<RequestResComment> => {
  try {
    const comment: RequestResComment =
      await createCommentRequest(requestComment);
    return comment;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getRequestCommentListAction = async (
  requestId: string
): Promise<RequestResComment[]> => {
  try {
    const comments: RequestResComment[] =
      await getRequestCommentList(requestId);
    return comments;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteRequestCommentAction = async (
  commentId: string
): Promise<void> => {
  try {
    await deleteRequestComment(commentId);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const updateRequestCommentAction = async (
  commentId: string,
  text: string
): Promise<RequestResComment> => {
  try {
    const comment: RequestResComment = await updateRequestComment(
      commentId,
      text
    );
    return comment;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
