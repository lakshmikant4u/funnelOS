import { Request, Response, NextFunction } from 'express';
import * as Sentry from '@sentry/node';
import { logger } from './logger';
import { AppError, ErrorCode } from './errors';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  logger.error(err);
  Sentry.captureException(err);

  const status = err.status || 500;
  const code = err.code || ErrorCode.INTERNAL;
  const message = status === 500 ? 'Internal Server Error' : err.message;

  res.status(status).json({ error: { code, message } });
}
