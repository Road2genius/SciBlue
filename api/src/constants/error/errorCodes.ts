import { StatusCodes } from "http-status-codes";

export const ERROR_CODES = {
  // User
  USER_ALREADY_EXISTS: 1001,
  VALIDATION_ERROR: 1002,
  DATABASE_ERROR: 1003,
  USER_NOT_FOUND: 1004,
  USERS_NOT_FOUND: 1005,

  // Auth
  WRONG_PASSWORD: 1101,
  INTERNAL_ERROR: 1102,
  UNAUTHORIZED: 1103,

  // Request
  REQUEST_NOT_FOUND: 1201,
  REQUESTS_NOT_FOUND: 1202,
};

export const ERROR_MESSAGES = {
  // User
  [ERROR_CODES.USER_ALREADY_EXISTS]: "User already exists",
  [ERROR_CODES.VALIDATION_ERROR]: "Validation error",
  [ERROR_CODES.DATABASE_ERROR]: "Database error",
  [ERROR_CODES.USER_NOT_FOUND]: "User not found",
  [ERROR_CODES.USERS_NOT_FOUND]: "Users not found",

  // Auth
  [ERROR_CODES.WRONG_PASSWORD]: "Wrong password",
  [ERROR_CODES.INTERNAL_ERROR]: "Internal server error",
  [ERROR_CODES.UNAUTHORIZED]: "Content unauthorized",

  // Request
  [ERROR_CODES.REQUEST_NOT_FOUND]: "Request not found",
  [ERROR_CODES.REQUESTS_NOT_FOUND]: "Requests not found",
};

export const HTTP_STATUS_CODES = {
  ...StatusCodes,
};
