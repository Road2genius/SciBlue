import mongoose, { Document, Schema } from "mongoose";
import {
  ProjectProgressStatus,
  TypeOfCollaboration,
  TypeOfOrganization,
  CollaborationStatus,
  ProjectFunding,
  CollaborationVote,
  FieldsEnvironmentalArea,
} from "../../../../shared-types/user";
import { Discipline } from "../../../../shared-types/requestData";
import {
  AgriculturalScienceSubDisciplines,
  AnthropologySubDisciplines,
  BiologySubDisciplines,
  ChemistrySubDisciplines,
  ComputerScienceSubDisciplines,
  DesignSubDisciplines,
  EconomicsSubDisciplines,
  EducationSubDisciplines,
  EngineeringSubDisciplines,
  EntertainmentandArtsSubDisciplines,
  GeoscienceSubDisciplines,
  HistorySubDisciplines,
  LawSubDisciplines,
  LinguisticsSubDisciplines,
  LiteratureSubDisciplines,
  MathematicsSubDisciplines,
  MedicineSubDisciplines,
  PhilosophySubDisciplines,
  PhysicsSubDisciplines,
  PoliticalScienceSubDisciplines,
  PrimaryDiscipline,
  PsychologySubDisciplines,
  ReligiousStudiesSubDisciplines,
  SocialScienceSubDisciplines,
  SpaceScienceSubDisciplines,
} from "../../../../shared-types/disciplines";
export interface IFieldsEnvironmentalArea {
  generic?: FieldsEnvironmentalArea[];
  custom?: string[];
}

export interface IProject {
  projectTitle: string;
  summary: string;
  fieldsEnvironmentalArea: IFieldsEnvironmentalArea;
  projectProgressStatus: ProjectProgressStatus;
  projectStartEndEstimation?: Date[];
  projectFunding?: ProjectFunding;
}

export interface IKindOfCollaborationWanted {
  typeOfCollaboration: TypeOfCollaboration[];
  requestTitle: string;
  description: string;
}

export interface ISpecificsSkills {
  organizationRequested: TypeOfOrganization[];
  disciplines: Discipline[];
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
  votes: Array<{
    userId: mongoose.Types.ObjectId;
    vote: CollaborationVote;
    createdAt: Date;
    updatedAt?: Date;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}

const fieldsEnvironmentalAreaSchema: Schema<IFieldsEnvironmentalArea> = new Schema({
  generic: {
    type: [String],
    enum: Object.values(FieldsEnvironmentalArea),
  },
  custom: {
    type: [String],
  },
});

export const disciplineSchema = new Schema({
  primary: {
    type: String,
    enum: Object.values(PrimaryDiscipline),
    required: true,
  },
  secondary: [
    {
      type: String,
      enum: [
        ...Object.values(AgriculturalScienceSubDisciplines),
        ...Object.values(AnthropologySubDisciplines),
        ...Object.values(BiologySubDisciplines),
        ...Object.values(ChemistrySubDisciplines),
        ...Object.values(ComputerScienceSubDisciplines),
        ...Object.values(DesignSubDisciplines),
        ...Object.values(EconomicsSubDisciplines),
        ...Object.values(EducationSubDisciplines),
        ...Object.values(EngineeringSubDisciplines),
        ...Object.values(EntertainmentandArtsSubDisciplines),
        ...Object.values(GeoscienceSubDisciplines),
        ...Object.values(HistorySubDisciplines),
        ...Object.values(LawSubDisciplines),
        ...Object.values(LinguisticsSubDisciplines),
        ...Object.values(LiteratureSubDisciplines),
        ...Object.values(MathematicsSubDisciplines),
        ...Object.values(MedicineSubDisciplines),
        ...Object.values(PhilosophySubDisciplines),
        ...Object.values(PhysicsSubDisciplines),
        ...Object.values(PoliticalScienceSubDisciplines),
        ...Object.values(PsychologySubDisciplines),
        ...Object.values(ReligiousStudiesSubDisciplines),
        ...Object.values(SocialScienceSubDisciplines),
        ...Object.values(SpaceScienceSubDisciplines),
      ],
    },
  ],
});

const projectSchema: Schema<IProject> = new Schema({
  projectTitle: { type: String, required: true },
  summary: { type: String, required: true },
  fieldsEnvironmentalArea: {
    type: fieldsEnvironmentalAreaSchema,
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
    enum: Object.values(ProjectFunding),
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
      organizationRequested: { type: [String], enum: Object.values(TypeOfOrganization) },
      disciplines: [disciplineSchema],
      expertisesAndSkills: { type: [String] },
    },
    collaborationStatus: { type: String, enum: Object.values(CollaborationStatus) },
    positiveVotes: { type: Number, default: 0 },
    negativeVotes: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: "CommentRequest" }],
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

// Add validation to ensure at least one of 'generic' or 'custom' is non-empty
fieldsEnvironmentalAreaSchema.pre("validate", function (next) {
  const value = this as IFieldsEnvironmentalArea;
  if (!value.generic?.length && !value.custom?.length) {
    next(new Error("fields environmental area must have at least one non-empty field: generic or custom."));
  } else {
    next();
  }
});

requestSchema.pre("save", function (next) {
  const request = this as IRequest;

  request.positiveVotes = request.votes.filter((vote) => vote.vote === "positive").length;
  request.negativeVotes = request.votes.filter((vote) => vote.vote === "negative").length;

  next();
});

export const RequestModel = mongoose.model<IRequest>("Request", requestSchema);

export default RequestModel;
