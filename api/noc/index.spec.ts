
import * as chai from 'chai';
import { expect } from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { AxiosResponse } from 'axios';
import * as noCService from './noCService';
import * as errorCodeConverter from './errorCodeConverter';
import { NoCQuestions } from './models/noCQuestions.interface';
import {
  getNoCQuestions,
  validateNoCQuestions,
  submitNoCEvents
} from './';

chai.use(sinonChai);

const createMockResponse = (status: number, data: any, statusText: string = 'OK'): AxiosResponse => ({
  status,
  data,
  statusText,
  headers: {},
  config: { headers: {} } as any,
  request: {}
});

describe('NoC API', (): void => {
  let sandbox: sinon.SinonSandbox;
  let res;
  let req;
  let next: sinon.SinonStub;
  let handleGetStub: sinon.SinonStub;
  let handlePostStub: sinon.SinonStub;
  let generateErrorMessageWithCodeStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    res = mockRes();
    next = sandbox.stub();
    handleGetStub = sandbox.stub(noCService, 'handleGet');
    handlePostStub = sandbox.stub(noCService, 'handlePost');
    generateErrorMessageWithCodeStub = sandbox.stub(errorCodeConverter, 'generateErrorMessageWithCode');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getNoCQuestions', () => {
    const mockNoCQuestions: NoCQuestions = {
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

    beforeEach(() => {
      req = mockReq({
        query: {
          caseId: '1234567890123456'
        }
      });
    });

    it('should successfully get NoC questions for a valid case ID', async () => {
      const mockResponse = createMockResponse(200, mockNoCQuestions);
      handleGetStub.resolves(mockResponse);

      await getNoCQuestions(req, res, next);

      expect(handleGetStub).to.have.been.calledOnce;
      expect(handleGetStub.firstCall.args[0]).to.include('/noc/noc-questions?case_id=1234567890123456');
      expect(handleGetStub.firstCall.args[1]).to.equal(req);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockNoCQuestions);
      expect(next).to.not.have.been.called;
    });

    it('should handle case with undefined caseId query parameter', async () => {
      req.query.caseId = undefined;
      const mockResponse = createMockResponse(200, mockNoCQuestions);
      handleGetStub.resolves(mockResponse);

      await getNoCQuestions(req, res, next);

      expect(handleGetStub.firstCall.args[0]).to.include('/noc/noc-questions?case_id=undefined');
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockNoCQuestions);
    });

    it('should handle case with null caseId query parameter', async () => {
      req.query.caseId = null;
      const mockResponse = createMockResponse(200, mockNoCQuestions);
      handleGetStub.resolves(mockResponse);

      await getNoCQuestions(req, res, next);

      expect(handleGetStub.firstCall.args[0]).to.include('/noc/noc-questions?case_id=null');
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockNoCQuestions);
    });

    it('should handle empty caseId query parameter', async () => {
      req.query.caseId = '';
      const mockResponse = createMockResponse(200, mockNoCQuestions);
      handleGetStub.resolves(mockResponse);

      await getNoCQuestions(req, res, next);

      expect(handleGetStub.firstCall.args[0]).to.include('/noc/noc-questions?case_id=');
    });

    it('should handle 404 response when case not found', async () => {
      const mockResponse = createMockResponse(404, { message: 'Case not found' }, 'Not Found');
      handleGetStub.resolves(mockResponse);

      await getNoCQuestions(req, res, next);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.send).to.have.been.calledWith({ message: 'Case not found' });
      expect(next).to.not.have.been.called;
    });

    it('should handle service errors and call next with transformed error', async () => {
      const originalError = {
        response: {
          status: 500,
          data: { message: 'Internal server error' }
        }
      };
      const transformedError = {
        ...originalError,
        data: {
          ...originalError.response.data,
          code: 'generic-error'
        }
      };

      handleGetStub.rejects(originalError);
      generateErrorMessageWithCodeStub.returns(transformedError);

      await getNoCQuestions(req, res, next);

      expect(generateErrorMessageWithCodeStub).to.have.been.calledWith(originalError);
      expect(next).to.have.been.calledWith(transformedError);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network Error');
      const transformedError = {
        ...networkError,
        data: {
          message: 'Network Error',
          code: 'generic-error'
        }
      };

      handleGetStub.rejects(networkError);
      generateErrorMessageWithCodeStub.returns(transformedError);

      await getNoCQuestions(req, res, next);

      expect(generateErrorMessageWithCodeStub).to.have.been.calledWith(networkError);
      expect(next).to.have.been.calledWith(transformedError);
    });

    it('should handle timeout errors', async () => {
      const timeoutError = {
        code: 'ECONNABORTED',
        message: 'timeout of 30000ms exceeded'
      };
      const transformedError = {
        ...timeoutError,
        data: {
          message: 'timeout of 30000ms exceeded',
          code: 'generic-error'
        }
      };

      handleGetStub.rejects(timeoutError);
      generateErrorMessageWithCodeStub.returns(transformedError);

      await getNoCQuestions(req, res, next);

      expect(generateErrorMessageWithCodeStub).to.have.been.calledWith(timeoutError);
      expect(next).to.have.been.calledWith(transformedError);
    });
  });

  describe('validateNoCQuestions', () => {
    const mockValidationRequest = {
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

    beforeEach(() => {
      req = mockReq({
        body: mockValidationRequest
      });
    });

    it('should successfully validate NoC questions', async () => {
      const mockResponse = createMockResponse(200, mockValidationResponse);
      handlePostStub.resolves(mockResponse);

      await validateNoCQuestions(req, res, next);

      expect(handlePostStub).to.have.been.calledOnce;
      expect(handlePostStub.firstCall.args[0]).to.include('/noc/verify-noc-answers');
      expect(handlePostStub.firstCall.args[1]).to.equal(mockValidationRequest);
      expect(handlePostStub.firstCall.args[2]).to.equal(req);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockValidationResponse);
      expect(next).to.not.have.been.called;
    });

    it('should handle empty request body', async () => {
      req.body = {};
      const mockResponse = createMockResponse(200, mockValidationResponse);
      handlePostStub.resolves(mockResponse);

      await validateNoCQuestions(req, res, next);

      expect(handlePostStub.firstCall.args[0]).to.include('/noc/verify-noc-answers');
      expect(handlePostStub.firstCall.args[1]).to.deep.equal({});
      expect(handlePostStub.firstCall.args[2]).to.equal(req);
    });

    it('should handle null request body', async () => {
      req.body = null;
      const mockResponse = createMockResponse(200, mockValidationResponse);
      handlePostStub.resolves(mockResponse);

      await validateNoCQuestions(req, res, next);

      expect(handlePostStub.firstCall.args[0]).to.include('/noc/verify-noc-answers');
      expect(handlePostStub.firstCall.args[1]).to.equal(null);
      expect(handlePostStub.firstCall.args[2]).to.equal(req);
    });

    it('should handle validation failure response', async () => {
      const failureResponse = {
        code: 'answers-not-identify-litigant',
        status_message: 'The answers did not uniquely identify a litigant'
      };
      const mockResponse = createMockResponse(400, failureResponse, 'Bad Request');
      handlePostStub.resolves(mockResponse);

      await validateNoCQuestions(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.send).to.have.been.calledWith(failureResponse);
    });

    it('should handle case-id-invalid error', async () => {
      const invalidCaseError = {
        response: {
          status: 400,
          data: {
            code: 'case-id-invalid',
            message: 'Invalid case reference number'
          }
        }
      };
      const transformedError = {
        ...invalidCaseError,
        data: {
          ...invalidCaseError.response.data,
          code: 'case-id-invalid'
        }
      };

      handlePostStub.rejects(invalidCaseError);
      generateErrorMessageWithCodeStub.returns(transformedError);

      await validateNoCQuestions(req, res, next);

      expect(generateErrorMessageWithCodeStub).to.have.been.calledWith(invalidCaseError);
      expect(next).to.have.been.calledWith(transformedError);
    });

    it('should handle answers-not-identify-litigant error', async () => {
      const litigantError = {
        response: {
          status: 400,
          data: {
            message: 'Answers match more than one party on the case'
          }
        }
      };
      const transformedError = {
        ...litigantError,
        data: {
          ...litigantError.response.data,
          code: 'answers-not-identify-litigant'
        }
      };

      handlePostStub.rejects(litigantError);
      generateErrorMessageWithCodeStub.returns(transformedError);

      await validateNoCQuestions(req, res, next);

      expect(generateErrorMessageWithCodeStub).to.have.been.calledWith(litigantError);
      expect(next).to.have.been.calledWith(transformedError);
    });

    it('should handle service unavailable error', async () => {
      const serviceError = {
        response: {
          status: 503,
          data: { message: 'Service temporarily unavailable' }
        }
      };
      const transformedError = {
        ...serviceError,
        data: {
          ...serviceError.response.data,
          code: 'generic-error'
        }
      };

      handlePostStub.rejects(serviceError);
      generateErrorMessageWithCodeStub.returns(transformedError);

      await validateNoCQuestions(req, res, next);

      expect(generateErrorMessageWithCodeStub).to.have.been.calledWith(serviceError);
      expect(next).to.have.been.calledWith(transformedError);
    });
  });

  describe('submitNoCEvents', () => {
    const mockSubmissionRequest = {
      case_id: '1234567890123456',
      organisation_policy: {
        Organisation: 'orgId123'
      },
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

    const mockSubmissionResponse = {
      approval_status: 'APPROVED',
      case_role: 'Claimant',
      code: '',
      status_message: 'success'
    };

    beforeEach(() => {
      req = mockReq({
        body: mockSubmissionRequest
      });
    });

    it('should successfully submit NoC events', async () => {
      const mockResponse = createMockResponse(201, mockSubmissionResponse, 'Created');
      handlePostStub.resolves(mockResponse);

      await submitNoCEvents(req, res, next);

      expect(handlePostStub).to.have.been.calledOnce;
      expect(handlePostStub.firstCall.args[0]).to.include('/noc/noc-requests');
      expect(handlePostStub.firstCall.args[1]).to.equal(mockSubmissionRequest);
      expect(handlePostStub.firstCall.args[2]).to.equal(req);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.send).to.have.been.calledWith(mockSubmissionResponse);
      expect(next).to.not.have.been.called;
    });

    it('should handle submission with minimal data', async () => {
      const minimalRequest = {
        case_id: '1234567890123456'
      };
      req.body = minimalRequest;
      const mockResponse = createMockResponse(201, mockSubmissionResponse, 'Created');
      handlePostStub.resolves(mockResponse);

      await submitNoCEvents(req, res, next);

      expect(handlePostStub.firstCall.args[0]).to.include('/noc/noc-requests');
      expect(handlePostStub.firstCall.args[1]).to.equal(minimalRequest);
      expect(handlePostStub.firstCall.args[2]).to.equal(req);
    });

    it('should handle empty request body', async () => {
      req.body = {};
      const mockResponse = createMockResponse(201, mockSubmissionResponse, 'Created');
      handlePostStub.resolves(mockResponse);

      await submitNoCEvents(req, res, next);

      expect(handlePostStub.firstCall.args[0]).to.include('/noc/noc-requests');
      expect(handlePostStub.firstCall.args[1]).to.deep.equal({});
      expect(handlePostStub.firstCall.args[2]).to.equal(req);
    });

    it('should handle submission approval with different status', async () => {
      const pendingResponse = {
        approval_status: 'PENDING',
        case_role: 'Respondent',
        code: '',
        status_message: 'pending approval'
      };
      const mockResponse = createMockResponse(201, pendingResponse, 'Created');
      handlePostStub.resolves(mockResponse);

      await submitNoCEvents(req, res, next);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.send).to.have.been.calledWith(pendingResponse);
    });

    it('should handle noc-in-progress error', async () => {
      const progressError = {
        response: {
          status: 500,
          data: {
            code: 'noc-in-progress',
            message: 'internal error'
          }
        }
      };
      const transformedError = {
        ...progressError,
        data: {
          ...progressError.response.data,
          code: 'noc-in-progress'
        }
      };

      handlePostStub.rejects(progressError);
      generateErrorMessageWithCodeStub.returns(transformedError);

      await submitNoCEvents(req, res, next);

      expect(generateErrorMessageWithCodeStub).to.have.been.calledWith(progressError);
      expect(next).to.have.been.calledWith(transformedError);
    });

    it('should handle case-id-invalid error during submission', async () => {
      const invalidCaseError = {
        response: {
          status: 400,
          data: {
            code: 'case-id-invalid',
            message: 'Invalid case reference number'
          }
        }
      };
      const transformedError = {
        ...invalidCaseError,
        data: {
          ...invalidCaseError.response.data,
          code: 'case-id-invalid'
        }
      };

      handlePostStub.rejects(invalidCaseError);
      generateErrorMessageWithCodeStub.returns(transformedError);

      await submitNoCEvents(req, res, next);

      expect(generateErrorMessageWithCodeStub).to.have.been.calledWith(invalidCaseError);
      expect(next).to.have.been.calledWith(transformedError);
    });

    it('should handle multiple-noc-requests error', async () => {
      const multipleRequestsError = {
        response: {
          status: 400,
          data: {
            code: 'more-than-one-litigant',
            message: 'You already have access to the case'
          }
        }
      };
      const transformedError = {
        ...multipleRequestsError,
        data: {
          ...multipleRequestsError.response.data,
          code: 'more-than-one-litigant'
        }
      };

      handlePostStub.rejects(multipleRequestsError);
      generateErrorMessageWithCodeStub.returns(transformedError);

      await submitNoCEvents(req, res, next);

      expect(generateErrorMessageWithCodeStub).to.have.been.calledWith(multipleRequestsError);
      expect(next).to.have.been.calledWith(transformedError);
    });

    it('should handle another noc request actioned error', async () => {
      const anotherNocError = {
        response: {
          status: 400,
          data: {
            code: 'noc-in-progress',
            message: 'Another NOC request has been actioned'
          }
        }
      };
      const transformedError = {
        ...anotherNocError,
        data: {
          ...anotherNocError.response.data,
          code: 'noc-in-progress'
        }
      };

      handlePostStub.rejects(anotherNocError);
      generateErrorMessageWithCodeStub.returns(transformedError);

      await submitNoCEvents(req, res, next);

      expect(generateErrorMessageWithCodeStub).to.have.been.calledWith(anotherNocError);
      expect(next).to.have.been.calledWith(transformedError);
    });

    it('should handle unauthorized error', async () => {
      const unauthorizedError = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' }
        }
      };
      const transformedError = {
        ...unauthorizedError,
        data: {
          ...unauthorizedError.response.data,
          code: 'generic-error'
        }
      };

      handlePostStub.rejects(unauthorizedError);
      generateErrorMessageWithCodeStub.returns(transformedError);

      await submitNoCEvents(req, res, next);

      expect(generateErrorMessageWithCodeStub).to.have.been.calledWith(unauthorizedError);
      expect(next).to.have.been.calledWith(transformedError);
    });

    it('should handle forbidden error', async () => {
      const forbiddenError = {
        response: {
          status: 403,
          data: { message: 'Forbidden' }
        }
      };
      const transformedError = {
        ...forbiddenError,
        data: {
          ...forbiddenError.response.data,
          code: 'generic-error'
        }
      };

      handlePostStub.rejects(forbiddenError);
      generateErrorMessageWithCodeStub.returns(transformedError);

      await submitNoCEvents(req, res, next);

      expect(generateErrorMessageWithCodeStub).to.have.been.calledWith(forbiddenError);
      expect(next).to.have.been.calledWith(transformedError);
    });

    it('should handle connection timeout', async () => {
      const timeoutError = {
        code: 'ETIMEDOUT',
        message: 'Connection timeout'
      };
      const transformedError = {
        ...timeoutError,
        data: {
          message: 'Connection timeout',
          code: 'generic-error'
        }
      };

      handlePostStub.rejects(timeoutError);
      generateErrorMessageWithCodeStub.returns(transformedError);

      await submitNoCEvents(req, res, next);

      expect(generateErrorMessageWithCodeStub).to.have.been.calledWith(timeoutError);
      expect(next).to.have.been.calledWith(transformedError);
    });
  });

  describe('Edge Cases and Integration', () => {
    beforeEach(() => {
      req = mockReq({
        query: { caseId: '1234567890123456' },
        body: { case_id: '1234567890123456' }
      });
    });

    it('should handle very long case IDs', async () => {
      const longCaseId = '1234567890123456789012345678901234567890';
      req.query.caseId = longCaseId;

      const mockResponse = createMockResponse(200, { questions: [] });
      handleGetStub.resolves(mockResponse);

      await getNoCQuestions(req, res, next);

      expect(handleGetStub.firstCall.args[0]).to.include(`case_id=${longCaseId}`);
    });

    it('should handle special characters in case ID', async () => {
      const specialCaseId = '1234-5678-9012-3456';
      req.query.caseId = specialCaseId;

      const mockResponse = createMockResponse(200, { questions: [] });
      handleGetStub.resolves(mockResponse);

      await getNoCQuestions(req, res, next);

      expect(handleGetStub.firstCall.args[0]).to.include(`case_id=${specialCaseId}`);
    });

    it('should handle multiple query parameters in case ID', async () => {
      const caseIdWithQuery = '1234567890123456&extra=param';
      req.query.caseId = caseIdWithQuery;

      const mockResponse = createMockResponse(200, { questions: [] });
      handleGetStub.resolves(mockResponse);

      await getNoCQuestions(req, res, next);

      expect(handleGetStub.firstCall.args[0]).to.include(`case_id=${caseIdWithQuery}`);
    });

    it('should handle error transformation returning null', async () => {
      const originalError = new Error('Test error');
      handleGetStub.rejects(originalError);
      generateErrorMessageWithCodeStub.returns(null);

      await getNoCQuestions(req, res, next);

      expect(next).to.have.been.calledWith(null);
    });

    it('should handle error transformation returning undefined', async () => {
      const originalError = new Error('Test error');
      handleGetStub.rejects(originalError);
      generateErrorMessageWithCodeStub.returns(undefined);

      await getNoCQuestions(req, res, next);

      expect(next).to.have.been.calledWith(undefined);
    });

    it('should handle complex request body with nested objects', async () => {
      const complexRequest = {
        case_id: '1234567890123456',
        complex_data: {
          nested: {
            field: 'value',
            array: [1, 2, 3],
            boolean: true
          }
        },
        answers: []
      };
      req.body = complexRequest;

      const mockResponse = createMockResponse(200, { status: 'success' });
      handlePostStub.resolves(mockResponse);

      await validateNoCQuestions(req, res, next);

      expect(handlePostStub.firstCall.args[1]).to.deep.equal(complexRequest);
    });
  });
});
