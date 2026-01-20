import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { FullUserDetailCache } from '../workAllocation/fullUserDetailCache';
import {
  confirmUserExclusion,
  deleteUserExclusion,
  getCorrectRoleCategory,
  getEmail,
  getExclusionRequestPayload,
  getJudicialUsersFromApi,
  getUserName,
  mapResponseToExclusions
} from './exclusionService';
import { getRoleCategoryRequestPayload } from './index';
import { RoleCategory } from './models/allocate-role.enum';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('exclusions.exclusionService', () => {
  let sandbox: sinon.SinonSandbox;
  let res: any;
  let next: any;
  const SUCCESS_RESPONSE = { status: {}, data: 'ok' };
  const exampleRoleExclusion = {
    added: Date.UTC(2021, 7, 1),
    id: '123',
    name: 'Judge Birch',
    notes: 'this case been remitted from Upper Tribunal and required different judge',
    type: 'Other',
    userType: 'Judicial'
  };

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.spy();
    res = mockRes(SUCCESS_RESPONSE);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getUserExclusions', () => {
    it('should make a getExclusionRequestPayload', async () => {
      const requestPayload = getExclusionRequestPayload('1234567891234567', 'Asylum', 'IA');
      expect(requestPayload.queryRequests.length).to.equal(1);
      expect(requestPayload.queryRequests[0].grantType[0]).to.equal('EXCLUDED');
      expect(requestPayload.queryRequests[0].attributes.caseId[0]).to.equal('1234567891234567');
      expect(requestPayload.queryRequests[0].attributes.jurisdiction[0]).to.equal('Asylum');
      expect(requestPayload.queryRequests[0].attributes.caseType[0]).to.equal('IA');
    });

    it('mapResponseToExclusions with blank array', () => {
      const result = mapResponseToExclusions([], null);
      expect(result.length).to.equal(0);
    });

    it('mapResponseToExclusions with an array', () => {
      const exclusions = [{
        actorId: 'actorId',
        actorIdType: 'actorIdType',
        attributes: {
          caseId: '334455',
          isCaseAllocator: false,
          jurisdiction: 'jurisdiction',
          baseLocation: 'loc123',
          region: 'region1'
        },
        authorisations: [],
        classification: 'classification',
        created: new Date(2020, 11, 20),
        grantType: 'grantType',
        id: '123',
        name: 'roleName',
        readOnly: true,
        roleCategory: 'roleCategory',
        roleName: 'roleName',
        roleType: 'roleType'
      }];
      const caseworker = {
        firstName: 'John',
        idamId: 'actorId',
        lastName: 'Priest'
      };
      sandbox.stub(FullUserDetailCache, 'getUserByIdamId')
        .withArgs('actorId')
        .returns(caseworker as any);
      const result = mapResponseToExclusions(exclusions, null);
      expect(result.length).to.equal(1);
      expect(result[0].id).to.equal('123');
      expect(result[0].name).to.equal('John Priest');
      expect(result[0].added.getFullYear()).to.equal(2020);
      expect(result[0].added.getMonth()).to.equal(11);
      expect(result[0].added.getDate()).to.equal(20);
      expect(result[0].userType).to.equal('roleCategory');
      expect(result[0].type).to.equal('roleType');
    });
  });

  describe('confirmUserExclusion', () => {
    it('should confirm successfully', async () => {
      sandbox.stub(http, 'post').resolves(res);
      const req = mockReq({});
      req.session = {
        passport: {
          user: {
            userinfo: {
              id: 'someId'
            }
          }
        }
      };
      const response = mockRes();
      await confirmUserExclusion(req, response, next);

      // Should have received the HTTP response. The confirm simply sends the data
      expect(response.send).to.have.been.calledWith(sinon.match('ok'));
    });
  });

  describe('deleteUserExclusion', () => {
    it('should delete successfully', async () => {
      sandbox.stub(http, 'delete').resolves(res);
      const req = mockReq({
        body: { roleExclusion: exampleRoleExclusion }
      });
      const response = mockRes();
      await deleteUserExclusion(req, response, next);

      // Should have received the HTTP response. The delete simply sends the data
      expect(response.send).to.have.been.calledWith(sinon.match(exampleRoleExclusion));
    });
  });

  describe('getEmail', () => {
    const caseworker = {
      firstName: 'John',
      idamId: 'actorId',
      lastName: 'Priest',
      email: 'test@test.com'
    };

    beforeEach(() => {
      sandbox.stub(FullUserDetailCache, 'getUserByIdamId')
        .withArgs('actorId')
        .returns(caseworker as any);
    });

    it('should get the correct email', async () => {
      expect(getEmail('actorId')).to.equal('test@test.com');
    });

    it('should get nothing if data is incorrect', async () => {
      expect(getEmail('nonActorId')).to.equal(undefined);
    });
  });

  describe('getUserName', () => {
    const caseworker = {
      firstName: 'John',
      idamId: 'actorId',
      lastName: 'Priest',
      email: 'test@test.com'
    };

    beforeEach(() => {
      sandbox.stub(FullUserDetailCache, 'getUserByIdamId')
        .withArgs('actorId')
        .returns(caseworker as any);
    });

    it('should get the correct username', async () => {
      expect(getUserName('actorId')).to.equal('John Priest');
    });

    it('should get nothing if data is incorrect', async () => {
      expect(getUserName('nonActorId')).to.equal(undefined);
    });
  });

  describe('getLegalAndJudicialRequestPayload', () => {
    const caseRoleRequestPayload = {
      queryRequests: [
        {
          attributes: {
            caseId: ['123'],
            caseType: ['Asylum'],
            jurisdiction: ['IA']
          },
          roleCategory: ['LEGAL_OPERATIONS', 'JUDICIAL', 'CTSC', 'ADMIN']
        }
      ]
    } as unknown as EnhancedRequest;
    it('should get the correct payload', async () => {
      expect(getRoleCategoryRequestPayload('123', 'IA', 'Asylum')).to.deep.equal(caseRoleRequestPayload);
    });

    it('should get the correct payload', async () => {
      expect(getRoleCategoryRequestPayload('123', 'IA', 'Asylum')).to.deep.equal(caseRoleRequestPayload);
    });
  });

  describe('getCorrectRoleCategory', () => {
    it('should get the correct role category', async () => {
      expect(getCorrectRoleCategory('Judicial')).to.deep.equal(RoleCategory.JUDICIAL);
      expect(getCorrectRoleCategory('Legal Ops')).to.deep.equal(RoleCategory.LEGAL_OPERATIONS);
      expect(getCorrectRoleCategory('Admin')).to.deep.equal(RoleCategory.ADMIN);
    });
  });
});

describe('getJudicialUsersFromApi', () => {
  let sandbox: sinon.SinonSandbox;
  let req: EnhancedRequest;
  const userIds = ['123', '456'];
  const data = [
    {
      sidam_id: '123',
      full_name: 'John-Priest',
      email_id: 'john-priest@example.com'
    },
    {
      sidam_id: '456',
      full_name: 'Jane-Priest',
      email_id: 'jane-priest@example.com'
    }
  ];

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq({
      body: {
        userIds
      }
    });
    sandbox.stub(http, 'post').resolves({
      data
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should get the judicial users successfully', async () => {
    req = mockReq({
      headers: {
        accept: 'application/json'
      }
    });
    const response = await getJudicialUsersFromApi(req, userIds, 'BFA1');
    expect(response.data.length).to.equal(2);
    expect(response.data).to.deep.equal(data);
  });
});
