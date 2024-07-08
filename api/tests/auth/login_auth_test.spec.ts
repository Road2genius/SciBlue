import request from "supertest";
import app from "../../src/server";
import mongoose from "mongoose";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS_CODES,
} from "../../src/constants/error/errorCodes";
import {
  describe,
  expect,
  it,
  afterAll,
  beforeEach,
  afterEach,
} from "@jest/globals";
import User from "../../src/models/user/User";
import { createUserFixture, validUserData } from "../user/fixtures/user";

describe("User login", () => {
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

  it("should login successfully with valid credentials", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: validUserData.email, password: validUserData.password })
      .expect(HTTP_STATUS_CODES.OK);

    expect(response.body).toHaveProperty("token");
  });

  it("should return an error for invalid credentials", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: validUserData.email, password: "wrongpassword" })
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.message).toBe(
      ERROR_MESSAGES[ERROR_CODES.WRONG_PASSWORD]
    );
  });

  it("should return an error for non-existent user", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({
        email: "nonexistent@example.com",
        password: validUserData.password,
      })
      .expect(HTTP_STATUS_CODES.NOT_FOUND);

    expect(response.body.message).toBe(
      ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]
    );
  });

  it("should return validation error for malformed request", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: validUserData.email })
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.message).toBe(
      ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]
    );
  });
});
