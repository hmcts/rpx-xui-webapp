import 'mocha';

import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';

import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import {
  confirmUserExclusion,
  deleteUserExclusion,
  getExclusionRequestPayload,
  mapResponseToExclusions } from './exclusionService';

chai.use(sinonChai);
describe('exclusions.exclusionService', () => {

  let sandbox: sinon.SinonSandbox;
  let spy: any;
  let res: any;
  let next: any;
  const SUCCESS_RESPONSE = { status: {}, data: 'ok' };
  const exampleRoleExclusion = {
    added: Date.UTC(2021, 7, 1),
    id: '123',
    name: 'Judge Birch',
    notes: 'this case been remitted from Upper Tribunal and required different judge',
    type: 'Other',
    userType: 'Judicial',
  };
  const exampleMultiRoleExclusions = [
    {
      added: Date.UTC(2021, 7, 1),
      id: '123',
      name: 'Judge Birch',
      notes: 'this case been remitted from Upper Tribunal and required different judge',
      type: 'Other',
      userType: 'Judicial',
    },
    {
      added: Date.UTC(2021, 7, 10),
      id: '234',
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

    it('should make a getExclusionRequestPayload', async () => {
      const requestPayload = getExclusionRequestPayload('1234567891234567', 'Asylum', 'IA');
      expect(requestPayload.queryRequests.length).to.equal(1);
      expect(requestPayload.queryRequests[0].grantType[0]).to.equal('EXCLUDED');
      expect(requestPayload.queryRequests[0].attributes.caseId[0]).to.equal('1234567891234567');
      expect(requestPayload.queryRequests[0].attributes.jurisdiction[0]).to.equal('Asylum');
      expect(requestPayload.queryRequests[0].attributes.caseType[0]).to.equal('IA');
    });

    it('mapResponseToExclusions with blank array', () => {
      const result = mapResponseToExclusions([], null, null);
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
          primaryLocation: 'loc123',
          region: 'region1',
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
        roleType: 'roleType',
      }];
      const req = {
        session: {
          caseworkers: [
            {
              firstName: 'John',
              idamId: 'actorId',
              lastName: 'Priest',
            },
          ],
          roleAssignments: [],
        },
      } as unknown as EnhancedRequest;
      const result = mapResponseToExclusions(exclusions, null, req);
      expect(result.length).to.equal(1);
      expect(result[0].id).to.equal('123');
      expect(result[0].name).to.equal('John-Priest');
      expect(result[0].added.getFullYear()).to.equal(2020);
      expect(result[0].added.getMonth()).to.equal(11);
      expect(result[0].added.getDate()).to.equal(20);
      expect(result[0].userType).to.equal('roleCategory');
      expect(result[0].type).to.equal('roleType');
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
