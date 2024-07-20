import { body, ValidationChain, validationResult } from "express-validator";
import User from "../models/user/User";
import { Request, Response, NextFunction } from "express";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../constants/error/errorCodes";
import { CustomError } from "../types/error/customError";
import { isStrongPassword, isValidEmail } from "../utils/validators";
import { OrganizationAffiliated } from "../../../shared-types/user";

export const createUserValidationRules = (): ValidationChain[] => [
  body("firstName").notEmpty().withMessage("First Name is required"),
  body("lastName").notEmpty().withMessage("Last Name is required"),
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
      "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character (@, $, !, %, *, ?, &, #)"
    ),
  body("organizationAffiliated")
    .notEmpty()
    .withMessage("Organization affiliated is required")
    .bail()
    .isIn([
      OrganizationAffiliated.AcademicLaboratoryAndInstitute,
      OrganizationAffiliated.AcademicTechnologyPlatform,
      OrganizationAffiliated.NgoNonProfitOrganizationFoundation,
      OrganizationAffiliated.Government,
      OrganizationAffiliated.CroAndPrivateTechnologyPlatform,
      OrganizationAffiliated.Corporation,
      OrganizationAffiliated.Freelancer,
    ])
    .withMessage("Valid Organization affiliated is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
];

export const updateUserValidationRules = (): ValidationChain[] => [
  body("firstName").optional().notEmpty().withMessage("First Name is required"),
  body("lastName").optional().notEmpty().withMessage("Last Name is required"),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .custom((value) => isValidEmail(value))
    .withMessage("Invalid email format"),
  body("password")
    .optional()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .custom((value) => isStrongPassword(value))
    .withMessage(
      "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character (@, $, !, %, *, ?, &, #)"
    ),
  body("typeOfActor")
    .optional()
    .notEmpty()
    .withMessage("Type of Actor is required")
    .bail()
    .isIn([
      "academic laboratory",
      "academic technology platform",
      "cro and private technology platform",
      "corporation",
      "others",
    ])
    .withMessage("Valid Type of Actor is required"),
  body("address").optional().notEmpty().withMessage("Address is required"),
  body("city").optional().notEmpty().withMessage("City is required"),
  body("country").optional().notEmpty().withMessage("Country is required"),
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
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.USER_ALREADY_EXISTS]);
    error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
    error.code = ERROR_CODES.USER_ALREADY_EXISTS;
    return next(error);
  }
  next();
};
