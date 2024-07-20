import request from "supertest";
import app from "../../src/server";
import mongoose from "mongoose";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../src/constants/error/errorCodes";
import { createUserFixture, generateTestToken, validUserData } from "./fixtures/user";
import User, { IUser } from "../../src/models/user/User";

// DELETE /api/users/:id
describe("Delete a user", () => {
  let userId: string;
  let token: string;

  beforeEach(async () => {
    await User.deleteMany({});
    const user: IUser = await createUserFixture(validUserData);
    userId = user._id.toString();
    token = generateTestToken(user);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should delete a user", async () => {
    await request(app)
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(HTTP_STATUS_CODES.OK);

    const user = await User.findById(userId);
    expect(user).toBeNull();
  });

  it("should return not found if user does not exist", async () => {
    const nonExistentUserId = new mongoose.Types.ObjectId().toString();

    const response = await request(app)
      .delete(`/api/users/${nonExistentUserId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(HTTP_STATUS_CODES.NOT_FOUND);

    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]);
  });

  it("should return validation error if user id is not an id", async () => {
    const dummyId = "dummy";

    const response = await request(app)
      .delete(`/api/users/${dummyId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(HTTP_STATUS_CODES.BAD_REQUEST);

    expect(response.body.message).toBe(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
  });
});
