import { expect } from 'chai';
import config = require('config');
import { NextFunction } from 'express';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { CaseAssignmentResponseDto } from '../../pactFixtures';
import { PactV3TestSetup } from '../settings/provider.mock';
import { getCaseAssignmentAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';

const { MatchersV3: Matchers } = require('@pact-foundation/pact');
const { eachLike, like, regex, string, uuid } = Matchers;
const pactSetUp = new PactV3TestSetup({ provider: 'acc_manageCaseAssignment', port: 8000 });

describe('Get Cases from CaseAssignment Api', () => {
  const sandbox: sinon.SinonSandbox = sinon.createSandbox();
  afterEach(() => {
    sinon.reset();
    sandbox.restore();
  });

  function setUpMockConfigForFunction(url: string) {
    const configValues = getCaseAssignmentAPIOverrides(url);
    sandbox.stub(Object.getPrototypeOf(config), 'get').callsFake((prop: string) => configValues[prop]);
    return requireReloaded('../../../../caseshare/real-api').getCases;
  }

  describe('when requested to get case assignments for array of CaseIds ', () => {
    before(async () => {
      pactSetUp.provider
        .given('Case assignments exist for case Ids')
        .uponReceiving('a valid request for those cases')
        .withRequest({
          method: 'GET',
          path: '/case-assignments',
          query: {
            case_ids: '12345678,87654321',
          },
          headers: {
            'Content-Type': 'application/json',
            ServiceAuthorization: 'ServiceAuthToken',
            Authorization: 'Bearer some-access-token',
          },
        })
        .willRespondWith({
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: caseAssignmentResponseDto,
        });
    });

    it('Returns CaseAssignments Response', async () => {
      return pactSetUp.provider.executeTest(async (mockServer) => {
        const getCases = setUpMockConfigForFunction(mockServer.url);
        const req = mockReq({
          query: { case_ids: '12345678,87654321' },
          headers: {
            Authorization: 'Bearer some-access-token',
            ServiceAuthorization: 'ServiceAuthToken',
            'content-type': 'application/json',
          },
        });
        const response = mockRes();
        let returnedResponse = null;
        response.send = (ret) => {
          returnedResponse = ret;
        };

        await getCases(req, response, sandbox.spy() as NextFunction);
        assertCaseAssignmentResponses(returnedResponse);
      });
    });
  });
});

const caseAssignmentResponseDto: CaseAssignmentResponseDto = {
  status_message: string('Case-User-Role assignments returned successfully'),
  case_assignments: eachLike({
    case_id: regex('^[0-9]{16}$', '1588234985453946'),
    case_title: string('A case title'),
    shared_with: eachLike({
      idam_id: uuid('221a2877-e1ab-4dc4-a9ff-f9424ad58738'),
      first_name: string('Bill'),
      last_name: string('Roberts'),
      email: regex('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$', 'bill.roberts@greatbrsolicitors.co.uk'),
      case_roles: like(['[Claimant]', '[Defendant]']),
    }),
  }),
};

function assertCaseAssignmentResponses(response: any) {
  expect(response[0].caseId).to.be.equal('1588234985453946');
  expect(response[0].caseTitle).to.be.equal('A case title');
  expect(response[0].sharedWith[0].idamId).to.be.equal('221a2877-e1ab-4dc4-a9ff-f9424ad58738');
  expect(response[0].sharedWith[0].firstName).to.be.equal('Bill');
  expect(response[0].sharedWith[0].lastName).to.be.equal('Roberts');
  expect(response[0].sharedWith[0].email).to.be.equal('bill.roberts@greatbrsolicitors.co.uk');
  expect(response[0].sharedWith[0].caseRoles[0]).to.be.equal('[Claimant]');
  expect(response[0].sharedWith[0].caseRoles[1]).to.be.equal('[Defendant]');
}
