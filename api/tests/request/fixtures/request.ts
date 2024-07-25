import { FieldsProfessionalActivity, ProjectProgressStatus, TypeOfCollaboration } from "../../../../shared-types/user";
import RequestModel, { IRequest } from "../../../src/models/requests/Request";

export const valideRequestData: Partial<IRequest> = {
  project: {
    projectTitle: "testProject2",
    summary: "this is a test",
    fieldsProfessionalActivity: {
      generic: [FieldsProfessionalActivity.ClimateChange, FieldsProfessionalActivity.AgriFood],
      custom: ["test"],
    },
    projectProgressStatus: ProjectProgressStatus.NotFunded,
  },
  kindOfCollaborationWanted: {
    typeOfCollaboration: [TypeOfCollaboration.PartnershipForGrant],
    requestTitle: "request title",
    description: "this is a description",
  },
};

export const anotherValideRequestData: Partial<IRequest> = {
  project: {
    projectTitle: "testProject1337",
    summary: "this is a test again",
    fieldsProfessionalActivity: {
      generic: [FieldsProfessionalActivity.ClimateChange, FieldsProfessionalActivity.AgriFood],
    },
    projectProgressStatus: ProjectProgressStatus.NotFunded,
  },
  kindOfCollaborationWanted: {
    typeOfCollaboration: [TypeOfCollaboration.PartnershipForGrant],
    requestTitle: "request title test",
    description: "this is a test description",
  },
};

// createRequestFixture create a request for testing environment
export const createRequestFixture = async (requestData: Partial<IRequest>): Promise<IRequest> => {
  const request: IRequest = new RequestModel(requestData);
  await request.save();
  return request;
};
