import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export const appRouter = t.router({
  greeting: t.procedure.query(() => {
    return 'hello';
  }),
});

export type AppRouter = typeof appRouter;
