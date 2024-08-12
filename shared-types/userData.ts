import { Discipline } from "./requestData";
import {
  CollaborationDuration,
  FieldsEnvironmentalArea,
  Languages,
  ProjectFunding,
  ProjectProgressStatus,
  TypeOfCollaboration,
  TypeOfOrganization,
} from "./user";

export type User = {
  _id: string;
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
    fieldsEnvironmentalArea: {
      generic: FieldsEnvironmentalArea[];
      custom: string[];
    };
    fieldsApplicationArea: string[];
  };
  professionalActivityAndExpertise: {
    fieldsEnvironmentalArea: {
      generic: FieldsEnvironmentalArea[];
      custom: string[];
    };
    description: string;
    expertisesAndSkills: string[];
  };
  kindOfCollaborationWanted: {
    typeOfOrganization: TypeOfOrganization[];
    projectProgressStatus: ProjectProgressStatus;
    projectFunding: ProjectFunding;
  };
  avatar: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
};
