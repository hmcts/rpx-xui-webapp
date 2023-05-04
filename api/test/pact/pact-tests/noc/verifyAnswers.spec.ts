import { PactTestSetup } from '../settings/provider.mock';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
import { NextFunction } from 'express';
import { getNocAPIOverrides } from '../utils/configOverride';
import * as config from 'config';
import { requireReloaded } from '../utils/moduleUtil';
import { expect } from 'chai';
import { NocAnswer } from '../../../../../src/noc/models';

const pactSetUp = new PactTestSetup({ provider: 'acc_manageCaseAssignment_Noc', port: 8000 });

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
    case_id: '1234567812345678',
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

  function setUpMockConfigForFunction() {
    const configValues = getNocAPIOverrides(pactSetUp.provider.mockService.baseUrl);
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
      await pactSetUp.provider.setup();
      return pactSetUp.provider.addInteraction({
        state: 'A valid NoC answers verification request',
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
      const validateNoCQuestions = setUpMockConfigForFunction();

      let returnedResponse = null;
      const response = mockRes();
      response.send = (ret) => {
        returnedResponse = ret;
      };
      const next = sinon.mock().atLeast(1) as NextFunction;
      try {
        await validateNoCQuestions(req, response, next);
        assertResponse(returnedResponse);
        pactSetUp.provider.verify();
        pactSetUp.provider.finalize();
      } catch (err) {
        console.log(err.stack);
        pactSetUp.provider.verify();
        pactSetUp.provider.finalize();
        throw new Error(err);
      }
    });
  });

  describe('when an error occurs', () => {
    before(async () => {
      await pactSetUp.provider.setup();
      await pactSetUp.provider.addInteraction({
        state: 'An invalid NoC answer request',
        uponReceiving: 'a request to verify NoC answers',
        withRequest: {
          method: 'POST',
          path: '/noc/verify-noc-answers',
          body: mockRequest
        },
        willRespondWith: {
          status: 400,
          body: {
            status: 'BAD_REQUEST',
            message: 'The answers did not match those for any litigant',
            code: 'answers-not-matched-any-litigant',
            errors: []
          }
        }
      });
    });

    it('should return an error response', async () => {
      const validateNoCQuestions = setUpMockConfigForFunction();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let returnedResponse = null;
      const response = mockRes();
      response.send = (ret) => {
        returnedResponse = ret;
      };
      const nextSpy = sinon.spy();
      try {
        await validateNoCQuestions(req, response, nextSpy);
        const error = nextSpy.args[0][0];
        assertError(error);
        pactSetUp.provider.verify();
        pactSetUp.provider.finalize();
      } catch (err) {
        console.log(err.stack);
        pactSetUp.provider.verify();
        pactSetUp.provider.finalize();
        throw new Error(err);
      }
    });
  });
});

function assertResponse(returnedResponse: any) {
  expect(returnedResponse.organisation.OrganisationID).to.be.equal('QUK822NA');
  expect(returnedResponse.organisation.OrganisationName).to.be.equal('Some Org');
  expect(returnedResponse.status_message).to.be.equal('Notice of Change answers verified successfully');
}

function assertError(error: any) {
  expect(error.status).to.be.equal(400);
  expect(error.statusText).to.be.equal('Bad Request ');
  expect(error.data.message).to.be.equal('The answers did not match those for any litigant');
  expect(error.data.code).to.be.equal('answers-not-matched-any-litigant');
}

