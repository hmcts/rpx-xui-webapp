import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { orchestrationSpecificAccessRequest, postCreateTask } from '.';

chai.use(sinonChai);
describe('postCreateTask', () => {

  let sandbox: sinon.SinonSandbox;
  let req: EnhancedRequest;
  let next ;
  let spy: sinon.SinonSpy;
  const data = {
    status: 204,
    statusText: 'No Content',
    data:'',
    duration: 2496
  };
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq({
      body: {},
    });
    next = sandbox.stub();
    spy = sandbox.stub(http, 'post').resolves({
      data,
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should create task successfully', async () => {
    const createTask= { caseId: '101', jurisdiction: 'IA', caseType: 'caseType', taskType: 'access_requests', dueDate: '2022-06-30T16:53:10+0100', name: 'name' }
    const response = await postCreateTask(req, next, createTask);
    expect(response.data).to.deep.equal(data);
  });
});

describe('orchestrationSpecificAccessRequest', () => {
  let sandbox: sinon.SinonSandbox;
  let res;
  let req;
  let next;
  const data = {
    roleAssignmentResponse: {
      roleRequest: {
        id: '37cb4517-20b7-4709-adea-472986e78088',
        authenticatedUserId: '45bcb0e5-9ad6-4561-b6c9-5e14c9b07536',
        correlationId: 'dec7ca0c-b6d8-4b43-a855-018f766321a4',
        assignerId: '45bcb0e5-9ad6-4561-b6c9-5e14c9b07536',
        requestType: 'CREATE',
        process: 'specific-access',
        reference: '1651667946523483/specific-access-admin/45bcb0e5-9ad6-4561-b6c9-5e14c9b07536',
        replaceExisting: true,
        status: 'APPROVED',
        created: '2022-05-10T10:59:01.308613Z',
        log: 'Request has been approved',
        byPassOrgDroolRule: true
      },
      requestedRoles: [{
        attributes: {
          caseId:101,
          jurisdiction: 'jurisdiction',
          caseType: 'caseType'
        }
      }]
    }
  };
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    res = mockRes()
    req = mockReq({
       params: {}
    });
    next = sandbox.stub();
    const postSpy =sandbox.stub(http, 'post');
    postSpy.onCall(0).resolves({
      data,status:201
    });
    postSpy.onCall(1).resolves({
      data,status:204
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call orchestrationSpecificAccessRequest successfully', async () => {
    await orchestrationSpecificAccessRequest(req, res, next);
    expect(res.send).to.have.been.calledWith(sinon.match(data));
  });
});

