import {
  CollaborationDuration,
  FieldsProfessionalActivity,
  OrganizationAffiliated,
  ProjectProgressStatus,
  TypeOfCollaboration,
  TypeOfOrganization,
} from "./user";

export type User = {
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
    projectProgressStatus?: ProjectProgressStatus;
    collaborationDuration?: CollaborationDuration;
  };
};
