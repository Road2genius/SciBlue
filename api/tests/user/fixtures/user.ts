import mongoose from "mongoose";
import User, { IUser } from "../../../src/models/user/User";

export const validUserData: Partial<IUser> = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  password: "hashedPassword123!",
  typeOfStructure: "academic laboratory",
  laboratory: "Lab Name",
  institution: "Institution Name",
  address: "1234 Street Name",
  city: "City Name",
  country: "Country Name",
};

export const anotherValidUserData: Partial<IUser> = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.com",
  password: "hashedpassword123",
  typeOfStructure: "corporation",
  laboratory: "Another Lab Name",
  institution: "Another Institution Name",
  address: "5678 Another Street Name",
  city: "Another City Name",
  country: "Another Country Name",
};

// Function to create a user in the database
export const createUserFixture = async (
  userData: Partial<IUser>
): Promise<IUser> => {
  const user: IUser = new User(userData);
  await user.save();
  return user;
};
