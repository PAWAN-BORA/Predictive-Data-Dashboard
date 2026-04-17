import { rateLimit } from 'express-rate-limit'
export const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 20 requests per windowMs
  standardHeaders: 'draft-8',
  message: {
    status: 429,
    error: "Too many AI queries, please try again later."
  },
  legacyHeaders: false,
});
