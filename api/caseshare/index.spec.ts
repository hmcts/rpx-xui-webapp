import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { plainToClass } from 'class-transformer';
import * as configuration from '../configuration';
import { EnhancedRequest } from '../lib/models';
import * as realAPI from './real-api';
import * as stubAPI from './stub-api';
import { SharedCase } from './models/case-share.model';
import { UserDetails } from './models/user-details.model';
import { DataBaseModel } from './models/data-base.model';
import { OrganisationModel } from './models/organisation.model';
const dbJson = require('./stubs/db.json');

chai.use(sinonChai);

let testData: DataBaseModel;
let testOrgs: OrganisationModel[] = [];
let testUsers: UserDetails[] = [];

try {
  testData = plainToClass(DataBaseModel, dbJson);
  testOrgs = testData.organisations || [];
  testUsers = testOrgs.length > 0 ? testOrgs[0].users as any as UserDetails[] : [];
} catch (e) {
  console.warn('Failed to load test data from JSON:', e);
}

const createMockUserDetails = (overrides: Partial<UserDetails> = {}): UserDetails => {
  return {
    idamId: overrides.idamId || 'u123',
    firstName: overrides.firstName || 'Test',
    lastName: overrides.lastName || 'User',
    email: overrides.email || 'test@example.com',
    caseRoles: overrides.caseRoles
  };
};

const createMockSharedCase = (overrides?: Partial<SharedCase>): SharedCase => ({
  caseId: 'case123',
  caseTitle: 'Test Case',
  sharedWith: [],
  pendingShares: [],
  ...overrides
});

describe('Case Share Index - Unit Tests', () => {
  let sandbox: sinon.SinonSandbox;
  let req: EnhancedRequest;
  let res: any;
  let next: sinon.SinonStub;
  let getConfigValueStub: sinon.SinonStub;
  let realAPIGetUsersStub: sinon.SinonStub;
  let realAPIGetCasesStub: sinon.SinonStub;
  let realAPIAssignCasesStub: sinon.SinonStub;
  let stubAPIGetUsersStub: sinon.SinonStub;
  let stubAPIGetCasesStub: sinon.SinonStub;
  let stubAPIAssignCasesStub: sinon.SinonStub;
  let getUsers: any;
  let getCases: any;
  let assignCasesToUsers: any;

  before(() => {
    delete require.cache[require.resolve('./index')];
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq({});
    res = mockRes();
    next = sandbox.stub();

    realAPIGetUsersStub = sandbox.stub(realAPI, 'getUsers');
    realAPIGetCasesStub = sandbox.stub(realAPI, 'getCases');
    realAPIAssignCasesStub = sandbox.stub(realAPI, 'assignCases');
    stubAPIGetUsersStub = sandbox.stub(stubAPI, 'getUsers');
    stubAPIGetCasesStub = sandbox.stub(stubAPI, 'getCases');
    stubAPIAssignCasesStub = sandbox.stub(stubAPI, 'assignCases');
  });

  afterEach(() => {
    sandbox.restore();
  });

  after(() => {
    delete require.cache[require.resolve('./index')];
  });

  describe('when stub is true', () => {
    beforeEach(() => {
      getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
      getConfigValueStub.returns(true);

      // Clear and re-require the module to pick up the stubbed config
      delete require.cache[require.resolve('./index')];
      const index = require('./index');
      getUsers = index.getUsers;
      getCases = index.getCases;
      assignCasesToUsers = index.assignCasesToUsers;
    });

    describe('getUsers', () => {
      it('should return transformed user data when search query matches', async () => {
        req.query = { q: 'joe' };

        // Configure stub to use actual stub-api logic
        stubAPIGetUsersStub.callsFake((req, res) => {
          const users = testUsers.filter((u) =>
            u.firstName.toLowerCase().includes('joe') ||
            u.lastName.toLowerCase().includes('joe') ||
            u.email.toLowerCase().includes('joe')
          );
          return res.send(users);
        });

        await getUsers(req, res, next);

        expect(stubAPIGetUsersStub).to.have.been.calledOnceWith(req, res);
        expect(res.send).to.have.been.calledWith(sinon.match((array) =>
          array.length === 1 &&
          array[0].idamId === 'u111111' &&
          array[0].firstName === 'Joe'
        ));
      });

      it('should handle empty search results', async () => {
        req.query = { q: 'nonexistent' };

        stubAPIGetUsersStub.callsFake((req, res) => {
          return res.status(404).send('{"errorMessage": "User is not found}"');
        });

        await getUsers(req, res, next);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.send).to.have.been.calledWith('{"errorMessage": "User is not found}"');
      });

      it('should return all users when no search query provided', async () => {
        req.query = { q: undefined };

        stubAPIGetUsersStub.callsFake((req, res) => {
          return res.send(testUsers);
        });

        await getUsers(req, res, next);

        expect(res.send).to.have.been.calledWith(testUsers);
      });

      it('should handle missing organisation', async () => {
        req.query = { q: 'test' };

        stubAPIGetUsersStub.callsFake((req, res) => {
          return res.status(404).send('{"errorMessage": "Organisation is not found}"');
        });

        await getUsers(req, res, next);

        expect(res.status).to.have.been.calledWith(404);
      });
    });

    describe('getCases', () => {
      const mockSharedCases: SharedCase[] = [
        createMockSharedCase({
          caseId: 'case1',
          caseTitle: 'Test Case 1',
          sharedWith: [createMockUserDetails()]
        }),
        createMockSharedCase({
          caseId: 'case2',
          caseTitle: 'Test Case 2'
        })
      ];

      it('should return shared cases data', async () => {
        stubAPIGetCasesStub.callsFake((req, res) => {
          return res.send(mockSharedCases);
        });

        await getCases(req, res, next);

        expect(stubAPIGetCasesStub).to.have.been.calledOnceWith(req, res);
        expect(res.send).to.have.been.calledWith(mockSharedCases);
      });

      it('should handle no cases found', async () => {
        stubAPIGetCasesStub.callsFake((req, res) => {
          return res.status(404).send('{"errorMessage": "Cases are not found}"');
        });

        await getCases(req, res, next);

        expect(res.status).to.have.been.calledWith(404);
      });
    });

    describe('assignCasesToUsers', () => {
      it('should handle pending shares correctly for user u222222', async () => {
        const inputCases: SharedCase[] = [{
          caseId: 'case123',
          caseTitle: 'Test Case',
          pendingShares: [{
            idamId: 'u222222',
            firstName: 'Steve',
            lastName: 'Harrison',
            email: 'steve.harrison@woodford.com'
          }],
          sharedWith: []
        }];

        req.body = { sharedCases: inputCases };

        stubAPIAssignCasesStub.callsFake((req, res) => {
          const shareCases = req.body.sharedCases;
          const updatedCase = {
            ...shareCases[0],
            pendingShares: [],
            sharedWith: [{
              idamId: 'u222222',
              firstName: 'Steve',
              lastName: 'Harrison',
              email: 'steve.harrison@woodford.com'
            }]
          };
          return res.send([updatedCase]);
        });

        await assignCasesToUsers(req, res);

        expect(res.send).to.have.been.calledWith(sinon.match((cases) =>
          cases[0].sharedWith.length === 1 &&
          cases[0].pendingShares.length === 0 &&
          cases[0].sharedWith[0].idamId === 'u222222'
        ));
      });

      it('should return 500 for user u333333', async () => {
        const inputCases: SharedCase[] = [{
          caseId: 'case123',
          caseTitle: 'Test Case',
          pendingShares: [{
            idamId: 'u333333',
            firstName: 'James',
            lastName: 'Priest',
            email: 'james.priest@woodford.com'
          }],
          sharedWith: []
        }];

        req.body = { sharedCases: inputCases };

        stubAPIAssignCasesStub.callsFake((req, res) => {
          return res.sendStatus(500);
        });

        await assignCasesToUsers(req, res);

        expect(res.sendStatus).to.have.been.calledWith(500);
      });

      it('should handle multiple cases with different users', async () => {
        const inputCases: SharedCase[] = [
          {
            caseId: 'case1',
            caseTitle: 'Case 1',
            pendingShares: [createMockUserDetails({ idamId: 'u222222' })],
            sharedWith: []
          },
          {
            caseId: 'case2',
            caseTitle: 'Case 2',
            pendingShares: [createMockUserDetails({ idamId: 'u444444' })],
            sharedWith: []
          }
        ];

        req.body = { sharedCases: inputCases };

        stubAPIAssignCasesStub.callsFake((req, res) => {
          const shareCases = req.body.sharedCases;
          // Only u222222 gets moved to sharedWith
          const updatedCases = shareCases.map((c) => {
            if (c.pendingShares[0].idamId === 'u222222') {
              return { ...c, pendingShares: [], sharedWith: c.pendingShares };
            }
            return c;
          });
          return res.send(updatedCases);
        });

        await assignCasesToUsers(req, res);

        expect(res.send).to.have.been.calledWith(sinon.match((cases) =>
          cases[0].sharedWith.length === 1 &&
          cases[1].pendingShares.length === 1
        ));
      });
    });
  });

  describe('when stub is false', () => {
    beforeEach(() => {
      getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
      getConfigValueStub.returns(false);

      // Clear and re-require the module to pick up the stubbed config
      delete require.cache[require.resolve('./index')];
      const index = require('./index');
      getUsers = index.getUsers;
      getCases = index.getCases;
      assignCasesToUsers = index.assignCasesToUsers;
    });

    describe('getUsers', () => {
      it('should handle API errors gracefully', async () => {
        const error = new Error('API Error');
        realAPIGetUsersStub.callsFake((req, res, next) => {
          next(error);
          return Promise.resolve();
        });

        await getUsers(req, res, next);

        expect(realAPIGetUsersStub).to.have.been.calledOnceWith(req, res, next);
        expect(next).to.have.been.calledWith(error);
        expect(res.send).to.not.have.been.called;
      });

      it('should pass through successful responses', async () => {
        realAPIGetUsersStub.resolves(undefined);

        await getUsers(req, res, next);

        expect(realAPIGetUsersStub).to.have.been.calledOnceWith(req, res, next);
        expect(stubAPIGetUsersStub).to.not.have.been.called;
      });
    });

    describe('getCases', () => {
      it('should pass case_ids query parameter', async () => {
        req.query = { case_ids: 'case1,case2,case3' };
        realAPIGetCasesStub.resolves(undefined);

        await getCases(req, res, next);

        expect(realAPIGetCasesStub).to.have.been.calledOnceWith(
          sinon.match.has('query', sinon.match.has('case_ids', 'case1,case2,case3')),
          res,
          next
        );
      });

      it('should handle API errors', async () => {
        const error = new Error('CCD API Error');
        realAPIGetCasesStub.callsFake((req, res, next) => {
          next(error);
          return Promise.resolve();
        });

        await getCases(req, res, next);

        expect(next).to.have.been.calledWith(error);
      });
    });

    describe('assignCasesToUsers', () => {
      it('should validate request body contains sharedCases', async () => {
        req.body = { sharedCases: [] };
        realAPIAssignCasesStub.resolves(undefined);

        await assignCasesToUsers(req, res);

        expect(realAPIAssignCasesStub).to.have.been.calledWith(
          sinon.match.has('body', sinon.match.has('sharedCases', [])),
          res
        );
      });

      it('should handle complex case sharing scenarios', async () => {
        const complexCases: SharedCase[] = [
          {
            caseId: 'case1',
            caseTitle: 'Complex Case 1',
            caseTypeId: 'FT_ComplexCase',
            pendingShares: [
              createMockUserDetails({ idamId: 'u1' }),
              createMockUserDetails({ idamId: 'u2' })
            ],
            pendingUnshares: [
              createMockUserDetails({ idamId: 'u3' })
            ],
            sharedWith: [
              createMockUserDetails({ idamId: 'u3' }),
              createMockUserDetails({ idamId: 'u4' })
            ]
          }
        ];

        req.body = { sharedCases: complexCases };
        realAPIAssignCasesStub.resolves(undefined);

        await assignCasesToUsers(req, res);

        expect(realAPIAssignCasesStub).to.have.been.calledWith(req, res);
      });
    });
  });

  describe('Edge Cases and Error Scenarios', () => {
    beforeEach(() => {
      getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
      getConfigValueStub.returns(true);

      delete require.cache[require.resolve('./index')];
      const index = require('./index');
      getUsers = index.getUsers;
      getCases = index.getCases;
      assignCasesToUsers = index.assignCasesToUsers;
    });

    describe('getUsers edge cases', () => {
      it('should handle undefined query object', async () => {
        req.query = undefined;

        stubAPIGetUsersStub.callsFake((req, res) => {
          // Should handle gracefully
          return res.status(400).send('Invalid request');
        });

        await getUsers(req, res, next);

        expect(res.status).to.have.been.calledWith(400);
      });

      it('should handle special characters in search query', async () => {
        req.query = { q: 'test@example.com' };

        stubAPIGetUsersStub.callsFake((req, res) => {
          const searchText = req.query.q.toString();
          const users = testUsers.filter((u) =>
            u.email.toLowerCase().indexOf(searchText.toLowerCase()) > -1
          );
          return res.send(users);
        });

        await getUsers(req, res, next);

        expect(stubAPIGetUsersStub).to.have.been.called;
      });
    });

    describe('assignCasesToUsers edge cases', () => {
      it('should handle empty pendingShares array', async () => {
        const casesWithoutPending: SharedCase[] = [{
          caseId: 'case1',
          caseTitle: 'Case without pending',
          pendingShares: [],
          sharedWith: [createMockUserDetails()]
        }];

        req.body = { sharedCases: casesWithoutPending };

        stubAPIAssignCasesStub.callsFake((req, res) => {
          return res.send(req.body.sharedCases);
        });

        await assignCasesToUsers(req, res);

        expect(res.send).to.have.been.calledWith(casesWithoutPending);
      });

      it('should handle missing sharedCases in request body', async () => {
        req.body = {};

        stubAPIAssignCasesStub.callsFake((req, res) => {
          return res.status(400).send('Missing sharedCases');
        });

        await assignCasesToUsers(req, res);

        expect(res.status).to.have.been.calledWith(400);
      });

      it('should handle null values in user details', async () => {
        const casesWithNullUser: SharedCase[] = [{
          caseId: 'case1',
          caseTitle: 'Case with null user',
          pendingShares: [{
            idamId: 'u1',
            firstName: null as any,
            lastName: null as any,
            email: 'test@example.com'
          } as UserDetails],
          sharedWith: []
        }];

        req.body = { sharedCases: casesWithNullUser };

        stubAPIAssignCasesStub.callsFake((req, res) => {
          // Should handle null values gracefully
          return res.send(req.body.sharedCases);
        });

        await assignCasesToUsers(req, res);

        expect(stubAPIAssignCasesStub).to.have.been.called;
      });
    });
  });

  describe('Model and DTO Usage Verification', () => {
    beforeEach(() => {
      getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
      getConfigValueStub.returns(false);

      delete require.cache[require.resolve('./index')];
      const index = require('./index');
      getUsers = index.getUsers;
      getCases = index.getCases;
      assignCasesToUsers = index.assignCasesToUsers;
    });

    it('should use UserDetails model structure correctly', async () => {
      const validUserDetails: UserDetails = {
        idamId: 'u12345',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        caseRoles: ['caseworker']
      };

      // Verify the structure matches the model
      expect(validUserDetails).to.have.all.keys('idamId', 'firstName', 'lastName', 'email', 'caseRoles');
    });

    it('should use SharedCase model structure correctly', async () => {
      const validSharedCase: SharedCase = {
        caseId: 'case123',
        caseTitle: 'Immigration Appeal',
        caseTypeId: 'Asylum',
        roles: ['caseworker-ia-caseofficer'],
        sharedWith: [],
        pendingShares: [],
        pendingUnshares: []
      };

      // Verify the structure matches the model
      expect(validSharedCase).to.have.all.keys('caseId', 'caseTitle', 'caseTypeId', 'roles', 'sharedWith', 'pendingShares', 'pendingUnshares');
    });

    it('should use OrganisationModel structure from test data', () => {
      const org: OrganisationModel = testOrgs[0];

      expect(org).to.have.property('orgId', 'o111111');
      expect(org).to.have.property('orgName', 'Woodford solicitors ltd.');
      expect(org).to.have.property('users').that.is.an('array');
      expect(org.users[0]).to.have.all.keys('idamId', 'firstName', 'lastName', 'email');
    });
  });
});
