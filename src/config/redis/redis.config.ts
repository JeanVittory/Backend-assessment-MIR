import * as redis from 'redis';
import envConfig from '@config/env.config';
import logger from '@config/logger/logger.config';

export type cacheValueType = Record<string, unknown> | boolean | string | null;

const initRedis = async () => {
  try {
    const redisClient = redis.createClient({
      url: envConfig.REDIS_URL,
    });
    await redisClient.connect();
    return redisClient;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const getRedis = async (key: string): Promise<cacheValueType> => {
  try {
    const client = await initRedis();
    const valueCached = await client.get(key);
    if (!valueCached) return null;
    return JSON.parse(valueCached);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const setRedis = async (
  key: string,
  value: cacheValueType,
  options: { expirationMs?: number },
): Promise<void> => {
  try {
    const client = await initRedis();
    const valueToCache = typeof value === 'string' ? value : JSON.stringify(value);
    await client.set(key, valueToCache, {
      PX: options.expirationMs,
    });
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
