export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export class CustomError extends Error {
  statusCode?: number;
  code?: number;
  details?: string[];

  constructor(
    message: string,
    statusCode?: number,
    code?: number,
    details?: string[]
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const handleError = (error: unknown): string => {
  if (error instanceof CustomError) {
    return error.message;
  } else if (error instanceof Error) {
    return error.message || "An unexpected error occurred";
  } else {
    return "An unknown error occurred";
  }
};
