import { rateLimit } from 'express-rate-limit'
export const aiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 50, // Limit each IP to 50 requests per windowMs
  standardHeaders: 'draft-8',
  message: {
    status: 429,
    error: "Too many AI queries, please try again later."
  },
  legacyHeaders: false,
});


export const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 200, // Limit each IP to  200 requests per windowMs
  standardHeaders: 'draft-8',
  message: {
    status: 429,
    error: "Too many AI queries, please try again later."
  },
  legacyHeaders: false,
});
