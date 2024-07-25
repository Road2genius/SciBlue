import {
  CollaborationDuration,
  FieldsProfessionalActivity,
  OrganizationAffiliated,
  ProjectProgressStatus,
  TypeOfCollaboration,
  TypeOfOrganization,
} from "../../../../shared-types/user";
import mongoose, { Document, Schema } from "mongoose";
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organizationAffiliated: OrganizationAffiliated[];
  organizationName: string;
  institution: string;
  address: string;
  city: string;
  country: string;
  description: string;
  keywordsActivity: string[];
  fieldsProfessionalActivity: {
    generic: FieldsProfessionalActivity[];
    custom: string[];
  };
  skillsOrTechnical: {
    specificTechnicsNames: string[];
    equipment: string[];
    models: string[];
    chemicalAndBiologicalProducts: string[];
    otherSkills: string[];
  };
  kindOfCollaborationWanted: {
    typeOfCollaboration: TypeOfCollaboration[];
    typeOfOrganization: TypeOfOrganization[];
    projectProgressStatus: ProjectProgressStatus;
    collaborationDuration: CollaborationDuration;
  };
  avatar: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    organizationAffiliated: {
      type: [{ type: String, enum: OrganizationAffiliated }],
      required: true,
    },
    organizationName: { type: String, required: true },
    institution: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String },
    keywordsActivity: { type: [String] },
    fieldsProfessionalActivity: {
      generic: {
        type: [String],
        enum: FieldsProfessionalActivity,
      },
      custom: { type: [String] },
    },
    skillsOrTechnical: {
      specificTechnicsNames: { type: [String] },
      equipment: { type: [String] },
      models: { type: [String] },
      chemicalAndBiologicalProducts: { type: [String] },
      otherSkills: { type: [String] },
    },
    kindOfCollaborationWanted: {
      typeOfCollaboration: {
        type: [String],
        enum: TypeOfCollaboration,
      },
      typeOfOrganization: {
        type: [String],
        enum: TypeOfOrganization,
      },
      projectProgressStatus: {
        type: [String],
        enum: ProjectProgressStatus,
      },
      collaborationDuration: {
        type: [String],
        enum: CollaborationDuration,
      },
    },
    avatar: { type: String },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
