import { NextFunction, Request, Response } from "express";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS_CODES,
} from "../constants/error/errorCodes";
import { CustomError } from "../types/error/customError";
import { convertToPlainObject } from "../utils/convertPlainObject";

export const successHandler = <T>(
  req: Request,
  res: Response,
  data: T,
  statusCode: number = 200
): void => {
  res.status(statusCode).json({
    success: true,
    ...convertToPlainObject(data),
  });
};

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
  const errorCode = err.code || ERROR_CODES.DATABASE_ERROR;
  const message = err.message || ERROR_MESSAGES[errorCode];
  const details = err.details || [];

  res.status(statusCode).json({
    code: errorCode,
    message: message,
    details: details,
  });
};
