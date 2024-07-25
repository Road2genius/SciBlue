import mongoose, { Document, Schema } from "mongoose";

export interface ICommentRequest extends Document {
  userId: mongoose.Types.ObjectId;
  requestId: mongoose.Types.ObjectId;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const commentSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    requestId: { type: Schema.Types.ObjectId, required: true, ref: "Request" },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const CommentRequestModel = mongoose.model<ICommentRequest>("CommentRequest", commentSchema);
