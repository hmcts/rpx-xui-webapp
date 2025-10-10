
import * as chai from 'chai';
import { expect } from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { http } from '../lib/http';
import * as proxy from '../lib/proxy';
import * as configuration from '../configuration';
import * as refDataUtils from '../ref-data/ref-data-utils';
import * as util from './util';
import { PersonRole } from './interfaces/person';
import { postFindPersonSearch } from './personService';

chai.use(sinonChai);

describe('Person Service', () => {
  let sandbox: sinon.SinonSandbox;
  let req: any;
  let res: any;
  let httpPostStub: sinon.SinonStub;
  let setHeadersStub: sinon.SinonStub;
  let getConfigValueStub: sinon.SinonStub;
  let showFeatureStub: sinon.SinonStub;
  let getServiceRefDataMappingListStub: sinon.SinonStub;
  let applySearchFilterStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq();
    res = mockRes();
    httpPostStub = sandbox.stub(http, 'post');
    setHeadersStub = sandbox.stub(proxy, 'setHeaders');
    getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
    showFeatureStub = sandbox.stub(configuration, 'showFeature');
    getServiceRefDataMappingListStub = sandbox.stub(refDataUtils, 'getServiceRefDataMappingList');
    applySearchFilterStub = sandbox.stub(util, 'applySearchFilter');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('postFindPersonSearch', () => {
    const mockServiceRefDataMapping = [
      {
        service: 'IA',
        serviceCodes: ['BBA3', 'BBA2']
      },
      {
        service: 'CIVIL',
        serviceCodes: ['AAA6', 'AAA7']
      }
    ];

    const mockJudicialSearchResponse = {
      data: [
        {
          fullName: 'Judge John Smith',
          emailId: 'john.smith@judicial.com',
          idamId: 'judicial-user-1'
        },
        {
          fullName: 'Judge Jane Doe',
          emailId: 'jane.doe@judicial.com',
          idamId: 'judicial-user-2'
        }
      ]
    };

    beforeEach(() => {
      // Mock all possible getConfigValue calls
      getConfigValueStub.callsFake((key) => {
        if (key === 'services.case.judicialApi') {
          return 'http://test-judicial-ref-url';
        }
        if (key.includes('SERVICE_REF_DATA_MAPPING')) {
          return mockServiceRefDataMapping;
        }
        return 'mocked-config-value';
      });
      getServiceRefDataMappingListStub.returns(mockServiceRefDataMapping);
      setHeadersStub.returns({ 'content-type': 'application/json' });

      // Make sure req.headers is initialized
      req.headers = req.headers || {};
    });

    describe('request validation', () => {
      it('should return 400 when request body is missing', async () => {
        req.body = undefined;

        await postFindPersonSearch(req, res);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.send).to.have.been.calledWith('searchOptions body missing. searchTerm is missing');
      });

      it('should return 400 when searchOptions is missing', async () => {
        req.body = {};

        await postFindPersonSearch(req, res);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.send).to.have.been.calledWith('searchOptions body missing. searchTerm is missing');
      });

      it('should return 400 when searchTerm is missing', async () => {
        req.body = {
          searchOptions: {}
        };

        await postFindPersonSearch(req, res);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.send).to.have.been.calledWith('searchOptions body missing. searchTerm is missing');
      });

      it('should return 400 when searchTerm is empty string', async () => {
        req.body = {
          searchOptions: {
            searchTerm: ''
          }
        };

        await postFindPersonSearch(req, res);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.send).to.have.been.calledWith('searchOptions body missing. searchTerm is missing');
      });

      it('should return 400 when searchTerm is null', async () => {
        req.body = {
          searchOptions: {
            searchTerm: null
          }
        };

        await postFindPersonSearch(req, res);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.send).to.have.been.calledWith('searchOptions body missing. searchTerm is missing');
      });
    });

    describe('judicial role search', () => {
      beforeEach(() => {
        req.body = {
          searchOptions: {
            searchTerm: 'John',
            userRole: PersonRole.JUDICIAL,
            services: ['IA', 'CIVIL']
          }
        };
      });

      it('should search judicial users with V1 API when feature flag is disabled', async () => {
        showFeatureStub.returns(false);
        httpPostStub.resolves(mockJudicialSearchResponse);

        await postFindPersonSearch(req, res);

        expect(req.headers.accept).to.equal('application/json');
        expect(setHeadersStub).to.have.been.calledWith(req);
        // Should call API 4 times (2 service codes for IA + 2 service codes for CIVIL)
        expect(httpPostStub).to.have.callCount(4);

        // Verify the calls contain the correct parameters
        expect(httpPostStub.firstCall.args[1]).to.deep.equal({
          searchString: 'John',
          serviceCode: 'BBA3'
        });
        expect(httpPostStub.secondCall.args[1]).to.deep.equal({
          searchString: 'John',
          serviceCode: 'BBA2'
        });

        expect(res.status).to.have.been.calledWith(200);
        expect(res.send).to.have.been.called;
      });

      it('should search judicial users with V2 API when feature flag is enabled', async () => {
        showFeatureStub.returns(true);
        httpPostStub.resolves(mockJudicialSearchResponse);

        await postFindPersonSearch(req, res);

        expect(req.headers.accept).to.equal('application/vnd.jrd.api+json;Version=2.0');
        expect(setHeadersStub).to.have.been.calledWith(req);
        expect(httpPostStub).to.have.been.called;
        expect(res.status).to.have.been.calledWith(200);
      });

      it('should handle multiple services correctly', async () => {
        showFeatureStub.returns(false);
        httpPostStub.resolves(mockJudicialSearchResponse);

        await postFindPersonSearch(req, res);

        // Should call API 4 times (2 service codes for IA + 2 service codes for CIVIL)
        expect(httpPostStub).to.have.callCount(4);

        // Verify service codes are used correctly
        const firstCall = httpPostStub.getCall(0);
        const secondCall = httpPostStub.getCall(1);
        const thirdCall = httpPostStub.getCall(2);
        const fourthCall = httpPostStub.getCall(3);

        expect(firstCall.args[1].serviceCode).to.equal('BBA3');
        expect(secondCall.args[1].serviceCode).to.equal('BBA2');
        expect(thirdCall.args[1].serviceCode).to.equal('AAA6');
        expect(fourthCall.args[1].serviceCode).to.equal('AAA7');
      });

      it('should handle empty response data', async () => {
        showFeatureStub.returns(false);
        httpPostStub.resolves({ data: null });

        await postFindPersonSearch(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.send).to.have.been.calledWith([]);
      });

      it('should handle undefined response data', async () => {
        showFeatureStub.returns(false);
        httpPostStub.resolves({ data: undefined });

        await postFindPersonSearch(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.send).to.have.been.calledWith([]);
      });

      it('should handle empty array response data', async () => {
        showFeatureStub.returns(false);
        httpPostStub.resolves({ data: [] });

        await postFindPersonSearch(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.send).to.have.been.calledWith([]);
      });

      it('should handle 404 error from judicial API', async () => {
        showFeatureStub.returns(false);
        const error = new Error('Not Found');
        (error as any).status = 404;
        httpPostStub.rejects(error);

        await postFindPersonSearch(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.send).to.have.been.calledWith([]);
      });

      it('should handle 500 error from judicial API', async () => {
        showFeatureStub.returns(false);
        const error = new Error('Internal Server Error');
        (error as any).status = 500;
        (error as any).data = { errorMessage: 'Database connection failed' };
        httpPostStub.rejects(error);

        await postFindPersonSearch(req, res);

        expect(res.status).to.have.been.calledWith(500);
        expect(res.send).to.have.been.calledWith('Database connection failed');
      });

      it('should throw TypeError when error has no data property', async () => {
        showFeatureStub.returns(false);
        const error = new Error('Network Error');
        (error as any).status = 503;
        httpPostStub.rejects(error);

        try {
          await postFindPersonSearch(req, res);
          expect.fail('Should have thrown an error');
        } catch (thrownError) {
          expect(thrownError).to.be.an('error');
          expect(thrownError.message).to.include('Cannot read properties of undefined');
        }
      });

      it('should handle error without errorMessage in data', async () => {
        showFeatureStub.returns(false);
        const error = new Error('Bad Request');
        (error as any).status = 400;
        (error as any).data = {};
        httpPostStub.rejects(error);

        await postFindPersonSearch(req, res);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.send).to.have.been.calledWith(undefined);
      });

      it('should transform judicial response data correctly', async () => {
        showFeatureStub.returns(false);
        const mockResponse = {
          data: [
            {
              fullName: 'Judge Test',
              emailId: 'test@judicial.com',
              idamId: 'test-id-123',
              additionalField: 'should be ignored'
            }
          ]
        };
        httpPostStub.resolves(mockResponse);

        await postFindPersonSearch(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.send).to.have.been.called;

        // Check that the response contains the transformed data
        const responseData = res.send.getCall(0).args[0];
        expect(responseData).to.be.an('array');
        expect(responseData.length).to.be.greaterThan(0);
        expect(responseData[0]).to.include({
          name: 'Judge Test',
          email: 'test@judicial.com',
          id: 'test-id-123'
        });
      });

      it('should handle single service correctly', async () => {
        req.body.searchOptions.services = ['IA'];
        showFeatureStub.returns(false);
        httpPostStub.resolves(mockJudicialSearchResponse);

        await postFindPersonSearch(req, res);

        // Should call API 2 times (2 service codes for IA only)
        expect(httpPostStub).to.have.been.calledTwice;
        expect(httpPostStub.firstCall.args[1].serviceCode).to.equal('BBA3');
        expect(httpPostStub.secondCall.args[1].serviceCode).to.equal('BBA2');
      });

      it('should handle empty services array', async () => {
        req.body.searchOptions.services = [];
        showFeatureStub.returns(false);

        await postFindPersonSearch(req, res);

        expect(httpPostStub).to.not.have.been.called;
        expect(res.status).to.have.been.calledWith(200);
        expect(res.send).to.have.been.calledWith([]);
      });

      it('should handle unknown service', async () => {
        req.body.searchOptions.services = ['UNKNOWN_SERVICE'];
        showFeatureStub.returns(false);

        await postFindPersonSearch(req, res);

        expect(httpPostStub).to.not.have.been.called;
        expect(res.status).to.have.been.calledWith(200);
        expect(res.send).to.have.been.calledWith([]);
      });
    });

    describe('non-judicial role search', () => {
      beforeEach(() => {
        req.body = {
          searchOptions: {
            searchTerm: 'John',
            userRole: PersonRole.LEGAL_OPERATIONS,
            services: ['IA']
          }
        };
      });

      it('should search legal operations users using mock data', async () => {
        const mockFilteredPersons = [
          {
            id: '49db7670-09b3-49e3-b945-b98f4e5e9a99',
            name: 'John Legal',
            email: 'john.legal@legalops.com',
            domain: PersonRole.LEGAL_OPERATIONS
          }
        ];
        applySearchFilterStub.returns(true);
        applySearchFilterStub.onCall(0).returns(true);
        applySearchFilterStub.onCall(1).returns(false);

        await postFindPersonSearch(req, res);

        expect(httpPostStub).to.not.have.been.called;
        expect(applySearchFilterStub).to.have.been.called;
        expect(res.status).to.have.been.calledWith(200);
      });

      it('should handle ADMIN role search', async () => {
        req.body.searchOptions.userRole = PersonRole.ADMIN;
        applySearchFilterStub.returns(false);

        await postFindPersonSearch(req, res);

        expect(httpPostStub).to.not.have.been.called;
        expect(applySearchFilterStub.firstCall.args[1]).to.equal('Admin');
        expect(applySearchFilterStub).to.have.been.called;
        expect(res.status).to.have.been.calledWith(200);
        expect(res.send).to.have.been.calledWith([]);
      });

      it('should handle CTSC role search', async () => {
        req.body.searchOptions.userRole = PersonRole.CTSC;
        applySearchFilterStub.returns(false);

        await postFindPersonSearch(req, res);

        expect(httpPostStub).to.not.have.been.called;
        expect(applySearchFilterStub.firstCall.args[1]).to.equal('CTSC');
        expect(applySearchFilterStub).to.have.been.called;
        expect(res.status).to.have.been.calledWith(200);
        expect(res.send).to.have.been.calledWith([]);
      });

      it('should handle ALL role search', async () => {
        req.body.searchOptions.userRole = PersonRole.ALL;
        applySearchFilterStub.returns(false);

        await postFindPersonSearch(req, res);

        expect(httpPostStub).to.not.have.been.called;
        expect(applySearchFilterStub.firstCall.args[1]).to.equal('All');
        expect(applySearchFilterStub).to.have.been.called;
        expect(res.status).to.have.been.calledWith(200);
        expect(res.send).to.have.been.calledWith([]);
      });
    });

    describe('edge cases', () => {
      it('should handle null userRole', async () => {
        req.body = {
          searchOptions: {
            searchTerm: 'John',
            userRole: null,
            services: ['IA']
          }
        };
        applySearchFilterStub.returns(false);

        await postFindPersonSearch(req, res);

        expect(httpPostStub).to.not.have.been.called;
        expect(res.status).to.have.been.calledWith(200);
        expect(res.send).to.have.been.calledWith([]);
      });

      it('should handle undefined userRole', async () => {
        req.body = {
          searchOptions: {
            searchTerm: 'John',
            services: ['IA']
          }
        };
        applySearchFilterStub.returns(false);

        await postFindPersonSearch(req, res);

        expect(httpPostStub).to.not.have.been.called;
        expect(res.status).to.have.been.calledWith(200);
        expect(res.send).to.have.been.calledWith([]);
      });

      it('should throw TypeError when services is null', async () => {
        req.body = {
          searchOptions: {
            searchTerm: 'John',
            userRole: PersonRole.JUDICIAL,
            services: null
          }
        };
        showFeatureStub.returns(false);

        try {
          await postFindPersonSearch(req, res);
          expect.fail('Should have thrown an error');
        } catch (thrownError) {
          expect(thrownError).to.be.an('error');
          expect(thrownError.message).to.include('Cannot read properties of null');
        }
      });

      it('should throw TypeError when services is undefined', async () => {
        req.body = {
          searchOptions: {
            searchTerm: 'John',
            userRole: PersonRole.JUDICIAL
          }
        };
        showFeatureStub.returns(false);

        try {
          await postFindPersonSearch(req, res);
          expect.fail('Should have thrown an error');
        } catch (thrownError) {
          expect(thrownError).to.be.an('error');
          expect(thrownError.message).to.include('Cannot read properties of undefined');
        }
      });

      it('should throw TypeError when getServiceRefDataMappingList returns null', async () => {
        req.body = {
          searchOptions: {
            searchTerm: 'John',
            userRole: PersonRole.JUDICIAL,
            services: ['IA']
          }
        };
        getServiceRefDataMappingListStub.returns(null);
        showFeatureStub.returns(false);

        try {
          await postFindPersonSearch(req, res);
          expect.fail('Should have thrown an error');
        } catch (thrownError) {
          expect(thrownError).to.be.an('error');
          expect(thrownError.message).to.include('Cannot read properties of null');
        }
      });

      it('should throw TypeError when getServiceRefDataMappingList returns undefined', async () => {
        req.body = {
          searchOptions: {
            searchTerm: 'John',
            userRole: PersonRole.JUDICIAL,
            services: ['IA']
          }
        };
        getServiceRefDataMappingListStub.returns(undefined);
        showFeatureStub.returns(false);

        try {
          await postFindPersonSearch(req, res);
          expect.fail('Should have thrown an error');
        } catch (thrownError) {
          expect(thrownError).to.be.an('error');
          expect(thrownError.message).to.include('Cannot read properties of undefined');
        }
      });

      it('should handle empty service ref data mapping', async () => {
        req.body = {
          searchOptions: {
            searchTerm: 'John',
            userRole: PersonRole.JUDICIAL,
            services: ['IA']
          }
        };
        getServiceRefDataMappingListStub.returns([]);
        showFeatureStub.returns(false);

        await postFindPersonSearch(req, res);

        expect(httpPostStub).to.not.have.been.called;
        expect(res.status).to.have.been.calledWith(200);
        expect(res.send).to.have.been.calledWith([]);
      });

      it('should handle service with empty serviceCodes array', async () => {
        req.body = {
          searchOptions: {
            searchTerm: 'John',
            userRole: PersonRole.JUDICIAL,
            services: ['IA']
          }
        };
        getServiceRefDataMappingListStub.returns([
          {
            service: 'IA',
            serviceCodes: []
          }
        ]);
        showFeatureStub.returns(false);

        await postFindPersonSearch(req, res);

        expect(httpPostStub).to.not.have.been.called;
        expect(res.status).to.have.been.calledWith(200);
        expect(res.send).to.have.been.calledWith([]);
      });

      it('should throw TypeError when service has null serviceCodes', async () => {
        req.body = {
          searchOptions: {
            searchTerm: 'John',
            userRole: PersonRole.JUDICIAL,
            services: ['IA']
          }
        };
        getServiceRefDataMappingListStub.returns([
          {
            service: 'IA',
            serviceCodes: null
          }
        ]);
        showFeatureStub.returns(false);

        try {
          await postFindPersonSearch(req, res);
          expect.fail('Should have thrown an error');
        } catch (thrownError) {
          expect(thrownError).to.be.an('error');
          expect(thrownError.message).to.include('Cannot read properties of null');
        }
      });
    });
  });
});
