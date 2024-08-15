import {
  CollaborationVote,
  DiscussionStatus,
  FieldsEnvironmentalArea,
} from "./user";

export type QuestionResInterface = {
  _id: string;
  userId: string;
  title: string;
  body: string;
  fieldsEnvironmentalArea: {
    generic: FieldsEnvironmentalArea[];
    custom: string[];
  };
  discussionStatus: DiscussionStatus;
  positiveVotes: number;
  negativeVotes: number;
  comments: string[];
  votes: Vote[];
  createdAt: Date;
  updatedAt: Date;
};

export type QuestionVote = {
  userId: string;
  questionId: string;
  vote: CollaborationVote;
};

export type QuestionCommentVote = {
  userId: string;
  commentId: string;
  vote: CollaborationVote;
};

export type QuestionReqComment = {
  userId: string;
  questionId: string;
  text: string;
};

export type QuestionResComment = {
  _id: string;
  userId: string;
  questionId: string;
  text: string;
  positiveVotes: number;
  negativeVotes: number;
  votes: Vote[];
  createdAt: Date;
  updatedAt: Date;
};

export interface Vote {
  userId: string;
  vote: CollaborationVote;
}

export type QuestionReqInterface = {
  userId: string;
  title: string;
  body: string;
  fieldsEnvironmentalArea: {
    generic: FieldsEnvironmentalArea[];
    custom: string[];
  };
  discussionStatus: DiscussionStatus;
  positiveVotes: number;
  negativeVotes: number;
  comments: string[];
  votes: Vote[];
  createdAt: Date;
  updatedAt: Date;
};
