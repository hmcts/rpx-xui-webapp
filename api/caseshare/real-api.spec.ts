import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as crudService from '../common/crudService';
import * as configuration from '../configuration';

chai.use(sinonChai);

describe('Case Share Real API', () => {
  let sandbox: sinon.SinonSandbox;
  let req: any;
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
    // Clear the module cache to ensure fresh import
    delete require.cache[require.resolve('./real-api')];
    
    // Set up stubs before importing the module
    sandbox = sinon.createSandbox();
    getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
    getConfigValueStub.returns('http://default-api'); // Default return value
    
    // Import the module after stubbing
    const realApi = require('./real-api');
    getUsers = realApi.getUsers;
    getCases = realApi.getCases;
    assignCases = realApi.assignCases;
  });

  after(() => {
    sandbox.restore();
    // Clear the module cache
    delete require.cache[require.resolve('./real-api')];
  });

  beforeEach(() => {
    next = sandbox.stub();
    res = mockRes();
    
    // Reset stubs
    getConfigValueStub.resetHistory();
    
    // Stub CRUD service methods
    handleGetStub = sandbox.stub(crudService, 'handleGet');
    sendPostStub = sandbox.stub(crudService, 'sendPost');
    sendDeleteStub = sandbox.stub(crudService, 'sendDelete');
  });

  afterEach(() => {
    // Clean up CRUD service stubs
    handleGetStub?.restore();
    sendPostStub?.restore();
    sendDeleteStub?.restore();
  });

  describe('getUsers', () => {
    it('should successfully fetch and transform users', async () => {
      const mockPrdUsers = {
        users: [
          {
            email: 'user1@example.com',
            firstName: 'John',
            lastName: 'Doe',
            userIdentifier: 'user-123'
          },
          {
            email: 'user2@example.com',
            firstName: 'Jane',
            lastName: 'Smith',
            userIdentifier: 'user-456'
          }
        ]
      };

      req = mockReq({});
      handleGetStub.resolves({ status: 200, data: mockPrdUsers });

      await getUsers(req, res, next);

      expect(handleGetStub).to.have.been.calledOnce;
      const actualUrl = handleGetStub.firstCall.args[0];
      expect(actualUrl).to.include('/refdata/external/v1/organisations/users?returnRoles=false&status=active');

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith([
        {
          email: 'user1@example.com',
          firstName: 'John',
          lastName: 'Doe',
          idamId: 'user-123'
        },
        {
          email: 'user2@example.com',
          firstName: 'Jane',
          lastName: 'Smith',
          idamId: 'user-456'
        }
      ]);
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
  });

  describe('getCases', () => {
    it('should successfully fetch and transform case assignments', async () => {
      const mockCaseAssignments = {
        case_assignments: [
          {
            case_id: 'case-123',
            case_title: 'Test Case 1',
            shared_with: [
              {
                idam_id: 'user-123',
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@example.com',
                case_roles: ['[CLAIMANT]']
              }
            ]
          },
          {
            case_id: 'case-456',
            case_title: 'Test Case 2',
            shared_with: [
              {
                idam_id: 'user-456',
                first_name: 'Jane',
                last_name: 'Smith',
                email: 'jane@example.com',
                case_roles: ['[DEFENDANT]']
              },
              {
                idam_id: 'user-789',
                first_name: 'Bob',
                last_name: 'Johnson',
                email: 'bob@example.com',
                case_roles: ['[SOLICITOR]']
              }
            ]
          }
        ]
      };

      req = mockReq({
        query: { case_ids: 'case-123,case-456' }
      });
      handleGetStub.resolves({ status: 200, data: mockCaseAssignments });

      await getCases(req, res, next);

      expect(handleGetStub).to.have.been.calledOnce;
      const actualUrl = handleGetStub.firstCall.args[0];
      expect(actualUrl).to.include('/case-assignments?case_ids=case-123,case-456');

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith([
        {
          caseId: 'case-123',
          caseTitle: 'Test Case 1',
          sharedWith: [
            {
              idamId: 'user-123',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@example.com',
              caseRoles: ['[CLAIMANT]']
            }
          ]
        },
        {
          caseId: 'case-456',
          caseTitle: 'Test Case 2',
          sharedWith: [
            {
              idamId: 'user-456',
              firstName: 'Jane',
              lastName: 'Smith',
              email: 'jane@example.com',
              caseRoles: ['[DEFENDANT]']
            },
            {
              idamId: 'user-789',
              firstName: 'Bob',
              lastName: 'Johnson',
              email: 'bob@example.com',
              caseRoles: ['[SOLICITOR]']
            }
          ]
        }
      ]);
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

    it('should successfully share cases with pending shares', async () => {
      req.body.sharedCases = [
        {
          caseId: 'case-123',
          caseTypeId: 'type-1',
          caseTitle: 'Test Case',
          sharedWith: [],
          pendingShares: [
            {
              idamId: 'user-123',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@example.com'
            }
          ]
        }
      ];

      sendPostStub.resolves({ status: 201 });

      await assignCases(req, res);

      expect(sendPostStub).to.have.been.calledOnce;
      const actualUrl = sendPostStub.firstCall.args[0];
      expect(actualUrl).to.include('/case-assignments?use_user_token=true');
      expect(sendPostStub.firstCall.args[1]).to.deep.equal({
        assignee_id: 'user-123',
        case_id: 'case-123',
        case_type_id: 'type-1'
      });

      expect(res.status).to.have.been.calledWith(201);
      expect(res.send).to.have.been.calledWith([
        {
          caseId: 'case-123',
          caseTypeId: 'type-1',
          caseTitle: 'Test Case',
          sharedWith: [
            {
              idamId: 'user-123',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@example.com'
            }
          ],
          pendingShares: []
        }
      ]);
    });

    it('should successfully unshare cases with pending unshares', async () => {
      req.body.sharedCases = [
        {
          caseId: 'case-123',
          caseTitle: 'Test Case',
          sharedWith: [
            {
              idamId: 'user-123',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@example.com',
              caseRoles: ['[CLAIMANT]']
            }
          ],
          pendingUnshares: [
            {
              idamId: 'user-123',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@example.com',
              caseRoles: ['[CLAIMANT]']
            }
          ]
        }
      ];

      sendDeleteStub.resolves({ status: 204 });

      await assignCases(req, res);

      expect(sendDeleteStub).to.have.been.calledOnce;
      const actualUrl = sendDeleteStub.firstCall.args[0];
      expect(actualUrl).to.include('/case-assignments');
      expect(sendDeleteStub.firstCall.args[1]).to.deep.equal({
        unassignments: [
          {
            assignee_id: 'user-123',
            case_id: 'case-123',
            case_roles: ['[CLAIMANT]']
          }
        ]
      });

      expect(res.status).to.have.been.calledWith(201);
      expect(res.send).to.have.been.calledWith([
        {
          caseId: 'case-123',
          caseTitle: 'Test Case',
          sharedWith: [],
          pendingShares: [],
          pendingUnshares: []
        }
      ]);
    });

    it('should handle both share and unshare operations', async () => {
      req.body.sharedCases = [
        {
          caseId: 'case-123',
          caseTypeId: 'type-1',
          caseTitle: 'Test Case',
          sharedWith: [
            {
              idamId: 'user-456',
              firstName: 'Jane',
              lastName: 'Smith',
              email: 'jane@example.com',
              caseRoles: ['[SOLICITOR]']
            }
          ],
          pendingShares: [
            {
              idamId: 'user-123',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@example.com'
            }
          ],
          pendingUnshares: [
            {
              idamId: 'user-456',
              firstName: 'Jane',
              lastName: 'Smith',
              email: 'jane@example.com',
              caseRoles: ['[SOLICITOR]']
            }
          ]
        }
      ];

      sendPostStub.resolves({ status: 201 });
      sendDeleteStub.resolves({ status: 204 });

      await assignCases(req, res);

      expect(sendPostStub).to.have.been.calledOnce;
      expect(sendDeleteStub).to.have.been.calledOnce;
      expect(res.status).to.have.been.calledWith(201);
      expect(res.send).to.have.been.calledWith([
        {
          caseId: 'case-123',
          caseTypeId: 'type-1',
          caseTitle: 'Test Case',
          sharedWith: [
            {
              idamId: 'user-123',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@example.com'
            }
          ],
          pendingShares: [],
          pendingUnshares: []
        }
      ]);
    });

    it('should handle multiple cases with multiple users', async () => {
      req.body.sharedCases = [
        {
          caseId: 'case-123',
          caseTypeId: 'type-1',
          pendingShares: [
            { idamId: 'user-1' },
            { idamId: 'user-2' }
          ]
        },
        {
          caseId: 'case-456',
          caseTypeId: 'type-2',
          pendingShares: [
            { idamId: 'user-3' }
          ]
        }
      ];

      sendPostStub.resolves({ status: 201 });

      await assignCases(req, res);

      expect(sendPostStub).to.have.been.calledThrice;
      expect(res.status).to.have.been.calledWith(201);
    });

    it('should handle partial failures in share operations', async () => {
      req.body.sharedCases = [
        {
          caseId: 'case-123',
          caseTypeId: 'type-1',
          caseTitle: 'Test Case',
          sharedWith: [],
          pendingShares: [
            {
              idamId: 'user-123',
              firstName: 'John',
              lastName: 'Doe'
            },
            {
              idamId: 'user-456',
              firstName: 'Jane',
              lastName: 'Smith'
            }
          ]
        }
      ];

      // First share succeeds, second fails
      sendPostStub.onFirstCall().resolves({ status: 201 });
      sendPostStub.onSecondCall().rejects({
        config: {
          method: 'post',
          data: JSON.stringify({
            assignee_id: 'user-456',
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

      expect(sendPostStub).to.have.been.calledTwice;
      expect(res.status).to.have.been.calledWith(201);
      expect(res.send).to.have.been.calledWith([
        {
          caseId: 'case-123',
          caseTypeId: 'type-1',
          caseTitle: 'Test Case',
          sharedWith: [
            {
              idamId: 'user-123',
              firstName: 'John',
              lastName: 'Doe'
            }
          ],
          pendingShares: [
            {
              idamId: 'user-456',
              firstName: 'Jane',
              lastName: 'Smith'
            }
          ]
        }
      ]);
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
  });
});