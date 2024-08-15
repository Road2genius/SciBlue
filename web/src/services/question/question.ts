import {
  QuestionCommentVote,
  QuestionReqComment,
  QuestionReqInterface,
  QuestionResComment,
  QuestionResInterface,
  QuestionVote,
} from "../../../../shared-types/questionData";
import { api } from "../api";

export const createQuestion = async (
  dataQuestion: QuestionReqInterface
): Promise<QuestionResInterface> => {
  const token = sessionStorage.getItem("your_jwt_secret_key");
  return api.post<QuestionResInterface, QuestionReqInterface>(
    "/questions",
    dataQuestion,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

export const updateQuestion = async (
  questionId: string,
  dataQuestion: Partial<QuestionResInterface>
): Promise<QuestionResInterface> => {
  const token = sessionStorage.getItem("your_jwt_secret_key");
  return api.patch<QuestionResInterface, Partial<QuestionReqInterface>>(
    `/questions/${questionId}`,
    dataQuestion,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

export const deleteQuestion = async (questionId: string): Promise<void> => {
  const token = sessionStorage.getItem("your_jwt_secret_key");
  await api.delete<string>(`/questions/${questionId}`, {
    Authorization: `Bearer ${token}`,
  });
};

export const getQuestionList = async (): Promise<QuestionResInterface[]> => {
  const response: { success: boolean; data: QuestionResInterface[] } =
    await api.get<{ success: boolean; data: QuestionResInterface[] }>(
      "/questions"
    );
  return response.data;
};

export const getQuestionById = async (
  questionId: string
): Promise<QuestionResInterface> => {
  const token = sessionStorage.getItem("your_jwt_secret_key");
  const response: { success: boolean; data: QuestionResInterface } =
    await api.get<{
      success: boolean;
      data: QuestionResInterface;
    }>(`/questions/${questionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return response.data;
};

export const submitVoteQuestion = async (
  questionVote: QuestionVote
): Promise<QuestionResInterface> => {
  const token = sessionStorage.getItem("your_jwt_secret_key");
  return api.post<QuestionResInterface, QuestionVote>(
    `/questions/${questionVote.questionId}/votes`,
    questionVote,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

export const submitVoteComment = async (
  commentVote: QuestionCommentVote
): Promise<void> => {
  const token = sessionStorage.getItem("your_jwt_secret_key");
  return api.post<void, QuestionCommentVote>(
    `/comments/${commentVote.commentId}/votes`,
    commentVote,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

export const createCommentQuestion = async (
  questionComment: QuestionReqComment
): Promise<QuestionResComment> => {
  const token = sessionStorage.getItem("your_jwt_secret_key");
  return api.post<QuestionResComment, QuestionReqComment>(
    `/questions/${questionComment.questionId}/comments`,
    questionComment,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

export const getQuestionCommentList = async (
  questionId: string
): Promise<QuestionResComment[]> => {
  const response: { success: boolean; data: QuestionResComment[] } =
    await api.get<{ success: boolean; data: QuestionResComment[] }>(
      `/questions/${questionId}/comments`
    );
  return response.data;
};

export const deleteQuestionComment = async (
  commentId: string
): Promise<void> => {
  const token = sessionStorage.getItem("your_jwt_secret_key");
  await api.delete(`/questions/comments/${commentId}`, {
    Authorization: `Bearer ${token}`,
  });
};

export const updateQuestionComment = async (
  commentId: string,
  text: string
): Promise<QuestionResComment> => {
  const token = sessionStorage.getItem("your_jwt_secret_key");
  const response: { success: boolean; comment: QuestionResComment } =
    await api.patch<
      { success: boolean; comment: QuestionResComment },
      { text: string }
    >(
      `/questions/comments/${commentId}`,
      { text },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  return response.comment;
};
