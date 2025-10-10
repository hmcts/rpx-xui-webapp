
import * as chai from 'chai';
import { expect } from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { AxiosResponse } from 'axios';

import * as crudService from '../common/crudService';
import * as configuration from '../configuration';
import * as util from '../lib/util';
import { SERVICES_PRD_API_URL } from '../configuration/references';
import {
  handleGetOrganisationsRoute,
  handleOrganisationRoute,
  router
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

describe('Organisations API', () => {
  let sandbox: sinon.SinonSandbox;
  let req: any;
  let res: any;
  let next: sinon.SinonStub;
  let handleGetStub: sinon.SinonStub;
  let getConfigValueStub: sinon.SinonStub;
  let existsStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq();
    res = mockRes();
    next = sandbox.stub();
    handleGetStub = sandbox.stub(crudService, 'handleGet');
    getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
    existsStub = sandbox.stub(util, 'exists');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('handleGetOrganisationsRoute', () => {
    const mockPrdApiUrl = 'http://test-prd-api.com';
    const expectedPath = `${mockPrdApiUrl}/refdata/external/v1/organisations/status/ACTIVE?address=true`;

    beforeEach(() => {
      getConfigValueStub.withArgs(SERVICES_PRD_API_URL).returns(mockPrdApiUrl);
    });

    it('should successfully get organisations with organisations array in response', async () => {
      const mockOrganisations = [
        { organisationIdentifier: 'org1', name: 'Organisation 1' },
        { organisationIdentifier: 'org2', name: 'Organisation 2' }
      ];
      const mockResponse = createMockResponse(200, { organisations: mockOrganisations });

      handleGetStub.resolves(mockResponse);

      await handleGetOrganisationsRoute(req, res, next);

      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_PRD_API_URL);
      expect(handleGetStub).to.have.been.calledWith(expectedPath, req, next);
      expect(res.send).to.have.been.calledWith(mockOrganisations);
      expect(next).to.not.have.been.called;
    });

    it('should successfully get organisations without organisations array in response', async () => {
      const mockData = {
        someOtherProperty: 'value',
        organisationData: 'test'
      };
      const mockResponse = createMockResponse(200, mockData);

      handleGetStub.resolves(mockResponse);

      await handleGetOrganisationsRoute(req, res, next);

      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_PRD_API_URL);
      expect(handleGetStub).to.have.been.calledWith(expectedPath, req, next);
      expect(res.send).to.have.been.calledWith(mockData);
      expect(next).to.not.have.been.called;
    });

    it('should handle errors from handleGet and call next', async () => {
      const error = new Error('API Error');
      handleGetStub.rejects(error);

      await handleGetOrganisationsRoute(req, res, next);

      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_PRD_API_URL);
      expect(handleGetStub).to.have.been.calledWith(expectedPath, req, next);
      expect(next).to.have.been.calledWith(error);
      expect(res.send).to.not.have.been.called;
    });

    it('should handle null/undefined response data', async () => {
      const mockResponse = createMockResponse(200, null);

      handleGetStub.resolves(mockResponse);

      await handleGetOrganisationsRoute(req, res, next);

      // When response.data is null, accessing response.data.organisations throws TypeError
      // So the function catches the error and calls next(error)
      expect(next).to.have.been.called;
      expect(res.send).to.not.have.been.called;
    });

    it('should handle empty organisations array', async () => {
      const mockResponse = createMockResponse(200, { organisations: [] });

      handleGetStub.resolves(mockResponse);

      await handleGetOrganisationsRoute(req, res, next);

      expect(res.send).to.have.been.calledWith([]);
      expect(next).to.not.have.been.called;
    });

    it('should handle response data with undefined organisations property', async () => {
      const mockData = { someOtherData: 'test', organisations: undefined };
      const mockResponse = createMockResponse(200, mockData);

      handleGetStub.resolves(mockResponse);

      await handleGetOrganisationsRoute(req, res, next);

      expect(res.send).to.have.been.calledWith(mockData);
      expect(next).to.not.have.been.called;
    });

    it('should handle response data with null organisations property', async () => {
      const mockData = { someOtherData: 'test', organisations: null };
      const mockResponse = createMockResponse(200, mockData);

      handleGetStub.resolves(mockResponse);

      await handleGetOrganisationsRoute(req, res, next);

      expect(res.send).to.have.been.calledWith(mockData);
      expect(next).to.not.have.been.called;
    });

    it('should handle response data with empty string organisations property', async () => {
      const mockData = { someOtherData: 'test', organisations: '' };
      const mockResponse = createMockResponse(200, mockData);

      handleGetStub.resolves(mockResponse);

      await handleGetOrganisationsRoute(req, res, next);

      expect(res.send).to.have.been.calledWith(mockData);
      expect(next).to.not.have.been.called;
    });
  });

  describe('handleOrganisationRoute', () => {
    const mockPrdApiUrl = 'http://test-prd-api.com';
    const expectedPath = `${mockPrdApiUrl}/refdata/external/v1/organisations`;

    beforeEach(() => {
      getConfigValueStub.withArgs(SERVICES_PRD_API_URL).returns(mockPrdApiUrl);
    });

    it('should successfully get organisation data', async () => {
      const mockData = {
        organisationIdentifier: 'org1',
        name: 'Test Organisation',
        status: 'ACTIVE'
      };
      const mockResponse = createMockResponse(200, mockData);

      handleGetStub.resolves(mockResponse);

      await handleOrganisationRoute(req, res);

      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_PRD_API_URL);
      expect(handleGetStub).to.have.been.calledWith(expectedPath, req, sinon.match.func);
      expect(res.send).to.have.been.calledWith(mockData);
      expect(res.status).to.not.have.been.called;
    });

    it('should handle errors with data.message and status', async () => {
      const error = {
        data: { message: 'Organisation not found' },
        status: 404
      };

      existsStub.withArgs(error, 'data.message').returns('Organisation not found');
      existsStub.withArgs(error, 'status').returns(404);
      handleGetStub.rejects(error);

      await handleOrganisationRoute(req, res);

      expect(existsStub).to.have.been.calledWith(error, 'data.message');
      expect(existsStub).to.have.been.calledWith(error, 'status');
      expect(res.status).to.have.been.calledWith(404);
      expect(res.send).to.have.been.calledWith({
        apiError: 'Organisation not found',
        apiStatusCode: 404,
        message: 'Organisation route error'
      });
    });

    it('should handle errors without data.message but with status', async () => {
      const error = {
        status: 500
      };

      existsStub.withArgs(error, 'data.message').returns(null);
      existsStub.withArgs(error, 'status').returns(500);
      handleGetStub.rejects(error);

      await handleOrganisationRoute(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.send).to.have.been.calledWith({
        apiError: 'Unknown Error Occurred',
        apiStatusCode: 500,
        message: 'Organisation route error'
      });
    });

    it('should handle errors without data.message and without status', async () => {
      const error = new Error('Generic error');

      existsStub.withArgs(error, 'data.message').returns(null);
      existsStub.withArgs(error, 'status').returns(null);
      handleGetStub.rejects(error);

      await handleOrganisationRoute(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.send).to.have.been.calledWith({
        apiError: 'Unknown Error Occurred',
        apiStatusCode: 500,
        message: 'Organisation route error'
      });
    });

    it('should handle errors with data.message but without status', async () => {
      const error = {
        data: { message: 'Unauthorized access' }
      };

      existsStub.withArgs(error, 'data.message').returns('Unauthorized access');
      existsStub.withArgs(error, 'status').returns(null);
      handleGetStub.rejects(error);

      await handleOrganisationRoute(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.send).to.have.been.calledWith({
        apiError: 'Unauthorized access',
        apiStatusCode: 500,
        message: 'Organisation route error'
      });
    });

    it('should handle network errors', async () => {
      const error = {
        code: 'ECONNREFUSED',
        message: 'Connection refused'
      };

      existsStub.withArgs(error, 'data.message').returns(null);
      existsStub.withArgs(error, 'status').returns(null);
      handleGetStub.rejects(error);

      await handleOrganisationRoute(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.send).to.have.been.calledWith({
        apiError: 'Unknown Error Occurred',
        apiStatusCode: 500,
        message: 'Organisation route error'
      });
    });

    it('should handle null response data', async () => {
      const mockResponse = createMockResponse(200, null);

      handleGetStub.resolves(mockResponse);

      await handleOrganisationRoute(req, res);

      expect(res.send).to.have.been.calledWith(null);
    });

    it('should handle empty object response data', async () => {
      const mockResponse = createMockResponse(200, {});

      handleGetStub.resolves(mockResponse);

      await handleOrganisationRoute(req, res);

      expect(res.send).to.have.been.calledWith({});
    });

    it('should handle array response data', async () => {
      const mockData = [
        { organisationIdentifier: 'org1', name: 'Org 1' },
        { organisationIdentifier: 'org2', name: 'Org 2' }
      ];
      const mockResponse = createMockResponse(200, mockData);

      handleGetStub.resolves(mockResponse);

      await handleOrganisationRoute(req, res);

      expect(res.send).to.have.been.calledWith(mockData);
    });

    it('should handle undefined response data', async () => {
      const mockResponse = createMockResponse(200, undefined);

      handleGetStub.resolves(mockResponse);

      await handleOrganisationRoute(req, res);

      expect(res.send).to.have.been.calledWith(undefined);
    });

    it('should handle string response data', async () => {
      const mockData = 'string response';
      const mockResponse = createMockResponse(200, mockData);

      handleGetStub.resolves(mockResponse);

      await handleOrganisationRoute(req, res);

      expect(res.send).to.have.been.calledWith(mockData);
    });

    it('should handle error with missing data object completely', async () => {
      const error = { status: 403 };

      existsStub.withArgs(error, 'data.message').returns(null);
      existsStub.withArgs(error, 'status').returns(403);
      handleGetStub.rejects(error);

      await handleOrganisationRoute(req, res);

      expect(res.status).to.have.been.calledWith(403);
      expect(res.send).to.have.been.calledWith({
        apiError: 'Unknown Error Occurred',
        apiStatusCode: 403,
        message: 'Organisation route error'
      });
    });

    it('should handle timeout errors', async () => {
      const error = {
        code: 'ETIMEDOUT',
        message: 'Request timeout'
      };

      existsStub.withArgs(error, 'data.message').returns(null);
      existsStub.withArgs(error, 'status').returns(null);
      handleGetStub.rejects(error);

      await handleOrganisationRoute(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.send).to.have.been.calledWith({
        apiError: 'Unknown Error Occurred',
        apiStatusCode: 500,
        message: 'Organisation route error'
      });
    });
  });

  describe('getOrganisationUri (internal function)', () => {
    // Testing the internal function indirectly through handleGetOrganisationsRoute
    it('should construct correct URI with ACTIVE status and address parameter', async () => {
      const mockPrdApiUrl = 'http://test-prd-api.com';
      const expectedPath = `${mockPrdApiUrl}/refdata/external/v1/organisations/status/ACTIVE?address=true`;

      getConfigValueStub.withArgs(SERVICES_PRD_API_URL).returns(mockPrdApiUrl);
      handleGetStub.resolves({ data: {} });

      await handleGetOrganisationsRoute(req, res, next);

      expect(handleGetStub).to.have.been.calledWith(expectedPath, req, next);
    });

    it('should use different PRD API URL when configuration changes', async () => {
      const differentPrdApiUrl = 'http://different-prd-api.com';
      const expectedPath = `${differentPrdApiUrl}/refdata/external/v1/organisations/status/ACTIVE?address=true`;

      getConfigValueStub.withArgs(SERVICES_PRD_API_URL).returns(differentPrdApiUrl);
      handleGetStub.resolves({ data: {} });

      await handleGetOrganisationsRoute(req, res, next);

      expect(handleGetStub).to.have.been.calledWith(expectedPath, req, next);
    });
  });

  describe('error callback in handleOrganisationRoute', () => {
    it('should throw error when callback is invoked', async () => {
      const mockPrdApiUrl = 'http://test-prd-api.com';
      const testError = new Error('Callback error');

      getConfigValueStub.withArgs(SERVICES_PRD_API_URL).returns(mockPrdApiUrl);

      handleGetStub.callsFake((path, req, errorCallback) => {
        errorCallback(testError);
        return Promise.reject(testError);
      });

      existsStub.withArgs(testError, 'data.message').returns(null);
      existsStub.withArgs(testError, 'status').returns(null);

      await handleOrganisationRoute(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.send).to.have.been.calledWith({
        apiError: 'Unknown Error Occurred',
        apiStatusCode: 500,
        message: 'Organisation route error'
      });
    });
  });
});
