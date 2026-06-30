import { expect } from 'chai';
import { getRedisClient, isRedisReady, RedisClient, setRedisClient } from './redisClient';

describe('redisClient', () => {
  function createRedisClient(isReady: boolean): RedisClient {
    return { isReady } as unknown as RedisClient;
  }

  beforeEach(() => {
    setRedisClient(null);
  });

  it('should return null when no redis client has been set', () => {
    expect(getRedisClient()).to.equal(null);
    expect(isRedisReady()).to.equal(false);
  });

  it('should store and return the redis client', () => {
    const client = createRedisClient(true);

    setRedisClient(client);

    expect(getRedisClient()).to.equal(client);
  });

  it('should return true when redis client is connected', () => {
    setRedisClient(createRedisClient(true));

    expect(isRedisReady()).to.equal(true);
  });

  it('should return false when redis client is not connected', () => {
    setRedisClient(createRedisClient(false));

    expect(isRedisReady()).to.equal(false);
  });

  it('should replace an existing redis client', () => {
    const firstClient = createRedisClient(true);
    const secondClient = createRedisClient(false);

    setRedisClient(firstClient);
    setRedisClient(secondClient);

    expect(getRedisClient()).to.equal(secondClient);
    expect(isRedisReady()).to.equal(false);
  });
});
