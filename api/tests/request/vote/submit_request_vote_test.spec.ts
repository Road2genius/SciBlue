import request from "supertest";
import mongoose from "mongoose";
import app from "../../../src/server";
import UserModel, { IUser } from "../../../src/models/user/User";
import RequestModel, { IRequest } from "../../../src/models/requests/Request";
import { VoteRequestModel } from "../../../src/models/requests/Vote";
import { createUserFixture, generateTestToken, validUserData } from "../../user/fixtures/user";
import { createRequestFixture, valideRequestData } from "../fixtures/request";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../../src/constants/error/errorCodes";

describe("Submit a vote", () => {
  let userId: mongoose.Types.ObjectId;
  let token: string;
  let requestId: mongoose.Types.ObjectId;

  beforeEach(async () => {
    await UserModel.deleteMany({});
    await RequestModel.deleteMany({});
    await VoteRequestModel.deleteMany({});

    const user: IUser = await createUserFixture(validUserData);
    userId = user._id;
    token = generateTestToken(user);

    const addUserIdToRequest = new RequestModel({
      ...valideRequestData,
      userId: userId,
    });

    const newRequest: IRequest = await createRequestFixture(addUserIdToRequest);
    requestId = newRequest._id;
  });

  it("should submit a new vote", async () => {
    const response = await request(app)
      .post(`/api/requests/votes/${requestId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: userId,
        vote: "positive",
      })
      .expect(HTTP_STATUS_CODES.CREATED);

    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.userId).toBe(userId.toString());
    expect(response.body.data.requestId).toBe(requestId.toString());
    expect(response.body.data.vote).toBe("positive");
  });

  it("should update an existing vote", async () => {
    const newVote = new VoteRequestModel({
      userId: userId,
      requestId: requestId,
      vote: "positive",
    });
    await newVote.save();

    const response = await request(app)
      .post(`/api/requests/votes/${requestId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: userId,
        vote: "negative",
      })
      .expect(HTTP_STATUS_CODES.CREATED);

    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.userId).toBe(userId.toString());
    expect(response.body.data.requestId).toBe(requestId.toString());
    expect(response.body.data.vote).toBe("negative");
  });

  it("should not update if the same vote type is submitted", async () => {
    const newVote = new VoteRequestModel({
      userId: userId,
      requestId: requestId,
      vote: "positive",
    });
    await newVote.save();

    const response = await request(app)
      .post(`/api/requests/votes/${requestId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: userId,
        vote: "positive",
      })
      .expect(HTTP_STATUS_CODES.OK);

    expect(response.body.data.message).toBe("Vote already recorded");
  });

  it("should return 400 for invalid requestId", async () => {
    const response = await request(app)
      .post(`/api/requests/votes/invalidRequestId`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: userId,
        vote: "positive",
      })
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.code).toBe(ERROR_CODES.VALIDATION_ERROR);
    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
  });

  it("should return 404 if request is not found", async () => {
    const invalidRequestId = new mongoose.Types.ObjectId();

    const response = await request(app)
      .post(`/api/requests/votes/${invalidRequestId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: userId,
        vote: "positive",
      })
      .expect(HTTP_STATUS_CODES.NOT_FOUND);

    expect(response.body.code).toBe(ERROR_CODES.REQUEST_NOT_FOUND);
    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.REQUEST_NOT_FOUND]);
  });

  it("should return bad request if none vote is sent", async () => {
    const response = await request(app)
      .post(`/api/requests/votes/${requestId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: userId,
      })
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.code).toBe(ERROR_CODES.REQUEST_VOTE_IS_REQUIRED);
    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.REQUEST_VOTE_IS_REQUIRED]);
  });
});
