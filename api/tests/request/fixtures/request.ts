import { CommentRequestModel, ICommentRequest } from "../../../src/models/requests/Comment";
import {
  CollaborationVote,
  FieldsEnvironmentalArea,
  ProjectProgressStatus,
  TypeOfCollaboration,
} from "../../../../shared-types/user";
import RequestModel, { IRequest } from "../../../src/models/requests/Request";
import mongoose from "mongoose";

export const valideRequestData: Partial<IRequest> = {
  project: {
    projectTitle: "testProject2",
    summary: "this is a test",
    fieldsEnvironmentalArea: {
      generic: [FieldsEnvironmentalArea.ClimateChange, FieldsEnvironmentalArea.AgriFood],
      custom: ["test"],
    },
    projectProgressStatus: ProjectProgressStatus.Starting,
  },
  kindOfCollaborationWanted: {
    typeOfCollaboration: [TypeOfCollaboration.PartnershipForGrant],
    requestTitle: "request title",
    description: "this is a description",
  },
  votes: [{ userId: new mongoose.Types.ObjectId(), vote: CollaborationVote.positive, createdAt: new Date() }],
};

export const anotherValideRequestData: Partial<IRequest> = {
  project: {
    projectTitle: "testProject1337",
    summary: "this is a test again",
    fieldsEnvironmentalArea: {
      generic: [FieldsEnvironmentalArea.ClimateChange, FieldsEnvironmentalArea.AgriFood],
    },
    projectProgressStatus: ProjectProgressStatus.Starting,
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

// createRequestCommentFixture create a request for testing environment
export const createRequestCommentFixture = async (
  requestCommentData: Partial<ICommentRequest>
): Promise<ICommentRequest> => {
  const requestComment: ICommentRequest = new CommentRequestModel(requestCommentData);
  await requestComment.save();
  return requestComment;
};
