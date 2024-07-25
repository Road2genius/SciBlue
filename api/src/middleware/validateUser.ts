import { body, ValidationChain, validationResult } from "express-validator";
import UserModel from "../models/user/User";
import { Request, Response, NextFunction } from "express";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../constants/error/errorCodes";
import { CustomError } from "../types/error/customError";
import { isStrongPassword, isValidEmail } from "../utils/validators";

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
      `Password must:
        - Be at least 8 characters long
        - Contain at least one lowercase letter
        - Contain at least one uppercase letter
        - Contain at least one number
        - Contain at least one special character
      `
    ),
  body("organizationAffiliated").custom((value) => {
    if (value.length === 0) {
      throw new Error("Organization affiliated is required");
    }
    return true;
  }),
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
    .custom((value) => {
      if (value.length === 0) {
        throw new Error("Organization affiliated is required");
      }
      return true;
    }),
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
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.USER_ALREADY_EXISTS]);
    error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
    error.code = ERROR_CODES.USER_ALREADY_EXISTS;
    return next(error);
  }
  next();
};
