import { StatusCodes } from "http-status-codes";

export const ERROR_CODES = {
  // User
  USER_ALREADY_EXISTS: 1001,
  VALIDATION_ERROR: 1002,
  DATABASE_ERROR: 1003,
  USER_NOT_FOUND: 1004,
};

export const ERROR_MESSAGES = {
  // User
  [ERROR_CODES.USER_ALREADY_EXISTS]: "User already exists",
  [ERROR_CODES.VALIDATION_ERROR]: "Validation error",
  [ERROR_CODES.DATABASE_ERROR]: "Database error",
  [ERROR_CODES.USER_NOT_FOUND]: "User not found",
};

export const HTTP_STATUS_CODES = {
  ...StatusCodes,
};
