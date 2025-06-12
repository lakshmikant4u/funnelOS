import * as trpcExpress from '@trpc/server/adapters/express';

const tokens: Record<string, { id: number; role: string }> = {
  'admin-token': { id: 1, role: 'admin' },
  'user-token': { id: 2, role: 'user' },
};

export async function createContext({ req }: trpcExpress.CreateExpressContextOptions) {
  const header = req.header('Authorization');
  const token = header?.replace(/^Bearer\s+/i, '') ?? '';
  const user = tokens[token];
  return { user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
