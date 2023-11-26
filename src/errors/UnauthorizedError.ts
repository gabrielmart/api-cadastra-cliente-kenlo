import { BaseError } from './BaseError';
import StatusCode from 'http-status-codes';

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(StatusCode.UNAUTHORIZED, message);
  }
}
