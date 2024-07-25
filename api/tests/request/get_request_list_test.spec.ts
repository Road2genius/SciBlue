import request from "supertest";
import app from "../../src/server";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../src/constants/error/errorCodes";
import { createUserFixture, validUserData } from "../user/fixtures/user";
import { BASE_ROUTE, ENDPOINT } from "../../src/routes/http";
import { IUser } from "../../src/models/user/User";
import RequestModel, { IRequest } from "../../src/models/requests/Request";
import { anotherValideRequestData, createRequestFixture, valideRequestData } from "./fixtures/request";

// GET /api/users
describe("Get requests list", () => {
  const url: string = BASE_ROUTE + "/" + ENDPOINT.REQUEST.GET_REQUESTS_LIST_PATH;

  beforeEach(async () => {
    await RequestModel.deleteMany({});
  });

  afterEach(async () => {
    await RequestModel.deleteMany({});
  });

  it("should return the list of requests", async () => {
    const user: IUser = await createUserFixture(validUserData);
    await RequestModel.deleteMany({});
    const addUserIdToRequest: Partial<IRequest> = {
      ...valideRequestData,
      userId: user._id,
    };
    const addUserIdToSecondRequest: Partial<IRequest> = {
      ...anotherValideRequestData,
      userId: user._id,
    };
    const first_request: IRequest = await createRequestFixture(addUserIdToRequest);
    const second_request: IRequest = await createRequestFixture(addUserIdToSecondRequest);

    const response = await request(app).get(url).expect(HTTP_STATUS_CODES.OK);

    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data.length).toBe(2);
    expect(response.body.data[0].project.projectTitle).toBe(first_request.project.projectTitle);
    expect(response.body.data[0].project.summary).toBe(first_request.project.summary);
    expect(response.body.data[1].project.projectTitle).toBe(second_request.project.projectTitle);
    expect(response.body.data[1].project.summary).toBe(second_request.project.summary);
  });

  it("should return an empty list if no requests are found", async () => {
    const response = await request(app).get(url).expect(HTTP_STATUS_CODES.NOT_FOUND);

    expect(response.body.code).toBe(ERROR_CODES.REQUESTS_NOT_FOUND);
    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.REQUESTS_NOT_FOUND]);
  });
});
