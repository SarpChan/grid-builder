export const limits = ['from', 'to', 'from_to', 'none'];

export type Limiter = (typeof limits)[number];

export function isLimiter(limiter: string | undefined): limiter is Limiter {
  return limiter !== undefined && limits.includes(limiter as Limiter);
}
