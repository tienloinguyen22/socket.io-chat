import Redis from 'ioredis';
import { Configs } from '../configs';

export const initializeRedis = (configs: Configs): Redis => {
  return new Redis(configs.redisURL);
};
