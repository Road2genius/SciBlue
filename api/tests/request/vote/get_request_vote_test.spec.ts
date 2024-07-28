import request from "supertest";
import mongoose from "mongoose";
import app from "../../../src/server";
import UserModel, { IUser } from "../../../src/models/user/User";
import RequestModel, { IRequest } from "../../../src/models/requests/Request";
import { IVoteRequest, VoteRequestModel } from "../../../src/models/requests/Vote";
import {
  anotherValidUserData,
  createUserFixture,
  generateTestToken,
  otherValidUserData,
  validUserData,
} from "../../user/fixtures/user";
import { anotherValideRequestData, createRequestFixture, valideRequestData } from "../fixtures/request";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../../src/constants/error/errorCodes";

describe("Get votes in a request", () => {
  let firstUserId: mongoose.Types.ObjectId;
  let secondUserId: mongoose.Types.ObjectId;
  let thirdUserId: mongoose.Types.ObjectId;
  let token: string;
  let anotherToken: string;
  let otherToken: string;
  let requestId: mongoose.Types.ObjectId;
  let secondRequestId: mongoose.Types.ObjectId;

  beforeEach(async () => {
    await UserModel.deleteMany({});
    await RequestModel.deleteMany({});
    await VoteRequestModel.deleteMany({});

    // user who creates the request
    const user: IUser = await createUserFixture(validUserData);
    firstUserId = user._id;
    token = generateTestToken(user);

    const addUserIdToRequest = new RequestModel({
      ...valideRequestData,
      userId: firstUserId,
    });

    const newRequest: IRequest = await createRequestFixture(addUserIdToRequest);
    requestId = newRequest._id;

    const addUserIdToSecondeRequest = new RequestModel({
      ...anotherValideRequestData,
      userId: firstUserId,
    });

    // create another request, we will not use it
    const otherRequest: IRequest = await createRequestFixture(addUserIdToSecondeRequest);
    secondRequestId = otherRequest._id;

    // second user
    const anotherUser: IUser = await createUserFixture(anotherValidUserData);
    secondUserId = anotherUser._id;
    anotherToken = generateTestToken(anotherUser);

    const requestVote: IVoteRequest = new VoteRequestModel({
      requestId,
      userId: secondUserId,
      vote: "positive",
    });
    await requestVote.save();

    // third user
    const otherUser: IUser = await createUserFixture(otherValidUserData);
    thirdUserId = otherUser._id;
    otherToken = generateTestToken(otherUser);

    const otherRequestVote: IVoteRequest = new VoteRequestModel({
      requestId,
      userId: thirdUserId,
      vote: "negative",
    });
    await otherRequestVote.save();
  });

  it("should get votes in a request", async () => {
    const response = await request(app)
      .get(`/api/requests/${requestId}/votes`)
      .set("Authorization", `Bearer ${token}`)
      .expect(HTTP_STATUS_CODES.OK);

    expect(response.body.data).toHaveProperty("positiveVotes", 1);
    expect(response.body.data).toHaveProperty("negativeVotes", 1);
  });

  it("should return zero votes for a request with no votes", async () => {
    const response = await request(app)
      .get(`/api/requests/${secondRequestId}/votes`)
      .set("Authorization", `Bearer ${token}`)
      .expect(HTTP_STATUS_CODES.OK);

    expect(response.body.data).toHaveProperty("positiveVotes", 0);
    expect(response.body.data).toHaveProperty("negativeVotes", 0);
  });
});
