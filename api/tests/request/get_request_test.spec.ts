import request from "supertest";
import app from "../../src/server";
import mongoose from "mongoose";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../src/constants/error/errorCodes";
import User, { IUser } from "../../src/models/user/User";
import { createUserFixture, generateTestToken, validUserData } from "../user/fixtures/user";
import { createRequestFixture, valideRequestData } from "./fixtures/request";
import RequestCollab, { IRequest } from "../../src/models/requests/Request";

// GET /api/requests/:id
describe("Get a request", () => {
  let requestId: string;
  let token: string;

  beforeEach(async () => {
    await User.deleteMany({});
    const user: IUser = await createUserFixture(validUserData);
    await RequestCollab.deleteMany({});
    const addUserIdToRequest: Partial<IRequest> = {
      ...valideRequestData,
      userId: user._id,
    };
    const request: IRequest = await createRequestFixture(addUserIdToRequest);
    requestId = request._id.toString();
    token = generateTestToken(user);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it("should get a request collaboration", async () => {
    const response = await request(app)
      .get(`/api/requests/${requestId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(HTTP_STATUS_CODES.OK);

    expect(response.body.data.project.projectTitle).toBe(valideRequestData.project?.projectTitle);
    expect(response.body.data.project.summary).toBe(valideRequestData.project?.summary);
  });

  it("should return not found if request does not exist", async () => {
    const nonExistentRequestId = new mongoose.Types.ObjectId().toString();

    const response = await request(app)
      .get(`/api/requests/${nonExistentRequestId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(HTTP_STATUS_CODES.NOT_FOUND);

    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.REQUEST_NOT_FOUND]);
  });

  it("should return validation error if request id is not an id", async () => {
    const response = await request(app)
      .get(`/api/requests/dummy`)
      .set("Authorization", `Bearer ${token}`)
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
  });
});
