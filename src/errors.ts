export enum ErrorCode {
  INTERNAL = 'INTERNAL_ERROR',
  VALIDATION = 'VALIDATION_ERROR',
}

export class AppError extends Error {
  code: ErrorCode;
  status: number;
  constructor(code: ErrorCode, message: string, status = 500) {
    super(message);
    this.code = code;
    this.status = status;
  }
}
