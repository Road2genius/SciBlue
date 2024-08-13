import { body, ValidationChain, validationResult } from "express-validator";
import UserModel from "../models/user/User";
import { Request, Response, NextFunction } from "express";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../constants/error/errorCodes";
import { CustomError } from "../types/error/customError";
import { isStrongPassword, isValidEmail } from "../utils/validators";
import { TypeOfOrganization } from "../../../shared-types/user";

export const createUserValidationRules = (): ValidationChain[] => [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .custom((value) => isValidEmail(value))
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .custom((value) => isStrongPassword(value))
    .withMessage(
      `Password must:
        - Be at least 8 characters long
        - Contain at least one lowercase letter
        - Contain at least one uppercase letter
        - Contain at least one number
        - Contain at least one special character
      `
    ),
  body("firstName").notEmpty().withMessage("First Name is required"),
  body("lastName").notEmpty().withMessage("Last Name is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("organizationAffiliated")
    .notEmpty()
    .withMessage("Organization affiliated is required")
    .isIn(Object.values(TypeOfOrganization)),
  body("organizationAffiliated").custom((organization, { req }) => {
    if (
      [
        TypeOfOrganization.AcademicLaboratoryAndInstitute,
        TypeOfOrganization.AcademicTechnologyPlatform,
        TypeOfOrganization.PrivateResearchOrganizations,
        TypeOfOrganization.FreelanceScientist,
      ].includes(organization)
    ) {
      if (req.body.privacyLevel?.mode) {
        body("privacyLevel.username")
          .notEmpty()
          .withMessage("Username is required when privacy mode is enabled")
          .run(req);
      }
      body("profileVerificationInfo").notEmpty().withMessage("Profile verification information is required").run(req);
    } else if (
      [TypeOfOrganization.NgoNonProfitOrganizationFoundation, TypeOfOrganization.Government].includes(organization)
    ) {
      body("organizationName").notEmpty().withMessage("Organization name is required").run(req);
      body("typeOfOrganizationSpecific").notEmpty().withMessage("Type of organization is required").run(req);
    }
    return true;
  }),
];

export const updateUserValidationRules = (): ValidationChain[] => [
  body("firstName").optional().notEmpty().withMessage("First Name is required if provided"),

  body("lastName").optional().notEmpty().withMessage("Last Name is required if provided"),

  body("email")
    .optional()
    .notEmpty()
    .withMessage("Email is required if provided")
    .bail()
    .custom(isValidEmail)
    .withMessage("Invalid email format"),

  body("password")
    .optional()
    .notEmpty()
    .withMessage("Password is required if provided")
    .bail()
    .custom(isStrongPassword)
    .withMessage(
      `Password must:
        - Be at least 8 characters long
        - Contain at least one lowercase letter
        - Contain at least one uppercase letter
        - Contain at least one number
        - Contain at least one special character
      `
    ),

  body("organizationAffiliated")
    .optional()
    .custom((value, { req }) => {
      if (
        [
          TypeOfOrganization.AcademicLaboratoryAndInstitute,
          TypeOfOrganization.AcademicTechnologyPlatform,
          TypeOfOrganization.PrivateResearchOrganizations,
          TypeOfOrganization.FreelanceScientist,
        ].includes(value)
      ) {
        if (req.body.privacyLevel?.mode) {
          body("privacyLevel.username")
            .notEmpty()
            .withMessage("Username is required when privacy mode is enabled")
            .run(req);
        }
        body("profileVerificationInfo").notEmpty().withMessage("Profile verification information is required").run(req);
      } else if (
        [TypeOfOrganization.NgoNonProfitOrganizationFoundation, TypeOfOrganization.Government].includes(value)
      ) {
        body("organizationName").notEmpty().withMessage("Organization name is required").run(req);
        body("typeOfOrganizationSpecific").notEmpty().withMessage("Type of organization is required").run(req);
      }
      return true;
    }),

  body("country").optional().notEmpty().withMessage("Country is required if provided"),
];

// Middleware to check for validation errors
export const mappingErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
    error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
    error.code = ERROR_CODES.VALIDATION_ERROR;
    error.details = errors.array().map((err) => err.msg);
    return next(error);
  }
  next();
};

// Middleware to check if the user already exists
export const checkUserExists = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.USER_ALREADY_EXISTS]);
    error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
    error.code = ERROR_CODES.USER_ALREADY_EXISTS;
    return next(error);
  }
  next();
};
