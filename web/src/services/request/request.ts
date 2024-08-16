import {
  CommentVote,
  RequestReqComment,
  RequestReqInterface,
  RequestResComment,
  RequestResInterface,
  RequestVote,
} from "../../../../shared-types/requestData";
import { api } from "../api";

export const createRequest = async (
  dataRequest: RequestReqInterface
): Promise<RequestResInterface> => {
  const token = sessionStorage.getItem("your_jwt_secret_key");
  return api.post<RequestResInterface, RequestReqInterface>(
    "/requests",
    dataRequest,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

export const updateRequest = async (
  requestId: string,
  dataRequest: Partial<RequestResInterface>
): Promise<RequestResInterface> => {
  const token = sessionStorage.getItem("your_jwt_secret_key");
  return api.patch<RequestResInterface, Partial<RequestReqInterface>>(
    `/requests/${requestId}`,
    dataRequest,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

export const deleteRequest = async (requestId: string): Promise<void> => {
  const token = sessionStorage.getItem("your_jwt_secret_key");
  await api.delete<string>(`/requests/${requestId}`, {
    Authorization: `Bearer ${token}`,
  });
};

export const getRequestList = async (): Promise<RequestResInterface[]> => {
  const response: { success: boolean; data: RequestResInterface[] } =
    await api.get<{ success: boolean; data: RequestResInterface[] }>(
      "/requests"
    );
  return response.data;
};

export const getRequestById = async (
  requestId: string
): Promise<RequestResInterface> => {
  const token = sessionStorage.getItem("your_jwt_secret_key");
  const response: { success: boolean; data: RequestResInterface } =
    await api.get<{
      success: boolean;
      data: RequestResInterface;
    }>(`/requests/${requestId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return response.data;
};

export const submitVoteRequest = async (
  requestVote: RequestVote
): Promise<RequestResInterface> => {
  const token = sessionStorage.getItem("your_jwt_secret_key");
  return api.post<RequestResInterface, RequestVote>(
    `/requests/${requestVote.requestId}/votes`,
    requestVote,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

export const submitVoteComment = async (
  commentVote: CommentVote
): Promise<void> => {
  const token = sessionStorage.getItem("your_jwt_secret_key");
  return api.post<void, CommentVote>(
    `/requests/comments/${commentVote.commentId}/votes`,
    commentVote,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

export const createCommentRequest = async (
  requestComment: RequestReqComment
): Promise<RequestResComment> => {
  const token = sessionStorage.getItem("your_jwt_secret_key");
  return api.post<RequestResComment, RequestReqComment>(
    `/requests/${requestComment.requestId}/comments`,
    requestComment,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

export const getRequestCommentList = async (
  requestId: string
): Promise<RequestResComment[]> => {
  const response: { success: boolean; data: RequestResComment[] } =
    await api.get<{ success: boolean; data: RequestResComment[] }>(
      `/requests/${requestId}/comments`
    );
  return response.data;
};

export const deleteRequestComment = async (
  commentId: string
): Promise<void> => {
  const token = sessionStorage.getItem("your_jwt_secret_key");
  await api.delete(`/requests/comments/${commentId}`, {
    Authorization: `Bearer ${token}`,
  });
};

export const updateRequestComment = async (
  commentId: string,
  text: string
): Promise<RequestResComment> => {
  const token = sessionStorage.getItem("your_jwt_secret_key");
  const response: { success: boolean; comment: RequestResComment } =
    await api.patch<
      { success: boolean; comment: RequestResComment },
      { text: string }
    >(
      `/requests/comments/${commentId}`,
      { text },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  return response.comment;
};
