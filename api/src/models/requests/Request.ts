import mongoose, { Document, Schema } from "mongoose";
import {
  FieldsProfessionalActivity,
  ProjectProgressStatus,
  CollaborationDuration,
  TypeOfCollaboration,
  OrganizationAffiliated,
} from "../../../../shared-types/user";

export interface IComment extends Document {
  userId: mongoose.Types.ObjectId;
  requestId: mongoose.Types.ObjectId;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRequest extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  project: {
    projectTitle: string;
    summary?: string;
    fieldsProfessionalActivity: {
      generic: FieldsProfessionalActivity[];
      custom: string[];
    };
    projectProgressStatus: ProjectProgressStatus;
    collaborationDuration: {
      duration: CollaborationDuration;
      estimation: string;
    };
  };
  kindOfCollaborationWanted: {
    typeOfCollaboration: TypeOfCollaboration[];
    requestTitle: string;
    description: string;
    keywordsActivity: string[];
  };
  skillsOrTechnical: {
    organizationAffiliated: OrganizationAffiliated[];
    specificTechnicsNames: string[];
    equipment: string[];
    models: string[];
    chemicalAndBiologicalProducts: string[];
    otherSkills: string[];
  };
  additional_notes: string;
  comments: IComment[];
  createdAt?: Date;
  updatedAt?: Date;
}

const commentSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    requestId: { type: mongoose.Types.ObjectId, required: true, ref: "Request" },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const requestSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    project: {
      projectTitle: { type: String, required: true },
      summary: { type: String },
      fieldsProfessionalActivity: {
        generic: {
          type: [String],
          enum: FieldsProfessionalActivity,
          required: true,
        },
        custom: { type: [String] },
      },
      projectProgressStatus: {
        type: String,
        enum: ProjectProgressStatus,
        required: true,
      },
      collaborationDuration: {
        duration: {
          type: String,
          enum: CollaborationDuration,
          required: true,
        },
        estimation: { type: String, required: true },
      },
    },
    kindOfCollaborationWanted: {
      typeOfCollaboration: {
        type: [String],
        enum: TypeOfCollaboration,
        required: true,
      },
      requestTitle: { type: String, required: true },
      description: { type: String, required: true },
      keywordsActivity: { type: [String] },
    },
    skillsOrTechnical: {
      organizationAffiliated: {
        type: [String],
        enum: OrganizationAffiliated,
        required: true,
      },
      specificTechnicsNames: { type: [String] },
      equipment: { type: [String] },
      models: { type: [String] },
      chemicalAndBiologicalProducts: { type: [String] },
      otherSkills: { type: [String] },
    },
    additional_notes: { type: String },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Request = mongoose.model<IRequest>("Request", requestSchema);

export default Request;
