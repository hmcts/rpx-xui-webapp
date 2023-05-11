import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { http } from '../lib/http';
import {
  handleCaseWorkerDetails,
  handleCaseWorkerForLocation,
  handleCaseWorkerForLocationAndService,
  handleCaseWorkerForService,
  handleCaseWorkerGetAll
} from './caseWorkerService';

chai.use(sinonChai);

describe('Location Service', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('caseworkerService', () => {
    it('should make a get request', async () => {
      const mockCaseworkers = [{}, {}, {}];
      const res = mockRes({ status: 200, data: mockCaseworkers });
      sandbox.stub(http, 'get').resolves(res);
      const path = '/getCaseWorkers';
      const req = mockReq();
      const data = await handleCaseWorkerGetAll(path, req);
      expect(data).to.equal(mockCaseworkers);
    });

    it('get caseworkers for Location', async () => {
      const mockCaseworkers = [{}, {}];
      const res = mockRes({ status: 200, data: mockCaseworkers });
      sandbox.stub(http, 'get').resolves(res);
      const path = '/getCaseWorkersForLocation';
      const req = mockReq();
      const data = await handleCaseWorkerForLocation(path, req);
      expect(data).to.equal(mockCaseworkers);
    });

    it('get caseworkers for Service', async () => {
      const mockCaseworkers = [{}];
      const res = mockRes({ status: 200, data: mockCaseworkers });
      sandbox.stub(http, 'get').resolves(res);
      const path = '/getCaseWorkersForService';
      const req = mockReq();
      const data = await handleCaseWorkerForService(path, req);
      expect(data).to.equal(mockCaseworkers);
    });

    it('handle CaseWorker For Location And Service', async () => {
      const mockCaseworkers = [{}];
      const res = mockRes({ status: 200, data: mockCaseworkers });
      sandbox.stub(http, 'get').resolves(res);
      const path = '/handleCaseWorkerForLocationAndService';
      const req = mockReq();
      const data = await handleCaseWorkerForLocationAndService(path, req);
      expect(data).to.equal(mockCaseworkers);
    });

    it('handle Case Worker Details', async () => {
      const mockCaseworkers = [{}];
      const res = mockRes({ status: 200, data: mockCaseworkers });
      sandbox.stub(http, 'get').resolves(res);
      const path = '/handleCaseWorkerDetails';
      const req = mockReq();
      const data = await handleCaseWorkerDetails(path, req);
      expect(data).to.equal(mockCaseworkers);
    });
  });
});
