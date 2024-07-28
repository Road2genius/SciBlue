import request from "supertest";
import mongoose from "mongoose";
import app from "../../../src/server";
import { CommentRequestModel } from "../../../src/models/requests/Comment";
import { createUserFixture, generateTestToken, validUserData } from "../../user/fixtures/user";
import { createRequestFixture, valideRequestData } from "../fixtures/request";
import UserModel, { IUser } from "../../../src/models/user/User";
import RequestModel, { IRequest } from "../../../src/models/requests/Request";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../../src/constants/error/errorCodes";

// POST /api/comments
describe("Create a comment", () => {
  const url: string = "/api/requests/comments";
  let userId: mongoose.Types.ObjectId;
  let token: string;
  let requestId: mongoose.Types.ObjectId;

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
  });

  it("should create a new comment", async () => {
    const response = await request(app)
      .post(url)
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: userId,
        requestId: requestId,
        text: "This is a test comment",
      })
      .expect(HTTP_STATUS_CODES.CREATED);

    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.requestId).toBe(requestId.toString());
    expect(response.body.data.userId).toBe(userId.toString());
    expect(response.body.data.text).toBe("This is a test comment");
  });

  it("should not create a comment with missing text field", async () => {
    const response = await request(app)
      .post(url)
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: userId,
        requestId: requestId,
      })
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.code).toBe(ERROR_CODES.VALIDATION_ERROR);
    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
    expect(response.body.details).toContain("Text is required");
  });

  it("should not create a comment with missing user id field", async () => {
    const response = await request(app)
      .post(url)
      .set("Authorization", `Bearer ${token}`)
      .send({
        text: "Test",
        requestId: requestId,
      })
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.code).toBe(ERROR_CODES.VALIDATION_ERROR);
    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
    expect(response.body.details).toContain("User Id is required");
  });
});
