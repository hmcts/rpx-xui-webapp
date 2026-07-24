import { expect } from 'chai';
import config = require('config');
import { NextFunction } from 'express';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { NocAnswer } from '../../../../../src/noc/models';
import { PactV3TestSetup } from '../settings/provider.mock';
import { getNocAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';
const { MatchersV3: Matchers } = require('@pact-foundation/pact');
const { eachLike, regex, string } = Matchers;

const pactSetUp = new PactV3TestSetup({ provider: 'acc_manageCaseAssignment_Noc', port: 8000 });

describe('submitNoCEvents API', () => {
  const sandbox: sinon.SinonSandbox = sinon.createSandbox();
  afterEach(() => {
    sinon.reset();
    sandbox.restore();
  });

  const answers: NocAnswer[] = [
    {
      question_id: '1233434',
      value: 'test@email.com',
    },
  ];
  const mockRequest = {
    case_id: '1234567812345670',
    answers: answers,
  };
  const pactRequest = {
    case_id: regex('^[0-9]{16}$', '1234567812345670'),
    answers: eachLike({
      question_id: string('1233434'),
      value: string('test@email.com'),
    }),
  };

  const req = mockReq({
    headers: {
      Authorization: 'Bearer someAuthorizationToken',
      ServiceAuthorization: 'Bearer someServiceAuthorizationToken',
      'content-Type': 'application/json',
    },
    body: mockRequest,
  });

  function setUpMockConfigForFunction(url) {
    const configValues = getNocAPIOverrides(url);
    sandbox.stub(Object.getPrototypeOf(config), 'get').callsFake((prop: string) => {
      return configValues[prop];
    });
    const { submitNoCEvents } = requireReloaded('../../../../noc/index');
    return submitNoCEvents;
  }

  describe('when a request is made to submit an NoC event', () => {
    const expectedResponse = {
      approval_status: string('APPROVED'),
      case_role: string('[Claimant]'),
      status_message: string('Notice of request has been successfully submitted.'),
    };

    before(async () => {
      return pactSetUp.provider.addInteraction({
        states: [{ description: 'A valid submit NoC event is requested' }],
        uponReceiving: 'a valid request to submit NoC',
        withRequest: {
          method: 'POST',
          path: '/noc/noc-requests',
          body: pactRequest,
        },
        willRespondWith: {
          status: 201,
          body: expectedResponse,
        },
      });
    });

    it('should return a valid response', async () => {
      return pactSetUp.provider.executeTest(async (mockServer) => {
        const submitNoCEvents = setUpMockConfigForFunction(mockServer.url);

        let returnedResponse = null;
        const response = mockRes();
        response.send = (ret) => {
          returnedResponse = ret;
        };
        const next = sinon.mock().atLeast(1) as NextFunction;
        try {
          await submitNoCEvents(req, response, next);
          assertResponse(returnedResponse);
        } catch (err) {
          console.log(err.stack);
          throw new Error(err);
        }
      });
    });
  });
});

function assertResponse(returnedResponse: any) {
  expect(returnedResponse.approval_status).to.be.equal('APPROVED');
  expect(returnedResponse.case_role).to.be.equal('[Claimant]');
  expect(returnedResponse.status_message).to.be.equal('Notice of request has been successfully submitted.');
}
