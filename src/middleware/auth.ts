import { TRPCError } from '@trpc/server';
import { t } from '../trpc/trpc';

export const authenticate = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Missing or invalid token' });
  }
  return next();
});

export function authorize(...roles: string[]) {
  return t.middleware(({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    if (roles.length && !roles.includes(ctx.user.role)) {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }
    return next();
  });
}
