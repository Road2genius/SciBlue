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

  // Request comment
  REQUEST_COMMENT_EMPTY_TEXT: 1301,
  REQUEST_COMMENT_MISSING_USER_ID: 1302,
  REQUEST_COMMENT_NOT_FOUND: 1303,
  REQUEST_COMMENTS_NOT_FOUND: 1304,

  // Request vote
  REQUEST_VOTE_IS_REQUIRED: 1401,
  USER_CANNOT_VOTE_OWN_REQUEST: 1402,
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

  // Request comment
  [ERROR_CODES.REQUEST_COMMENT_EMPTY_TEXT]: "Text is required",
  [ERROR_CODES.REQUEST_COMMENT_MISSING_USER_ID]: "User Id is required",
  [ERROR_CODES.REQUEST_COMMENT_NOT_FOUND]: "Comment not found",
  [ERROR_CODES.REQUEST_COMMENTS_NOT_FOUND]: "Comments not found",

  // Request vote
  [ERROR_CODES.REQUEST_VOTE_IS_REQUIRED]: "Vote is required",
  [ERROR_CODES.USER_CANNOT_VOTE_OWN_REQUEST]: "User cannot vote to own request",
};

export const HTTP_STATUS_CODES = {
  ...StatusCodes,
};
