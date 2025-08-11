import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinonChai from 'sinon-chai';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { FEATURE_JRD_E_LINKS_V2_ENABLED } from '../../configuration/references';
import { RAW_JUDICIAL_USERS, ALL_JUDICIAL_USERS } from './data/judicial.mock.data';
import { transformToJudicialUserModel } from './models/judicialUser.model';

chai.use(sinonChai);

describe('PRD Judicial Service', () => {
  let sandbox: sinon.SinonSandbox;
  let res;
  let req;
  let next: sinon.SinonStub;
  let httpPostStub: sinon.SinonStub;
  let setHeadersStub: sinon.SinonStub;
  let getConfigValueStub: sinon.SinonStub;
  let showFeatureStub: sinon.SinonStub;
  let searchJudicialUserByPersonalCodes;
  let searchJudicialUserByIdamId;
  let getJudicialUsersSearch;

  const mockPrdUrl = 'http://mock-prd-api';

  before(() => {
    delete require.cache[require.resolve('./')];
    delete require.cache[require.resolve('../../configuration')];
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.stub();

    const configuration = require('../../configuration');
    getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
    showFeatureStub = sandbox.stub(configuration, 'showFeature');
    getConfigValueStub.returns(mockPrdUrl);

    const httpModule = require('../../lib/http');
    const proxyModule = require('../../lib/proxy');
    httpPostStub = sandbox.stub(httpModule.http, 'post');
    setHeadersStub = sandbox.stub(proxyModule, 'setHeaders');
    setHeadersStub.returns({ 'content-type': 'application/json' });

    const judicialModule = require('./');
    searchJudicialUserByPersonalCodes = judicialModule.searchJudicialUserByPersonalCodes;
    searchJudicialUserByIdamId = judicialModule.searchJudicialUserByIdamId;
    getJudicialUsersSearch = judicialModule.getJudicialUsersSearch;
  });

  afterEach(() => {
    sandbox.restore();
    delete require.cache[require.resolve('./')];
    delete require.cache[require.resolve('../../configuration')];
  });

  describe('searchJudicialUserByPersonalCodes', () => {
    beforeEach(() => {
      req = mockReq({
        headers: {},
        body: {
          personal_code: ['p1000000', 'p1000001']
        }
      });
      res = mockRes();
    });

    it('should search judicial users by personal codes with V2 header when feature is enabled', async () => {
      showFeatureStub.withArgs(FEATURE_JRD_E_LINKS_V2_ENABLED).returns(true);
      const mockResponse = {
        status: 200,
        data: [RAW_JUDICIAL_USERS[0], RAW_JUDICIAL_USERS[1]]
      };
      httpPostStub.resolves(mockResponse);

      await searchJudicialUserByPersonalCodes(req, res, next);

      expect(req.headers.accept).to.equal('application/vnd.jrd.api+json;Version=2.0');
      expect(setHeadersStub).to.have.been.calledWith(req);
      expect(httpPostStub).to.have.been.calledWith(
        `${mockPrdUrl}/refdata/judicial/users`,
        req.body,
        { headers: { 'content-type': 'application/json' } }
      );

      const expectedResult = mockResponse.data.map(transformToJudicialUserModel);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(expectedResult);
      expect(next).to.not.have.been.called;
    });

    it('should search judicial users by personal codes with V1 header when feature is disabled', async () => {
      showFeatureStub.withArgs(FEATURE_JRD_E_LINKS_V2_ENABLED).returns(false);
      const mockResponse = {
        status: 200,
        data: [RAW_JUDICIAL_USERS[0]]
      };
      httpPostStub.resolves(mockResponse);

      await searchJudicialUserByPersonalCodes(req, res, next);

      expect(req.headers.accept).to.equal('application/json');
      expect(setHeadersStub).to.have.been.calledWith(req);
      expect(httpPostStub).to.have.been.calledWith(
        `${mockPrdUrl}/refdata/judicial/users`,
        req.body,
        { headers: { 'content-type': 'application/json' } }
      );

      const expectedResult = mockResponse.data.map(transformToJudicialUserModel);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(expectedResult);
      expect(next).to.not.have.been.called;
    });

    it('should handle empty array response', async () => {
      showFeatureStub.withArgs(FEATURE_JRD_E_LINKS_V2_ENABLED).returns(true);
      const mockResponse = {
        status: 200,
        data: []
      };
      httpPostStub.resolves(mockResponse);

      await searchJudicialUserByPersonalCodes(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith([]);
      expect(next).to.not.have.been.called;
    });

    it('should handle different status codes', async () => {
      showFeatureStub.withArgs(FEATURE_JRD_E_LINKS_V2_ENABLED).returns(true);
      const mockResponse = {
        status: 404,
        data: []
      };
      httpPostStub.resolves(mockResponse);

      await searchJudicialUserByPersonalCodes(req, res, next);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.send).to.have.been.calledWith([]);
      expect(next).to.not.have.been.called;
    });

    it('should handle errors and call next', async () => {
      showFeatureStub.withArgs(FEATURE_JRD_E_LINKS_V2_ENABLED).returns(true);
      const error = new Error('Network error');
      httpPostStub.rejects(error);

      await searchJudicialUserByPersonalCodes(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });

    it('should handle null/undefined request body', async () => {
      showFeatureStub.withArgs(FEATURE_JRD_E_LINKS_V2_ENABLED).returns(true);
      req.body = null;
      const mockResponse = {
        status: 200,
        data: []
      };
      httpPostStub.resolves(mockResponse);

      await searchJudicialUserByPersonalCodes(req, res, next);

      expect(httpPostStub).to.have.been.calledWith(
        `${mockPrdUrl}/refdata/judicial/users`,
        null,
        { headers: { 'content-type': 'application/json' } }
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith([]);
      expect(next).to.not.have.been.called;
    });
  });

  describe('searchJudicialUserByIdamId', () => {
    beforeEach(() => {
      req = mockReq({
        headers: {},
        body: {
          sidam_ids: ['38eb0c5e-29c7-453e-b92d-f2029aaed6c1']
        }
      });
      res = mockRes();
    });

    it('should search judicial users by idam id with V2 header', async () => {
      const mockResponse = {
        status: 200,
        data: [RAW_JUDICIAL_USERS[0]]
      };
      httpPostStub.resolves(mockResponse);

      await searchJudicialUserByIdamId(req, res, next);

      expect(req.headers.accept).to.equal('application/vnd.jrd.api+json;Version=2.0');
      expect(setHeadersStub).to.have.been.calledWith(req);
      expect(httpPostStub).to.have.been.calledWith(
        `${mockPrdUrl}/refdata/judicial/users`,
        req.body,
        { headers: { 'content-type': 'application/json' } }
      );

      const expectedResult = mockResponse.data.map(transformToJudicialUserModel);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(expectedResult);
      expect(next).to.not.have.been.called;
    });

    it('should handle multiple idam ids', async () => {
      req.body = {
        sidam_ids: ['38eb0c5e-29c7-453e-b92d-f2029aaed6c1', '38eb0c5e-29c7-453e-b92d-f2029aaed6c2']
      };
      const mockResponse = {
        status: 200,
        data: [RAW_JUDICIAL_USERS[0], RAW_JUDICIAL_USERS[1]]
      };
      httpPostStub.resolves(mockResponse);

      await searchJudicialUserByIdamId(req, res, next);

      const expectedResult = mockResponse.data.map(transformToJudicialUserModel);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(expectedResult);
      expect(next).to.not.have.been.called;
    });

    it('should handle empty array response', async () => {
      const mockResponse = {
        status: 200,
        data: []
      };
      httpPostStub.resolves(mockResponse);

      await searchJudicialUserByIdamId(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith([]);
      expect(next).to.not.have.been.called;
    });

    it('should handle errors and call next', async () => {
      const error = new Error('Network error');
      httpPostStub.rejects(error);

      await searchJudicialUserByIdamId(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });

    it('should handle 4xx error responses', async () => {
      const error = {
        response: {
          status: 400,
          data: { error: 'Bad Request' }
        }
      };
      httpPostStub.rejects(error);

      await searchJudicialUserByIdamId(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });

    it('should handle 5xx error responses', async () => {
      const error = {
        response: {
          status: 500,
          data: { error: 'Internal Server Error' }
        }
      };
      httpPostStub.rejects(error);

      await searchJudicialUserByIdamId(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });
  });

  describe('getJudicialUsersSearch', () => {
    beforeEach(() => {
      req = mockReq({
        headers: {},
        body: {
          searchString: 'jam'
        }
      });
      res = mockRes();
    });

    it('should search judicial users by search string with V2 header when feature is enabled', async () => {
      showFeatureStub.withArgs(FEATURE_JRD_E_LINKS_V2_ENABLED).returns(true);
      const mockResponse = {
        status: 200,
        data: [ALL_JUDICIAL_USERS[2], ALL_JUDICIAL_USERS[3]]
      };
      httpPostStub.resolves(mockResponse);

      await getJudicialUsersSearch(req, res, next);

      expect(req.headers.accept).to.equal('application/vnd.jrd.api+json;Version=2.0');
      expect(setHeadersStub).to.have.been.calledWith(req);
      expect(httpPostStub).to.have.been.calledWith(
        `${mockPrdUrl}/refdata/judicial/users/search`,
        req.body,
        { headers: { 'content-type': 'application/json' } }
      );

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockResponse.data);
      expect(next).to.not.have.been.called;
    });

    it('should search judicial users by search string with V1 header when feature is disabled', async () => {
      showFeatureStub.withArgs(FEATURE_JRD_E_LINKS_V2_ENABLED).returns(false);
      const mockResponse = {
        status: 200,
        data: [ALL_JUDICIAL_USERS[0]]
      };
      httpPostStub.resolves(mockResponse);

      await getJudicialUsersSearch(req, res, next);

      expect(req.headers.accept).to.equal('application/json');
      expect(setHeadersStub).to.have.been.calledWith(req);
      expect(httpPostStub).to.have.been.calledWith(
        `${mockPrdUrl}/refdata/judicial/users/search`,
        req.body,
        { headers: { 'content-type': 'application/json' } }
      );

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockResponse.data);
      expect(next).to.not.have.been.called;
    });

    it('should handle empty search results', async () => {
      showFeatureStub.withArgs(FEATURE_JRD_E_LINKS_V2_ENABLED).returns(true);
      const mockResponse = {
        status: 200,
        data: []
      };
      httpPostStub.resolves(mockResponse);

      await getJudicialUsersSearch(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith([]);
      expect(next).to.not.have.been.called;
    });

    it('should handle case insensitive search', async () => {
      showFeatureStub.withArgs(FEATURE_JRD_E_LINKS_V2_ENABLED).returns(true);
      req.body = { searchString: 'JAM' };
      const mockResponse = {
        status: 200,
        data: [ALL_JUDICIAL_USERS[2]]
      };
      httpPostStub.resolves(mockResponse);

      await getJudicialUsersSearch(req, res, next);

      expect(httpPostStub).to.have.been.calledWith(
        `${mockPrdUrl}/refdata/judicial/users/search`,
        { searchString: 'JAM' },
        { headers: { 'content-type': 'application/json' } }
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockResponse.data);
    });

    it('should handle partial name matches', async () => {
      showFeatureStub.withArgs(FEATURE_JRD_E_LINKS_V2_ENABLED).returns(false);
      req.body = { searchString: 'ack' };
      const mockResponse = {
        status: 200,
        data: [ALL_JUDICIAL_USERS[0]]
      };
      httpPostStub.resolves(mockResponse);

      await getJudicialUsersSearch(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockResponse.data);
    });

    it('should handle errors and call next', async () => {
      showFeatureStub.withArgs(FEATURE_JRD_E_LINKS_V2_ENABLED).returns(true);
      const error = new Error('Network error');
      httpPostStub.rejects(error);

      await getJudicialUsersSearch(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });

    it('should handle empty search string', async () => {
      showFeatureStub.withArgs(FEATURE_JRD_E_LINKS_V2_ENABLED).returns(true);
      req.body = { searchString: '' };
      const mockResponse = {
        status: 200,
        data: ALL_JUDICIAL_USERS
      };
      httpPostStub.resolves(mockResponse);

      await getJudicialUsersSearch(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockResponse.data);
      expect(next).to.not.have.been.called;
    });

    it('should handle different status codes', async () => {
      showFeatureStub.withArgs(FEATURE_JRD_E_LINKS_V2_ENABLED).returns(true);
      const mockResponse = {
        status: 404,
        data: { message: 'Not found' }
      };
      httpPostStub.resolves(mockResponse);

      await getJudicialUsersSearch(req, res, next);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.send).to.have.been.calledWith(mockResponse.data);
      expect(next).to.not.have.been.called;
    });

    it('should handle undefined request body', async () => {
      showFeatureStub.withArgs(FEATURE_JRD_E_LINKS_V2_ENABLED).returns(true);
      req.body = undefined;
      const mockResponse = {
        status: 200,
        data: []
      };
      httpPostStub.resolves(mockResponse);

      await getJudicialUsersSearch(req, res, next);

      expect(httpPostStub).to.have.been.calledWith(
        `${mockPrdUrl}/refdata/judicial/users/search`,
        undefined,
        { headers: { 'content-type': 'application/json' } }
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith([]);
      expect(next).to.not.have.been.called;
    });
  });
});
