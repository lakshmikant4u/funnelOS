import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc/router';
import { logger } from './logger';
import { register } from './metrics';
import { connectDB } from './db';
import { initSentry } from './sentry';
import { errorHandler } from './errorHandler';
import * as Sentry from '@sentry/node';
import dotenv from 'dotenv';

dotenv.config();
initSentry();

const app = express();

// Sentry is optional and initialized only when DSN is provided

// logger middleware
app.use(require('pino-http')({ logger }));

// metrics endpoint
app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// tRPC endpoint
app.use('/trpc', trpcExpress.createExpressMiddleware({
  router: appRouter,
}));

// Custom error handler
app.use(errorHandler);

const port = process.env.PORT || 3000;

async function start() {
  await connectDB({ url: process.env.DATABASE_URL || '', name: 'default' });
  app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
  });
}

start();

process.on('unhandledRejection', (reason) => {
  logger.error({ err: reason }, 'Unhandled Rejection');
  Sentry.captureException(reason as any);
});

process.on('uncaughtException', (err) => {
  logger.error({ err }, 'Uncaught Exception');
  Sentry.captureException(err);
});
