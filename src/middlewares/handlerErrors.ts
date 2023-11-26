/* eslint-disable @typescript-eslint/no-unused-vars */
import StatusCode from 'http-status-codes';
import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';
import { BaseError } from '../errors/BaseError';

export const handlerErrors: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  if (error instanceof ValidationError) {
    return response.status(StatusCode.BAD_REQUEST).send(error.message);
  }

  if (error instanceof BaseError) {
    return response.status(error.statusCode).send(error.message);
  }
  response.status(StatusCode.INTERNAL_SERVER_ERROR).send(error.message);
};
