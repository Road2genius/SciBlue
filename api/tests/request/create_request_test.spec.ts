import request from "supertest";
import app from "../../src/server";
import mongoose from "mongoose";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../src/constants/error/errorCodes";
import { BASE_ROUTE, ENDPOINT } from "../../src/routes/http";
import { createUserFixture, generateTestToken, validUserData } from "../user/fixtures/user";
import UserModel, { IUser } from "../../src/models/user/User";
import { valideRequestData } from "./fixtures/request";
import { IRequest } from "../../src/models/requests/Request";

// POST /api/requests
describe("Create a request", () => {
  const url: string = BASE_ROUTE + "/" + ENDPOINT.REQUEST.CREATE_REQUEST_PATH;
  let userId: mongoose.Types.ObjectId;
  let token: string;

  beforeEach(async () => {
    await UserModel.deleteMany({});
    const user: IUser = await createUserFixture(validUserData);
    userId = user._id;
    token = generateTestToken(user);
  });

  it("should create a new request", async () => {
    const addUserIdToRequest: Partial<IRequest> = {
      ...valideRequestData,
      userId: userId,
    };

    const response = await request(app)
      .post(url)
      .set("Authorization", `Bearer ${token}`)
      .send(addUserIdToRequest)
      .expect(HTTP_STATUS_CODES.CREATED);

    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.userId).toBe(userId.toString());
    expect(response.body.data.project.projectTitle).toBe(valideRequestData.project?.projectTitle);
    expect(response.body.data.project.summary).toBe(valideRequestData.project?.summary);
    expect(response.body.data.project.fieldsEnvironmentalArea.generic).toEqual(
      valideRequestData.project?.fieldsEnvironmentalArea.generic
    );
    expect(response.body.data.project.fieldsEnvironmentalArea.custom).toEqual(
      valideRequestData.project?.fieldsEnvironmentalArea.custom
    );
  });

  it("should not create a request with missing required fields", async () => {
    const response = await request(app)
      .post(url)
      .set("Authorization", `Bearer ${token}`)
      .send({ project: { projectTitle: "test" } })
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.code).toBe(ERROR_CODES.VALIDATION_ERROR);
    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
    expect(response.body.details).toContain("User ID is required");
    expect(response.body.details).toContain("Fields of environmental area is required");
    expect(response.body.details).toContain("Project progress status is required");
    expect(response.body.details).toContain("Type of collaboration is required");
    expect(response.body.details).toContain("Request title is required");
    expect(response.body.details).toContain("Request description is required");
  });
});
