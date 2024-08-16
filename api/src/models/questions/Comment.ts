import mongoose, { Document, Schema } from "mongoose";
import { CollaborationVote } from "../../../../shared-types/user";

export interface ICommentQuestion extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  text: string;
  positiveVotes: number;
  negativeVotes: number;
  votes: Array<{
    userId: mongoose.Types.ObjectId;
    vote: CollaborationVote;
    createdAt: Date;
    updatedAt?: Date;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}

const commentSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    questionId: { type: Schema.Types.ObjectId, required: true, ref: "Question" },
    text: { type: String, required: true },
    positiveVotes: { type: Number, default: 0 },
    negativeVotes: { type: Number, default: 0 },
    votes: [
      {
        userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        vote: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const CommentQuestionModel = mongoose.model<ICommentQuestion>("CommentQuestion", commentSchema);
