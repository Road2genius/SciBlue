import mongoose, { Document, Schema } from "mongoose";
import {
  PROJECT_DURATION,
  PROJECT_PROGRESS_STATUS,
  TYPE_OF_ACTOR,
  TYPE_OF_COLLABORATION,
  TYPE_OF_STRUCTURE,
} from "../constants/user";

type TypeOfActor = (typeof TYPE_OF_ACTOR)[number];
type TypeOfCollaboration = (typeof TYPE_OF_COLLABORATION)[number];
type TypeOfStructure = (typeof TYPE_OF_STRUCTURE)[number];
type ProjectProgressStatus = (typeof PROJECT_PROGRESS_STATUS)[number];
type ProjectDuration = (typeof PROJECT_DURATION)[number];

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  typeOfActor: TypeOfActor;
  structure_name: string;
  institution: string;
  address: string;
  city: string;
  country: string;
  description: string;
  field_of_application: string[];
  research_specifity: {
    research_activity: boolean;
    research_topic_organization: string;
    research_topic_keywords: string[];
  };
  skills_or_technical: {
    technical_approach: string[];
    specific_technics_name: string[];
    models: string[];
    specific_products: string[];
    specific_material: string[];
    other_skills: string[];
  };
  kind_of_collaboration_wanted: {
    type_of_collaboration: TypeOfCollaboration[];
    type_of_structure: TypeOfStructure[];
    project_progress_status: ProjectProgressStatus[];
    project_duration: ProjectDuration[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    typeOfActor: {
      type: String,
      required: true,
      enum: TYPE_OF_ACTOR,
    },
    structure_name: { type: String, required: true },
    institution: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String },
    field_of_application: { type: [String] },
    research_specifity: {
      research_topic_organization: { type: String },
      research_topic_keywords: { type: [String] },
      research_activity: { type: Boolean },
    },
    skills_or_technical: {
      technical_approach: { type: [String] },
      specific_technics_name: { type: [String] },
      models: { type: [String] },
      specific_products: { type: [String] },
      specific_material: { type: [String] },
      other_skills: { type: [String] },
    },
    kind_of_collaboration_wanted: {
      type_of_collaboration: {
        type: [String],
        enum: TYPE_OF_COLLABORATION,
      },
      type_of_structure: {
        type: [String],
        enum: TYPE_OF_STRUCTURE,
      },
      project_progress_status: {
        type: [String],
        enum: PROJECT_PROGRESS_STATUS,
      },
      project_duration: {
        type: [String],
        enum: PROJECT_DURATION,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
