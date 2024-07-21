import mongoose from "mongoose";
import {
  CollaborationDuration,
  FieldsProfessionalActivity,
  ProjectProgressStatus,
  TypeOfCollaboration,
} from "../../../../shared-types/user";
import RequestCollab, { IRequest } from "../../../src/models/requests/Request";

export const valideRequestData: Partial<IRequest> = {
  project: {
    projectTitle: "testProject2",
    summary: "this is a test",
    fieldsProfessionalActivity: {
      generic: [FieldsProfessionalActivity.ClimateChange, FieldsProfessionalActivity.AgriFood],
      custom: ["test"],
    },
    projectProgressStatus: ProjectProgressStatus.NotFunded,
    collaborationDuration: {
      duration: CollaborationDuration.LongTermCollaboration,
      estimation: "will see",
    },
  },
  kindOfCollaborationWanted: {
    typeOfCollaboration: [TypeOfCollaboration.DirectFunding],
    requestTitle: "request title",
    description: "this is a description",
    keywordsActivity: ["test1", "test2"],
  },
  additional_notes: "nothing special",
};

export const anotherValideRequestData: Partial<IRequest> = {
  project: {
    projectTitle: "testProject1337",
    summary: "this is also a test",
    fieldsProfessionalActivity: {
      generic: [FieldsProfessionalActivity.AquaticEcosystems, FieldsProfessionalActivity.Pollution],
      custom: ["test2"],
    },
    projectProgressStatus: ProjectProgressStatus.NearingCompletion,
    collaborationDuration: {
      duration: CollaborationDuration.ShortTermOrOneTimeExperiment,
      estimation: "will see",
    },
  },
  kindOfCollaborationWanted: {
    typeOfCollaboration: [TypeOfCollaboration.PartnershipForGrant],
    requestTitle: "request title test",
    description: "this is a description222",
    keywordsActivity: ["test12", "test22"],
  },
  additional_notes: "nothing special again",
};

// createRequestFixture create a request for testing environment
export const createRequestFixture = async (requestData: Partial<IRequest>): Promise<IRequest> => {
  const request: IRequest = new RequestCollab(requestData);
  await request.save();
  return request;
};
