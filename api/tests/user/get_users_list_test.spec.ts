import request from "supertest";
import app from "../../src/server";
import UserModel from "../../src/models/user/User";
import { HTTP_STATUS_CODES } from "../../src/constants/error/errorCodes";
import { anotherValidUserData, createUserFixture, validUserData } from "../user/fixtures/user";
import { BASE_ROUTE, ENDPOINT } from "../../src/routes/http";

// GET /api/users
describe("Get Users List", () => {
  const url: string = BASE_ROUTE + "/" + ENDPOINT.USER.GET_USERS_LIST_PATH;

  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  it("should return the list of users", async () => {
    await createUserFixture(validUserData);
    await createUserFixture(anotherValidUserData);

    const response = await request(app).get(url).expect(HTTP_STATUS_CODES.OK);

    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0]).toHaveProperty("email", validUserData.email);
    expect(response.body.data[1]).toHaveProperty("email", anotherValidUserData.email);
  });

  it("should return an empty list if no users are found", async () => {
    const response = await request(app).get(url).expect(HTTP_STATUS_CODES.OK);

    expect(response.body.data.length).toEqual(0);
    expect(response.body.data).toEqual([]);
  });
});
