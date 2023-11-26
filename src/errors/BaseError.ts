export abstract class BaseError extends Error {
  constructor(
    private _statusCode: number,
    readonly message: string
  ) {
    super(message);
    this._statusCode = _statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  get statusCode(): number {
    return this._statusCode;
  }
}
