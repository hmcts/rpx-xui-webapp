import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';
import * as chai from 'chai';
import { expect } from 'chai';
import { NextFunction } from 'express';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { GlobalSearchService } from '../interfaces/globalSearchService';
import { http } from '../lib/http';
import * as globalSearchServices from './index';

chai.use(sinonChai);

describe('Jurisdiction', () => {
  let sandbox: sinon.SinonSandbox;
  const jurisdictionList: Jurisdiction[] = [
    { id: 'PROBATE', name: 'Manage probate application', description: null, caseTypes: null },
    { id: 'IA', name: 'Immigration & Asylum', description: null, caseTypes: null },
    { id: 'PUBLICLAW', name: 'Public Law', description: null, caseTypes: null },
    { id: 'DIVORCE', name: 'Family Divorce', description: null, caseTypes: null },
    { id: 'PRIVATELAW', name: 'PRIVATE LAW', description: null, caseTypes: null },
    { id: 'EMPLOYMENT', name: 'EMPLOYMENT', description: null, caseTypes: null }
  ];
  const serviceList: GlobalSearchService[] = [

    { serviceId: 'IA', serviceName: 'Immigration & Asylum' },
    { serviceId: 'CIVIL', serviceName: 'CIVIL' },
    { serviceId: 'PRIVATELAW', serviceName: 'PRIVATE LAW' },
    { serviceId: 'PUBLICLAW', serviceName: 'Public Law' },
    { serviceId: 'EMPLOYMENT', serviceName: 'EMPLOYMENT' },
    { serviceId: 'ST__CIC', serviceName: 'ST__CIC' }
  ];

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should get global search services', async() => {
    const req = mockReq();
    const res = mockRes({
      serviceList
    });
    const next = sinon.mock().atLeast(1) as NextFunction;
    sandbox.stub(http, 'get').resolves(res);
    sandbox.stub(globalSearchServices, 'getServices').returns(res);
    const response = await globalSearchServices.getServices(req, res, next);
    expect(response).to.deep.equal(res);
  });

  it('should error when getting global search services', async() => {
    const req = mockReq();
    const res = mockRes({
      status: 500
    });
    const next = sinon.mock().atLeast(1) as NextFunction;
    sandbox.stub(globalSearchServices, 'getServices').returns(res);
    const response = await globalSearchServices.getServices(req, res, next);
    expect(response).to.deep.equal(res);
  });

  it('should return global search services', async() => {
    let services = globalSearchServices.generateServices(undefined);
    expect(services.length).to.equal(6);

    services = globalSearchServices.generateServices(null);
    expect(services.length).to.equal(6);

    services = globalSearchServices.generateServices([]);
    expect(services.length).to.equal(6);
  });

  it('should return global search services', async() => {
    const services = globalSearchServices.generateServices(jurisdictionList);
    expect(services).to.deep.equal(serviceList);
  });

  it('should get global search results', async () => {
    const req = mockReq();
    const res = mockRes(
      {
        caseStartRecord: 1,
        casesReturned: 25,
        moreResultsToGo: true
      },
      [{
        ccdCaseTypeId: '123',
        ccdCaseTypeName: 'Test Case Type',
        ccdJurisdictionId: 'IA',
        ccdJurisdictionName: '',
        hmctsServiceId: '',
        hmctsServiceShortDescription: '',
        baseLocationId: '',
        baseLocationName: '',
        caseManagementCategoryId: '',
        caseManagementCategoryName: '',
        caseNameHmctsInternal: '',
        caseReference: '',
        otherReferences: [],
        processForAccess: '',
        regionId: '',
        regionName: '',
        stateId: ''
      }]
    );
    const next = sinon.mock().atLeast(1) as NextFunction;
    sandbox.stub(http, 'post').resolves(res);
    sandbox.stub(globalSearchServices, 'getSearchResults').returns(res);
    const response = await globalSearchServices.getSearchResults(req, res, next);
    expect(response).to.deep.equal(res);
  });
});
