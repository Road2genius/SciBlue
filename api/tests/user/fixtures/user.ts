import UserModel, { IUser } from "../../../src/models/user/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CountryNames, TypeOfOrganization } from "../../../../shared-types/user";
import { JWT_SECRET_KEY } from "../../../src/config/config";

const JWT_SECRET = JWT_SECRET_KEY || process.env.JWT_SECRET_KEY

export const validUserData: Partial<IUser> = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  password: "hashedPassword123!",
  organizationName: "test",
  organizationAffiliated: TypeOfOrganization.AcademicLaboratoryAndInstitute,
  institution: "Institution Name",
  profileVerificationInfo: "test",
  country: CountryNames.France,
};

export const anotherValidUserData: Partial<IUser> = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.com",
  password: "hashedPassword123!!",
  organizationName: "test",
  organizationAffiliated: TypeOfOrganization.AcademicLaboratoryAndInstitute,
  institution: "Another Institution Name",
  profileVerificationInfo: "test",
  country: CountryNames.France,
};

export const otherValidUserData: Partial<IUser> = {
  firstName: "Benj",
  lastName: "Doe",
  email: "benj.doe@example.com",
  password: "hashedPassword123!!",
  organizationName: "test",
  organizationAffiliated: TypeOfOrganization.Government,
  typeOfOrganizationSpecific: "test",
  institution: "Another Institution Name",
  country: CountryNames.France,
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
  if (!JWT_SECRET) {
    throw new Error("TOKEN is not defined.");
  }
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
