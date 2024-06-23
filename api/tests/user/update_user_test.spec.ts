import request from "supertest";
import mongoose from "mongoose";
import app from "../../src/server";
import { describe, expect, it, afterAll, beforeEach } from "@jest/globals";
import User, { IUser } from "../../src/models/user/User";
import { createUserFixture, validUserData } from "./fixtures/user";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS_CODES,
} from "../../src/constants/error/errorCodes";

// PATCH /api/users/:id
describe("Update a user", () => {
  let userId: string;

  beforeEach(async () => {
    await User.deleteMany({});
    const user: IUser = await createUserFixture(validUserData);
    userId = user._id.toString();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should update a user", async () => {
    const updatedData = { firstName: "Jane", lastName: "Smith" };

    const response = await request(app)
      .patch(`/api/users/${userId}`)
      .send(updatedData)
      .expect(HTTP_STATUS_CODES.OK);

    expect(response.body.firstName).toBe(updatedData.firstName);
    expect(response.body.lastName).toBe(updatedData.lastName);
  });

  it("should return not found error if user doest not exist", async () => {
    const updatedData = { firstName: "Jane", lastName: "Smith" };
    const nonExistentUserId = new mongoose.Types.ObjectId().toString();

    const response = await request(app)
      .patch(`/api/users/${nonExistentUserId}`)
      .send(updatedData)
      .expect(HTTP_STATUS_CODES.NOT_FOUND);

    expect(response.body.message).toBe(
      ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]
    );
  });

  it("should return validation error if user id is not an id", async () => {
    const updatedData = { firstName: "Jane", lastName: "Smith" };
    const dummyId = "dummy";

    const response = await request(app)
      .patch(`/api/users/${dummyId}`)
      .send(updatedData)
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.message).toBe(
      ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]
    );
  });

  it("should not update a user with weak password", async () => {
    const updatedData = { password: "hashedpassword123" };
    const response = await request(app)
      .patch(`/api/users/${userId}`)
      .send(updatedData)
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.code).toBe(ERROR_CODES.VALIDATION_ERROR);
    expect(response.body.message).toBe(
      ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]
    );
    expect(response.body.details).toContain(
      "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character (@, $, !, %, *, ?, &, #)"
    );
  });

  it("should not update a user with invalid email format", async () => {
    const updatedData = { email: "john.doe@@example.com" };
    const response = await request(app)
      .patch(`/api/users/${userId}`)
      .send(updatedData)
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.code).toBe(ERROR_CODES.VALIDATION_ERROR);
    expect(response.body.details).toContain("Invalid email format");
  });
});
