import { useEffect, useState } from "react";
import {
  QuestionReqComment,
  QuestionReqInterface,
  QuestionResInterface,
  QuestionVote,
} from "../../../shared-types/questionData";
import { useUserContext } from "../context/UserContext";
import { initialQuestionState } from "../types/formData.type";
import { CommentVote, NestedKeyOf } from "../../../shared-types/requestData";
import {
  CollaborationVote,
  DiscussionStatus,
} from "../../../shared-types/user";
import {
  createCommentQuestionAction,
  createQuestionAction,
  deleteQuestionAction,
  deleteQuestionCommentAction,
  submitVoteQuestionAction,
  submitVoteQuestionCommentAction,
  updateQuestionAction,
  updateQuestionCommentAction,
} from "../actions/question/question";
interface UseQuestionFormProps {
  onSuccessCreateQuestion?: () => void;
  onErrorCreateQuestion?: () => void;
  onSuccessVoteQuestion?: () => void;
  onErrorVoteQuestion?: () => void;
  onSuccessUpdateQuestion?: () => void;
  onErrorUpdateQuestion?: () => void;
  onSuccessDeleteQuestion?: () => void;
  onErrorDeleteQuestion?: () => void;
  onSuccessVoteComment?: () => void;
  onErrorVoteComment?: () => void;
  onSuccessCreateComment?: () => void;
  onErrorCreateComment?: () => void;
  onSuccessDeleteComment?: () => void;
  onErrorDeleteComment?: () => void;
  onSuccessUpdateComment?: () => void;
  onErrorUpdateComment?: () => void;
  editQuestion?: QuestionResInterface;
}

const useQuestionForm = ({
  onSuccessCreateQuestion,
  onErrorCreateQuestion,
  onSuccessVoteQuestion,
  onErrorVoteQuestion,
  onSuccessUpdateQuestion,
  onErrorUpdateQuestion,
  onSuccessDeleteQuestion,
  onErrorDeleteQuestion,
  onSuccessVoteComment,
  onErrorVoteComment,
  onSuccessCreateComment,
  onErrorCreateComment,
  onSuccessDeleteComment,
  onErrorDeleteComment,
  onSuccessUpdateComment,
  onErrorUpdateComment,
  editQuestion,
}: UseQuestionFormProps) => {
  const [question, setQuestion] = useState<QuestionReqInterface>(
    editQuestion || initialQuestionState
  );
  const { userContext } = useUserContext();

  useEffect(() => {
    if (editQuestion) {
      setQuestion(editQuestion);
    }
  }, [editQuestion]);

  const handleChange = <K extends keyof QuestionReqInterface>(
    field: K,
    value: QuestionReqInterface[K]
  ) => {
    setQuestion({ ...question, [field]: value });
  };

  const handleNestedChip = <
    K extends keyof QuestionReqInterface,
    NK extends keyof QuestionReqInterface[K],
  >(
    section: K,
    field: NK,
    item: QuestionReqInterface[K][NK] extends Array<infer U>
      ? U
      : QuestionReqInterface[K][NK]
  ) => {
    setQuestion((prevQuestion) => {
      const sectionValue = prevQuestion[section];

      if (
        sectionValue &&
        typeof sectionValue === "object" &&
        !Array.isArray(sectionValue)
      ) {
        const fieldValue = sectionValue[field];

        if (Array.isArray(fieldValue)) {
          const currentArray = fieldValue as unknown as Array<
            QuestionReqInterface[K][NK] extends Array<infer U>
              ? U
              : QuestionReqInterface[K][NK]
          >;

          const newArray = currentArray.includes(item)
            ? currentArray.filter((i) => i !== item)
            : [...currentArray, item];

          return {
            ...prevQuestion,
            [section]: {
              ...sectionValue,
              [field]: newArray,
            } as QuestionReqInterface[K],
          };
        } else if (typeof fieldValue === "object" && fieldValue !== null) {
          return {
            ...prevQuestion,
            [section]: {
              ...sectionValue,
              [field]: { ...fieldValue, item },
            } as QuestionReqInterface[K],
          };
        } else {
          return {
            ...prevQuestion,
            [section]: {
              ...sectionValue,
              [field]: item,
            } as QuestionReqInterface[K],
          };
        }
      } else {
        return prevQuestion;
      }
    });
  };

  const handleNestedChange = <
    K extends NestedKeyOf<QuestionReqInterface>,
    NK extends keyof QuestionReqInterface[K],
  >(
    section: K,
    field: NK,
    value: QuestionReqInterface[K][NK]
  ) => {
    setQuestion({
      ...question,
      [section]: {
        ...question[section],
        [field]: value,
      } as QuestionReqInterface[K],
    });
  };

  // questions action
  const handleCreateQuestion = async (): Promise<void> => {
    try {
      const questionWithUserId: QuestionReqInterface = {
        ...question,
        userId: userContext?.userId ?? "",
        discussionStatus: DiscussionStatus.open,
      };
      await createQuestionAction(questionWithUserId);
      onSuccessCreateQuestion && onSuccessCreateQuestion();
    } catch (err) {
      onErrorCreateQuestion && onErrorCreateQuestion();
    }
  };

  const handleUpdateQuestion = async (
    questionId: string,
    questionDetail: QuestionResInterface
  ): Promise<void> => {
    try {
      await updateQuestionAction(questionId, questionDetail);
      onSuccessUpdateQuestion && onSuccessUpdateQuestion();
    } catch (error) {
      onErrorUpdateQuestion && onErrorUpdateQuestion();
    }
  };

  const handleDeleteQuestion = async (questionId: string): Promise<void> => {
    try {
      await deleteQuestionAction(questionId);
      onSuccessDeleteQuestion && onSuccessDeleteQuestion();
    } catch (err) {
      onErrorDeleteQuestion && onErrorDeleteQuestion();
    }
  };

  // votes question action
  const submitVoteQuestion = async (
    questionId: string,
    vote: CollaborationVote
  ): Promise<void> => {
    try {
      const questionVoteProperties: QuestionVote = {
        userId: userContext?.userId ?? "",
        questionId: questionId,
        vote: vote,
      };
      await submitVoteQuestionAction(questionVoteProperties);
      onSuccessVoteQuestion && onSuccessVoteQuestion();
    } catch (error) {
      onErrorVoteQuestion && onErrorVoteQuestion();
    }
  };

  // vote comment action
  const submitVoteQuestionComment = async (
    commentId: string,
    vote: CollaborationVote
  ): Promise<void> => {
    try {
      const commentVoteProperties: CommentVote = {
        userId: userContext?.userId ?? "",
        commentId: commentId,
        vote: vote,
      };
      await submitVoteQuestionCommentAction(commentVoteProperties);
      onSuccessVoteComment && onSuccessVoteComment();
    } catch (err) {
      onErrorVoteComment && onErrorVoteComment();
    }
  };

  // comment action
  const handleCreateQuestionComment = async (
    questionId: string,
    text: string
  ): Promise<void> => {
    try {
      const requestCommentProperties: QuestionReqComment = {
        userId: userContext?.userId ?? "",
        questionId: questionId,
        text: text,
      };
      await createCommentQuestionAction(requestCommentProperties);
      onSuccessCreateComment && onSuccessCreateComment();
    } catch (err) {
      onErrorCreateComment && onErrorCreateComment();
    }
  };

  const deleteQuestionComment = async (commentId: string): Promise<void> => {
    try {
      await deleteQuestionCommentAction(commentId);
      onSuccessDeleteComment && onSuccessDeleteComment();
    } catch (err) {
      onErrorDeleteComment && onErrorDeleteComment();
    }
  };

  const updateQuestionComment = async (
    commentId: string,
    text: string
  ): Promise<void> => {
    try {
      await updateQuestionCommentAction(commentId, text);
      onSuccessUpdateComment && onSuccessUpdateComment();
    } catch (err) {
      onErrorUpdateComment && onErrorUpdateComment();
    }
  };

  return {
    question,
    handleChange,
    handleNestedChange,
    handleNestedChip,
    handleCreateQuestion,
    submitVoteQuestion,
    handleUpdateQuestion,
    handleDeleteQuestion,
    submitVoteQuestionComment,
    handleCreateQuestionComment,
    deleteQuestionComment,
    updateQuestionComment,
  };
};

export default useQuestionForm;
