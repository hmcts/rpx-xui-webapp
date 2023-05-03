import { PactTestSetup } from '../settings/provider.mock';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
const { Matchers } = require('@pact-foundation/pact');
const { somethingLike, eachLike } = Matchers;
import { NextFunction } from 'express';
import { getNocAPIOverrides } from '../utils/configOverride';
import * as config from 'config';
import { requireReloaded } from '../utils/moduleUtil';
import { expect } from 'chai';

const pactSetUp = new PactTestSetup({ provider: 'acc_manageCaseAssignment_Noc', port: 8000 });

describe('getNoCQuestions API', () => {
  const caseId = '1234567890123456';
  const sandbox: sinon.SinonSandbox = sinon.createSandbox();
  afterEach(() => {
    sinon.reset();
    sandbox.restore();
  });

  function setUpMockConfigForFunction() {
    const configValues = getNocAPIOverrides(pactSetUp.provider.mockService.baseUrl);
    sandbox.stub(config, 'get').callsFake((prop) => {
      return configValues[prop];
    });
    const { getNoCQuestions } = requireReloaded('../../../../noc/index');
    return getNoCQuestions;
  }

  const req = mockReq({
    headers: {
      'Authorization': 'Bearer someAuthorizationToken',
      'ServiceAuthorization': 'Bearer someServiceAuthorizationToken'
    },
    query: { caseId: '1234567890123456' }
  });

  describe('when a request is made to retrieve NoC questions', () => {
    const expectedResponse = {
      questions: eachLike({
        case_type_id: somethingLike('Probate'),
        order: somethingLike('1'),
        question_text: somethingLike('What is their Email?'),
        answer_field_type: {
          id: somethingLike('Email'),
          type: somethingLike('Email'),
          min: somethingLike(0),
          max: somethingLike(10),
          regular_expression: somethingLike('asdsa'),
          collection_field_type: somethingLike('type')
        },
        display_context_parameter: somethingLike('1'),
        challenge_question_id: somethingLike('NoC'),
        answer_field: somethingLike(''),
        question_id: somethingLike('QuestionId67745')
      })
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let next;
    before(async () => {
      await pactSetUp.provider.setup();
      next = sandbox.spy();
      return pactSetUp.provider.addInteraction({
        state: `a case with id ${caseId} exists`,
        uponReceiving: 'a request to retrieve NoC questions',
        withRequest: {
          method: 'GET',
          path: '/noc/noc-questions',
          query: 'case_id=' + caseId
        },
        willRespondWith: {
          status: 200,
          body: expectedResponse
        }
      });
    });

    it('returns the expected NoC questions', async () => {
      const getNoCQuestions = setUpMockConfigForFunction();

      let returnedResponse = null;
      const response = mockRes();
      response.send = (ret) => {
        returnedResponse = ret;
      };

      const next = sinon.mock().atLeast(1) as NextFunction;
      try {
        await getNoCQuestions(req, response, next);
        assertResponse(returnedResponse);
        pactSetUp.provider.finalize();
        pactSetUp.provider.verify();
      } catch (err) {
        console.log(err.stack);
        pactSetUp.provider.finalize();
        pactSetUp.provider.verify();
        throw new Error(err);
      }
    });
  });
  describe('when an error occurs', () => {
    before(async () => {
      await pactSetUp.provider.setup();
      await pactSetUp.provider.addInteraction({
        state: 'a case with an error exists',
        uponReceiving: 'a request to verify NoC answers',
        withRequest: {
          method: 'GET',
          path: '/noc/noc-questions',
          query: 'case_id=' + caseId
        },
        willRespondWith: {
          status: 400,
          body: {
            status: 'BAD_REQUEST',
            message: 'Case ID has to be a valid 16-digit Luhn number',
            code: 'case-id-invalid'
          }
        }
      });
    });

    it('should return an error response', async () => {
      const getNoCQuestions = setUpMockConfigForFunction();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let returnedResponse = null;
      const response = mockRes();
      response.send = (ret) => {
        returnedResponse = ret;
      };
      const nextSpy = sinon.spy();
      try {
        await getNoCQuestions(req, response, nextSpy);
        const error = nextSpy.args[0][0];
        assertError(error);
        pactSetUp.provider.finalize();
        pactSetUp.provider.verify();
      } catch (err) {
        console.log(err.stack);
        pactSetUp.provider.finalize();
        pactSetUp.provider.verify();
        throw new Error(err);
      }
    });
  });
});

function assertResponse(returnedResponse: any) {
  expect(returnedResponse.questions.length).to.be.equal(1);
  expect(returnedResponse.questions[0].case_type_id).to.be.equal('Probate');
  expect(returnedResponse.questions[0].order).to.be.equal('1');
  expect(returnedResponse.questions[0].question_text).to.be.equal('What is their Email?');
  expect(returnedResponse.questions[0].answer_field_type.id).to.be.equal('Email');
  expect(returnedResponse.questions[0].answer_field_type.type).to.be.equal('Email');
  expect(returnedResponse.questions[0].answer_field_type.min).to.be.equal(0);
  expect(returnedResponse.questions[0].answer_field_type.regular_expression).to.be.equal('asdsa');
  expect(returnedResponse.questions[0].answer_field_type.collection_field_type).to.be.equal('type');
  expect(returnedResponse.questions[0].display_context_parameter).to.be.equal('1');
  expect(returnedResponse.questions[0].challenge_question_id).to.be.equal('NoC');
  expect(returnedResponse.questions[0].answer_field).to.be.equal('');
  expect(returnedResponse.questions[0].question_id).to.be.equal('QuestionId67745');
}

function assertError(error: any) {
  expect(error.status).to.be.equal(400);
  expect(error.statusText).to.be.equal('Bad Request ');
  expect(error.data.message).to.be.equal('Case ID has to be a valid 16-digit Luhn number');
  expect(error.data.code).to.be.equal('case-id-invalid');
}

