
import { Response } from 'express';
import { ErrorResponse, SuccessResponse } from '../types/common.types';

export const successResponse = <T>(
  res: Response,
  data: T,
  statusCode = 200,
  message = 'Success'
): Response<SuccessResponse<T>> => {
  return res.status(statusCode).json({
    status: statusCode,
    data,
    message,
  });
};

export const errorResponse = (
  res: Response,
  message = 'Internal server error',
  statusCode = 500,
  stack?: string
): Response<ErrorResponse> => {
  const response: ErrorResponse = {
    status: statusCode,
    message,
  };

  if (process.env.NODE_ENV === 'development' && stack) {
    response.stack = stack;
  }

  return res.status(statusCode).json(response);
};