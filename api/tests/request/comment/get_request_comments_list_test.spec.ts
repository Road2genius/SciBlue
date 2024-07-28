import request from "supertest";
import mongoose from "mongoose";
import app from "../../../src/server";
import { CommentRequestModel, ICommentRequest } from "../../../src/models/requests/Comment";
import { createUserFixture, generateTestToken, validUserData } from "../../user/fixtures/user";
import { createRequestCommentFixture, createRequestFixture, valideRequestData } from "../fixtures/request";
import UserModel, { IUser } from "../../../src/models/user/User";
import RequestModel, { IRequest } from "../../../src/models/requests/Request";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../../src/constants/error/errorCodes";

// GET /requests/:requestId/comments
describe("Get list of comments in a request", () => {
  let userId: mongoose.Types.ObjectId;
  let requestId: mongoose.Types.ObjectId;
  let requestWithoutCommentsId: mongoose.Types.ObjectId;

  beforeEach(async () => {
    await UserModel.deleteMany({});
    await RequestModel.deleteMany({});
    await CommentRequestModel.deleteMany({});

    const user: IUser = await createUserFixture(validUserData);
    userId = user._id;

    const addUserIdToRequest: Partial<IRequest> = {
      ...valideRequestData,
      userId: userId,
    };

    const newRequest: IRequest = await createRequestFixture(addUserIdToRequest);
    requestId = newRequest._id;

    const commentToAdd: Partial<ICommentRequest> = {
      text: "This is a comment",
      userId: userId,
      requestId: requestId,
    };

    await createRequestCommentFixture(commentToAdd);

    const newCommentToAdd: Partial<ICommentRequest> = {
      text: "This is a new comment",
      userId: userId,
      requestId: requestId,
    };

    await createRequestCommentFixture(newCommentToAdd);

    const newRequestWithoutComments: IRequest = await createRequestFixture(addUserIdToRequest);
    requestWithoutCommentsId = newRequestWithoutComments._id;
  });

  it("should get list of comments in a request", async () => {
    const response = await request(app).get(`/api/requests/${requestId}/comments`).expect(HTTP_STATUS_CODES.OK);

    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data.length).toBe(2);
  });

  it("should return an empty list of comments", async () => {
    const response = await request(app)
      .get(`/api/requests/${requestWithoutCommentsId}/comments`)
      .expect(HTTP_STATUS_CODES.OK);

    expect(response.body.data).toEqual([]);
  });
});
