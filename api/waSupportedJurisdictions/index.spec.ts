import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';

chai.use(sinonChai);

describe('WA Supported Jurisdictions', () => {
  let sandbox: sinon.SinonSandbox;
  let res;
  let req;
  let next: sinon.SinonStub;
  let httpGetStub: sinon.SinonStub;
  let setHeadersStub: sinon.SinonStub;
  let getConfigValueStub: sinon.SinonStub;
  let consoleLogStub: sinon.SinonStub;
  let waSupportedJurisdictions;
  let http;
  let proxy;
  let config;
  let utils;
  let toTitleCaseStub: sinon.SinonStub;

  beforeEach(() => {
    delete require.cache[require.resolve('./index')];
    delete require.cache[require.resolve('../lib/http')];
    delete require.cache[require.resolve('../lib/proxy')];
    delete require.cache[require.resolve('../configuration')];
    delete require.cache[require.resolve('../utils')];
    delete require.cache[require.resolve('../configuration/references')];

    sandbox = sinon.createSandbox();

    config = require('../configuration');
    getConfigValueStub = sandbox.stub(config, 'getConfigValue');
    getConfigValueStub.withArgs('services.locationref.api').returns('http://test-api');
    getConfigValueStub.withArgs('waSupportedJurisdictions').returns('IA,CIVIL,PRIVATELAW,PUBLICLAW,EMPLOYMENT,ST_CIC');

    // require the modules after stubbing
    http = require('../lib/http');
    proxy = require('../lib/proxy');
    utils = require('../utils');
    waSupportedJurisdictions = require('./index');

    toTitleCaseStub = sandbox.stub(utils, 'toTitleCase');

    res = mockRes();
    req = mockReq({});
    next = sandbox.stub();
    httpGetStub = sandbox.stub(http.http, 'get');
    setHeadersStub = sandbox.stub(proxy, 'setHeaders');
    consoleLogStub = sandbox.stub(console, 'log');

    res.send.returns(res);
    res.status.returns(res);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getDetailedWASupportedJurisdictions', () => {
    const mockRefDataResponse = {
      data: [
        {
          ccd_service_name: 'IA',
          service_short_description: 'Immigration and Asylum'
        },
        {
          ccd_service_name: 'CIVIL',
          service_short_description: 'Civil'
        },
        {
          ccd_service_name: 'CIVIL',
          service_short_description: 'Civil Money Claims'
        }
      ]
    };

    beforeEach(() => {
      setHeadersStub.returns({ 'Content-Type': 'application/json' });
      toTitleCaseStub.withArgs('CIVIL').returns('Civil');
    });

    it('should get detailed supported jurisdictions successfully', async () => {
      httpGetStub.resolves(mockRefDataResponse);

      await waSupportedJurisdictions.getDetailedWASupportedJurisdictions(req, res, next);

      expect(setHeadersStub).to.have.been.calledWith(req);
      expect(httpGetStub).to.have.been.calledOnce;
      expect(httpGetStub).to.have.been.calledWith(
        'http://test-api/refdata/location/orgServices',
        { headers: { 'Content-Type': 'application/json' } }
      );

      expect(res.send).to.have.been.called;
      const actualServices = res.send.getCall(0).args[0];

      expect(actualServices).to.be.an('array');
      expect(actualServices.length).to.be.greaterThan(0);

      expect(res.status).to.have.been.calledWith(200);
      expect(next).not.to.have.been.called;
    });

    it('should handle errors when getting detailed jurisdictions', async () => {
      const error = new Error('API Error');
      httpGetStub.rejects(error);

      await waSupportedJurisdictions.getDetailedWASupportedJurisdictions(req, res, next);

      expect(httpGetStub).to.have.been.calledOnce;
      expect(res.send).not.to.have.been.called;
      expect(next).to.have.been.calledWith(error);
    });

    it('should handle empty response data', async () => {
      httpGetStub.resolves({ data: [] });

      await waSupportedJurisdictions.getDetailedWASupportedJurisdictions(req, res, next);

      expect(httpGetStub).to.have.been.calledOnce;
      expect(res.send).to.have.been.calledOnce;
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should handle null response data', async () => {
      httpGetStub.resolves({ data: null });

      await waSupportedJurisdictions.getDetailedWASupportedJurisdictions(req, res, next);

      expect(httpGetStub).to.have.been.calledOnce;
      expect(res.send).to.have.been.calledOnce;
      expect(res.status).to.have.been.calledWith(200);
    });
  });

  describe('getWASupportedJurisdictions', () => {
    it('should get supported jurisdictions', async() => {
      await waSupportedJurisdictions.getWASupportedJurisdictions(req, res, next);

      const response = ['IA', 'CIVIL', 'PRIVATELAW', 'PUBLICLAW', 'EMPLOYMENT', 'ST_CIC'];
      expect(res.send).to.have.been.calledWith(response);
      expect(res.status).to.have.been.calledWith(200);
      expect(next).not.to.have.been.called;
    });

    it('should handle errors when getting jurisdictions', async () => {
      const error = new Error('Config Error');
      getConfigValueStub.withArgs('waSupportedJurisdictions').throws(error);

      await waSupportedJurisdictions.getWASupportedJurisdictions(req, res, next);

      expect(res.send).not.to.have.been.called;
      expect(next).to.have.been.calledWith(error);
    });

    it('should handle empty jurisdiction config', async () => {
      getConfigValueStub.withArgs('waSupportedJurisdictions').returns('');

      await waSupportedJurisdictions.getWASupportedJurisdictions(req, res, next);

      expect(res.send).to.have.been.calledWith(['']);
      expect(res.status).to.have.been.calledWith(200);
    });
  });

  describe('getWASupportedJurisdictionsList', () => {
    it('should get only the list of supported jurisdictions', () => {
      const jurisdictionList = waSupportedJurisdictions.getWASupportedJurisdictionsList();

      expect(jurisdictionList).to.deep.equal(['IA', 'CIVIL', 'PRIVATELAW', 'PUBLICLAW', 'EMPLOYMENT', 'ST_CIC']);
      expect(consoleLogStub).not.to.have.been.called;
    });

    it('should handle errors and log them', () => {
      const error = new Error('Config Error');
      getConfigValueStub.withArgs('waSupportedJurisdictions').throws(error);

      const result = waSupportedJurisdictions.getWASupportedJurisdictionsList();

      expect(result).to.be.undefined;
      expect(consoleLogStub).to.have.been.calledWith(error);
    });

    it('should handle empty jurisdiction config', () => {
      getConfigValueStub.withArgs('waSupportedJurisdictions').returns('');

      const jurisdictionList = waSupportedJurisdictions.getWASupportedJurisdictionsList();

      expect(jurisdictionList).to.deep.equal(['']);
    });
  });

  describe('generateServices', () => {
    it('should generate services from ref data', () => {
      toTitleCaseStub.withArgs('CIVIL').returns('Civil');

      const refData: any[] = [
        {
          ccd_service_name: 'IA',
          service_short_description: 'Immigration and Asylum',
          jurisdiction: 'IA',
          service_id: 1,
          org_unit: 'HMCTS',
          business_area: 'CFT',
          sub_business_area: 'CFT',
          service_description: 'Immigration and Asylum',
          service_code: 'BFA1',
          last_update: '2023-01-01',
          ccd_case_types: ['Asylum']
        },
        {
          ccd_service_name: 'CIVIL',
          service_short_description: 'Civil',
          jurisdiction: 'CIVIL',
          service_id: 2,
          org_unit: 'HMCTS',
          business_area: 'CFT',
          sub_business_area: 'CFT',
          service_description: 'Civil',
          service_code: 'AAA1',
          last_update: '2023-01-01',
          ccd_case_types: ['CIVIL']
        },
        {
          ccd_service_name: 'CIVIL',
          service_short_description: 'Civil Money Claims',
          jurisdiction: 'CIVIL',
          service_id: 3,
          org_unit: 'HMCTS',
          business_area: 'CFT',
          sub_business_area: 'CFT',
          service_description: 'Civil Money Claims',
          service_code: 'AAA2',
          last_update: '2023-01-01',
          ccd_case_types: ['CIVIL']
        },
        {
          ccd_service_name: 'PRIVATELAW',
          service_short_description: 'Private Law',
          jurisdiction: 'PRIVATELAW',
          service_id: 4,
          org_unit: 'HMCTS',
          business_area: 'CFT',
          sub_business_area: 'CFT',
          service_description: 'Private Law',
          service_code: 'ABA1',
          last_update: '2023-01-01',
          ccd_case_types: ['PRLAPPS']
        }
      ];

      getConfigValueStub.withArgs('waSupportedJurisdictions').returns('IA,CIVIL,PRIVATELAW,UNKNOWN');
      const result = waSupportedJurisdictions.generateServices(refData);

      expect(result).to.have.lengthOf(4);
      expect(result[0]).to.deep.equal({ serviceId: 'IA', serviceName: 'Immigration and Asylum' });
      expect(result[1]).to.deep.equal({ serviceId: 'CIVIL', serviceName: 'Civil' });
      expect(result[2]).to.deep.equal({ serviceId: 'PRIVATELAW', serviceName: 'Private Law' });
      expect(result[3]).to.deep.equal({ serviceId: 'UNKNOWN', serviceName: 'UNKNOWN' });
    });

    it('should handle empty ref data', () => {
      getConfigValueStub.withArgs('waSupportedJurisdictions').returns('IA,CIVIL,PRIVATELAW,UNKNOWN');
      const result = waSupportedJurisdictions.generateServices([]);

      expect(result).to.have.lengthOf(4);
      expect(result[0]).to.deep.equal({ serviceId: 'IA', serviceName: 'IA' });
      expect(result[1]).to.deep.equal({ serviceId: 'CIVIL', serviceName: 'CIVIL' });
      expect(result[2]).to.deep.equal({ serviceId: 'PRIVATELAW', serviceName: 'PRIVATELAW' });
      expect(result[3]).to.deep.equal({ serviceId: 'UNKNOWN', serviceName: 'UNKNOWN' });
    });

    it('should handle null ref data', () => {
      getConfigValueStub.withArgs('waSupportedJurisdictions').returns('IA,CIVIL,PRIVATELAW,UNKNOWN');
      const result = waSupportedJurisdictions.generateServices(null);

      expect(result).to.have.lengthOf(4);
      expect(result[0]).to.deep.equal({ serviceId: 'IA', serviceName: 'IA' });
      expect(result[1]).to.deep.equal({ serviceId: 'CIVIL', serviceName: 'CIVIL' });
      expect(result[2]).to.deep.equal({ serviceId: 'PRIVATELAW', serviceName: 'PRIVATELAW' });
      expect(result[3]).to.deep.equal({ serviceId: 'UNKNOWN', serviceName: 'UNKNOWN' });
    });

    it('should handle undefined ref data', () => {
      getConfigValueStub.withArgs('waSupportedJurisdictions').returns('IA,CIVIL,PRIVATELAW,UNKNOWN');
      const result = waSupportedJurisdictions.generateServices(undefined);

      expect(result).to.have.lengthOf(4);
      expect(result[0]).to.deep.equal({ serviceId: 'IA', serviceName: 'IA' });
      expect(result[1]).to.deep.equal({ serviceId: 'CIVIL', serviceName: 'CIVIL' });
      expect(result[2]).to.deep.equal({ serviceId: 'PRIVATELAW', serviceName: 'PRIVATELAW' });
      expect(result[3]).to.deep.equal({ serviceId: 'UNKNOWN', serviceName: 'UNKNOWN' });
    });

    it('should handle case insensitive matching', () => {
      getConfigValueStub.withArgs('waSupportedJurisdictions').returns('IA,CIVIL,PRIVATELAW,UNKNOWN');
      const refData: any[] = [
        {
          ccd_service_name: 'ia',
          service_short_description: 'Immigration and Asylum',
          jurisdiction: 'IA',
          service_id: 1,
          org_unit: 'HMCTS',
          business_area: 'CFT',
          sub_business_area: 'CFT',
          service_description: 'Immigration and Asylum',
          service_code: 'BFA1',
          last_update: '2023-01-01',
          ccd_case_types: ['Asylum']
        },
        {
          ccd_service_name: 'Civil',
          service_short_description: 'Civil',
          jurisdiction: 'CIVIL',
          service_id: 2,
          org_unit: 'HMCTS',
          business_area: 'CFT',
          sub_business_area: 'CFT',
          service_description: 'Civil',
          service_code: 'AAA1',
          last_update: '2023-01-01',
          ccd_case_types: ['CIVIL']
        }
      ];

      const result = waSupportedJurisdictions.generateServices(refData);

      expect(result[0]).to.deep.equal({ serviceId: 'ia', serviceName: 'Immigration and Asylum' });
      expect(result[1]).to.deep.equal({ serviceId: 'Civil', serviceName: 'Civil' });
    });

    it('should handle ref data with null ccd_service_name', () => {
      getConfigValueStub.withArgs('waSupportedJurisdictions').returns('IA,CIVIL,PRIVATELAW,UNKNOWN');
      const refData: any[] = [
        {
          ccd_service_name: null,
          service_short_description: 'Some Service',
          jurisdiction: 'UNKNOWN',
          service_id: 999,
          org_unit: 'HMCTS',
          business_area: 'CFT',
          sub_business_area: 'CFT',
          service_description: 'Some Service',
          service_code: 'UNK1',
          last_update: '2023-01-01',
          ccd_case_types: []
        },
        {
          ccd_service_name: 'IA',
          service_short_description: 'Immigration and Asylum',
          jurisdiction: 'IA',
          service_id: 1,
          org_unit: 'HMCTS',
          business_area: 'CFT',
          sub_business_area: 'CFT',
          service_description: 'Immigration and Asylum',
          service_code: 'BFA1',
          last_update: '2023-01-01',
          ccd_case_types: ['Asylum']
        }
      ];

      const result = waSupportedJurisdictions.generateServices(refData);

      expect(result[0]).to.deep.equal({ serviceId: 'IA', serviceName: 'Immigration and Asylum' });
      expect(result[1]).to.deep.equal({ serviceId: 'CIVIL', serviceName: 'CIVIL' });
    });

    it('should handle empty jurisdiction config', () => {
      getConfigValueStub.withArgs('waSupportedJurisdictions').returns('');

      const refData: any[] = [
        {
          ccd_service_name: 'IA',
          service_short_description: 'Immigration and Asylum',
          jurisdiction: 'IA',
          service_id: 1,
          org_unit: 'HMCTS',
          business_area: 'CFT',
          sub_business_area: 'CFT',
          service_description: 'Immigration and Asylum',
          service_code: 'BFA1',
          last_update: '2023-01-01',
          ccd_case_types: ['Asylum']
        }
      ];

      const result = waSupportedJurisdictions.generateServices(refData);

      expect(result).to.have.lengthOf(1);
      expect(result[0]).to.deep.equal({ serviceId: '', serviceName: '' });
    });
  });

  describe('router', () => {
    it('should have /detail route configured', () => {
      const detailRoute = waSupportedJurisdictions.router.stack.find((layer) => layer.route && layer.route.path === '/detail');
      expect(detailRoute).to.exist;
      expect(detailRoute.route.path).to.equal('/detail');
      expect(detailRoute.route.stack).to.have.length.greaterThan(0);
    });

    it('should have /get route configured', () => {
      const getRoute = waSupportedJurisdictions.router.stack.find((layer) => layer.route && layer.route.path === '/get');
      expect(getRoute).to.exist;
      expect(getRoute.route.path).to.equal('/get');
      expect(getRoute.route.stack).to.have.length.greaterThan(0);
    });

    it('should export default router', () => {
      expect(waSupportedJurisdictions.default).to.equal(waSupportedJurisdictions.router);
    });
  });
});
