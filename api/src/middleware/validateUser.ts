import { body, validationResult } from "express-validator";
import User from "../models/user/User";
import { Request, Response, NextFunction } from "express";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS_CODES,
} from "../constants/error/errorCodes";
import { CustomError } from "../types/error/customError";
import { isStrongPassword, isValidEmail } from "../utils/validators";

// Validation user rules
const userValidationRules = (isUpdate = false) => {
  return [
    body("firstName")
      .if((value, { req }) => !isUpdate || req.body.firstName !== undefined)
      .notEmpty()
      .withMessage("First Name is required"),
    body("lastName")
      .if((value, { req }) => !isUpdate || req.body.lastName !== undefined)
      .notEmpty()
      .withMessage("Last Name is required"),
    body("email")
      .if((value, { req }) => !isUpdate || req.body.email !== undefined)
      .custom((value) => isValidEmail(value))
      .withMessage("Invalid email format"),
    body("password")
      .if((value, { req }) => !isUpdate || req.body.password !== undefined)
      .notEmpty()
      .withMessage("Password is required")
      .custom((value) => isStrongPassword(value))
      .withMessage(
        "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character (@, $, !, %, *, ?, &, #)"
      ),
    body("typeOfActor")
      .if((value, { req }) => !isUpdate || req.body.typeOfActor !== undefined)
      .isIn([
        "academic laboratory",
        "academic technology platform",
        "cro and private technology platform",
        "corporation",
        "others",
      ])
      .withMessage("Valid Type of Actor is required"),
    body("address")
      .if((value, { req }) => !isUpdate || req.body.address !== undefined)
      .notEmpty()
      .withMessage("Address is required"),
    body("city")
      .if((value, { req }) => !isUpdate || req.body.city !== undefined)
      .notEmpty()
      .withMessage("City is required"),
    body("country")
      .if((value, { req }) => !isUpdate || req.body.country !== undefined)
      .notEmpty()
      .withMessage("Country is required"),
  ];
};
// Middleware to check for validation errors
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: CustomError = new Error(
      ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]
    );
    error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
    error.code = ERROR_CODES.VALIDATION_ERROR;
    error.details = errors.array().map((err) => err.msg);
    return next(error);
  }
  next();
};

// Middleware to check if the user already exists
export const checkUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error: CustomError = new Error(
      ERROR_MESSAGES[ERROR_CODES.USER_ALREADY_EXISTS]
    );
    error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
    error.code = ERROR_CODES.USER_ALREADY_EXISTS;
    return next(error);
  }
  next();
};

export const createUserValidationRules = userValidationRules();
export const updateUserValidationRules = userValidationRules(true);
