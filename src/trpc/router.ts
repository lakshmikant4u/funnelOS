import { initTRPC } from '@trpc/server';
import { getMongoPrisma, getPostgresPrisma } from '../db';

const t = initTRPC.create();

export const appRouter = t.router({
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
  postgresUsers: t.procedure.query(async () => {
    const db = getPostgresPrisma();
    return db.user.findMany();
  }),
  mongoAnalytics: t.procedure.query(async () => {
    const db = getMongoPrisma();
    return db.analytics.findMany();
  }),
});

export type AppRouter = typeof appRouter;
