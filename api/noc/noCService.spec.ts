import { AxiosResponse } from 'axios';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq } from 'sinon-express-mock';

import { http } from '../lib/http';
import * as log4jui from '../lib/log4jui';
import { EnhancedRequest } from '../lib/models';
import * as proxy from '../lib/proxy';
import { handleGet, handlePost } from './noCService';

const chai = require('chai');
chai.use(sinonChai);

describe('NoC Service', () => {
  let sandbox: sinon.SinonSandbox;
  let req: EnhancedRequest;
  let loggerSpy: sinon.SinonStub;
  let httpGetStub: sinon.SinonStub;
  let httpPostStub: sinon.SinonStub;
  let setHeadersStub: sinon.SinonStub;

  const mockHeaders = {
    'Authorization': 'Bearer token123',
    'ServiceAuthorization': 'Bearer s2stoken123',
    'Content-Type': 'application/json',
    'accept': 'application/json'
  };

  const createMockAxiosResponse = (status: number, data: any): AxiosResponse => ({
    status,
    data,
    statusText: status === 200 ? 'OK' : status === 404 ? 'Not Found' : 'Internal Server Error',
    headers: {},
    config: { headers: {} } as any,
    request: {}
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    // Mock request object
    req = mockReq({
      headers: {
        'Authorization': 'Bearer token123',
        'ServiceAuthorization': 'Bearer s2stoken123'
      },
      session: {
        passport: {
          user: {
            userinfo: {
              id: 'user123',
              uid: 'user123'
            }
          }
        }
      }
    });

    // Mock logger to prevent console output during tests
    const mockLogger = {
      info: sandbox.stub(),
      error: sandbox.stub(),
      debug: sandbox.stub(),
      warn: sandbox.stub(),
      trackRequest: sandbox.stub(),
      _logger: {} as any
    };
    loggerSpy = sandbox.stub(log4jui, 'getLogger').returns(mockLogger);

    // Mock HTTP methods
    httpGetStub = sandbox.stub(http, 'get');
    httpPostStub = sandbox.stub(http, 'post');

    // Mock setHeaders utility
    setHeadersStub = sandbox.stub(proxy, 'setHeaders').returns(mockHeaders);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('handleGet', () => {
    const mockNoCPath = '/noc/noc-questions?case_id=1234567890123456';

    const mockNoCQuestionsResponse = {
      questions: [
        {
          case_type_id: 'AAT',
          order: '1',
          question_text: 'What is their first name?',
          answer_field_type: {
            id: 'Text',
            type: 'Text',
            min: null,
            max: null,
            regular_expression: null,
            fixed_list_items: [],
            complex_fields: [],
            collection_field_type: null
          },
          display_context_parameter: '1',
          challenge_question_id: 'NoC',
          answer_field: null,
          question_id: 'QuestionId123'
        },
        {
          case_type_id: 'AAT',
          order: '2',
          question_text: 'What is their last name?',
          answer_field_type: {
            id: 'Text',
            type: 'Text',
            min: null,
            max: null,
            regular_expression: null,
            fixed_list_items: [],
            complex_fields: [],
            collection_field_type: null
          },
          display_context_parameter: '1',
          challenge_question_id: 'NoC',
          answer_field: null,
          question_id: 'QuestionId456'
        }
      ]
    };

    it('should successfully retrieve NoC questions for valid case ID', async () => {
      const mockResponse = createMockAxiosResponse(200, mockNoCQuestionsResponse);
      httpGetStub.resolves(mockResponse);

      const result = await handleGet(mockNoCPath, req);

      expect(setHeadersStub).to.have.been.calledOnceWith(req);
      expect(httpGetStub).to.have.been.calledOnceWith(mockNoCPath, { headers: mockHeaders });
      expect(result).to.deep.equal(mockResponse);
      expect(result.status).to.equal(200);
      expect(result.data).to.deep.equal(mockNoCQuestionsResponse);
    });

    it('should handle 404 response when case not found', async () => {
      const mockResponse = createMockAxiosResponse(404, { message: 'Case not found' });
      httpGetStub.resolves(mockResponse);

      const result = await handleGet(mockNoCPath, req);

      expect(httpGetStub).to.have.been.calledOnceWith(mockNoCPath, { headers: mockHeaders });
      expect(result.status).to.equal(404);
      expect(result.data).to.deep.equal({ message: 'Case not found' });
    });

    it('should handle 401 unauthorized response', async () => {
      const mockResponse = createMockAxiosResponse(401, { message: 'Unauthorized' });
      httpGetStub.resolves(mockResponse);

      const result = await handleGet(mockNoCPath, req);

      expect(result.status).to.equal(401);
      expect(result.data.message).to.equal('Unauthorized');
    });

    it('should handle 403 forbidden response', async () => {
      const mockResponse = createMockAxiosResponse(403, { message: 'Forbidden' });
      httpGetStub.resolves(mockResponse);

      const result = await handleGet(mockNoCPath, req);

      expect(result.status).to.equal(403);
      expect(result.data.message).to.equal('Forbidden');
    });

    it('should handle 500 internal server error response', async () => {
      const mockResponse = createMockAxiosResponse(500, { message: 'Internal server error' });
      httpGetStub.resolves(mockResponse);

      const result = await handleGet(mockNoCPath, req);

      expect(result.status).to.equal(500);
      expect(result.data.message).to.equal('Internal server error');
    });

    it('should handle empty path parameter', async () => {
      const emptyPath = '';
      const mockResponse = createMockAxiosResponse(200, {});
      httpGetStub.resolves(mockResponse);

      const result = await handleGet(emptyPath, req);

      expect(httpGetStub).to.have.been.calledOnceWith(emptyPath, { headers: mockHeaders });
      expect(result.status).to.equal(200);
    });

    it('should handle null path parameter', async () => {
      const nullPath = null;
      const mockResponse = createMockAxiosResponse(200, {});
      httpGetStub.resolves(mockResponse);

      const result = await handleGet(nullPath, req);

      expect(httpGetStub).to.have.been.calledOnceWith(nullPath, { headers: mockHeaders });
    });

    it('should handle undefined path parameter', async () => {
      const undefinedPath = undefined;
      const mockResponse = createMockAxiosResponse(200, {});
      httpGetStub.resolves(mockResponse);

      const result = await handleGet(undefinedPath, req);

      expect(httpGetStub).to.have.been.calledOnceWith(undefinedPath, { headers: mockHeaders });
    });

    it('should propagate HTTP errors and log error message', async () => {
      const error = new Error('Network Error');
      error.message = 'Request failed with status code 500';
      httpGetStub.rejects(error);

      try {
        await handleGet(mockNoCPath, req);
        expect.fail('Expected error to be thrown');
      } catch (thrownError) {
        expect(thrownError).to.equal(error);
        expect(httpGetStub).to.have.been.calledOnceWith(mockNoCPath, { headers: mockHeaders });
      }
    });

    it('should propagate axios errors without message and log generic error', async () => {
      const error = { code: 'ECONNABORTED', response: { status: 408 } };
      httpGetStub.rejects(error);

      try {
        await handleGet(mockNoCPath, req);
        expect.fail('Expected error to be thrown');
      } catch (thrownError) {
        expect(thrownError).to.equal(error);
      }
    });

    it('should handle timeout errors', async () => {
      const timeoutError = {
        code: 'ECONNABORTED',
        message: 'timeout of 30000ms exceeded'
      };
      httpGetStub.rejects(timeoutError);

      try {
        await handleGet(mockNoCPath, req);
        expect.fail('Expected error to be thrown');
      } catch (thrownError) {
        expect(thrownError).to.equal(timeoutError);
      }
    });

    it('should handle connection refused errors', async () => {
      const connectionError = {
        code: 'ECONNREFUSED',
        message: 'connect ECONNREFUSED 127.0.0.1:8080'
      };
      httpGetStub.rejects(connectionError);

      try {
        await handleGet(mockNoCPath, req);
        expect.fail('Expected error to be thrown');
      } catch (thrownError) {
        expect(thrownError).to.equal(connectionError);
      }
    });

    it('should handle network errors with response data', async () => {
      const networkError = {
        message: 'Request failed',
        response: {
          status: 503,
          data: { error: 'Service Unavailable' }
        }
      };
      httpGetStub.rejects(networkError);

      try {
        await handleGet(mockNoCPath, req);
        expect.fail('Expected error to be thrown');
      } catch (thrownError) {
        expect(thrownError).to.equal(networkError);
      }
    });

    it('should handle empty response data', async () => {
      const mockResponse = createMockAxiosResponse(200, null);
      httpGetStub.resolves(mockResponse);

      const result = await handleGet(mockNoCPath, req);

      expect(result.status).to.equal(200);
      expect(result.data).to.be.null;
    });

    it('should handle response with empty questions array', async () => {
      const emptyQuestionsResponse = { questions: [] };
      const mockResponse = createMockAxiosResponse(200, emptyQuestionsResponse);
      httpGetStub.resolves(mockResponse);

      const result = await handleGet(mockNoCPath, req);

      expect(result.status).to.equal(200);
      expect(result.data.questions).to.be.an('array').that.is.empty;
    });

    it('should handle request with different content types', async () => {
      const customHeaders = { ...mockHeaders, 'Content-Type': 'application/xml' };
      setHeadersStub.returns(customHeaders);
      const mockResponse = createMockAxiosResponse(200, mockNoCQuestionsResponse);
      httpGetStub.resolves(mockResponse);

      const result = await handleGet(mockNoCPath, req);

      expect(httpGetStub).to.have.been.calledOnceWith(mockNoCPath, { headers: customHeaders });
      expect(result.status).to.equal(200);
    });

    it('should handle request without Authorization header', async () => {
      const headersWithoutAuth = { 'Content-Type': 'application/json' };
      setHeadersStub.returns(headersWithoutAuth);
      const mockResponse = createMockAxiosResponse(200, mockNoCQuestionsResponse);
      httpGetStub.resolves(mockResponse);

      const result = await handleGet(mockNoCPath, req);

      expect(httpGetStub).to.have.been.calledOnceWith(mockNoCPath, { headers: headersWithoutAuth });
      expect(result.status).to.equal(200);
    });

    it('should handle malformed JSON response', async () => {
      const malformedResponse = 'invalid json';
      const mockResponse = createMockAxiosResponse(200, malformedResponse);
      httpGetStub.resolves(mockResponse);

      const result = await handleGet(mockNoCPath, req);

      expect(result.status).to.equal(200);
      expect(result.data).to.equal(malformedResponse);
    });
  });

  describe('handlePost', () => {
    const mockNoCPath = '/noc/verify-noc-answers';

    const mockRequestBody = {
      case_id: '1234567890123456',
      answers: [
        {
          question_id: 'QuestionId123',
          value: 'John'
        },
        {
          question_id: 'QuestionId456',
          value: 'Doe'
        }
      ]
    };

    const mockValidationResponse = {
      OrganisationPolicy: {
        Organisation: 'orgId123'
      },
      code: '',
      status_message: 'success'
    };

    it('should successfully post NoC validation request', async () => {
      const mockResponse = createMockAxiosResponse(200, mockValidationResponse);
      httpPostStub.resolves(mockResponse);

      const result = await handlePost(mockNoCPath, mockRequestBody, req);

      expect(setHeadersStub).to.have.been.calledOnceWith(req);
      expect(httpPostStub).to.have.been.calledOnceWith(mockNoCPath, mockRequestBody, { headers: mockHeaders });
      expect(result).to.deep.equal(mockResponse);
      expect(result.status).to.equal(200);
      expect(result.data).to.deep.equal(mockValidationResponse);
    });

    it('should handle 201 created response', async () => {
      const mockResponse = createMockAxiosResponse(201, { message: 'NoC request created' });
      httpPostStub.resolves(mockResponse);

      const result = await handlePost(mockNoCPath, mockRequestBody, req);

      expect(result.status).to.equal(201);
      expect(result.data.message).to.equal('NoC request created');
    });

    it('should handle 400 bad request response', async () => {
      const badRequestResponse = {
        message: 'Case ID has to be a valid 16-digit',
        code: 'case-id-invalid'
      };
      const mockResponse = createMockAxiosResponse(400, badRequestResponse);
      httpPostStub.resolves(mockResponse);

      const result = await handlePost(mockNoCPath, mockRequestBody, req);

      expect(result.status).to.equal(400);
      expect(result.data).to.deep.equal(badRequestResponse);
    });

    it('should handle 404 case not found response', async () => {
      const notFoundResponse = {
        message: 'Case could not be found',
        code: 'case-not-found'
      };
      const mockResponse = createMockAxiosResponse(404, notFoundResponse);
      httpPostStub.resolves(mockResponse);

      const result = await handlePost(mockNoCPath, mockRequestBody, req);

      expect(result.status).to.equal(404);
      expect(result.data).to.deep.equal(notFoundResponse);
    });

    it('should handle 422 validation error response', async () => {
      const validationErrorResponse = {
        message: 'The answers did not match those for any litigant',
        code: 'answers-not-matched-any-litigant'
      };
      const mockResponse = createMockAxiosResponse(422, validationErrorResponse);
      httpPostStub.resolves(mockResponse);

      const result = await handlePost(mockNoCPath, mockRequestBody, req);

      expect(result.status).to.equal(422);
      expect(result.data).to.deep.equal(validationErrorResponse);
    });

    it('should handle empty request body', async () => {
      const emptyBody = {};
      const mockResponse = createMockAxiosResponse(400, { message: 'Invalid request body' });
      httpPostStub.resolves(mockResponse);

      const result = await handlePost(mockNoCPath, emptyBody, req);

      expect(httpPostStub).to.have.been.calledOnceWith(mockNoCPath, emptyBody, { headers: mockHeaders });
      expect(result.status).to.equal(400);
    });

    it('should handle null request body', async () => {
      const nullBody = null;
      const mockResponse = createMockAxiosResponse(200, mockValidationResponse);
      httpPostStub.resolves(mockResponse);

      const result = await handlePost(mockNoCPath, nullBody, req);

      expect(httpPostStub).to.have.been.calledOnceWith(mockNoCPath, nullBody, { headers: mockHeaders });
      expect(result.status).to.equal(200);
    });

    it('should handle undefined request body', async () => {
      const undefinedBody = undefined;
      const mockResponse = createMockAxiosResponse(200, mockValidationResponse);
      httpPostStub.resolves(mockResponse);

      const result = await handlePost(mockNoCPath, undefinedBody, req);

      expect(httpPostStub).to.have.been.calledOnceWith(mockNoCPath, undefinedBody, { headers: mockHeaders });
    });

    it('should handle request body with missing answers array', async () => {
      const incompleteBody = { case_id: '1234567890123456' };
      const mockResponse = createMockAxiosResponse(400, {
        message: 'The number of provided answers must match the number of questions',
        code: 'answers-mismatch-questions'
      });
      httpPostStub.resolves(mockResponse);

      const result = await handlePost(mockNoCPath, incompleteBody, req);

      expect(result.status).to.equal(400);
      expect(result.data.code).to.equal('answers-mismatch-questions');
    });

    it('should handle request body with missing case_id', async () => {
      const bodyWithoutCaseId = {
        answers: [
          { question_id: 'QuestionId123', value: 'John' }
        ]
      };
      const mockResponse = createMockAxiosResponse(400, {
        message: 'Case ID can not be empty',
        code: 'case-id-empty'
      });
      httpPostStub.resolves(mockResponse);

      const result = await handlePost(mockNoCPath, bodyWithoutCaseId, req);

      expect(result.status).to.equal(400);
      expect(result.data.code).to.equal('case-id-empty');
    });

    it('should handle request body with empty answers array', async () => {
      const bodyWithEmptyAnswers = {
        case_id: '1234567890123456',
        answers: []
      };
      const mockResponse = createMockAxiosResponse(400, {
        message: 'Challenge question answers can not be empty',
        code: 'answers-empty'
      });
      httpPostStub.resolves(mockResponse);

      const result = await handlePost(mockNoCPath, bodyWithEmptyAnswers, req);

      expect(result.status).to.equal(400);
      expect(result.data.code).to.equal('answers-empty');
    });

    it('should propagate HTTP errors and log error message', async () => {
      const error = new Error('Request failed with status code 500');
      error.message = 'Internal Server Error';
      httpPostStub.rejects(error);

      try {
        await handlePost(mockNoCPath, mockRequestBody, req);
        expect.fail('Expected error to be thrown');
      } catch (thrownError) {
        expect(thrownError).to.equal(error);
        expect(httpPostStub).to.have.been.calledOnceWith(mockNoCPath, mockRequestBody, { headers: mockHeaders });
      }
    });

    it('should propagate axios errors without message and log generic error', async () => {
      const error = { response: { status: 503, data: { message: 'Service temporarily unavailable' } } };
      httpPostStub.rejects(error);

      try {
        await handlePost(mockNoCPath, mockRequestBody, req);
        expect.fail('Expected error to be thrown');
      } catch (thrownError) {
        expect(thrownError).to.equal(error);
      }
    });

    it('should handle timeout errors on POST requests', async () => {
      const timeoutError = {
        code: 'ECONNABORTED',
        message: 'timeout of 30000ms exceeded'
      };
      httpPostStub.rejects(timeoutError);

      try {
        await handlePost(mockNoCPath, mockRequestBody, req);
        expect.fail('Expected error to be thrown');
      } catch (thrownError) {
        expect(thrownError).to.equal(timeoutError);
      }
    });

    it('should handle network errors with response data on POST', async () => {
      const networkError = {
        message: 'Request failed',
        response: {
          status: 502,
          data: { error: 'Bad Gateway' }
        }
      };
      httpPostStub.rejects(networkError);

      try {
        await handlePost(mockNoCPath, mockRequestBody, req);
        expect.fail('Expected error to be thrown');
      } catch (thrownError) {
        expect(thrownError).to.equal(networkError);
      }
    });

    it('should handle request with custom headers', async () => {
      const customHeaders = {
        ...mockHeaders,
        'X-Custom-Header': 'custom-value',
        'Accept': 'application/vnd.api+json'
      };
      setHeadersStub.returns(customHeaders);
      const mockResponse = createMockAxiosResponse(200, mockValidationResponse);
      httpPostStub.resolves(mockResponse);

      const result = await handlePost(mockNoCPath, mockRequestBody, req);

      expect(httpPostStub).to.have.been.calledOnceWith(mockNoCPath, mockRequestBody, { headers: customHeaders });
      expect(result.status).to.equal(200);
    });

    it('should handle large request body', async () => {
      const largeRequestBody = {
        case_id: '1234567890123456',
        answers: Array.from({ length: 100 }, (_, i) => ({
          question_id: `QuestionId${i}`,
          value: `Answer${i}`.repeat(100)
        }))
      };
      const mockResponse = createMockAxiosResponse(200, mockValidationResponse);
      httpPostStub.resolves(mockResponse);

      const result = await handlePost(mockNoCPath, largeRequestBody, req);

      expect(httpPostStub).to.have.been.calledOnceWith(mockNoCPath, largeRequestBody, { headers: mockHeaders });
      expect(result.status).to.equal(200);
    });

    it('should handle request body with special characters', async () => {
      const specialCharBody = {
        case_id: '1234567890123456',
        answers: [
          {
            question_id: 'QuestionId123',
            value: 'José María-Ñuñez & Sons (£500)'
          },
          {
            question_id: 'QuestionId456',
            value: '中文测试'
          }
        ]
      };
      const mockResponse = createMockAxiosResponse(200, mockValidationResponse);
      httpPostStub.resolves(mockResponse);

      const result = await handlePost(mockNoCPath, specialCharBody, req);

      expect(result.status).to.equal(200);
      expect(result.data).to.deep.equal(mockValidationResponse);
    });

    it('should handle empty path parameter on POST', async () => {
      const emptyPath = '';
      const mockResponse = createMockAxiosResponse(200, mockValidationResponse);
      httpPostStub.resolves(mockResponse);

      const result = await handlePost(emptyPath, mockRequestBody, req);

      expect(httpPostStub).to.have.been.calledOnceWith(emptyPath, mockRequestBody, { headers: mockHeaders });
      expect(result.status).to.equal(200);
    });

    it('should handle response with additional properties', async () => {
      const extendedResponse = {
        ...mockValidationResponse,
        metadata: {
          timestamp: '2023-01-01T12:00:00Z',
          version: '1.0'
        },
        warnings: ['This is a warning message']
      };
      const mockResponse = createMockAxiosResponse(200, extendedResponse);
      httpPostStub.resolves(mockResponse);

      const result = await handlePost(mockNoCPath, mockRequestBody, req);

      expect(result.status).to.equal(200);
      expect(result.data).to.deep.equal(extendedResponse);
      expect(result.data.metadata).to.exist;
      expect(result.data.warnings).to.be.an('array');
    });
  });

  describe('Edge Cases and Error Scenarios', () => {
    it('should handle setHeaders throwing an error', async () => {
      setHeadersStub.throws(new Error('Header configuration error'));

      try {
        await handleGet('/noc/test', req);
        expect.fail('Expected error to be thrown');
      } catch (error) {
        expect(error.message).to.equal('Header configuration error');
      }
    });

    it('should handle logger initialization failure gracefully', async () => {
      loggerSpy.throws(new Error('Logger initialization failed'));
      const mockResponse = createMockAxiosResponse(200, { test: 'data' });
      httpGetStub.resolves(mockResponse);

      // Service should still work even if logger fails
      const result = await handleGet('/noc/test', req);
      expect(result.status).to.equal(200);
    });

    it('should handle concurrent requests to handleGet', async () => {
      const path1 = '/noc/questions1';
      const path2 = '/noc/questions2';
      const mockResponse1 = createMockAxiosResponse(200, { questions: ['q1'] });
      const mockResponse2 = createMockAxiosResponse(200, { questions: ['q2'] });

      httpGetStub.onFirstCall().resolves(mockResponse1);
      httpGetStub.onSecondCall().resolves(mockResponse2);

      const [result1, result2] = await Promise.all([
        handleGet(path1, req),
        handleGet(path2, req)
      ]);

      expect(result1.data.questions).to.deep.equal(['q1']);
      expect(result2.data.questions).to.deep.equal(['q2']);
      expect(httpGetStub).to.have.been.calledTwice;
    });

    it('should handle concurrent requests to handlePost', async () => {
      const body1 = { case_id: '111', answers: [] };
      const body2 = { case_id: '222', answers: [] };
      const mockResponse1 = createMockAxiosResponse(200, { result: 'success1' });
      const mockResponse2 = createMockAxiosResponse(200, { result: 'success2' });

      httpPostStub.onFirstCall().resolves(mockResponse1);
      httpPostStub.onSecondCall().resolves(mockResponse2);

      const [result1, result2] = await Promise.all([
        handlePost('/noc/verify1', body1, req),
        handlePost('/noc/verify2', body2, req)
      ]);

      expect(result1.data.result).to.equal('success1');
      expect(result2.data.result).to.equal('success2');
      expect(httpPostStub).to.have.been.calledTwice;
    });

    it('should handle request object without session', async () => {
      const reqWithoutSession = mockReq({
        headers: mockHeaders
      });
      delete reqWithoutSession.session;

      const mockResponse = createMockAxiosResponse(200, { test: 'data' });
      httpGetStub.resolves(mockResponse);

      const result = await handleGet('/noc/test', reqWithoutSession);

      expect(result.status).to.equal(200);
      expect(setHeadersStub).to.have.been.calledWith(reqWithoutSession);
    });

    it('should handle request object with minimal properties', async () => {
      const minimalReq = { headers: {} } as EnhancedRequest;
      const mockResponse = createMockAxiosResponse(200, { test: 'data' });
      httpGetStub.resolves(mockResponse);

      const result = await handleGet('/noc/test', minimalReq);

      expect(result.status).to.equal(200);
    });
  });

  describe('Memory Management', () => {
    it('should not cause memory leaks with large response data', async () => {
      const largeResponseData = {
        questions: Array.from({ length: 1000 }, (_, i) => ({
          id: `question_${i}`,
          text: `Question ${i}`.repeat(100),
          answers: Array.from({ length: 10 }, (_, j) => `Answer ${j}`.repeat(50))
        }))
      };

      const mockResponse = createMockAxiosResponse(200, largeResponseData);
      httpGetStub.resolves(mockResponse);

      const result = await handleGet('/noc/large-data', req);

      expect(result.status).to.equal(200);
      expect(result.data.questions).to.have.length(1000);

      // Simulate cleanup
      delete result.data;
      expect(result.data).to.be.undefined;
    });

    it('should handle requests with large request bodies without memory issues', async () => {
      const largeRequestBody = {
        case_id: '1234567890123456',
        answers: Array.from({ length: 1000 }, (_, i) => ({
          question_id: `question_${i}`,
          value: 'Very long answer that repeats many times '.repeat(50)
        })),
        metadata: {
          additionalData: Array.from({ length: 500 }, (_, i) => ({
            key: `key_${i}`,
            value: `value_${i}`.repeat(100)
          }))
        }
      };

      const mockResponse = createMockAxiosResponse(200, { success: true });
      httpPostStub.resolves(mockResponse);

      const result = await handlePost('/noc/large-verify', largeRequestBody, req);

      expect(result.status).to.equal(200);
      expect(httpPostStub).to.have.been.calledOnceWith('/noc/large-verify', largeRequestBody, { headers: mockHeaders });
    });
  });
});
