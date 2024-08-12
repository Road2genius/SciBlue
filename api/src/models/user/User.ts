import {
  CollaborationDuration,
  FieldsEnvironmentalArea,
  Languages,
  ProjectFunding,
  ProjectProgressStatus,
  TypeOfCollaboration,
  TypeOfOrganization,
} from "../../../../shared-types/user";
import mongoose, { Document, Schema } from "mongoose";
import { disciplineSchema, IFieldsEnvironmentalArea } from "../requests/Request";
import { Discipline } from "../../../../shared-types/requestData";
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  organizationAffiliated: TypeOfOrganization;
  privacyLevel: {
    mode: boolean;
    username: string;
  };
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organizationName: string;
  typeOfOrganizationSpecific: string;
  country: string;
  languages: Languages[];
  institution: string;
  profileVerificationInfo: string;
  researchActivityAndExpertise: {
    description: string;
    disciplines: Discipline[];
    expertisesAndSkills: string[];
    fieldsEnvironmentalArea?: IFieldsEnvironmentalArea;
    fieldsApplicationArea: string[];
  };
  professionalActivityAndExpertise: {
    fieldsEnvironmentalArea?: IFieldsEnvironmentalArea;
    description: string;
    expertisesAndSkills: string[];
  };
  kindOfCollaborationWanted: {
    typeOfOrganization: TypeOfOrganization[];
    projectProgressStatus: ProjectProgressStatus;
    projectFunding?: ProjectFunding;
  };
  avatar: string;
  refreshToken: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema = new Schema(
  {
    organizationAffiliated: {
      type: String,
      enum: Object.values(TypeOfOrganization),
      required: true,
    },
    privacyLevel: {
      mode: { type: Boolean, required: true },
      username: { type: String, required: true },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    organizationName: { type: String, required: true },
    typeOfOrganizationSpecific: { type: String, required: true },
    country: { type: String, required: true },
    languages: {
      type: [String],
      enum: Object.values(Languages),
      required: true,
    },
    institution: { type: String, required: true },
    profileVerificationInfo: { type: String },
    researchActivityAndExpertise: {
      description: { type: String, required: true },
      disciplines: [disciplineSchema],
      expertisesAndSkills: { type: [String], required: true },
      fieldsEnvironmentalArea: { type: Schema.Types.Mixed },
      fieldsApplicationArea: { type: [String], required: true },
    },
    professionalActivityAndExpertise: {
      fieldsEnvironmentalArea: { type: Schema.Types.Mixed },
      description: { type: String, required: true },
      expertisesAndSkills: { type: [String], required: true },
    },
    kindOfCollaborationWanted: {
      typeOfOrganization: {
        type: [String],
        enum: Object.values(TypeOfOrganization),
        required: true,
      },
      projectProgressStatus: {
        type: String,
        enum: Object.values(ProjectProgressStatus),
        required: true,
      },
      projectFunding: {
        type: String,
        enum: Object.values(ProjectFunding),
      },
    },
    avatar: { type: String },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
