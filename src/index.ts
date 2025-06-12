import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc/router';
import { logger } from './logger';
import { register } from './metrics';
import { connectMongo, connectPostgres } from './db';
import { initSentry } from './sentry';
import { errorHandler } from './errorHandler';
import { createContext } from './trpc/context';
import * as Sentry from '@sentry/node';
import dotenv from 'dotenv';

dotenv.config();
initSentry();

const app = express();
app.use(express.json());

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
  createContext,
}));

// Custom error handler
app.use(errorHandler);

const port = process.env.PORT || 3000;

async function start() {
  const mongoUrl = process.env.MongoDB_URL || '';
  const postgresUrl = process.env.POSTGRES_URL;

  if (mongoUrl) {
    await connectMongo(mongoUrl);
  }

  if (postgresUrl) {
    await connectPostgres(postgresUrl);
  }

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
