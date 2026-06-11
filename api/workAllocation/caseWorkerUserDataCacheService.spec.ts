import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockRes } from 'sinon-express-mock';
import * as configuration from '../configuration';
import { http } from '../lib/http';
import * as caseWorkerService from './caseWorkerService';
import {
  fetchNewUserData,
  fetchRoleAssignmentsForNewUsers,
  getAuthTokens,
  getOrRefreshCachedUsers,
  getOrRefreshCachedUsersWithRoles,
  waitForCachedUsers,
} from './caseWorkerUserDataCacheService';
import { StaffUserDetails } from './interfaces/staffUserDetails';
import * as waRedisCache from './waRedisCache';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('Caseworker Cache Service', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('fetchNewUserData', () => {
    it('should make a get request', async () => {
      const mockStaffDetails = [
        {
          ccd_service_name: 'IA',
          staff_profile: {
            id: '1',
            first_name: 'IA',
            last_name: 'User',
            email_id: 'IAUser@test.com',
            base_location: [
              {
                location: 'IA location',
                location_id: 'a',
                is_primary: true,
              },
            ],
          },
        },
        {
          ccd_service_name: 'CIVIL',
          staff_profile: {
            id: '1',
            first_name: 'IA',
            last_name: 'User',
            email_id: 'IAUser@test.com',
            base_location: [
              {
                location: 'CIVIL location',
                location_id: 'b',
                is_primary: false,
              },
              {
                location: 'IA location',
                location_id: 'a',
                is_primary: true,
              },
            ],
          },
        },
        {
          ccd_service_name: 'PRIVATELAW',
          staff_profile: {
            id: '2',
            first_name: 'PL',
            last_name: 'User',
            email_id: 'PLUser@test.com',
            base_location: [
              {
                location: 'PL location',
                location_id: 'c',
                is_primary: true,
              },
              {
                location: 'IA location',
                location_id: 'a',
                is_primary: false,
              },
            ],
          },
        },
      ];
      const mockMergedStaffUsers = [
        {
          ccd_service_name: 'IA',
          staff_profile: {
            id: '1',
            first_name: 'IA',
            last_name: 'User',
            email_id: 'IAUser@test.com',
            base_location: [
              {
                is_primary: true,
                location: 'IA location',
                location_id: 'a',
                services: ['IA', 'CIVIL'],
              },
            ],
          },
          ccd_service_names: ['IA', 'CIVIL'],
        },
        {
          ccd_service_name: 'PRIVATELAW',
          staff_profile: {
            id: '2',
            first_name: 'PL',
            last_name: 'User',
            email_id: 'PLUser@test.com',
            base_location: [
              {
                is_primary: true,
                location: 'PL location',
                location_id: 'c',
              },
              {
                is_primary: false,
                location: 'IA location',
                location_id: 'a',
              },
            ],
          },
          ccd_service_names: ['PRIVATELAW'],
        },
      ];
      const res = mockRes({ status: 200, data: mockStaffDetails });
      sandbox.stub(http, 'get').resolves(res);
      const data = await fetchNewUserData();
      expect(data).to.deep.equal(mockMergedStaffUsers);
    });
  });

  describe('fetchRoleAssignmentsForNewUsers', () => {
    it('should make a post request', async () => {
      const mockMergedStaffUsers = [
        {
          ccd_service_name: 'IA',
          staff_profile: {
            id: '1',
            first_name: 'IA',
            last_name: 'User',
            email_id: 'IAUser@test.com',
            base_location: [
              {
                is_primary: true,
                location: 'IA location',
                location_id: 'a',
                services: ['IA', 'CIVIL'],
              },
            ],
          },
          ccd_service_names: ['IA', 'CIVIL'],
        },
        {
          ccd_service_name: 'PRIVATELAW',
          staff_profile: {
            id: '2',
            first_name: 'PL',
            last_name: 'User',
            email_id: 'PLUser@test.com',
            base_location: [
              {
                is_primary: true,
                location: 'PL location',
                location_id: 'c',
              },
              {
                is_primary: false,
                location: 'IA location',
                location_id: 'a',
              },
            ],
          },
          ccd_service_names: ['PRIVATELAW'],
        },
      ];
      const mockRoleAssignments = [
        {
          id: '123',
          // Test specifies jurisidiction is not needed
          attributes: {},
          roleCategory: 'ADMIN',
          actorId: '1',
        },
        {
          id: '124',
          attributes: {},
          roleCategory: 'CTSC',
          actorId: '2',
        },
      ];
      const finalCaseworkers = [
        {
          email: 'IAUser@test.com',
          firstName: 'IA',
          idamId: '1',
          lastName: 'User',
          locations: [{ id: 'a', locationName: 'IA location', services: ['IA', 'CIVIL'] }],
          roleCategory: 'ADMIN',
          services: ['IA', 'CIVIL'],
        },
        {
          email: 'PLUser@test.com',
          firstName: 'PL',
          idamId: '2',
          lastName: 'User',
          locations: [{ id: 'c', locationName: 'PL location', services: undefined }],
          roleCategory: 'CTSC',
          services: ['PRIVATELAW'],
        },
      ];
      const res = mockRes({ status: 200, data: { roleAssignmentResponse: mockRoleAssignments } });
      sandbox.stub(http, 'post').resolves(res);
      const data = await fetchRoleAssignmentsForNewUsers(mockMergedStaffUsers as StaffUserDetails[]);
      expect(data).to.deep.equal(finalCaseworkers);
    });
  });

  describe('getAuthTokens', () => {
    it('should generate an OTP from the trimmed v13 secret and fetch both auth tokens', async () => {
      const getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
      getConfigValueStub.callsFake((key) => {
        const values = {
          microservice: 'xui_webapp',
          'services.s2s': 'https://s2s.test.com',
          'secrets.rpx.mc-s2s-client-secret': '  JBSWY3DPEHPK3PXP  ',
          'services.idam.idamApiUrl': 'https://idam-api.test.com',
          'services.idam.idamClientID': 'test-client-id',
          'secrets.rpx.system-user-name': 'system-user',
          'secrets.rpx.system-user-password': 'system-password',
          'secrets.rpx.mc-idam-client-secret': 'test-idam-secret',
        };

        return values[key];
      });

      const postStub = sandbox.stub(http, 'post');
      postStub.onFirstCall().resolves({ data: 'service-token' });
      postStub.onSecondCall().resolves({ data: { access_token: 'access-token' } });

      await getAuthTokens();

      const firstRequestBody = postStub.firstCall.args[1] as { microservice: string; oneTimePassword: string };

      expect(postStub.firstCall.args[0]).to.equal('https://s2s.test.com/lease');
      expect(firstRequestBody).to.deep.include({
        microservice: 'xui_webapp',
      });
      expect(firstRequestBody.oneTimePassword).to.satisfy(sinon.match.string.test);
      expect(firstRequestBody.oneTimePassword).to.have.length(6);

      expect(postStub.secondCall.args[0]).to.equal('https://idam-api.test.com/o/token');
      const authBody = new URLSearchParams(postStub.secondCall.args[1] as string);
      expect(Object.fromEntries(authBody.entries())).to.deep.equal({
        grant_type: 'password',
        password: 'system-password',
        username: 'system-user',
        scope: 'openid profile roles manage-user create-user search-user',
        client_id: 'test-client-id',
        client_secret: 'test-idam-secret',
      });
      expect(postStub.secondCall.args[2]).to.deep.equal({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      });
    });
  });

  describe('redisCache integration', () => {
    it('should return cached users from redis without acquiring lock', async () => {
      const redisUsers = [
        {
          ccd_service_name: 'IA',
          staff_profile: {
            id: '1',
            first_name: 'Test',
            last_name: 'User',
            email_id: 'user@test.com',
            base_location: [],
          },
        },
      ] as any;

      sandbox.stub(waRedisCache, 'getCachedUsers').resolves(redisUsers);
      const acquireLockStub = sandbox.stub(waRedisCache, 'acquireCachedUsersLock');

      const result = await getOrRefreshCachedUsers();

      expect(result).to.deep.equal(redisUsers);
      expect(acquireLockStub).not.to.have.been.called;
    });

    it('should refresh users, correctly setting redis cache and lock', async () => {
      const freshUsers = [
        {
          ccd_service_name: 'IA',
          staff_profile: {
            id: '1',
            first_name: 'Fresh',
            last_name: 'User',
            email_id: 'fresh@test.com',
            base_location: [],
          },
        },
      ] as any;

      const lock = { status: 'acquired' as const, key: 'wa:cachedUsers:lock', value: 'lock-id' };

      sandbox.stub(waRedisCache, 'getCachedUsers').onFirstCall().resolves(null).onSecondCall().resolves(null);

      sandbox.stub(waRedisCache, 'acquireCachedUsersLock').resolves(lock);
      const setCachedUsersStub = sandbox.stub(waRedisCache, 'setCachedUsers').resolves();
      const releaseLockStub = sandbox.stub(waRedisCache, 'releaseLock').resolves();

      sandbox.stub(caseWorkerService, 'handleNewUsersGet').resolves(freshUsers);

      const result = await getOrRefreshCachedUsers();

      expect(result).to.deep.equal(freshUsers);
      expect(setCachedUsersStub).to.have.been.calledWith(freshUsers);
      expect(releaseLockStub).to.have.been.calledWith(lock);
    });

    it('should use redis users found after acquiring lock without refreshing backend', async () => {
      const redisUsers = [
        {
          ccd_service_name: 'IA',
          staff_profile: {
            id: '1',
            first_name: 'Other',
            last_name: 'Pod',
            email_id: 'other@test.com',
            base_location: [],
          },
        },
      ] as any;

      const lock = { status: 'acquired' as const, key: 'wa:cachedUsers:lock', value: 'lock-id' };

      sandbox.stub(waRedisCache, 'getCachedUsers').onFirstCall().resolves(null).onSecondCall().resolves(redisUsers);

      sandbox.stub(waRedisCache, 'acquireCachedUsersLock').resolves(lock);
      sandbox.stub(waRedisCache, 'releaseLock').resolves();
      const backendStub = sandbox.stub(caseWorkerService, 'handleNewUsersGet');

      const result = await getOrRefreshCachedUsers();

      expect(result).to.deep.equal(redisUsers);
      expect(backendStub).not.to.have.been.called;
    });

    // Note: If this occurs in production it will cause a cache miss and put extra load on the backend
    // However, this is a fallback to ensure users are still returned
    // Could be improved in future by adding retry logic to attempt to acquire the lock if problems occur (e.g. redis connection issues), but not always guarantees issue fix
    // Could also consider cancellation of backend request if lock is unavailable
    it('should refresh from backend when redis lock is unavailable', async () => {
      const freshUsers = [
        {
          ccd_service_name: 'IA',
          staff_profile: {
            id: '1',
            first_name: 'Fallback',
            last_name: 'User',
            email_id: 'fallback@test.com',
            base_location: [],
          },
        },
      ] as any;

      sandbox.stub(waRedisCache, 'getCachedUsers').resolves(null);
      sandbox.stub(waRedisCache, 'acquireCachedUsersLock').resolves({ status: 'unavailable' });
      sandbox.stub(caseWorkerService, 'handleNewUsersGet').resolves(freshUsers);

      const result = await getOrRefreshCachedUsers();

      expect(result).to.deep.equal(freshUsers);
    });

    it('should return cached users with roles from redis when roles do not need refreshing', async () => {
      const usersWithRoles = [
        {
          idamId: '1',
          firstName: 'Redis',
          lastName: 'Role',
          email: 'role@test.com',
          roleCategory: 'ADMIN',
          services: ['IA'],
          locations: [],
        },
      ] as any;

      sandbox.stub(waRedisCache, 'getCachedUsersWithRoles').resolves(usersWithRoles);
      const acquireLockStub = sandbox.stub(waRedisCache, 'acquireCachedUsersWithRolesLock');

      const result = await getOrRefreshCachedUsersWithRoles([]);

      expect(result).to.deep.equal(usersWithRoles);
      expect(acquireLockStub).not.to.have.been.called;
    });

    it('should wait for cached users and return them when they appear', async () => {
      const redisUsers = [{ ccd_service_name: 'IA', staff_profile: { id: '1' } }] as any;

      sandbox.stub(global, 'setTimeout').callsFake((callback: (...args: any[]) => void) => {
        callback();
        return {} as NodeJS.Timeout;
      });

      const getCachedUsersStub = sandbox
        .stub(waRedisCache, 'getCachedUsers')
        .onFirstCall()
        .resolves(null)
        .onSecondCall()
        .resolves(redisUsers);

      const result = await waitForCachedUsers();

      expect(result).to.deep.equal(redisUsers);
      expect(getCachedUsersStub).to.have.been.calledTwice;
    });
  });
});
