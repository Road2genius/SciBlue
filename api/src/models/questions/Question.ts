import mongoose, { Document, Schema } from "mongoose";
import { CollaborationVote, DiscussionStatus, FieldsEnvironmentalArea } from "../../../../shared-types/user";

export interface IFieldsEnvironmentalArea {
  generic?: FieldsEnvironmentalArea[];
  custom?: string[];
}

export interface IQuestion extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  body: string;
  fieldsEnvironmentalArea: IFieldsEnvironmentalArea;
  discussionStatus: DiscussionStatus;
  positiveVotes: number;
  negativeVotes: number;
  comments: mongoose.Types.ObjectId[];
  votes: Array<{
    userId: mongoose.Types.ObjectId;
    vote: CollaborationVote;
    createdAt: Date;
    updatedAt?: Date;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}

const questionSchema: Schema<IQuestion> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    body: { type: String, required: true },
    fieldsEnvironmentalArea: { type: Schema.Types.Mixed },
    discussionStatus: { type: String, enum: Object.values(DiscussionStatus) },
    positiveVotes: { type: Number, default: 0 },
    negativeVotes: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: "CommentQuestion" }],
    votes: [
      {
        userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        vote: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

export const QuestionModel = mongoose.model<IQuestion>("Question", questionSchema);

export default QuestionModel;
