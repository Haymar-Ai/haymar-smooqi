import { Ratelimit } from '@upstash/ratelimit'
import { redis } from './redis'

export const signupRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  prefix: 'rl:signup',
})

export const loginRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '15 m'),
  prefix: 'rl:login',
})

export const resetRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  prefix: 'rl:reset',
})

export const apiRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, '1 m'),
  prefix: 'rl:api',
})

// Fail open: if Redis is unreachable, allow the request rather than 500.
// A dead rate-limiter must never take down signup/login/etc.
export async function safeLimit(limiter: Ratelimit, key: string): Promise<{ success: boolean }> {
  try {
    return await limiter.limit(key)
  } catch (err) {
    console.error('[rateLimit] limiter unavailable, failing open:', err)
    return { success: true }
  }
}
