import bcrypt from "bcrypt";
import mongoose from "mongoose";
import request from "supertest";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../src/constants/error/errorCodes";
import cache from "../../src/middleware/auth";
import UserModel from "../../src/models/user/User";
import { BASE_ROUTE, ENDPOINT } from "../../src/routes/http";
import app from "../../src/server";
import { createUserFixture, validUserData } from "../user/fixtures/user";

// POST /api/reset-password
describe("Auth reset password", () => {
  beforeEach(async () => {
    await UserModel.deleteMany({});
    await createUserFixture(validUserData);
  });

  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  const url: string = BASE_ROUTE + "/" + ENDPOINT.AUTH.RESET_PASSWORD_PATH;
  const token = "valid-reset-token";
  const newPassword = "NewStrongPassword123!";
  const email = validUserData.email;

  beforeEach(async () => {
    await UserModel.deleteMany({});
    await createUserFixture(validUserData);

    if (email) cache.set(email, token);
  });

  afterEach(async () => {
    await UserModel.deleteMany({});
    cache.flushAll();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should reset the password successfully", async () => {
    const response = await request(app)
      .post(url)
      .query({ email })
      .send({ token, newPassword })
      .expect(HTTP_STATUS_CODES.OK);

    expect(response.body.data.message).toBe("Password reset successfully");

    const user = await UserModel.findOne({ email });
    const isPasswordMatch = await bcrypt.compare(newPassword, user!.password);
    expect(isPasswordMatch).toBe(true);
  });

  it("should return an error if the token is invalid or expired", async () => {
    const response = await request(app)
      .post(url)
      .query({ email })
      .send({ token: "invalid-token", newPassword })
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.code).toBe(ERROR_CODES.VALIDATION_ERROR);
    expect(response.body.message).toBe("Invalid or expired token");
  });

  it("should return an error if the user is not found", async () => {
    await UserModel.deleteMany({});

    const response = await request(app)
      .post(url)
      .query({ email })
      .send({ token, newPassword })
      .expect(HTTP_STATUS_CODES.NOT_FOUND);

    expect(response.body.code).toBe(ERROR_CODES.USER_NOT_FOUND);
    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]);
  });

  it("should return an error if the email is not provided", async () => {
    const response = await request(app).post(url).send({ token, newPassword }).expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.code).toBe(ERROR_CODES.VALIDATION_ERROR);
    expect(response.body.message).toBe("Email is required");
  });

  it("should return an error if the new password is not provided", async () => {
    const response = await request(app)
      .post(url)
      .query({ email })
      .send({ token })
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.code).toBe(ERROR_CODES.VALIDATION_ERROR);
    expect(response.body.message).toBe("Password is required");
  });
});
