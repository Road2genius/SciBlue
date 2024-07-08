import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomError } from "../types/error/customError";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../constants/error/errorCodes";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, "your_jwt_secret_key", (err, payload) => {
      if (err) {
        const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.UNAUTHORIZED]);
        error.statusCode = HTTP_STATUS_CODES.UNAUTHORIZED;
        error.code = ERROR_CODES.UNAUTHORIZED;
        return next(error);
      }
      req.user = payload;
      next();
    });
  } else {
    const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.UNAUTHORIZED]);
    error.statusCode = HTTP_STATUS_CODES.UNAUTHORIZED;
    error.code = ERROR_CODES.UNAUTHORIZED;
    next(error);
  }
};
