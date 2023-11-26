import { BaseError } from './BaseError';
import StatusCode from 'http-status-codes';

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(StatusCode.BAD_REQUEST, message);
  }
}
