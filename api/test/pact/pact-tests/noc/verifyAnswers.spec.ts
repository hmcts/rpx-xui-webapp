import { expect } from 'chai';
import * as config from 'config';
import { NextFunction } from 'express';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { NocAnswer } from '../../../../../src/noc/models';
import { PactV3TestSetup } from '../settings/provider.mock';
import { getNocAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';
const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;

const pactSetUp = new PactV3TestSetup({ provider: 'acc_manageCaseAssignment', port: 8000 });

describe('verifyAnswers API', () => {
  const sandbox: sinon.SinonSandbox = sinon.createSandbox();
  afterEach(() => {
    sinon.reset();
    sandbox.restore();
  });

  const answers: NocAnswer[] = [{
    question_id: '1233434',
    value: 'test@email.com'
  }];
  const mockRequest = {
    case_id: '1234567812345670',
    answers: answers
  };

  const req = mockReq({
    headers: {
      'Authorization': 'Bearer someAuthorizationToken',
      'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
      'content-Type': 'application/json'
    },
    body: mockRequest
  });

  function setUpMockConfigForFunction(url) {
    const configValues = getNocAPIOverrides(url);
    sandbox.stub(config, 'get').callsFake((prop) => {
      return configValues[prop];
    });
    const { validateNoCQuestions } = requireReloaded('../../../../noc/index');
    return validateNoCQuestions;
  }

  describe('when a request is made to verify NoC answers', () => {
    const expectedResponse = {
      organisation: {
        OrganisationID: somethingLike('QUK822NA'),
        OrganisationName: somethingLike('Some Org')
      },
      status_message: somethingLike('Notice of Change answers verified successfully')
    };

    before(async () => {
      return pactSetUp.provider.addInteraction({
        states: [{ description: 'A valid NoC answers verification request' }],
        uponReceiving: 'a request to verify NoC answers',
        withRequest: {
          method: 'POST',
          path: '/noc/verify-noc-answers',
          body: mockRequest
        },
        willRespondWith: {
          status: 200,
          body: expectedResponse
        }
      });
    });

    it('should return a valid response', async () => {
      return pactSetUp.provider.executeTest(async (mockServer) => {
        const validateNoCQuestions = setUpMockConfigForFunction(mockServer.url);

        let returnedResponse = null;
        const response = mockRes();
        response.send = (ret) => {
          returnedResponse = ret;
        };
        const next = sinon.mock().atLeast(1) as NextFunction;
        try {
          await validateNoCQuestions(req, response, next);
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
  expect(returnedResponse.organisation.OrganisationID).to.be.equal('QUK822NA');
  expect(returnedResponse.organisation.OrganisationName).to.be.equal('Some Org');
  expect(returnedResponse.status_message).to.be.equal('Notice of Change answers verified successfully');
}
