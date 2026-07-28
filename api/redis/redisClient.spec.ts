import { expect } from 'chai';
import * as redis from 'redis';
import { getRedisClient, isRedisReady, setRedisClient } from './redisClient';

describe('redisClient', () => {
  beforeEach(() => {
    setRedisClient(null as unknown as redis.RedisClient);
  });

  it('should return null when no redis client has been set', () => {
    expect(getRedisClient()).to.equal(null);
    expect(isRedisReady()).to.equal(false);
  });

  it('should store and return the redis client', () => {
    const client = { connected: true } as redis.RedisClient;

    setRedisClient(client);

    expect(getRedisClient()).to.equal(client);
  });

  it('should return true when redis client is connected', () => {
    setRedisClient({ connected: true } as redis.RedisClient);

    expect(isRedisReady()).to.equal(true);
  });

  it('should return false when redis client is not connected', () => {
    setRedisClient({ connected: false } as redis.RedisClient);

    expect(isRedisReady()).to.equal(false);
  });

  it('should replace an existing redis client', () => {
    const firstClient = { connected: true } as redis.RedisClient;
    const secondClient = { connected: false } as redis.RedisClient;

    setRedisClient(firstClient);
    setRedisClient(secondClient);

    expect(getRedisClient()).to.equal(secondClient);
    expect(isRedisReady()).to.equal(false);
  });
});
