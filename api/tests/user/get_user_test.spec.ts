import request from "supertest";
import app from "../../src/server";
import mongoose from "mongoose";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../src/constants/error/errorCodes";
import { describe, expect, it, afterAll, beforeEach, afterEach } from "@jest/globals";
import User, { IUser } from "../../src/models/user/User";
import { createUserFixture, generateTestToken, validUserData } from "./fixtures/user";

// GET /api/users/:id
describe("Get a user", () => {
  let userId: string;
  let token: string;

  beforeEach(async () => {
    await User.deleteMany({});
    const user: IUser = await createUserFixture(validUserData);
    userId = user._id.toString();
    token = generateTestToken(user);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should get a user", async () => {
    const response = await request(app)
      .get(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(HTTP_STATUS_CODES.OK);

    expect(response.body.data.firstName).toBe(validUserData.firstName);
    expect(response.body.data.lastName).toBe(validUserData.lastName);
  });

  it("should return not found if user does not exist", async () => {
    const nonExistentUserId = new mongoose.Types.ObjectId().toString();

    const response = await request(app)
      .get(`/api/users/${nonExistentUserId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(HTTP_STATUS_CODES.NOT_FOUND);

    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]);
  });

  it("should return validation error if user id is not an id", async () => {
    const response = await request(app)
      .get(`/api/users/dummy`)
      .set("Authorization", `Bearer ${token}`)
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
  });
});
