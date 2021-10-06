import 'mocha';

import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';

import { http } from '../lib/http';
import { confirmUserExclusion, deleteUserExclusion, findExclusionsForCaseId, getRequestPayload } from './exclusionService';

chai.use(sinonChai);
describe('exclusions.exclusionService', () => {

  let sandbox: sinon.SinonSandbox;
  let spy: any;
  let res: any;
  let next: any;
  const SUCCESS_RESPONSE = { status: {}, data: 'ok' };
  const exampleRoleExclusion = {
    id: '123',
    added: Date.UTC(2021, 7, 1),
    name: 'Judge Birch',
    notes: 'this case been remitted from Upper Tribunal and required different judge',
    type: 'Other',
    userType: 'Judicial',
  };
  const exampleMultiRoleExclusions = [
    {
      id: '123',
      added: Date.UTC(2021, 7, 1),
      name: 'Judge Birch',
      notes: 'this case been remitted from Upper Tribunal and required different judge',
      type: 'Other',
      userType: 'Judicial',
    },
    {
      id: '234',
      added: Date.UTC(2021, 7, 10),
      name: 'Judge test',
      notes: 'this case been remitted from Upper Tribunal and required different judge',
      type: 'Other',
      userType: 'Judicial',
    },
  ];
  const confirmRoleExclusion = {
    added: Date.UTC(2021, 7, 1),
    name: 'Judge ABCDE',
    notes: 'this case been remitted from Upper Tribunal and required different judge',
    type: 'Other',
    userType: 'Judicial',
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

    it('should make a getRequestPayload', async () => {
      const requestPayload = getRequestPayload('1234567891234567', 'Asylum', 'IA');
      expect(requestPayload.queryRequests.length).to.equal(1);
      expect(requestPayload.queryRequests[0].grantType[0]).to.equal('EXCLUDED');
      expect(requestPayload.queryRequests[0].attributes.caseId[0]).to.equal('1234567891234567');
      expect(requestPayload.queryRequests[0].attributes.jurisdiction[0]).to.equal('Asylum');
      expect(requestPayload.queryRequests[0].attributes.caseType[0]).to.equal('IA');
    });
  });

  describe('confirmUserExclusion', () => {

    it('should confirm successfully', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const req = mockReq({});
      let response = mockRes();
      await confirmUserExclusion(req, response, next);

      // Should have received the HTTP response. The confirm simply sends the data
      expect(response.send).to.have.been.calledWith(sinon.match([confirmRoleExclusion]));

      const nonJudgeReq = mockReq({
        body: {
          exclusionDescription: '400',
          roleExclusion: exampleRoleExclusion,
        },
      });
      response = mockRes();
      await confirmUserExclusion(nonJudgeReq, response, next);
      // The confirm simply returns the error data.
      expect(response.send).to.have.been.calledWith(sinon.match('{status: 400}'));
    });

  });

  describe('deleteUserExclusion', () => {

    it('should delete successfully', async () => {
      spy = sandbox.stub(http, 'delete').resolves(res);
      const req = mockReq({
        body: {roleExclusion: exampleRoleExclusion},
      });
      const response = mockRes();
      await deleteUserExclusion(req, response, next);

      // Should have received the HTTP response. The delete simply sends the data
      expect(response.send).to.have.been.calledWith(sinon.match(exampleRoleExclusion));
    });

  });

});
