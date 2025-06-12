import { getMongoPrisma, getPostgresPrisma } from '../db';
import { t } from './trpc';
import { usersRouter } from './users';

const baseRouter = t.router({
  greeting: t.procedure.query(() => {
    return 'hello';
  }),
  mongoExamples: t.procedure.query(async () => {
    const db = getMongoPrisma();
    return db.example.findMany();
  }),
  postgresExamples: t.procedure.query(async () => {
    const db = getPostgresPrisma();
    return db.example.findMany();
  }),
  mongoAnalytics: t.procedure.query(async () => {
    const db = getMongoPrisma();
    const client: any = db as any;
    return client.analytics?.findMany() ?? [];
  }),
});

export const appRouter = t.mergeRouters(baseRouter, usersRouter);

export type AppRouter = typeof appRouter;
