
import * as chai from 'chai';
import { expect } from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as crudService from '../common/crudService';
import * as configuration from '../configuration';
import { EnhancedRequest } from '../lib/models';
import { PRDRawUserModel } from './models/prd-raw-user.model';
import { CCDRawUserModel } from './models/ccd-raw-user.model';
import { CCDRawCaseUserModel } from './models/ccd-raw-case-user.model';
import { UnassignedCaseModel } from './models/unassigned-case.model';
import { SharedCase } from './models/case-share.model';
import { UserDetails } from './models/user-details.model';

const dbJson = require('./stubs/db.json');

chai.use(sinonChai);

// Load test data from stubs
let testData: any;
let testOrgs: any[] = [];
let testUsers: any[] = [];
let testSharedCases: any[] = [];

try {
  testData = dbJson;
  testOrgs = testData.organisations || [];
  testUsers = testOrgs.flatMap((org: any) => org.users);
  testSharedCases = dbJson.sharedCases || [];
} catch (e) {
  console.warn('Failed to load test data from JSON:', e);
}

// Convert stub user data to PRD format
const convertUserToPRDFormat = (user: any): PRDRawUserModel => ({
  userIdentifier: user.idamId,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  idamStatus: 'active'
});

// Convert stub user data to CCD format
const convertUserToCCDFormat = (user: any): CCDRawUserModel => ({
  idam_id: user.idamId,
  email: user.email,
  first_name: user.firstName,
  last_name: user.lastName,
  case_roles: user.caseRoles || ['[CLAIMANT]']
});

// Convert stub case data to CCD format
const convertCaseToCCDFormat = (sharedCase: any): CCDRawCaseUserModel => ({
  case_id: sharedCase.caseId,
  case_title: sharedCase.caseTitle,
  shared_with: sharedCase.sharedWith.map((user: any) => convertUserToCCDFormat(user))
});

describe('Case Share Real API', () => {
  let sandbox: sinon.SinonSandbox;
  let req: EnhancedRequest;
  let res: any;
  let next: sinon.SinonStub;
  let handleGetStub: sinon.SinonStub;
  let sendPostStub: sinon.SinonStub;
  let sendDeleteStub: sinon.SinonStub;
  let getConfigValueStub: sinon.SinonStub;
  let getUsers: any;
  let getCases: any;
  let assignCases: any;

  before(() => {
    delete require.cache[require.resolve('./real-api')];

    sandbox = sinon.createSandbox();
    getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
    getConfigValueStub.returns('http://default-api'); // Default return value

    const realApi = require('./real-api');
    getUsers = realApi.getUsers;
    getCases = realApi.getCases;
    assignCases = realApi.assignCases;
  });

  after(() => {
    sandbox.restore();
    delete require.cache[require.resolve('./real-api')];
  });

  beforeEach(() => {
    next = sandbox.stub();
    res = mockRes();

    // Stub CRUD service methods
    handleGetStub = sandbox.stub(crudService, 'handleGet');
    sendPostStub = sandbox.stub(crudService, 'sendPost');
    sendDeleteStub = sandbox.stub(crudService, 'sendDelete');
  });

  afterEach(() => {
    handleGetStub?.restore();
    sendPostStub?.restore();
    sendDeleteStub?.restore();
  });

  describe('getUsers', () => {
    it('should successfully fetch and transform users from Woodford solicitors', async () => {
      // Use real test data from stubs
      const woodfordUsers = testOrgs[0].users; // Woodford solicitors users
      const mockPrdUsers: { users: PRDRawUserModel[] } = {
        users: woodfordUsers.map((user) => convertUserToPRDFormat(user))
      };

      req = mockReq({});
      handleGetStub.resolves({ status: 200, data: mockPrdUsers });

      await getUsers(req, res, next);

      expect(handleGetStub).to.have.been.calledOnce;
      const actualUrl = handleGetStub.firstCall.args[0];
      expect(actualUrl).to.include('/refdata/external/v1/organisations/users?returnRoles=false&status=active');

      const expectedUsers: UserDetails[] = woodfordUsers.map((user) => ({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        idamId: user.idamId
      }));

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(expectedUsers);

      // Verify specific users from stub data
      const sentUsers = res.send.firstCall.args[0];
      expect(sentUsers).to.have.lengthOf(4);
      expect(sentUsers[0]).to.deep.equal({
        email: 'joe.elliott@woodford.com',
        firstName: 'Joe',
        lastName: 'Elliott',
        idamId: 'u111111'
      });
      expect(next).to.not.have.been.called;
    });

    it('should handle empty users array', async () => {
      const mockPrdUsers = { users: [] };
      req = mockReq({});
      handleGetStub.resolves({ status: 200, data: mockPrdUsers });

      await getUsers(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith([]);
      expect(next).to.not.have.been.called;
    });

    it('should handle errors and call next', async () => {
      const error = new Error('API Error');
      req = mockReq({});
      handleGetStub.rejects(error);

      await getUsers(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });

    it('should handle missing users property in response', async () => {
      const invalidResponse = {};
      req = mockReq({});
      handleGetStub.resolves({ status: 200, data: invalidResponse });

      await getUsers(req, res, next);

      expect(next).to.have.been.called;
      const calledError = next.firstCall.args[0];
      expect(calledError).to.be.an('error');
    });

    it('should handle both organisations and transform all users', async () => {
      // Use all users from both organisations in stubs
      const allUsers = testUsers;
      const mockPrdUsers: { users: PRDRawUserModel[] } = {
        users: allUsers.map((user) => convertUserToPRDFormat(user))
      };

      req = mockReq({});
      handleGetStub.resolves({ status: 200, data: mockPrdUsers });

      await getUsers(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledOnce;

      const sentUsers = res.send.firstCall.args[0];
      expect(sentUsers).to.have.lengthOf(8); // 4 from each organisation

      // Verify users from both organisations
      const userEmails = sentUsers.map((u: UserDetails) => u.email);
      expect(userEmails).to.include('joe.elliott@woodford.com');
      expect(userEmails).to.include('anne.deller@lambbrooks.com');
    });

    it('should use correct configuration value for PRD URL', async () => {
      req = mockReq({});
      const mockPrdUsers = { users: [] };
      handleGetStub.resolves({ status: 200, data: mockPrdUsers });

      await getUsers(req, res, next);

      // Verify the URL is constructed correctly with PRD endpoint
      const actualUrl = handleGetStub.firstCall.args[0];
      expect(actualUrl).to.include('/refdata/external/v1/organisations/users');

      // The configuration should have been called during module import
      const configCalls = getConfigValueStub.getCalls().map((call) => call.args[0]);
      expect(configCalls).to.include('services.prd.api');
    });
  });

  describe('getCases', () => {
    it('should successfully fetch and transform case assignments from stub data', async () => {
      // Use real test cases from stubs
      const mockCaseAssignments: { case_assignments: CCDRawCaseUserModel[] } = {
        case_assignments: testSharedCases.map(convertCaseToCCDFormat)
      };

      // Use actual case IDs from stub data
      const caseIds = testSharedCases.map((c) => c.caseId).join(',');
      req = mockReq({
        query: { case_ids: caseIds }
      });
      handleGetStub.resolves({ status: 200, data: mockCaseAssignments });

      await getCases(req, res, next);

      expect(handleGetStub).to.have.been.calledOnce;
      const actualUrl = handleGetStub.firstCall.args[0];
      expect(actualUrl).to.include(`/case-assignments?case_ids=${caseIds}`);

      expect(res.status).to.have.been.calledWith(200);

      const sentCases = res.send.firstCall.args[0];
      expect(sentCases).to.have.lengthOf(3);

      // Verify first case from stub data
      expect(sentCases[0]).to.deep.equal({
        caseId: '1573922332670942',
        caseTitle: 'Paul Saddlebrook Vs Jennifer Saddlebrook',
        sharedWith: [
          {
            idamId: 'u111111',
            firstName: 'Joe',
            lastName: 'Elliott',
            email: 'joe.elliott@woodford.com',
            caseRoles: ['[CLAIMANT]']
          },
          {
            idamId: 'u222222',
            firstName: 'Steve',
            lastName: 'Harrison',
            email: 'steve.harrison@woodford.com',
            caseRoles: ['[CLAIMANT]']
          }
        ]
      });

      // Verify third case has users from different organisation
      expect(sentCases[2].caseTitle).to.equal('Sam Green Vs Williams Lee');
      expect(sentCases[2].sharedWith).to.have.lengthOf(3);
      expect(sentCases[2].sharedWith[0].email).to.include('lambbrooks.com');
      expect(next).to.not.have.been.called;
    });

    it('should handle empty case assignments', async () => {
      const mockCaseAssignments = { case_assignments: [] };
      req = mockReq({
        query: { case_ids: 'case-999' }
      });
      handleGetStub.resolves({ status: 200, data: mockCaseAssignments });

      await getCases(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith([]);
      expect(next).to.not.have.been.called;
    });

    it('should handle cases with no shared users', async () => {
      const mockCaseAssignments = {
        case_assignments: [
          {
            case_id: 'case-123',
            case_title: 'Test Case',
            shared_with: []
          }
        ]
      };

      req = mockReq({
        query: { case_ids: 'case-123' }
      });
      handleGetStub.resolves({ status: 200, data: mockCaseAssignments });

      await getCases(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith([
        {
          caseId: 'case-123',
          caseTitle: 'Test Case',
          sharedWith: []
        }
      ]);
    });

    it('should handle errors and call next', async () => {
      const error = new Error('API Error');
      req = mockReq({
        query: { case_ids: 'case-123' }
      });
      handleGetStub.rejects(error);

      await getCases(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });
  });

  describe('assignCases', () => {
    beforeEach(() => {
      req = mockReq({
        body: {
          sharedCases: []
        }
      });
    });

    it('should successfully share cases using stub data users', async () => {
      // Use real users from stub data
      const joeElliott = testUsers.find((u) => u.idamId === 'u111111');
      const anneDellar = testUsers.find((u) => u.idamId === 'u555555');

      req.body.sharedCases = [
        {
          caseId: testSharedCases[0].caseId,
          caseTypeId: 'Asylum',
          caseTitle: testSharedCases[0].caseTitle,
          sharedWith: [],
          pendingShares: [joeElliott, anneDellar] // Share with users from different orgs
        }
      ];

      sendPostStub.resolves({ status: 201 });

      await assignCases(req, res);

      expect(sendPostStub).to.have.been.calledTwice; // Once for each user

      // Verify first call for Joe Elliott
      const firstCall = sendPostStub.firstCall;
      expect(firstCall.args[0]).to.include('/case-assignments?use_user_token=true');
      expect(firstCall.args[1]).to.deep.equal({
        assignee_id: 'u111111',
        case_id: '1573922332670942',
        case_type_id: 'Asylum'
      });

      // Verify second call for Anne Dellar
      const secondCall = sendPostStub.secondCall;
      expect(secondCall.args[1]).to.deep.equal({
        assignee_id: 'u555555',
        case_id: '1573922332670942',
        case_type_id: 'Asylum'
      });

      expect(res.status).to.have.been.calledWith(201);
      const response = res.send.firstCall.args[0];
      expect(response[0].sharedWith).to.have.lengthOf(2);
      expect(response[0].sharedWith.map((u: UserDetails) => u.idamId)).to.include.members(['u111111', 'u555555']);
      expect(response[0].pendingShares).to.be.empty;
    });

    it('should successfully unshare cases using stub data', async () => {
      // Use a real case that already has shared users
      const existingCase = testSharedCases[1]; // Neha case
      const jamesPriest = existingCase.sharedWith.find((u: any) => u.idamId === 'u333333');

      req.body.sharedCases = [
        {
          caseId: existingCase.caseId,
          caseTitle: existingCase.caseTitle,
          sharedWith: existingCase.sharedWith,
          pendingUnshares: [{
            ...jamesPriest,
            caseRoles: ['[CLAIMANT]', '[SOLICITOR]']
          }]
        }
      ];

      sendDeleteStub.resolves({ status: 204 });

      await assignCases(req, res);

      expect(sendDeleteStub).to.have.been.calledOnce;
      const actualUrl = sendDeleteStub.firstCall.args[0];
      expect(actualUrl).to.include('/case-assignments');

      const expectedUnassignment: UnassignedCaseModel = {
        assignee_id: 'u333333',
        case_id: '1573925439311211',
        case_roles: ['[CLAIMANT]', '[SOLICITOR]']
      };
      expect(sendDeleteStub.firstCall.args[1]).to.deep.equal({
        unassignments: [expectedUnassignment]
      });

      expect(res.status).to.have.been.calledWith(201);
      const response = res.send.firstCall.args[0];

      // James Priest should be removed, only Shaun Coldwell should remain
      expect(response[0].sharedWith).to.have.lengthOf(1);
      expect(response[0].sharedWith[0].idamId).to.equal('u444444');
      expect(response[0].pendingUnshares).to.be.empty;
    });

    it('should handle complex operations with stub data', async () => {
      // Use the third case and mix users from different orgs
      const samGreenCase = testSharedCases[2];
      const kateGrant = samGreenCase.sharedWith.find((u: any) => u.idamId === 'u666666');
      const newUser = testUsers.find((u) => u.idamId === 'u111111'); // Joe from different org

      req.body.sharedCases = [
        {
          caseId: samGreenCase.caseId,
          caseTypeId: 'FT_MultipleAppellantComplex',
          caseTitle: samGreenCase.caseTitle,
          sharedWith: samGreenCase.sharedWith,
          pendingShares: [newUser], // Add Joe Elliott
          pendingUnshares: [{
            ...kateGrant,
            caseRoles: ['[CASEWORKER]']
          }] // Remove Kate Grant
        }
      ];

      sendPostStub.resolves({ status: 201 });
      sendDeleteStub.resolves({ status: 204 });

      await assignCases(req, res);

      expect(sendPostStub).to.have.been.calledOnce;
      expect(sendDeleteStub).to.have.been.calledOnce;

      // Verify share operation
      expect(sendPostStub.firstCall.args[1]).to.deep.equal({
        assignee_id: 'u111111',
        case_id: '1574006431043307',
        case_type_id: 'FT_MultipleAppellantComplex'
      });

      // Verify unshare operation
      expect(sendDeleteStub.firstCall.args[1]).to.deep.equal({
        unassignments: [{
          assignee_id: 'u666666',
          case_id: '1574006431043307',
          case_roles: ['[CASEWORKER]']
        }]
      });

      expect(res.status).to.have.been.calledWith(201);
      const response = res.send.firstCall.args[0];

      // Should have 3 users: original 3 - Kate + Joe = 3
      expect(response[0].sharedWith).to.have.lengthOf(3);
      const userIds = response[0].sharedWith.map((u: UserDetails) => u.idamId);
      expect(userIds).to.include('u111111'); // Joe added
      expect(userIds).to.not.include('u666666'); // Kate removed
      expect(userIds).to.include.members(['u777777', 'u888888']); // Nick and Joel remain
    });

    it('should handle multiple cases using stub data', async () => {
      // Share multiple cases with different users
      const case1 = testSharedCases[0];
      const case2 = testSharedCases[1];
      const lambbrooksUsers = testOrgs[1].users.slice(0, 2); // Anne and Kate

      req.body.sharedCases = [
        {
          caseId: case1.caseId,
          caseTypeId: 'Asylum',
          caseTitle: case1.caseTitle,
          pendingShares: lambbrooksUsers,
          sharedWith: case1.sharedWith
        },
        {
          caseId: case2.caseId,
          caseTypeId: 'Asylum',
          caseTitle: case2.caseTitle,
          pendingShares: [testUsers.find((u) => u.idamId === 'u888888')], // Joel
          sharedWith: case2.sharedWith
        }
      ];

      sendPostStub.resolves({ status: 201 });

      await assignCases(req, res);

      expect(sendPostStub).to.have.been.calledThrice; // 2 for case1, 1 for case2
      expect(res.status).to.have.been.calledWith(201);

      const response = res.send.firstCall.args[0];

      // Verify case 1 now has original 2 + 2 new = 4 users
      expect(response[0].sharedWith).to.have.lengthOf(4);

      // Verify case 2 now has original 2 + 1 new = 3 users
      expect(response[1].sharedWith).to.have.lengthOf(3);
    });

    it('should handle partial failures with stub data', async () => {
      // Try to share with users where one will fail
      const steveHarrison = testUsers.find((u) => u.idamId === 'u222222');
      const jamesPriest = testUsers.find((u) => u.idamId === 'u333333');

      req.body.sharedCases = [
        {
          caseId: testSharedCases[0].caseId,
          caseTypeId: 'Asylum',
          caseTitle: testSharedCases[0].caseTitle,
          sharedWith: testSharedCases[0].sharedWith,
          pendingShares: [steveHarrison, jamesPriest]
        }
      ];

      // Steve succeeds, James fails (simulating he's already assigned)
      sendPostStub.onFirstCall().resolves({ status: 201 });
      sendPostStub.onSecondCall().rejects({
        config: {
          method: 'post',
          data: JSON.stringify({
            assignee_id: 'u333333',
            case_id: '1573922332670942',
            case_type_id: 'Asylum'
          })
        },
        data: {
          status: 409,
          message: 'User already assigned to case'
        }
      });

      await assignCases(req, res);

      expect(sendPostStub).to.have.been.calledTwice;
      expect(res.status).to.have.been.calledWith(201);

      const response = res.send.firstCall.args[0];
      // Original 2 + Steve = 3 users
      expect(response[0].sharedWith).to.have.lengthOf(3);

      // Steve should be added
      const addedUser = response[0].sharedWith.find((u: UserDetails) => u.idamId === 'u222222');
      expect(addedUser).to.exist;
      expect(addedUser.email).to.equal('steve.harrison@woodford.com');

      // James should remain in pendingShares
      expect(response[0].pendingShares).to.have.lengthOf(1);
      expect(response[0].pendingShares[0].idamId).to.equal('u333333');
    });

    it('should handle failure in unshare operation', async () => {
      req.body.sharedCases = [
        {
          caseId: 'case-123',
          sharedWith: [
            {
              idamId: 'user-123',
              caseRoles: ['[CLAIMANT]']
            }
          ],
          pendingUnshares: [
            {
              idamId: 'user-123',
              caseRoles: ['[CLAIMANT]']
            }
          ]
        }
      ];

      sendDeleteStub.rejects({
        config: {
          method: 'delete',
          data: JSON.stringify({
            unassignments: [
              {
                assignee_id: 'user-123',
                case_id: 'case-123',
                case_roles: ['[CLAIMANT]']
              }
            ]
          })
        },
        data: {
          status: 400,
          message: 'Bad Request'
        }
      });

      await assignCases(req, res);

      expect(res.status).to.have.been.calledWith(422);
      // When all operations fail, it returns error messages
      expect(res.send).to.have.been.calledWith([
        'request: {"unassignments":[{"assignee_id":"user-123","case_id":"case-123","case_roles":["[CLAIMANT]"]}]}, response: 400 Bad Request'
      ]);
    });

    it('should return 422 when all operations fail', async () => {
      req.body.sharedCases = [
        {
          caseId: 'case-123',
          caseTypeId: 'type-1',
          pendingShares: [
            { idamId: 'user-123' }
          ]
        }
      ];

      sendPostStub.rejects({
        config: {
          method: 'post',
          data: JSON.stringify({
            assignee_id: 'user-123',
            case_id: 'case-123',
            case_type_id: 'type-1'
          })
        },
        data: {
          status: 400,
          message: 'Bad Request'
        }
      });

      await assignCases(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.send).to.have.been.calledWith([
        'request: {"assignee_id":"user-123","case_id":"case-123","case_type_id":"type-1"}, response: 400 Bad Request'
      ]);
    });

    it('should handle cases with no pending operations', async () => {
      req.body.sharedCases = [
        {
          caseId: 'case-123',
          caseTitle: 'Test Case',
          sharedWith: [
            {
              idamId: 'user-123',
              firstName: 'John',
              lastName: 'Doe'
            }
          ]
        }
      ];

      await assignCases(req, res);

      expect(sendPostStub).to.not.have.been.called;
      expect(sendDeleteStub).to.not.have.been.called;
      expect(res.status).to.have.been.calledWith(422);
      expect(res.send).to.have.been.calledWith([]);
    });

    it('should handle empty shared cases array', async () => {
      req.body.sharedCases = [];

      await assignCases(req, res);

      expect(sendPostStub).to.not.have.been.called;
      expect(sendDeleteStub).to.not.have.been.called;
      expect(res.status).to.have.been.calledWith(422);
      expect(res.send).to.have.been.calledWith([]);
    });

    it('should handle null or undefined arrays in shared cases', async () => {
      req.body.sharedCases = [
        {
          caseId: 'case-123',
          sharedWith: null,
          pendingShares: undefined,
          pendingUnshares: null
        }
      ];

      await assignCases(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.send).to.have.been.calledWith([]);
    });

    it('should preserve other properties in shared cases', async () => {
      req.body.sharedCases = [
        {
          caseId: 'case-123',
          caseTypeId: 'type-1',
          caseTitle: 'Test Case',
          customProperty: 'custom value',
          sharedWith: [],
          pendingShares: [
            { idamId: 'user-123' }
          ]
        }
      ];

      sendPostStub.resolves({ status: 201 });

      await assignCases(req, res);

      expect(res.send).to.have.been.calledOnce;
      const sentData = res.send.getCall(0).args[0];
      expect(sentData[0]).to.have.property('customProperty', 'custom value');
    });

    it('should validate CaseAssigneeMappingModel structure in share operations', async () => {
      const inputCase: SharedCase = {
        caseId: 'case-123',
        caseTitle: 'Test Case',
        caseTypeId: 'FT_Caveat',
        sharedWith: [],
        pendingShares: [
          {
            idamId: 'user-123',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com'
          }
        ]
      };

      req.body.sharedCases = [inputCase];
      sendPostStub.resolves({ status: 201 });

      await assignCases(req, res);

      const payload = sendPostStub.firstCall.args[1];
      // Verify only required fields are sent to API
      expect(payload).to.have.all.keys('assignee_id', 'case_id', 'case_type_id');
      expect(payload).to.not.have.property('firstName');
      expect(payload).to.not.have.property('email');
    });

    it('should handle cross-organisation sharing scenarios', async () => {
      // Test sharing cases across different organisations using stub data
      const woodfordCase = testSharedCases[0]; // Currently shared with Woodford users
      const lambbrooksUsers = testOrgs[1].users; // All Lambbrooks users

      req.body.sharedCases = [
        {
          caseId: woodfordCase.caseId,
          caseTypeId: 'Asylum',
          caseTitle: woodfordCase.caseTitle,
          pendingShares: lambbrooksUsers, // Share with all 4 Lambbrooks users
          sharedWith: woodfordCase.sharedWith
        }
      ];

      // All 4 Lambbrooks users succeed
      sendPostStub.resolves({ status: 201 });

      await assignCases(req, res);

      expect(sendPostStub).to.have.callCount(4); // One for each Lambbrooks user
      expect(res.status).to.have.been.calledWith(201);

      const response = res.send.firstCall.args[0];
      // Original 2 Woodford + 4 Lambbrooks = 6 users
      expect(response[0].sharedWith).to.have.lengthOf(6);

      // Verify mix of organisations
      const emails = response[0].sharedWith.map((u: UserDetails) => u.email);
      const woodfordEmails = emails.filter((e: string) => e.includes('woodford.com'));
      const lambbrooksEmails = emails.filter((e: string) => e.includes('lambbrooks.com'));

      expect(woodfordEmails).to.have.lengthOf(2);
      expect(lambbrooksEmails).to.have.lengthOf(4);

      // Verify specific users
      expect(emails).to.include.members([
        'anne.deller@lambbrooks.com',
        'kate.grant@lambbrooks.com',
        'nick.rodrigues@lambbrooks.com',
        'joel.molloy@lambbrooks.com'
      ]);
    });

    it('should use correct configuration value for CCD URL', async () => {
      req.body.sharedCases = [{
        caseId: 'case-123',
        pendingShares: [{ idamId: 'user-123' }]
      }];

      sendPostStub.resolves({ status: 201 });

      await assignCases(req, res);

      // Verify the URL is constructed correctly
      const actualUrl = sendPostStub.firstCall.args[0];
      expect(actualUrl).to.include('/case-assignments?use_user_token=true');

      // The configuration should have been called during module import
      const configCalls = getConfigValueStub.getCalls().map((call) => call.args[0]);
      expect(configCalls).to.include('services.ccd.caseAssignmentApi');
    });
  });
});
