export interface RedisClient {
  connected: boolean;
  get(key: string, callback: (error: Error | null, result: string | null) => void): void;
  set(key: string, value: string, mode: 'EX', duration: number, callback: (error: Error | null) => void): void;
  set(key: string, value: string, mode: 'EX', duration: number, condition: 'NX', callback: (error: Error | null, result: string | null) => void): void;
  del(key: string, callback: (error: Error | null) => void): void;
  eval(script: string, numKeys: number, key: string, value: string, callback: (error: Error | null) => void): void;
}

let client: RedisClient | null = null;

export function setRedisClient(redisClient: RedisClient | null): void {
  client = redisClient;
}

export function getRedisClient(): RedisClient | null {
  return client;
}

export function isRedisReady(): boolean {
  return !!client?.connected;
}
