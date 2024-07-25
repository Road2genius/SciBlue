import request from "supertest";
import app from "../../src/server";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../src/constants/error/errorCodes";
import { createUserFixture, validUserData } from "./fixtures/user";
import { BASE_ROUTE, ENDPOINT } from "../../src/routes/http";
import UserModel from "../../src/models/user/User";

// POST /api/users
describe("Create a user", () => {
  const url: string = BASE_ROUTE + "/" + ENDPOINT.USER.CREATE_USER_PATH;

  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  it("should create a new user", async () => {
    const response = await request(app).post(url).send(validUserData).expect(HTTP_STATUS_CODES.CREATED);

    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.firstName).toBe(validUserData.firstName);
    expect(response.body.data.lastName).toBe(validUserData.lastName);
    expect(response.body.data.email).toBe(validUserData.email);
  });

  it("should not create a user with an existing email", async () => {
    await createUserFixture(validUserData);

    const response = await request(app).post(url).send(validUserData).expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.code).toBe(ERROR_CODES.USER_ALREADY_EXISTS);
    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.USER_ALREADY_EXISTS]);
  });

  it("should not create a user with missing fields", async () => {
    const response = await request(app).post(url).send({ firstName: "Jane" }).expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.code).toBe(ERROR_CODES.VALIDATION_ERROR);
    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
    expect(response.body.details).toContain("Last Name is required");
    expect(response.body.details).toContain("Email is required");
    expect(response.body.details).toContain("Password is required");
  });

  it("should not create a user with weak password", async () => {
    const response = await request(app)
      .post(url)
      .send({ ...validUserData, password: "hashedpassword123" })
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.code).toBe(ERROR_CODES.VALIDATION_ERROR);
    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
    expect(response.body.details).toContain(
      `Password must:
        - Be at least 8 characters long
        - Contain at least one lowercase letter
        - Contain at least one uppercase letter
        - Contain at least one number
        - Contain at least one special character
      `
    );
  });

  it("should not create a user with invalid email format", async () => {
    const response = await request(app)
      .post(url)
      .send({ ...validUserData, email: "john.doe@@example.com" })
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.code).toBe(ERROR_CODES.VALIDATION_ERROR);
    expect(response.body.details).toContain("Invalid email format");
  });
});
