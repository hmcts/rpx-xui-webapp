import { expect } from 'chai';
import { getRedisClient, isRedisReady, RedisClient, setRedisClient } from './redisClient';

describe('redisClient', () => {
  beforeEach(() => {
    setRedisClient(null);
  });

  it('should return null when no redis client has been set', () => {
    expect(getRedisClient()).to.equal(null);
    expect(isRedisReady()).to.equal(false);
  });

  it('should store and return the redis client', () => {
    const client = { connected: true } as RedisClient;

    setRedisClient(client);

    expect(getRedisClient()).to.equal(client);
  });

  it('should return true when redis client is connected', () => {
    setRedisClient({ connected: true } as RedisClient);

    expect(isRedisReady()).to.equal(true);
  });

  it('should return false when redis client is not connected', () => {
    setRedisClient({ connected: false } as RedisClient);

    expect(isRedisReady()).to.equal(false);
  });

  it('should replace an existing redis client', () => {
    const firstClient = { connected: true } as RedisClient;
    const secondClient = { connected: false } as RedisClient;

    setRedisClient(firstClient);
    setRedisClient(secondClient);

    expect(getRedisClient()).to.equal(secondClient);
    expect(isRedisReady()).to.equal(false);
  });
});
