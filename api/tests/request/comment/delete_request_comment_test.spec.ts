import request from "supertest";
import mongoose from "mongoose";
import app from "../../../src/server";
import { CommentRequestModel, ICommentRequest } from "../../../src/models/requests/Comment";
import { createUserFixture, generateTestToken, validUserData } from "../../user/fixtures/user";
import { createRequestCommentFixture, createRequestFixture, valideRequestData } from "../fixtures/request";
import UserModel, { IUser } from "../../../src/models/user/User";
import RequestModel, { IRequest } from "../../../src/models/requests/Request";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../../src/constants/error/errorCodes";

// DELETE /api/comments/:id
describe("Delete a comment", () => {
  let userId: mongoose.Types.ObjectId;
  let token: string;
  let requestId: mongoose.Types.ObjectId;
  let commentRequestId: mongoose.Types.ObjectId;

  beforeEach(async () => {
    await UserModel.deleteMany({});
    await RequestModel.deleteMany({});
    await CommentRequestModel.deleteMany({});

    const user: IUser = await createUserFixture(validUserData);
    userId = user._id;
    token = generateTestToken(user);

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

    const commentRequest: ICommentRequest = await createRequestCommentFixture(commentToAdd);
    commentRequestId = commentRequest._id;
  });

  it("should delete a comment", async () => {
    await request(app)
      .delete(`/api/requests/comments/${commentRequestId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(HTTP_STATUS_CODES.OK);

    const requestCommentDeleted = await CommentRequestModel.findById(commentRequestId);
    expect(requestCommentDeleted).toBeNull();
  });

  it("should return not found if the request comment does not exist", async () => {
    const nonExistentRequestCommentId = new mongoose.Types.ObjectId().toString();

    const response = await request(app)
      .delete(`/api/requests/comments/${nonExistentRequestCommentId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(HTTP_STATUS_CODES.NOT_FOUND);

    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.REQUEST_COMMENT_NOT_FOUND]);
  });

  it("should return validation error if the request comment id is not an id", async () => {
    const response = await request(app)
      .delete(`/api/requests/comments/dummy`)
      .set("Authorization", `Bearer ${token}`)
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
  });
});
