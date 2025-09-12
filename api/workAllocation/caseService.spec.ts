import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { http } from '../lib/http';
import { handleCaseGet, handleCasePost, handleCaseSearch } from './caseService';

chai.use(sinonChai);
describe('workAllocation.caseService', () => {
  let sandbox: sinon.SinonSandbox;
  let spy: any;
  const res = mockRes({ status: 200, data: 'ok' });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('handleCaseGet', () => {
    it('should make a get request', async () => {
      spy = sandbox.stub(http, 'get').resolves(res);
      const path = '/case/123456';
      const req = mockReq();
      const response = await handleCaseGet(path, req);
      expect(response).to.equal('ok'); // Returns just the data.
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(path); // Correct url.
    });
  });

  describe('handleCaseSearch', () => {
    it('should make a post request', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const path = '/case';
      const payload = { search: 'criteria' };
      const req = mockReq();
      const response = await handleCaseSearch(path, payload, req);
      expect(response).to.be.an('object'); // Returns the entire response.
      expect(response.data).to.equal('ok');
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(path); // Correct url.
      expect(args[1]).to.equal(payload); // Correct search criteria posted.
    });
  });

  describe('handleCasePost', () => {
    it('should make a post request', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const path = '/case/123456/assign';
      const payload = { assignee: { name: 'bob', id: 2 } };
      const req = mockReq();
      const response = await handleCasePost(path, payload, req);
      expect(response).to.be.an('object'); // Returns the entire response.
      expect(response.data).to.equal('ok');
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(path); // Correct url.
      expect(args[1]).to.equal(payload); // Correct search criteria posted.
    });
  });

  describe('filterAllWorkCases', () => {
    const mockCases = [
      { id: 1, role: 'Lead Judge', status: 'Open', caseType: 'A' },
      { id: 2, role: 'Hearing Judge', status: 'Closed', caseType: 'B' },
      { id: 3, role: 'Case Manager', status: 'Open', caseType: 'A' },
      { id: 4, role: 'Other', status: 'Open', caseType: 'C' }
    ];

    it('should return all cases if parameters is null', () => {
      const result = require('./caseService').filterAllWorkCases(mockCases, null);
      expect(result).to.deep.equal(mockCases);
    });

    it('should return all cases if parameters is undefined', () => {
      const result = require('./caseService').filterAllWorkCases(mockCases, undefined);
      expect(result).to.deep.equal(mockCases);
    });

    it('should return all cases if parameters is empty array', () => {
      const result = require('./caseService').filterAllWorkCases(mockCases, []);
      expect(result).to.deep.equal(mockCases);
    });

    it('should filter by value for a non-role key', () => {
      const params = [{ key: 'status', values: 'Open' }];
      const result = require('./caseService').filterAllWorkCases(mockCases, params);
      expect(result).to.deep.equal([
        mockCases[0],
        mockCases[2],
        mockCases[3]
      ]);
    });

    it('should filter by role = Judicial (Lead Judge or Hearing Judge)', () => {
      const params = [{ key: 'role', values: 'Judicial' }];
      const result = require('./caseService').filterAllWorkCases(mockCases, params);
      expect(result).to.deep.equal([
        mockCases[0],
        mockCases[1]
      ]);
    });

    it('should filter by role = Case Manager', () => {
      const params = [{ key: 'role', values: 'Case Manager' }];
      const result = require('./caseService').filterAllWorkCases(mockCases, params);
      expect(result).to.deep.equal([
        mockCases[2]
      ]);
    });

    it('should return all cases if parameter value is falsy', () => {
      const params = [{ key: 'status', values: '' }];
      const result = require('./caseService').filterAllWorkCases(mockCases, params);
      expect(result).to.deep.equal(mockCases);
    });

    it('should filter by multiple parameters (AND logic)', () => {
      const params = [
        { key: 'status', values: 'Open' },
        { key: 'caseType', values: 'A' }
      ];
      const result = require('./caseService').filterAllWorkCases(mockCases, params);
      expect(result).to.deep.equal([
        mockCases[0],
        mockCases[2]
      ]);
    });

    it('should return empty array if no cases match', () => {
      const params = [{ key: 'status', values: 'Nonexistent' }];
      const result = require('./caseService').filterAllWorkCases(mockCases, params);
      expect(result).to.deep.equal([]);
    });

    it('should handle parameters with undefined values', () => {
      const params = [{ key: 'status', values: undefined }];
      const result = require('./caseService').filterAllWorkCases(mockCases, params);
      expect(result).to.deep.equal(mockCases);
    });
  });
});
