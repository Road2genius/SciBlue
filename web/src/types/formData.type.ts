import {
  RequestReqInterface,
  RequestResInterface,
} from "../../../shared-types/requestData";
import { QuestionReqInterface, QuestionResInterface } from "../../../shared-types/questionData";
import {
  CollaborationStatus,
  DiscussionStatus,
  ProjectFunding,
  ProjectProgressStatus,
  TypeOfOrganization,
} from "../../../shared-types/user";

export type formData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organizationName: string;
  institution: string;
  address: string;
  city: string;
  country: string;
  professionalActivity: string;
};

export const initialQuestionState: QuestionReqInterface = {
  userId: "",
  title: "",
  body: "",
  fieldsEnvironmentalArea: {
    generic: [],
    custom: [],
  },
  discussionStatus: "" as DiscussionStatus,
  positiveVotes: 0,
  negativeVotes: 0,
  comments: [],
  votes: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const initialQuestionResponseState: QuestionResInterface = {
  _id: "",
  userId: "",
  title: "",
  body: "",
  fieldsEnvironmentalArea: {
    generic: [],
    custom: [],
  },
  discussionStatus: "" as DiscussionStatus,
  positiveVotes: 0,
  negativeVotes: 0,
  comments: [],
  votes: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const initialRequestState: RequestReqInterface = {
  userId: "",
  project: {
    projectTitle: "",
    summary: "",
    fieldsEnvironmentalArea: {
      generic: [],
      custom: [],
    },
    projectStartEndEstimation: [],
    projectProgressStatus: "" as ProjectProgressStatus,
    projectFunding: "" as ProjectFunding,
  },
  kindOfCollaborationWanted: {
    typeOfCollaboration: [],
    requestTitle: "",
    description: "",
  },
  specificsSkills: {
    organizationRequested: [
      TypeOfOrganization.AcademicLaboratoryAndInstitute,
      TypeOfOrganization.AcademicTechnologyPlatform,
      TypeOfOrganization.FreelanceScientist,
      TypeOfOrganization.Government,
      TypeOfOrganization.NgoNonProfitOrganizationFoundation,
      TypeOfOrganization.PrivateResearchOrganizations,
    ],
    disciplines: [],
    expertisesAndSkills: [],
  },
  collaborationStatus: "" as CollaborationStatus,
  positiveVotes: 0,
  negativeVotes: 0,
  comments: [],
  votes: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const initialResponseState: RequestResInterface = {
  _id: "",
  userId: "",
  project: {
    projectTitle: "",
    summary: "",
    fieldsEnvironmentalArea: {
      generic: [],
      custom: [],
    },
    projectStartEndEstimation: [],
    projectProgressStatus: "" as ProjectProgressStatus,
    projectFunding: "" as ProjectFunding,
  },
  kindOfCollaborationWanted: {
    typeOfCollaboration: [],
    requestTitle: "",
    description: "",
  },
  specificsSkills: {
    organizationRequested: [
      TypeOfOrganization.AcademicLaboratoryAndInstitute,
      TypeOfOrganization.AcademicTechnologyPlatform,
      TypeOfOrganization.FreelanceScientist,
      TypeOfOrganization.Government,
      TypeOfOrganization.NgoNonProfitOrganizationFoundation,
      TypeOfOrganization.PrivateResearchOrganizations,
    ],
    disciplines: [],
    expertisesAndSkills: [],
  },
  collaborationStatus: "" as CollaborationStatus,
  positiveVotes: 0,
  negativeVotes: 0,
  comments: [],
  votes: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
