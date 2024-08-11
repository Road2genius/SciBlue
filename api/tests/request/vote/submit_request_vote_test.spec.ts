import request from "supertest";
import mongoose from "mongoose";
import app from "../../../src/server";
import UserModel, { IUser } from "../../../src/models/user/User";
import RequestModel, { IRequest } from "../../../src/models/requests/Request";
import {
  anotherValidUserData,
  createUserFixture,
  generateTestToken,
  otherValidUserData,
  validUserData,
} from "../../user/fixtures/user";
import { createRequestFixture, valideRequestData } from "../fixtures/request";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../../src/constants/error/errorCodes";
import { CollaborationVote } from "../../../../shared-types/user";

describe("Submit a vote", () => {
  let userId: mongoose.Types.ObjectId;
  let userWhoVoteId: mongoose.Types.ObjectId;
  let otherUserWhoVoteId: mongoose.Types.ObjectId;
  let token: string;
  let tokenWhoVote: string;
  let otherTokenWhoVote: string;
  let requestId: mongoose.Types.ObjectId;

  beforeEach(async () => {
    await UserModel.deleteMany({});
    await RequestModel.deleteMany({});

    const user: IUser = await createUserFixture(validUserData);
    userId = user._id;
    token = generateTestToken(user);

    const userWhoVote: IUser = await createUserFixture(anotherValidUserData);
    userWhoVoteId = userWhoVote._id;
    tokenWhoVote = generateTestToken(userWhoVote);

    const otherUserWhoVote: IUser = await createUserFixture(otherValidUserData);
    otherUserWhoVoteId = otherUserWhoVote._id;
    otherTokenWhoVote = generateTestToken(otherUserWhoVote);

    const addUserIdToRequest = new RequestModel({
      ...valideRequestData,
      userId: userId,
      votes: [
        {
          userId: otherUserWhoVote,
          vote: CollaborationVote.positive,
        },
      ],
    });

    const newRequest: IRequest = await createRequestFixture(addUserIdToRequest);
    requestId = newRequest._id;
  });

  it("should submit a new vote", async () => {
    const response = await request(app)
      .post(`/api/requests/${requestId}/votes/`)
      .set("Authorization", `Bearer ${tokenWhoVote}`)
      .send({
        userId: userWhoVoteId,
        vote: CollaborationVote.positive,
      })
      .expect(HTTP_STATUS_CODES.CREATED);

    expect(response.body.data.votes[1].userId).toBe(userWhoVoteId.toString());
    expect(response.body.data.votes[1].vote).toBe(CollaborationVote.positive);
  });

  it("should update an existing vote", async () => {
    const response = await request(app)
      .post(`/api/requests/${requestId}/votes/`)
      .set("Authorization", `Bearer ${otherTokenWhoVote}`)
      .send({
        userId: otherUserWhoVoteId,
        vote: CollaborationVote.negative,
      })
      .expect(HTTP_STATUS_CODES.OK);

    expect(response.body.data.votes[0].userId).toBe(otherUserWhoVoteId.toString());
    expect(response.body.data.votes[0].vote).toBe(CollaborationVote.negative);
  });

  it("should not update if the same vote type is submitted", async () => {
    const response = await request(app)
      .post(`/api/requests/${requestId}/votes/`)
      .set("Authorization", `Bearer ${otherTokenWhoVote}`)
      .send({
        userId: otherUserWhoVoteId,
        vote: CollaborationVote.positive,
      })
      .expect(HTTP_STATUS_CODES.OK);

    expect(response.body.data.message).toBe("Vote already recorded");
  });

  it("should return 400 for invalid requestId", async () => {
    const response = await request(app)
      .post(`/api/requests/invalidId/votes/`)
      .set("Authorization", `Bearer ${tokenWhoVote}`)
      .send({
        userId: userWhoVoteId,
        vote: CollaborationVote.positive,
      })
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.code).toBe(ERROR_CODES.VALIDATION_ERROR);
    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
  });

  it("should return 404 if request is not found", async () => {
    const invalidRequestId = new mongoose.Types.ObjectId();

    const response = await request(app)
      .post(`/api/requests/${invalidRequestId}/votes/`)
      .set("Authorization", `Bearer ${tokenWhoVote}`)
      .send({
        userId: userWhoVoteId,
        vote: CollaborationVote.positive,
      })
      .expect(HTTP_STATUS_CODES.NOT_FOUND);

    expect(response.body.code).toBe(ERROR_CODES.REQUEST_NOT_FOUND);
    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.REQUEST_NOT_FOUND]);
  });

  it("should return bad request if none vote is sent", async () => {
    const response = await request(app)
      .post(`/api/requests/${requestId}/votes/`)
      .set("Authorization", `Bearer ${tokenWhoVote}`)
      .send({
        userId: userWhoVoteId,
      })
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.code).toBe(ERROR_CODES.REQUEST_VOTE_IS_REQUIRED);
    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.REQUEST_VOTE_IS_REQUIRED]);
  });

  it("should not vote to your own request", async () => {
    const response = await request(app)
      .post(`/api/requests/${requestId}/votes/`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: userId,
        vote: CollaborationVote.positive,
      })
      .expect(HTTP_STATUS_CODES.FORBIDDEN);

    expect(response.body.code).toBe(ERROR_CODES.USER_CANNOT_VOTE_OWN_REQUEST);
    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.USER_CANNOT_VOTE_OWN_REQUEST]);
  });
});
