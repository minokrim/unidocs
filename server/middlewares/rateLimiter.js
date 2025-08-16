import {rateLimit,ipKeyGenerator} from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redis from '../config/redis.js';

const authRateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.send_command(...args),
  }),
  windowMs: 15 * 60 * 1000,
  max: 5, 
  message: {
    success: false,
    message: "Too many login attempts. Please try again in 15 minutes.",
  },
  keyGenerator: ipKeyGenerator, 
});

export default authRateLimiter;
