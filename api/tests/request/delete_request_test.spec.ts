import request from "supertest";
import app from "../../src/server";
import mongoose from "mongoose";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../src/constants/error/errorCodes";
import { createUserFixture, generateTestToken, validUserData } from "../user/fixtures/user";
import User, { IUser } from "../../src/models/user/User";
import RequestCollab, { IRequest } from "../../src/models/requests/Request";
import { createRequestFixture, valideRequestData } from "./fixtures/request";

// DELETE /api/requests/:id
describe("Delete a request", () => {
  let token: string;
  let requestId: string;

  beforeEach(async () => {
    await User.deleteMany({});
    const user: IUser = await createUserFixture(validUserData);
    await RequestCollab.deleteMany({});
    const addUserIdToRequest: Partial<IRequest> = {
      ...valideRequestData,
      userId: user._id,
    };
    const requestToCreate: IRequest = await createRequestFixture(addUserIdToRequest);
    requestId = requestToCreate._id.toString();
    token = generateTestToken(user);
  });

  it("should delete a request", async () => {
    await request(app)
      .delete(`/api/requests/${requestId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(HTTP_STATUS_CODES.OK);

    const requestDeleted = await RequestCollab.findById(requestId);
    expect(requestDeleted).toBeNull();
  });

  it("should return not found if the request does not exist", async () => {
    const nonExistentRequestId = new mongoose.Types.ObjectId().toString();

    const response = await request(app)
      .delete(`/api/requests/${nonExistentRequestId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(HTTP_STATUS_CODES.NOT_FOUND);

    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.REQUEST_NOT_FOUND]);
  });

  it("should return validation error if the request id is not an id", async () => {
    const dummyId = "dummy";

    const response = await request(app)
      .delete(`/api/requests/${dummyId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
  });
});
