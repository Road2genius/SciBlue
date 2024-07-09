import request from "supertest";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import NodeCache from "node-cache";
import app from "../../src/server";
import User from "../../src/models/user/User";
import { describe, expect, it, afterAll, beforeEach, afterEach } from "@jest/globals";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../src/constants/error/errorCodes";
import { createUserFixture, validUserData } from "../user/fixtures/user";
import { BASE_ROUTE, ENDPOINT } from "../../src/routes/http";
import cache from "../../src/middleware/auth";

// POST /api/reset-password
describe("Auth reset password", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await createUserFixture(validUserData);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const url: string = BASE_ROUTE + "/" + ENDPOINT.AUTH.RESET_PASSWORD_PATH;
  const token = "valid-reset-token";
  const newPassword = "NewStrongPassword123!";
  const email = validUserData.email;

  beforeEach(async () => {
    await User.deleteMany({});
    await createUserFixture(validUserData);

    if (email) cache.set(email, token);
  });

  afterEach(async () => {
    await User.deleteMany({});
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

    const user = await User.findOne({ email });
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
    await User.deleteMany({});

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
