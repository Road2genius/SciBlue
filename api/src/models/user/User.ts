import {
  CountryNames,
  Languages,
  ProjectFunding,
  ProjectProgressStatus,
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
  country: CountryNames;
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
    description?: string;
    expertisesAndSkills: string[];
  };
  kindOfCollaborationWanted: {
    typeOfOrganization: TypeOfOrganization[];
    projectProgressStatus: ProjectProgressStatus[];
    projectFunding?: ProjectFunding[];
  };
  funder?: boolean;
  proDoesResearch?: boolean;
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
      mode: { type: Boolean },
      username: { type: String },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    organizationName: { type: String },
    typeOfOrganizationSpecific: { type: String },
    country: { type: String, enum: Object.values(CountryNames), required: true },
    languages: {
      type: [String],
      enum: Object.values(Languages),
    },
    institution: { type: String },
    profileVerificationInfo: { type: String },
    researchActivityAndExpertise: {
      description: { type: String },
      disciplines: [disciplineSchema],
      expertisesAndSkills: { type: [String] },
      fieldsEnvironmentalArea: { type: Schema.Types.Mixed },
      fieldsApplicationArea: { type: [String] },
    },
    professionalActivityAndExpertise: {
      fieldsEnvironmentalArea: { type: Schema.Types.Mixed },
      description: { type: String },
      expertisesAndSkills: { type: [String] },
    },
    kindOfCollaborationWanted: {
      typeOfOrganization: {
        type: [String],
        enum: Object.values(TypeOfOrganization),
      },
      projectProgressStatus: {
        type: [String],
        enum: Object.values(ProjectProgressStatus),
      },
      projectFunding: {
        type: [String],
        enum: Object.values(ProjectFunding),
      },
    },
    funder: { type: Boolean },
    proDoesResearch: { type: Boolean },
    avatar: { type: String },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
