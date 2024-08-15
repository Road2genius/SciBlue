import { Discipline } from "./requestData";
import {
  CountryNames,
  FieldsEnvironmentalArea,
  Languages,
  ProjectFunding,
  ProjectProgressStatus,
  TypeOfOrganization,
} from "./user";

export type UserReq = {
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
  funder: boolean;
  proDoesResearch: boolean;
  avatar: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserRes = {
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
  country: CountryNames;
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
  funder: boolean;
  proDoesResearch: boolean;
  avatar: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
};
