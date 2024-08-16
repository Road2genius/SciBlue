import request from "supertest";
import mongoose from "mongoose";
import app from "../../src/server";
import UserModel, { IUser } from "../../src/models/user/User";
import { createUserFixture, generateTestToken, validUserData } from "../user/fixtures/user";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../src/constants/error/errorCodes";
import RequestModel, { IRequest } from "../../src/models/requests/Request";
import { createRequestFixture, valideRequestData } from "./fixtures/request";

// PATCH /api/requests/:id
describe("Update a request", () => {
  let requestId: string;
  let token: string;
  const newProjectName: string = "test request updated";
  const updatedData = { ...valideRequestData, project: { ...valideRequestData.project, projectTitle: newProjectName } };

  beforeEach(async () => {
    await UserModel.deleteMany({});
    const user: IUser = await createUserFixture(validUserData);
    await RequestModel.deleteMany({});
    const addUserIdToRequest: Partial<IRequest> = {
      ...valideRequestData,
      userId: user._id,
    };
    const request: IRequest = await createRequestFixture(addUserIdToRequest);
    requestId = request._id.toString();
    token = generateTestToken(user);
  });

  it("should update a request", async () => {
    const response = await request(app)
      .patch(`/api/requests/${requestId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedData)
      .expect(HTTP_STATUS_CODES.OK);

    expect(response.body.data.project.projectTitle).toBe(newProjectName);
    expect(response.body.data.project.summary).toBe(valideRequestData.project?.summary);
  });

  it("should return not found error if the request doest not exist", async () => {
    const nonExistentRequestId = new mongoose.Types.ObjectId().toString();
    const response = await request(app)
      .patch(`/api/requests/${nonExistentRequestId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedData)
      .expect(HTTP_STATUS_CODES.NOT_FOUND);

    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.REQUEST_NOT_FOUND]);
  });

  it("should return validation error if user id is not an id", async () => {
    const dummyId = "dummy";

    const response = await request(app)
      .patch(`/api/requests/${dummyId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedData)
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
  });
});
