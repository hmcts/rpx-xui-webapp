import { expect } from 'chai';
import config = require('config');
import { NextFunction } from 'express';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactV3TestSetup } from '../settings/provider.mock';
import { getNocAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';
const { MatchersV3: Matchers } = require('@pact-foundation/pact');
const { eachLike, integer, regex, string } = Matchers;

const pactSetUp = new PactV3TestSetup({ provider: 'acc_manageCaseAssignment_Noc', port: 8000 });

describe('getNoCQuestions API', () => {
  const caseId = '1234567890123452';
  const sandbox: sinon.SinonSandbox = sinon.createSandbox();
  afterEach(() => {
    sinon.reset();
    sandbox.restore();
  });

  function setUpMockConfigForFunction(url) {
    const configValues = getNocAPIOverrides(url);
    sandbox.stub(Object.getPrototypeOf(config), 'get').callsFake((prop: string) => {
      return configValues[prop];
    });
    const { getNoCQuestions } = requireReloaded('../../../../noc/index');
    return getNoCQuestions;
  }

  const req = mockReq({
    headers: {
      Authorization: 'Bearer someAuthorizationToken',
      ServiceAuthorization: 'Bearer someServiceAuthorizationToken',
    },
    query: { caseId: '1234567890123452' },
  });

  describe('when a request is made to retrieve NoC questions', () => {
    const expectedResponse = {
      questions: eachLike({
        case_type_id: string('Probate'),
        order: integer(1),
        question_text: string('What is their Email?'),
        answer_field_type: {
          id: string('Email'),
          type: string('Email'),
          min: string('0'),
          max: string('10'),
          regular_expression: string('asdsa'),
        },
        display_context_parameter: string('1'),
        challenge_question_id: string('NoC'),
        answer_field: string(''),
        question_id: string('QuestionId67745'),
      }),
    };

    let next;
    before(async () => {
      next = sandbox.spy();
      pactSetUp.provider
        .given('NoC questions exist for case with given id', { caseId })
        .uponReceiving('a valid request to retrieve NoC questions')
        .withRequest({
          method: 'GET',
          path: '/noc/noc-questions',
          query: {
            case_id: regex('^[0-9]{16}$', caseId),
          },
        })
        .willRespondWith({
          status: 200,
          body: expectedResponse,
        });
    });

    it('returns the expected NoC questions', async () => {
      return pactSetUp.provider.executeTest(async (mockServer) => {
        const getNoCQuestions = setUpMockConfigForFunction(mockServer.url);

        let returnedResponse = null;
        const response = mockRes();
        response.send = (ret) => {
          returnedResponse = ret;
        };

        const next = sinon.mock().atLeast(1) as NextFunction;
        try {
          await getNoCQuestions(req, response, next);
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
  expect(returnedResponse.questions.length).to.be.equal(1);
  expect(returnedResponse.questions[0].case_type_id).to.be.equal('Probate');
  expect(returnedResponse.questions[0].order).to.be.equal(1);
  expect(returnedResponse.questions[0].question_text).to.be.equal('What is their Email?');
  expect(returnedResponse.questions[0].answer_field_type.id).to.be.equal('Email');
  expect(returnedResponse.questions[0].answer_field_type.type).to.be.equal('Email');
  expect(returnedResponse.questions[0].answer_field_type.min).to.be.equal('0');
  expect(returnedResponse.questions[0].answer_field_type.regular_expression).to.be.equal('asdsa');
  expect(returnedResponse.questions[0].display_context_parameter).to.be.equal('1');
  expect(returnedResponse.questions[0].challenge_question_id).to.be.equal('NoC');
  expect(returnedResponse.questions[0].answer_field).to.be.equal('');
  expect(returnedResponse.questions[0].question_id).to.be.equal('QuestionId67745');
}
