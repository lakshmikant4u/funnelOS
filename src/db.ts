import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

export interface DBConfig {
  url: string;
  name: string;
}

let prisma: PrismaClient | null = null;

export async function connectDB(config: DBConfig) {
  logger.info(`Connecting to database ${config.name} at ${config.url}`);
  prisma = new PrismaClient({ datasources: { db: { url: config.url } } });
  await prisma.$connect();
  logger.info('Database connected');
}

export function getPrisma(): PrismaClient {
  if (!prisma) {
    throw new Error('Prisma not initialized. Call connectDB first.');
  }
  return prisma;
}
