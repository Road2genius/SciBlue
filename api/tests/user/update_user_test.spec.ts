import request from "supertest";
import mongoose from "mongoose";
import app from "../../src/server";
import UserModel, { IUser } from "../../src/models/user/User";
import { createUserFixture, generateTestToken, validUserData } from "./fixtures/user";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../src/constants/error/errorCodes";

// PATCH /api/users/:id
describe("Update a user", () => {
  let userId: string;
  let token: string;

  beforeEach(async () => {
    await UserModel.deleteMany({});
    const user: IUser = await createUserFixture(validUserData);
    userId = user._id.toString();
    token = generateTestToken(user);
  });

  it("should update a user", async () => {
    const updatedData = { firstName: "Jane", lastName: "Smith" };

    const response = await request(app)
      .patch(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedData)
      .expect(HTTP_STATUS_CODES.OK);

    expect(response.body.data.firstName).toBe(updatedData.firstName);
    expect(response.body.data.lastName).toBe(updatedData.lastName);
  });

  it("should return not found error if user doest not exist", async () => {
    const updatedData = { firstName: "Jane", lastName: "Smith" };
    const nonExistentUserId = new mongoose.Types.ObjectId().toString();

    const response = await request(app)
      .patch(`/api/users/${nonExistentUserId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedData)
      .expect(HTTP_STATUS_CODES.NOT_FOUND);

    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]);
  });

  it("should return validation error if user id is not an id", async () => {
    const updatedData = { firstName: "Jane", lastName: "Smith" };
    const dummyId = "dummy";

    const response = await request(app)
      .patch(`/api/users/${dummyId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedData)
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
  });

  it("should not update a user with weak password", async () => {
    const updatedData = { password: "hashedpassword123" };
    const response = await request(app)
      .patch(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedData)
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

  it("should not update a user with invalid email format", async () => {
    const updatedData = { email: "john.doe@@example.com" };
    const response = await request(app)
      .patch(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedData)
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.code).toBe(ERROR_CODES.VALIDATION_ERROR);
    expect(response.body.details).toContain("Invalid email format");
  });
});
