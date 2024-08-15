import { useState } from "react";
import { QuestionReqInterface } from "../../../shared-types/questionData";
import { useUserContext } from "../context/UserContext";
import { initialQuestionState } from "../types/formData.type";
import { NestedKeyOf } from "../../../shared-types/requestData";
import { DiscussionStatus } from "../../../shared-types/user";
import { createQuestionAction } from "../actions/question/question";

interface UseQuestionFormProps {
  onSuccessCreateQuestion?: () => void;
  onErrorCreateQuestion?: () => void;
}

const useQuestionForm = ({
  onSuccessCreateQuestion,
  onErrorCreateQuestion,
}: UseQuestionFormProps) => {
  const [question, setQuestion] =
    useState<QuestionReqInterface>(initialQuestionState);
  const { userContext } = useUserContext();

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

  return {
    question,
    handleChange,
    handleNestedChange,
    handleNestedChip,
    handleCreateQuestion,
  };
};

export default useQuestionForm;
