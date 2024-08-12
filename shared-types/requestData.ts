import {
  CollaborationStatus,
  TypeOfOrganization,
  ProjectFunding,
  ProjectProgressStatus,
  TypeOfCollaboration,
  CollaborationVote,
  FieldsEnvironmentalArea,
} from "./user";
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
} from "./disciplines";

export type Discipline = {
  primary: PrimaryDiscipline;
  secondary: Array<
    | AgriculturalScienceSubDisciplines
    | AnthropologySubDisciplines
    | BiologySubDisciplines
    | ChemistrySubDisciplines
    | ComputerScienceSubDisciplines
    | DesignSubDisciplines
    | EconomicsSubDisciplines
    | EducationSubDisciplines
    | EngineeringSubDisciplines
    | EntertainmentandArtsSubDisciplines
    | GeoscienceSubDisciplines
    | HistorySubDisciplines
    | LawSubDisciplines
    | LinguisticsSubDisciplines
    | LiteratureSubDisciplines
    | MathematicsSubDisciplines
    | MedicineSubDisciplines
    | PhilosophySubDisciplines
    | PhysicsSubDisciplines
    | PoliticalScienceSubDisciplines
    | PsychologySubDisciplines
    | ReligiousStudiesSubDisciplines
    | SocialScienceSubDisciplines
    | SpaceScienceSubDisciplines
  >;
};

type KindOfCollaborationWanted = {
  typeOfCollaboration: TypeOfCollaboration[];
  requestTitle: string;
  description: string;
};

type SpecificsSkills = {
  organizationRequested: TypeOfOrganization[];
  disciplines: Discipline[];
  expertisesAndSkills: string[];
};

export type Project = {
  projectTitle: string;
  summary: string;
  fieldsEnvironmentalArea: {
    generic: FieldsEnvironmentalArea[];
    custom: string[];
  };
  projectStartEndEstimation: Date[];
  projectProgressStatus: ProjectProgressStatus;
  projectFunding: ProjectFunding;
};

export type RequestResInterface = {
  _id: string;
  userId: string;
  project: Project;
  kindOfCollaborationWanted: KindOfCollaborationWanted;
  specificsSkills: SpecificsSkills;
  collaborationStatus: CollaborationStatus;
  positiveVotes: number;
  negativeVotes: number;
  comments: string[];
  votes: Vote[];
  createdAt: Date;
  updatedAt: Date;
};

export type RequestVote = {
  userId: string;
  requestId: string;
  vote: CollaborationVote;
};

export type RequestReqComment = {
  userId: string;
  requestId: string;
  text: string;
};

export type RequestResComment = {
  _id: string;
  userId: string;
  requestId: string;
  text: string;
  positiveVotes: number;
  negativeVotes: number;
  votes: Vote[];
  createdAt: Date;
  updatedAt: Date;
};

export type CommentVote = {
  userId: string;
  commentId: string;
  vote: CollaborationVote;
};

export interface Vote {
  userId: string;
  vote: CollaborationVote;
}

export type RequestReqInterface = {
  userId: string;
  project: Project;
  kindOfCollaborationWanted: KindOfCollaborationWanted;
  specificsSkills: SpecificsSkills;
  collaborationStatus: CollaborationStatus;
  positiveVotes: number;
  negativeVotes: number;
  comments: string[];
  votes: Vote[];
  createdAt: Date;
  updatedAt: Date;
};

export type NestedKeyOf<T> = {
  [K in keyof T]: T[K] extends object ? K : never;
}[keyof T];