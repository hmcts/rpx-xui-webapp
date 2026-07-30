import { expect } from 'chai';
import config = require('config');
import { NextFunction } from 'express';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactV3TestSetup } from '../settings/provider.mock';
import { getCaseAssignmentAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';

const { MatchersV3: Matchers } = require('@pact-foundation/pact');
const { integer, string } = Matchers;
const pactSetUp = new PactV3TestSetup({ provider: 'acc_manageCaseAssignment', port: 8000 });

describe('Post Cases from CaseAssignment Api', () => {
  const sandbox: sinon.SinonSandbox = sinon.createSandbox();
  afterEach(() => {
    sinon.reset();
    sandbox.restore();
  });

  const mockRequest = {
    sharedCases: [
      {
        caseId: '1583841721773828',
        caseTypeId: 'PROBATE',
        caseTitle: 'A case title',
        sharedWith: [],
        pendingShares: [
          {
            idamId: '0a5874a4-3f38-4bbd-ba4c',
            firstName: 'Bill',
            lastName: 'Roberts',
            email: 'bill.roberts@greatbrsolicitors.co.uk',
            caseRoles: [],
          },
        ],
      },
    ],
  };

const pactRequest = {
  case_type_id: string('PROBATE'),
  case_id: string('1583841721773828'),
  assignee_id: string('0a5874a4-3f38-4bbd-ba4c'),
};

const pactErrorResponse = {
  status: integer(400),
  message: string('Bad Request'),
};

  function setUpMockConfigForFunction(url: string) {
    const configValues = getCaseAssignmentAPIOverrides(url);
    sandbox.stub(Object.getPrototypeOf(config), 'get').callsFake((prop: string) => configValues[prop]);
    return requireReloaded('../../../../caseshare/real-api').assignCases;
  }

  describe('When Cases are assigned to Users', () => {
    before(async () => {
      pactSetUp.provider
        .given('Assign a user to a case')
        .uponReceiving('a valid request for that case to be assigned')
        .withRequest({
          method: 'POST',
          path: '/case-assignments',
          query: { use_user_token: 'true' },
          headers: {
            'Content-Type': 'application/json',
            ServiceAuthorization: 'ServiceAuthToken',
            Authorization: 'Bearer some-access-token',
          },
          body: pactRequest,
        })
        .willRespondWith({
          status: 201,
        });
    });

    it('Returns CaseAssignments Response', async () => {
      return pactSetUp.provider.executeTest(async (mockServer) => {
        const assignCases = setUpMockConfigForFunction(mockServer.url);
        const req = mockReq({
          headers: {
            Authorization: 'Bearer some-access-token',
            ServiceAuthorization: 'ServiceAuthToken',
            'content-type': 'application/json',
          },
          body: mockRequest,
        });
        const response = mockRes();
        let returnedResponse = null;
        let returnedStatus = null;
        response.status = (status) => {
          returnedStatus = status;
          return response;
        };
        response.send = (ret) => {
          returnedResponse = ret;
        };

        await assignCases(req, response, sandbox.spy() as NextFunction);
        expect(returnedStatus).to.be.equal(201);
        assertCaseAssignmentResponses(returnedResponse);
      });
    });
  });

  describe('When assigning a case fails', () => {
    before(async () => {
      pactSetUp.provider
        .given('The user cannot be assigned to the case')
        .uponReceiving('an invalid request to assign that case')
        .withRequest({
          method: 'POST',
          path: '/case-assignments',
          query: { use_user_token: 'true' },
          headers: {
            'Content-Type': 'application/json',
            ServiceAuthorization: 'ServiceAuthToken',
            Authorization: 'Bearer some-access-token',
          },
          body: pactRequest,
        })
        .willRespondWith({
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
          body: pactErrorResponse,
        });
    });

    it('Returns an error response when the case cannot be assigned', async () => {
      return pactSetUp.provider.executeTest(async (mockServer) => {
        const assignCases = setUpMockConfigForFunction(mockServer.url);
        const req = mockReq({
          headers: {
            Authorization: 'Bearer some-access-token',
            ServiceAuthorization: 'ServiceAuthToken',
            'content-type': 'application/json',
          },
          body: mockRequest,
        });
        const response = mockRes();
        let returnedResponse = null;
        let returnedStatus = null;
        response.status = (status) => {
          returnedStatus = status;
          return response;
        };
        response.send = (ret) => {
          returnedResponse = ret;
        };

        await assignCases(req, response);

        expect(returnedStatus).to.be.equal(422);
        assertCaseAssignmentErrorResponse(returnedResponse);
      });
    });
  });
});

function assertCaseAssignmentResponses(response: any) {
  expect(response[0].caseId).to.be.equal('1583841721773828');
  expect(response[0].caseTitle).to.be.equal('A case title');
  expect(response[0].sharedWith[0].idamId).to.be.equal('0a5874a4-3f38-4bbd-ba4c');
  expect(response[0].sharedWith[0].firstName).to.be.equal('Bill');
  expect(response[0].sharedWith[0].lastName).to.be.equal('Roberts');
  expect(response[0].sharedWith[0].email).to.be.equal('bill.roberts@greatbrsolicitors.co.uk');
  expect(response[0].pendingShares).to.be.empty;
}

function assertCaseAssignmentErrorResponse(response: any) {
  expect(response).to.be.an('array');
  expect(response.length).to.be.equal(1);

  const errorMessage = response[0] as string;
  const requestJson = errorMessage.match(/request:\s*(\{.*\})\s*,\s*response:/)?.[1];
  const providerError = errorMessage.match(/response:\s*(\d+)\s+(.+)$/);

  expect(requestJson).to.not.be.undefined;
  expect(providerError).to.not.be.null;

  const request = JSON.parse(requestJson as string);

  expect(request).to.have.all.keys('assignee_id', 'case_id', 'case_type_id');
  expect(request.assignee_id).to.be.equal('0a5874a4-3f38-4bbd-ba4c');
  expect(request.case_id).to.be.equal('1583841721773828');
  expect(request.case_type_id).to.be.equal('PROBATE');
  expect(providerError?.[1]).to.be.equal('400');
  expect(providerError?.[2]).to.be.equal('Bad Request');
}
