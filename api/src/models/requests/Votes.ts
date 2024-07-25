import mongoose, { Document, Schema } from "mongoose";

export enum CollaborationVote {
  positive = "positive",
  negative = "negative",
}

export interface IVoteRequest extends Document {
  userId: mongoose.Types.ObjectId;
  requestId: mongoose.Types.ObjectId;
  vote: CollaborationVote;
  createdAt?: Date;
  updatedAt?: Date;
}

const VoteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  requestId: { type: Schema.Types.ObjectId, required: true, ref: "Request" },
  vote: { type: String, enum: CollaborationVote, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const VoteRequestModel = mongoose.model<IVoteRequest>("VoteRequest", VoteSchema);
