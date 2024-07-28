import UserModel, { IUser } from "../../../src/models/user/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { OrganizationAffiliated } from "../../../../shared-types/user";

export const validUserData: Partial<IUser> = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  password: "hashedPassword123!",
  organizationName: "test",
  organizationAffiliated: [OrganizationAffiliated.AcademicLaboratoryAndInstitute],
  institution: "Institution Name",
  address: "1234 Street Name",
  city: "City Name",
  country: "Country Name",
};

export const anotherValidUserData: Partial<IUser> = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.com",
  password: "hashedPassword123!!",
  organizationName: "test",
  organizationAffiliated: [OrganizationAffiliated.AcademicLaboratoryAndInstitute],
  institution: "Another Institution Name",
  address: "5678 Another Street Name",
  city: "Another City Name",
  country: "Another Country Name",
};

export const otherValidUserData: Partial<IUser> = {
  firstName: "Benj",
  lastName: "Doe",
  email: "benj.doe@example.com",
  password: "hashedPassword123!!",
  organizationName: "test",
  organizationAffiliated: [OrganizationAffiliated.AcademicLaboratoryAndInstitute],
  institution: "Another Institution Name",
  address: "5678 Another Street Name",
  city: "Another City Name",
  country: "Another Country Name",
};

// createUserFixture create a user for testing environment
export const createUserFixture = async (userData: Partial<IUser>): Promise<IUser> => {
  const userCopy = { ...userData };
  if (userCopy.password) {
    const hashedPassword = await bcrypt.hash(userCopy.password, 10);
    userCopy.password = hashedPassword;
  }
  const user: IUser = new UserModel(userCopy);
  await user.save();
  return user;
};

// generateTestToken generate a token for testing environment
export const generateTestToken = (user: IUser): string => {
  const token = jwt.sign({ userId: user._id }, "your_jwt_secret_key", {
    expiresIn: "1h",
  });
  return token;
};
