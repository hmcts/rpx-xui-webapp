import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { http } from '../lib/http';
import {
  createWADependencyUnavailableError,
  fetchNewUserData,
  fetchRoleAssignmentsForNewUsers,
} from './caseWorkerUserDataCacheService';
import * as caseWorkerUserDataCacheService from './caseWorkerUserDataCacheService';
import { getUsersByServiceName } from './index';
import { FullUserDetailCache } from './fullUserDetailCache';
import { StaffUserDetails } from './interfaces/staffUserDetails';

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

  describe('getUsersByServiceName dependency hardening', () => {
    it('returns 200 with cached refined users when upstream fails', async () => {
      const req = mockReq({
        body: {
          term: 'Alice',
          services: ['IA'],
        },
        session: {
          passport: {
            user: {
              userinfo: {
                roles: ['caseworker'],
              },
            },
          },
        },
      });
      const res = mockRes();
      const next = sandbox.spy();
      const cachedUsers = [
        {
          idamId: 'user-1',
          firstName: 'Alice',
          lastName: 'Example',
          email: 'alice@example.com',
          roleCategory: 'JUDICIAL',
          services: ['IA'],
          locations: [{ id: '1', locationName: 'Taylor House', services: ['IA'] }],
        },
        {
          idamId: 'user-2',
          firstName: 'Bob',
          lastName: 'Example',
          email: 'bob@example.com',
          roleCategory: 'LEGAL_OPERATIONS',
          services: ['CIVIL'],
          locations: [{ id: '2', locationName: 'RCJ', services: ['CIVIL'] }],
        },
      ];

      FullUserDetailCache.setUserDetails(cachedUsers as any);
      sandbox.stub(caseWorkerUserDataCacheService, 'timestampExists').returns(false);
      sandbox
        .stub(caseWorkerUserDataCacheService, 'fetchUserData')
        .rejects(createWADependencyUnavailableError('rd-caseworker-ref-api'));

      await getUsersByServiceName(req as any, res as any, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledOnce;
      expect(res.send.firstCall.args[0]).to.have.lengthOf(1);
      expect(res.send.firstCall.args[0][0]).to.include({
        idamId: 'user-1',
        firstName: 'Alice',
        lastName: 'Example',
      });
      expect(next).to.not.have.been.called;
    });

    it('returns 503 dependency diagnostics when upstream fails and no cache is available', async () => {
      const req = mockReq({
        body: {
          term: '',
          services: ['IA'],
        },
        session: {
          passport: {
            user: {
              userinfo: {
                roles: ['caseworker'],
              },
            },
          },
        },
      });
      const res = mockRes();
      const next = sandbox.spy();

      FullUserDetailCache.setUserDetails([]);
      sandbox.stub(caseWorkerUserDataCacheService, 'timestampExists').returns(false);
      sandbox
        .stub(caseWorkerUserDataCacheService, 'fetchUserData')
        .rejects(createWADependencyUnavailableError('rd-caseworker-ref-api'));

      await getUsersByServiceName(req as any, res as any, next);

      expect(res.status).to.have.been.calledWith(503);
      expect(res.send).to.have.been.calledWith({
        code: 'WA_DEPENDENCY_UNAVAILABLE',
        message: 'Work Allocation dependency is temporarily unavailable',
        upstream: 'rd-caseworker-ref-api',
      });
      expect(next).to.not.have.been.called;
    });
  });
});
