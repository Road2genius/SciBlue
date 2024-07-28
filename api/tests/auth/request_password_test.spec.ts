import request from "supertest";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../src/constants/error/errorCodes";
import UserModel from "../../src/models/user/User";
import { BASE_ROUTE, ENDPOINT } from "../../src/routes/http";
import app from "../../src/server";
import { createUserFixture, validUserData } from "../user/fixtures/user";

// POST /api/request-password-reset
describe("Auth request password reset", () => {
  const url: string = BASE_ROUTE + "/" + ENDPOINT.AUTH.REQUEST_PASSWORD_RESET_PATH;

  beforeEach(async () => {
    await UserModel.deleteMany({});
    await createUserFixture(validUserData);
  });

  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  // testing plan mailtrap reached, need to find another plan
  // it("should send a password reset email", async () => {
  //   const response = await request(app).post(url).send({ email: validUserData.email }).expect(HTTP_STATUS_CODES.OK);

  //   expect(response.body.data.message).toBe("Email sent");
  // });

  it("should return an error if user not found", async () => {
    const response = await request(app)
      .post(url)
      .send({ email: "notfound@example.com" })
      .expect(HTTP_STATUS_CODES.NOT_FOUND);

    expect(response.body.code).toBe(ERROR_CODES.USER_NOT_FOUND);
    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]);
  });
});
