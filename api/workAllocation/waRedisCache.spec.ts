import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as redisClientModule from '../redis/redisClient';
import * as waRedisCache from './waRedisCache';

const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('waRedisCache', () => {
  let sandbox: sinon.SinonSandbox;
  let getRedisClientStub: sinon.SinonStub;

  const cachedUsers = [
    {
      ccd_service_name: 'IA',
      staff_profile: {
        id: '1',
        first_name: 'Test',
        last_name: 'User',
        email_id: 'test@example.com',
        base_location: [],
      },
    },
  ] as any;

  const cachedUsersWithRoles = [
    {
      idamId: '1',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      roleCategory: 'LEGAL_OPERATIONS',
    },
  ] as any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    getRedisClientStub = sandbox.stub(redisClientModule, 'getRedisClient');
  });

  afterEach(() => {
    sandbox.restore();
  });

  function createMockRedisClient(overrides: Partial<any> = {}) {
    return {
      connected: true,
      get: sandbox.stub(),
      set: sandbox.stub(),
      del: sandbox.stub(),
      eval: sandbox.stub(),
      ...overrides,
    } as any;
  }

  describe('getCachedUsers', () => {
    it('should return null when redis client does not exist', async () => {
      getRedisClientStub.returns(null);

      const result = await waRedisCache.getCachedUsers();

      expect(result).to.equal(null);
    });

    it('should return null when redis client is disconnected', async () => {
      getRedisClientStub.returns(createMockRedisClient({ connected: false }));

      const result = await waRedisCache.getCachedUsers();

      expect(result).to.equal(null);
    });

    it('should get and parse cached users from redis', async () => {
      const client = createMockRedisClient();
      client.get.callsFake((key, callback) => callback(null, JSON.stringify(cachedUsers)));
      getRedisClientStub.returns(client);

      const result = await waRedisCache.getCachedUsers();

      expect(client.get).to.have.been.calledWith('wa:cachedUsers');
      expect(result).to.deep.equal(cachedUsers);
    });

    it('should reject when redis get fails', async () => {
      const client = createMockRedisClient();
      client.get.callsFake((key, callback) => callback(new Error('redis get failed')));
      getRedisClientStub.returns(client);

      try {
        await waRedisCache.getCachedUsers();
        expect.fail('Expected getCachedUsers to reject');
      } catch (error) {
        expect(error.message).to.equal('redis get failed');
      }
    });
  });

  describe('setCachedUsers', () => {
    it('should set cached users in redis with TTL', async () => {
      const client = createMockRedisClient();
      client.set.callsFake((key, value, ex, ttl, callback) => callback(null));
      getRedisClientStub.returns(client);

      await waRedisCache.setCachedUsers(cachedUsers);

      expect(client.set).to.have.been.calledWith('wa:cachedUsers', JSON.stringify(cachedUsers), 'EX', 720, sinon.match.func);
    });

    it('should not throw when redis client is unavailable', async () => {
      getRedisClientStub.returns(null);

      await waRedisCache.setCachedUsers(cachedUsers);
    });

    it('should reject when redis set fails', async () => {
      const client = createMockRedisClient();
      client.set.callsFake((key, value, ex, ttl, callback) => callback(new Error('redis set failed')));
      getRedisClientStub.returns(client);

      try {
        await waRedisCache.setCachedUsers(cachedUsers);
        expect.fail('Expected setCachedUsers to reject');
      } catch (error) {
        expect(error.message).to.equal('redis set failed');
      }
    });
  });

  describe('users with roles cache', () => {
    it('should get cached users with roles from redis', async () => {
      const client = createMockRedisClient();
      client.get.callsFake((key, callback) => callback(null, JSON.stringify(cachedUsersWithRoles)));
      getRedisClientStub.returns(client);

      const result = await waRedisCache.getCachedUsersWithRoles();

      expect(client.get).to.have.been.calledWith('wa:cachedUsersWithRoles');
      expect(result).to.deep.equal(cachedUsersWithRoles);
    });

    it('should set cached users with roles in redis with TTL', async () => {
      const client = createMockRedisClient();
      client.set.callsFake((key, value, ex, ttl, callback) => callback(null));
      getRedisClientStub.returns(client);

      await waRedisCache.setCachedUsersWithRoles(cachedUsersWithRoles);

      expect(client.set).to.have.been.calledWith(
        'wa:cachedUsersWithRoles',
        JSON.stringify(cachedUsersWithRoles),
        'EX',
        720,
        sinon.match.func
      );
    });
  });

  describe('clear cache', () => {
    it('should clear cached users', async () => {
      const client = createMockRedisClient();
      client.del.callsFake((key, callback) => callback(null));
      getRedisClientStub.returns(client);

      await waRedisCache.clearCachedUsers();

      expect(client.del).to.have.been.calledWith('wa:cachedUsers', sinon.match.func);
    });

    it('should clear cached users with roles', async () => {
      const client = createMockRedisClient();
      client.del.callsFake((key, callback) => callback(null));
      getRedisClientStub.returns(client);

      await waRedisCache.clearCachedUsersWithRoles();

      expect(client.del).to.have.been.calledWith('wa:cachedUsersWithRoles', sinon.match.func);
    });
  });

  describe('locks', () => {
    it('should return unavailable when acquiring a lock without a redis client', async () => {
      getRedisClientStub.returns(null);

      const result = await waRedisCache.acquireCachedUsersLock();

      expect(result).to.deep.equal({ status: 'unavailable' });
    });

    it('should acquire cached users lock', async () => {
      const client = createMockRedisClient();
      client.set.callsFake((key, value, ex, ttl, nx, callback) => callback(null, 'OK'));
      getRedisClientStub.returns(client);

      const result = await waRedisCache.acquireCachedUsersLock();

      expect(result.status).to.equal('acquired');

      if (result.status === 'acquired') {
        expect(result.key).to.equal('wa:cachedUsers:lock');
        expect(result.value).to.be.a('string');

        expect(client.set).to.have.been.calledWith('wa:cachedUsers:lock', result.value, 'EX', 90, 'NX', sinon.match.func);
      }
    });

    it('should return held when cached users lock already exists', async () => {
      const client = createMockRedisClient();
      client.set.callsFake((key, value, ex, ttl, nx, callback) => callback(null, null));
      getRedisClientStub.returns(client);

      const result = await waRedisCache.acquireCachedUsersLock();

      expect(result).to.deep.equal({ status: 'held' });
    });

    it('should acquire cached users with roles lock', async () => {
      const client = createMockRedisClient();
      client.set.callsFake((key, value, ex, ttl, nx, callback) => callback(null, 'OK'));
      getRedisClientStub.returns(client);

      const result = await waRedisCache.acquireCachedUsersWithRolesLock();

      expect(result.status).to.equal('acquired');

      if (result.status === 'acquired') {
        expect(result.key).to.equal('wa:cachedUsersWithRoles:lock');

        expect(client.set).to.have.been.calledWith(
          'wa:cachedUsersWithRoles:lock',
          result.value,
          'EX',
          90,
          'NX',
          sinon.match.func
        );
      }
    });

    it('should release lock using redis eval', async () => {
      const client = createMockRedisClient();
      client.eval.callsFake((script, numberOfKeys, key, value, callback) => callback(null, 1));
      getRedisClientStub.returns(client);

      await waRedisCache.releaseLock({
        status: 'acquired',
        key: 'wa:cachedUsers:lock',
        value: 'lock-id',
      });

      expect(client.eval).to.have.been.calledWith(
        sinon.match((script: string) => script.includes('redis.call("get"') && script.includes('redis.call("del"')),
        1,
        'wa:cachedUsers:lock',
        'lock-id',
        sinon.match.func
      );
    });
  });
});
