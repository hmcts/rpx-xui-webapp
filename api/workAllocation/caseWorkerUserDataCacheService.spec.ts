import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockRes } from 'sinon-express-mock';
import * as configuration from '../configuration';
import { http } from '../lib/http';
import { fetchNewUserData, fetchRoleAssignmentsForNewUsers, getAuthTokens } from './caseWorkerUserDataCacheService';
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
      expect(firstRequestBody).to.deep.equal({
        microservice: 'xui_webapp',
        oneTimePassword: sinon.match.string,
      });
      expect(firstRequestBody.oneTimePassword).to.have.length(6);

      expect(postStub.secondCall.args[0]).to.equal('https://idam-api.test.com/o/token');
      expect(postStub.secondCall.args[1]).to.equal(
        'grant_type=password&username=system-user&password=system-password&client_id=test-client-id&client_secret=test-idam-secret&scope=openid%20profile%20roles%20manage-user%20create-user%20search-user'
      );
      expect(postStub.secondCall.args[2]).to.deep.equal({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      });
    });
  });
});
