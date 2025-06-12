import { z } from 'zod';
import { t } from './trpc';
import { getPostgresPrisma } from '../db';
import { authenticate, authorize } from '../middleware/auth';

export const usersRouter = t.router({
  create: t.procedure
    .use(authenticate)
    .use(authorize('admin'))
    .input(z.object({ name: z.string(), email: z.string().email() }))
    .mutation(async ({ input }) => {
      return getPostgresPrisma().user.create({ data: input });
    }),

  get: t.procedure
    .use(authenticate)
    .use(authorize('admin', 'user'))
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return getPostgresPrisma().user.findUnique({ where: { id: input.id } });
    }),

  list: t.procedure
    .use(authenticate)
    .use(authorize('admin', 'user'))
    .query(async () => {
      return getPostgresPrisma().user.findMany();
    }),

  update: t.procedure
    .use(authenticate)
    .use(authorize('admin'))
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        email: z.string().email().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return getPostgresPrisma().user.update({ where: { id }, data });
    }),

  delete: t.procedure
    .use(authenticate)
    .use(authorize('admin'))
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await getPostgresPrisma().user.delete({ where: { id: input.id } });
      return { success: true };
    }),
});
