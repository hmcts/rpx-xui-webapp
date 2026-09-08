import { RedisClientType } from 'redis';

export type RedisClient = RedisClientType;

let client: RedisClient | null = null;

export function setRedisClient(redisClient: RedisClient | null): void {
  client = redisClient;
}

export function getRedisClient(): RedisClient | null {
  return client;
}

export function isRedisReady(): boolean {
  return !!client?.isReady;
}
