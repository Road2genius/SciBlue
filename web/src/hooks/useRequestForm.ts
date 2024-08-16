import { useEffect, useState } from "react";
import {
  CommentVote,
  Discipline,
  RequestReqComment,
  RequestReqInterface,
  RequestResInterface,
  RequestVote,
} from "../../../shared-types/requestData";
import {
  CollaborationStatus,
  CollaborationVote,
} from "../../../shared-types/user";
import {
  createCommentRequestAction,
  createRequestAction,
  deleteRequestAction,
  deleteRequestCommentAction,
  submitVoteCommentAction,
  submitVoteRequestAction,
  updateRequestAction,
  updateRequestCommentAction,
} from "../actions/request/request";
import { useUserContext } from "../context/UserContext";
import { initialRequestState } from "../types/formData.type";

type NestedKeyOf<T> = {
  [K in keyof T]: T[K] extends object ? K : never;
}[keyof T];

interface UseRequestFormProps {
  onSuccessCreateRequest?: () => void;
  onErrorCreateRequest?: () => void;
  onSuccessVoteRequest?: () => void;
  onErrorVoteRequest?: () => void;
  onSuccessCreateComment?: () => void;
  onErrorCreateComment?: () => void;
  onSuccessDeleteComment?: () => void;
  onErrorDeleteComment?: () => void;
  onSuccessUpdateComment?: () => void;
  onErrorUpdateComment?: () => void;
  onSuccessVoteComment?: () => void;
  onErrorVoteComment?: () => void;
  onSuccessUpdateRequest?: () => void;
  onErrorUpdateRequest?: () => void;
  onSuccessDeleteRequest?: () => void;
  onErrorDeleteRequest?: () => void;
  initialRequest?: RequestResInterface;
}

const useRequestForm = ({
  onSuccessCreateRequest,
  onErrorCreateRequest,
  onSuccessVoteRequest,
  onErrorVoteRequest,
  onSuccessCreateComment,
  onErrorCreateComment,
  onSuccessDeleteComment,
  onErrorDeleteComment,
  onSuccessUpdateComment,
  onErrorUpdateComment,
  onSuccessVoteComment,
  onErrorVoteComment,
  onSuccessUpdateRequest,
  onErrorUpdateRequest,
  onSuccessDeleteRequest,
  onErrorDeleteRequest,
  initialRequest,
}: UseRequestFormProps) => {
  const [request, setRequest] = useState<RequestReqInterface>(
    initialRequest || initialRequestState
  );
  const { userContext } = useUserContext();

  useEffect(() => {
    if (initialRequest) {
      setRequest(initialRequest);
    }
  }, [initialRequest]);

  const handleChange = <K extends keyof RequestReqInterface>(
    field: K,
    value: RequestReqInterface[K]
  ) => {
    setRequest({ ...request, [field]: value });
  };

  const handleNestedChange = <
    K extends NestedKeyOf<RequestReqInterface>,
    NK extends keyof RequestReqInterface[K],
  >(
    section: K,
    field: NK,
    value: RequestReqInterface[K][NK]
  ) => {
    setRequest({
      ...request,
      [section]: {
        ...request[section],
        [field]: value,
      } as RequestReqInterface[K],
    });
  };

  const handleNestedChip = <
    K extends keyof RequestReqInterface,
    NK extends keyof RequestReqInterface[K],
  >(
    section: K,
    field: NK,
    item: RequestReqInterface[K][NK] extends Array<infer U>
      ? U
      : RequestReqInterface[K][NK]
  ) => {
    setRequest((prevUser: RequestReqInterface) => {
      const sectionValue = prevUser[section];

      if (
        sectionValue &&
        typeof sectionValue === "object" &&
        !Array.isArray(sectionValue)
      ) {
        const fieldValue = sectionValue[field];

        if (Array.isArray(fieldValue)) {
          const currentArray = fieldValue as unknown as Array<
            RequestReqInterface[K][NK] extends Array<infer U>
              ? U
              : RequestReqInterface[K][NK]
          >;

          const newArray = currentArray.includes(item)
            ? currentArray.filter((i) => i !== item)
            : [...currentArray, item];

          return {
            ...prevUser,
            [section]: {
              ...sectionValue,
              [field]: newArray,
            } as RequestReqInterface[K],
          };
        } else if (fieldValue && typeof fieldValue === "object") {
          return {
            ...prevUser,
            [section]: {
              ...sectionValue,
              [field]: { ...fieldValue, item },
            } as RequestReqInterface[K],
          };
        } else {
          return {
            ...prevUser,
            [section]: {
              ...sectionValue,
              [field]: item,
            } as RequestReqInterface[K],
          };
        }
      } else {
        return prevUser;
      }
    });
  };

  const handleDoubleNestedChip = <
    K extends keyof RequestReqInterface,
    NK extends keyof RequestReqInterface[K],
    NK2 extends keyof RequestReqInterface[K][NK],
  >(
    section: K,
    nestedSection: NK,
    field: NK2,
    item: RequestReqInterface[K][NK][NK2] extends Array<infer U> ? U : never
  ) => {
    setRequest((prevRequest: RequestReqInterface) => {
      const sectionValue = prevRequest[section];

      if (
        typeof sectionValue === "object" &&
        sectionValue !== null &&
        typeof sectionValue[nestedSection] === "object" &&
        sectionValue[nestedSection] !== null &&
        Array.isArray(sectionValue[nestedSection][field])
      ) {
        const currentArray = sectionValue[nestedSection][
          field
        ] as unknown as Array<
          RequestReqInterface[K][NK][NK2] extends Array<infer U> ? U : never
        >;

        const newArray = currentArray.includes(item)
          ? currentArray.filter((i) => i !== item)
          : [...currentArray, item];

        return {
          ...prevRequest,
          [section]: {
            ...sectionValue,
            [nestedSection]: {
              ...sectionValue[nestedSection],
              [field]: newArray,
            } as RequestReqInterface[K][NK],
          } as RequestReqInterface[K],
        };
      } else {
        return prevRequest;
      }
    });
  };

  const handleDoubleNestedChange = <
    K extends keyof RequestReqInterface,
    NK extends keyof RequestReqInterface[K],
    NK2 extends keyof RequestReqInterface[K][NK],
  >(
    section: K,
    nestedSection: NK,
    field: NK2,
    value: RequestReqInterface[K][NK][NK2]
  ) => {
    setRequest((prevRequest: RequestReqInterface) => {
      const sectionValue = prevRequest[section];
      if (
        typeof sectionValue === "object" &&
        sectionValue !== null &&
        typeof sectionValue[nestedSection] === "object" &&
        sectionValue[nestedSection] !== null
      ) {
        return {
          ...prevRequest,
          [section]: {
            ...sectionValue,
            [nestedSection]: {
              ...sectionValue[nestedSection],
              [field]: value,
            },
          },
        };
      }
      return prevRequest;
    });
  };

  const handleDeleteChipDiscipline = (disciplineToDelete: Discipline) => {
    setRequest((prevRequest) => ({
      ...prevRequest,
      specificsSkills: {
        ...prevRequest.specificsSkills,
        disciplines: prevRequest.specificsSkills.disciplines.filter(
          (discipline) =>
            !(
              discipline.primary === disciplineToDelete.primary &&
              discipline.secondary === disciplineToDelete.secondary
            )
        ),
      },
    }));
  };

  // requests action
  const handleCreateRequest = async (): Promise<void> => {
    try {
      const requestWithUserId: RequestReqInterface = {
        ...request,
        userId: userContext?.userId ?? "",
        collaborationStatus: CollaborationStatus.open,
      };
      await createRequestAction(requestWithUserId);
      onSuccessCreateRequest && onSuccessCreateRequest();
    } catch (err) {
      onErrorCreateRequest && onErrorCreateRequest();
    }
  };

  const handleUpdateRequest = async (
    requestId: string,
    requestDetail: RequestResInterface
  ): Promise<void> => {
    try {
      await updateRequestAction(requestId, requestDetail);
      onSuccessUpdateRequest && onSuccessUpdateRequest();
    } catch (error) {
      onErrorUpdateRequest && onErrorUpdateRequest();
    }
  };

  const handleDeleteRequest = async (requestId: string): Promise<void> => {
    try {
      await deleteRequestAction(requestId);
      onSuccessDeleteRequest && onSuccessDeleteRequest();
    } catch (error) {
      onErrorDeleteRequest && onErrorDeleteRequest();
    }
  };

  // votes request action
  const submitVoteRequest = async (
    requestId: string,
    vote: CollaborationVote
  ): Promise<void> => {
    try {
      const requestVoteProperties: RequestVote = {
        userId: userContext?.userId ?? "",
        requestId: requestId,
        vote: vote,
      };
      await submitVoteRequestAction(requestVoteProperties);
      onSuccessVoteRequest && onSuccessVoteRequest();
    } catch (err) {
      onErrorVoteRequest && onErrorVoteRequest();
    }
  };

  // vote comment action
  const submitVoteComment = async (
    commentId: string,
    vote: CollaborationVote
  ): Promise<void> => {
    try {
      const commentVoteProperties: CommentVote = {
        userId: userContext?.userId ?? "",
        commentId: commentId,
        vote: vote,
      };
      await submitVoteCommentAction(commentVoteProperties);
      onSuccessVoteComment && onSuccessVoteComment();
    } catch (err) {
      onErrorVoteComment && onErrorVoteComment();
    }
  };

  // comment action
  const handleCreateComment = async (
    requestId: string,
    text: string
  ): Promise<void> => {
    try {
      const requestCommentProperties: RequestReqComment = {
        userId: userContext?.userId ?? "",
        requestId: requestId,
        text: text,
      };
      await createCommentRequestAction(requestCommentProperties);
      onSuccessCreateComment && onSuccessCreateComment();
    } catch (err) {
      onErrorCreateComment && onErrorCreateComment();
    }
  };

  const deleteRequestComment = async (commentId: string): Promise<void> => {
    try {
      await deleteRequestCommentAction(commentId);
      onSuccessDeleteComment && onSuccessDeleteComment();
    } catch (err) {
      onErrorDeleteComment && onErrorDeleteComment();
    }
  };

  const updateRequestComment = async (
    commentId: string,
    text: string
  ): Promise<void> => {
    try {
      await updateRequestCommentAction(commentId, text);
      onSuccessUpdateComment && onSuccessUpdateComment();
    } catch (err) {
      onErrorUpdateComment && onErrorUpdateComment();
    }
  };

  return {
    request,
    handleChange,
    handleNestedChange,
    handleNestedChip,
    handleDoubleNestedChip,
    handleDoubleNestedChange,
    handleCreateRequest,
    submitVoteRequest,
    handleCreateComment,
    deleteRequestComment,
    updateRequestComment,
    submitVoteComment,
    handleUpdateRequest,
    handleDeleteRequest,
    handleDeleteChipDiscipline,
  };
};

export default useRequestForm;
