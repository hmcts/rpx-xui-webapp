import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { getCases, getMyCases, getUsersByServiceName, postTaskSearchForCompletable, searchTask } from './index';
import * as router from './routes';

const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('workAllocation.routes', () => {
  let sandbox: sinon.SinonSandbox;
  let next: sinon.SinonSpy;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.spy();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('is instantiated', () => {
    expect(router).to.be.an('object');
  });

  describe('malformed payload validation', () => {
    it('returns 400 for POST /workallocation/task when searchRequest is missing', async () => {
      const req = mockReq({ body: {} });
      const res = mockRes();

      await searchTask(req as any, res as any, next as any);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.send).to.have.been.calledWith({
        code: 'WA_INVALID_REQUEST_BODY',
        message: 'Invalid request payload: searchRequest object is required',
      });
      expect(next).not.to.have.been.called;
    });

    it('returns 400 for POST /workallocation/searchForCompletable when jurisdiction is invalid', async () => {
      const req = mockReq({
        body: {
          searchRequest: {
            ccdId: '1234567890123456',
            jurisdiction: '',
            caseTypeId: 'Asylum',
            eventId: 'submit',
          },
        },
      });
      const res = mockRes();

      await postTaskSearchForCompletable(req as any, res as any, next as any);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.send).to.have.been.calledWith({
        code: 'WA_INVALID_REQUEST_BODY',
        message: 'Invalid request payload: searchRequest.jurisdiction must be a non-empty string',
      });
      expect(next).not.to.have.been.called;
    });

    it('returns 400 for POST /workallocation/my-work/cases when search_parameters is missing', async () => {
      const req = mockReq({
        body: {
          searchRequest: {},
        },
      });
      const res = mockRes();

      await getMyCases(req as any, res as any);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.send).to.have.been.calledWith({
        code: 'WA_INVALID_REQUEST_BODY',
        message: 'Invalid request payload: searchRequest.search_parameters must be an array',
      });
    });

    it('returns 400 for POST /workallocation/all-work/cases when searchRequest is missing', async () => {
      const req = mockReq({ body: null });
      const res = mockRes();

      await getCases(req as any, res as any, next as any);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.send).to.have.been.calledWith({
        code: 'WA_INVALID_REQUEST_BODY',
        message: 'Invalid request payload: searchRequest object is required',
      });
      expect(next).not.to.have.been.called;
    });

    it('returns 400 for POST /workallocation/caseworker/getUsersByServiceName when services is invalid', async () => {
      const req = mockReq({
        body: {
          term: 'john',
          services: 'IA',
        },
      });
      const res = mockRes();

      await getUsersByServiceName(req as any, res as any, next as any);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.send).to.have.been.calledWith({
        code: 'WA_INVALID_REQUEST_BODY',
        message: 'Invalid request payload: services must be an array',
      });
      expect(next).not.to.have.been.called;
    });
  });
});
