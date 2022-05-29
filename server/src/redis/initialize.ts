import Redis from 'ioredis';
import { Configs } from '../configs';

export const initializeRedis = (configs: Configs): Redis => {
  const redis = new Redis(configs.redisURL);
  redis.on("error", (err) => {
    console.log(`Redis error: ${err.message}`);
  });

  return redis;
};
