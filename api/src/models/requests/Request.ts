import mongoose, { Document, Schema } from "mongoose";
import {
  FieldsProfessionalActivity,
  ProjectProgressStatus,
  TypeOfCollaboration,
  OrganizationAffiliated,
  CollaborationStatus,
} from "../../../../shared-types/user";
export interface IFieldsProfessionalActivity {
  generic?: string[];
  custom?: string[];
}

export interface IProject {
  projectTitle: string;
  summary?: string;
  fieldsProfessionalActivity: IFieldsProfessionalActivity;
  projectProgressStatus: ProjectProgressStatus;
  projectStartEndEstimation?: Date[];
  projectFunding?: ProjectProgressStatus;
}

export interface IKindOfCollaborationWanted {
  typeOfCollaboration: TypeOfCollaboration[];
  requestTitle: string;
  description: string;
}

export interface ISpecificsSkills {
  organizationRequested: OrganizationAffiliated[];
  disciplines: string[];
  expertisesAndSkills: string[];
}

export interface IRequest extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  project: IProject;
  kindOfCollaborationWanted: IKindOfCollaborationWanted;
  specificsSkills: ISpecificsSkills;
  collaborationStatus: CollaborationStatus;
  positiveVotes: number;
  negativeVotes: number;
  comments: mongoose.Types.ObjectId[];
  votes: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const fieldsProfessionalActivitySchema: Schema<IFieldsProfessionalActivity> = new Schema({
  generic: {
    type: [String],
    enum: Object.values(FieldsProfessionalActivity),
  },
  custom: {
    type: [String],
  },
});

const projectSchema: Schema<IProject> = new Schema({
  projectTitle: { type: String, required: true },
  summary: { type: String },
  fieldsProfessionalActivity: {
    type: fieldsProfessionalActivitySchema,
    required: true,
  },
  projectProgressStatus: {
    type: String,
    enum: Object.values(ProjectProgressStatus),
    required: true,
  },
  projectStartEndEstimation: { type: [Date] },
  projectFunding: {
    type: String,
    enum: Object.values(ProjectProgressStatus),
  },
});

const requestSchema: Schema<IRequest> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    project: {
      type: projectSchema,
      required: true,
    },
    kindOfCollaborationWanted: {
      typeOfCollaboration: {
        type: [String],
        enum: Object.values(TypeOfCollaboration),
        required: true,
      },
      requestTitle: { type: String, required: true },
      description: { type: String, required: true },
    },
    specificsSkills: {
      organizationRequested: { type: [String], enum: Object.values(OrganizationAffiliated) },
      disciplines: { type: [String] },
      expertisesAndSkills: { type: [String] },
    },
    collaborationStatus: { type: String, enum: Object.values(CollaborationStatus) },
    positiveVotes: { type: Number, default: 0 },
    negativeVotes: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: "CommentRequest" }],
    votes: [{ type: Schema.Types.ObjectId, ref: "VoteRequest" }],
  },
  { timestamps: true }
);

// Add validation to ensure at least one of 'generic' or 'custom' is non-empty
fieldsProfessionalActivitySchema.pre("validate", function (next) {
  const value = this as IFieldsProfessionalActivity;
  if (!value.generic?.length && !value.custom?.length) {
    next(new Error("fieldsProfessionalActivity must have at least one non-empty field: generic or custom."));
  } else {
    next();
  }
});

export const RequestModel = mongoose.model<IRequest>("Request", requestSchema);

export default RequestModel;
