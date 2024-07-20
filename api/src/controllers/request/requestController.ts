import { NextFunction, Request, Response } from "express";
import { successHandler } from "../../middleware/responseHandler";
import RequestCollab, { IRequest } from "../../models/requests/Request";
import { convertToPlainObject } from "../../utils/convertPlainObject";
import mongoose from "mongoose";
import { CustomError } from "../../types/error/customError";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../constants/error/errorCodes";
const dot = require("dot-object");

// createRequest requests the server to create a new collaboration request
export const createRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const request: IRequest = new RequestCollab({
      ...req.body,
    });

    await request.save();
    successHandler<IRequest>(req, res, convertToPlainObject(request), HTTP_STATUS_CODES.CREATED);
  } catch (error) {
    next(error);
  }
};

// getRequestById requests the server to get a collaboration request
export const getRequestById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const requestId: string = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    const request: IRequest | null = await RequestCollab.findById(requestId);

    if (!request) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.REQUEST_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.REQUEST_NOT_FOUND;
      throw error;
    }
    successHandler<IRequest>(req, res, convertToPlainObject(request), HTTP_STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};

export const deleteRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const requestId: string = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    const request: IRequest | null = await RequestCollab.findByIdAndDelete(requestId);

    if (!request) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.REQUEST_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.REQUEST_NOT_FOUND;
      throw error;
    }

    successHandler<{ message: string }>(
      req,
      res,
      {
        message: "Request deleted successfully",
      },
      HTTP_STATUS_CODES.OK
    );
  } catch (error) {
    next(error);
  }
};

export const updateRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const requestId: string = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    const updatedRequestData: IRequest = dot.dot(req.body);

    const request: IRequest | null = await RequestCollab.findByIdAndUpdate(
      requestId,
      { $set: updatedRequestData },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );

    if (!request) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.REQUEST_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.REQUEST_NOT_FOUND;
      throw error;
    }
    successHandler<IRequest>(req, res, convertToPlainObject(request), HTTP_STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};

export const getRequestsList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const requests: IRequest[] = await RequestCollab.find();

    if (!requests.length) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.REQUESTS_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.REQUESTS_NOT_FOUND;
      throw error;
    }

    successHandler<IRequest[]>(req, res, requests, HTTP_STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};
