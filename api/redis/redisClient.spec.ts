import { expect } from 'chai';

describe('redisClient', () => {
  function loadModule() {
    delete require.cache[require.resolve('./redisClient')];
    return require('./redisClient');
  }

  it('should return null when no redis client has been set', () => {
    const redisClientModule = loadModule();

    expect(redisClientModule.getRedisClient()).to.equal(null);
    expect(redisClientModule.isRedisReady()).to.equal(false);
  });

  it('should store and return the redis client', () => {
    const redisClientModule = loadModule();
    const client = { connected: true };

    redisClientModule.setRedisClient(client);

    expect(redisClientModule.getRedisClient()).to.equal(client);
  });

  it('should return true when redis client is connected', () => {
    const redisClientModule = loadModule();

    redisClientModule.setRedisClient({ connected: true });

    expect(redisClientModule.isRedisReady()).to.equal(true);
  });

  it('should return false when redis client is not connected', () => {
    const redisClientModule = loadModule();

    redisClientModule.setRedisClient({ connected: false });

    expect(redisClientModule.isRedisReady()).to.equal(false);
  });

  it('should replace an existing redis client', () => {
    const redisClientModule = loadModule();
    const firstClient = { connected: true };
    const secondClient = { connected: false };

    redisClientModule.setRedisClient(firstClient);
    redisClientModule.setRedisClient(secondClient);

    expect(redisClientModule.getRedisClient()).to.equal(secondClient);
    expect(redisClientModule.isRedisReady()).to.equal(false);
  });
});