import { expect } from 'chai';
import config = require('config');
import { NextFunction } from 'express';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactV3TestSetup } from '../settings/provider.mock';
import { getCaseAssignmentAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';

const { MatchersV3: Matchers } = require('@pact-foundation/pact');
const { regex, string } = Matchers;
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
    case_id: regex('^[0-9]{16}$', '1583841721773828'),
    assignee_id: string('0a5874a4-3f38-4bbd-ba4c'),
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

    it('Returns CaseAssingments Response', async () => {
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
