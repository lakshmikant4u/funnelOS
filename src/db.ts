import { PrismaClient as MongoClient } from '@prisma/client';
import { PrismaClient as PostgresClient } from '../prisma/generated/postgres';
import { logger } from './logger';

let mongo: MongoClient | null = null;
let postgres: PostgresClient | null = null;

export async function connectMongo(url: string) {
  logger.info(`Connecting to Mongo at ${url}`);
  mongo = new MongoClient({ datasources: { db: { url } } });
  await mongo.$connect();
  logger.info('Mongo connected');
}

export async function connectPostgres(url: string) {
  logger.info(`Connecting to Postgres at ${url}`);
  postgres = new PostgresClient({ datasources: { db: { url } } });
  await postgres.$connect();
  logger.info('Postgres connected');
}

export function getMongoPrisma(): MongoClient {
  if (!mongo) {
    throw new Error('Mongo client not initialized');
  }
  return mongo;
}

export function getPostgresPrisma(): PostgresClient {
  if (!postgres) {
    throw new Error('Postgres client not initialized');
  }
  return postgres;
}
