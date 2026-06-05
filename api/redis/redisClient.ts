
import * as redis from 'redis';

let client: redis.RedisClient | null = null;

export function setRedisClient(redisClient: redis.RedisClient): void {
  client = redisClient;
}

export function getRedisClient(): redis.RedisClient | null {
  return client;
}

export function isRedisReady(): boolean {
  return !!client?.connected;
}
