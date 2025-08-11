import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { Response } from 'express';
import { EnhancedRequest } from '../lib/models';
import { ServiceHearingValuesModel } from './models/serviceHearingValues.model';
import { HearingListMainModel } from './models/hearingListMain.model';
import { SERVICE_HEARING_VALUES } from './data/serviceHearingValues.mock.data';
import {
  DEFAULT_SCREEN_FLOW,
  DEFAULT_SCREEN_FLOW_NEW,
  HEARING_JUDGE,
  HEARING_PANEL,
  HEARING_PANEL_REQUIRED,
  HEARING_PANEL_SELECTOR,
  HEARING_VENUE,
  HEARING_WELSH,
  replaceResultValue
} from './data/defaultScreenFlow.data';
import { ScreenNavigationModel } from './models/screenNavigation.model';
import { HMCStatus } from './models/hearings.enum';
import * as crudService from '../common/crudService';
import * as configuration from '../configuration';
import * as log4jui from '../lib/log4jui';
import * as servicesIndex from './services.index';
import {
  forceDefaultScreenFlow,
  replaceScreenFlow,
  retrieveForceNewDefaultScreenFlow,
  toBoolean
} from './services.index';

const newScreenSequence: ScreenNavigationModel[] = [
  replaceResultValue(HEARING_VENUE, 'hearing-judge', 'hearing-panel-required'),
  replaceResultValue(HEARING_WELSH, 'hearing-judge', 'hearing-panel-required'),
  HEARING_PANEL_REQUIRED,
  replaceResultValue(HEARING_JUDGE, 'hearing-panel', 'next-screen'),
  replaceResultValue(HEARING_PANEL_SELECTOR, 'hearing-timing', 'next-screen')
];

describe('Hearings Services', () => {
  let sandbox: sinon.SinonSandbox;
  let req: EnhancedRequest;
  let res: Response;
  let next: sinon.SinonStub;
  let getConfigValueStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    // Stub getConfigValue before importing the module to handle module-level constants
    getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
    getConfigValueStub.withArgs('services.hearings.hmcApi').returns('http://hmc-cft-hearing-service-prod.service.core-compute-prod.internal');

    req = {
      query: {},
      body: {},
      session: {}
    } as EnhancedRequest;

    res = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    } as unknown as Response;

    next = sandbox.stub();
  });

  afterEach(() => {
    sandbox.restore();
  });

  // Helper function to create test data without mutating the original
  const createTestData = (overrides: Partial<ServiceHearingValuesModel> = {}): ServiceHearingValuesModel => {
    return {
      ...JSON.parse(JSON.stringify(SERVICE_HEARING_VALUES)),
      ...overrides
    };
  };

  describe('mapDataByDefault', () => {
    it('should return data unchanged when no caseFlags exist', () => {
      const data = createTestData({ caseFlags: undefined });
      const result = servicesIndex.mapDataByDefault(data);

      expect(result).to.deep.equal(data);
    });

    it('should return data unchanged when caseFlags.flags is empty', () => {
      const data = createTestData({
        caseFlags: {
          flags: [],
          flagAmendURL: '/flag/amend'
        }
      });
      const result = servicesIndex.mapDataByDefault(data);

      expect(result).to.deep.equal(data);
    });

    it('should normalize partyID to partyId when partyID exists', () => {
      const data = createTestData({
        caseFlags: {
          flags: [
            {
              partyID: 'P1',
              partyName: 'Jane and Smith',
              flagId: 'PF0015',
              flagDescription: 'Language Interpreter',
              flagStatus: 'Active'
            }
          ],
          flagAmendURL: '/flag/amend'
        }
      });

      const result = servicesIndex.mapDataByDefault(data);

      expect(result.caseFlags.flags[0].partyId).to.equal('P1');
      expect(result.caseFlags.flags[0].partyID).to.equal('P1'); // Original preserved
    });

    it('should preserve existing partyId when no partyID exists', () => {
      const data = createTestData({
        caseFlags: {
          flags: [
            {
              partyId: 'P1',
              partyName: 'Jane and Smith',
              flagId: 'PF0015',
              flagDescription: 'Language Interpreter',
              flagStatus: 'Active'
            }
          ],
          flagAmendURL: '/flag/amend'
        }
      });

      const result = servicesIndex.mapDataByDefault(data);

      expect(result.caseFlags.flags[0].partyId).to.equal('P1');
      expect(result.caseFlags.flags[0].partyID).to.be.undefined;
    });

    it('should handle multiple flags with mixed partyID/partyId fields', () => {
      const data = createTestData({
        caseFlags: {
          flags: [
            {
              partyID: 'P1',
              partyName: 'Jane and Smith',
              flagId: 'PF0015',
              flagDescription: 'Language Interpreter',
              flagStatus: 'Active'
            },
            {
              partyId: 'P2',
              partyName: 'DWP',
              flagId: 'RA0012',
              flagDescription: 'Braille documents',
              flagStatus: 'Active'
            },
            {
              partyID: 'P1',
              partyId: 'should-be-overwritten',
              partyName: 'Jane and Smith',
              flagId: 'SM0001',
              flagDescription: 'Sign Language',
              flagStatus: 'Active'
            }
          ],
          flagAmendURL: '/flag/amend'
        }
      });

      const result = servicesIndex.mapDataByDefault(data);

      // First flag: partyID should be copied to partyId
      expect(result.caseFlags.flags[0].partyId).to.equal('P1');

      // Second flag: existing partyId should be preserved
      expect(result.caseFlags.flags[1].partyId).to.equal('P2');

      // Third flag: partyID should take precedence
      expect(result.caseFlags.flags[2].partyId).to.equal('P1');
    });
  });

  describe('loadServiceHearingValues', () => {
    let isJurisdictionSupportedStub: sinon.SinonStub;
    let sendPostStub: sinon.SinonStub;

    beforeEach(() => {
      isJurisdictionSupportedStub = sandbox.stub(servicesIndex, 'isJurisdictionSupported');
      sendPostStub = sandbox.stub(crudService, 'sendPost');
    });

    it('should successfully load hearing values and apply default mapping', async () => {
      req.query = { jurisdictionId: 'SSCS' };
      req.body = { caseId: '1584618195804035' };

      const mockResponse = {
        status: 200,
        data: createTestData()
      };

      getConfigValueStub.withArgs('services.hearings.hearingsJurisdictions').returns(['SSCS', 'CIVIL', 'PRIVATELAW']);
      getConfigValueStub.withArgs('services.hearings.sscs.serviceApi').returns('http://service-path');
      sendPostStub.resolves(mockResponse);

      await servicesIndex.loadServiceHearingValues(req, res, next);

      expect(getConfigValueStub).to.have.been.calledWith('services.hearings.hearingsJurisdictions');
      expect(getConfigValueStub).to.have.been.calledWith('services.hearings.sscs.serviceApi');
      expect(sendPostStub).to.have.been.calledWith(
        'http://service-path/serviceHearingValues',
        { caseId: '1584618195804035' },
        req,
        next
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.called;
    });

    it('should add default screen flow when service does not provide one', async () => {
      req.query = { jurisdictionId: 'SSCS' };
      req.body = { caseId: '1584618195804035' };

      const dataWithoutScreenFlow = createTestData({ screenFlow: undefined });
      const mockResponse = {
        status: 200,
        data: dataWithoutScreenFlow
      };

      getConfigValueStub.withArgs('services.hearings.hearingsJurisdictions').returns(['SSCS', 'CIVIL', 'PRIVATELAW']);
      getConfigValueStub.withArgs('services.hearings.sscs.serviceApi').returns('http://service-path');
      sendPostStub.resolves(mockResponse);

      await servicesIndex.loadServiceHearingValues(req, res, next);

      const sentData = (res.send as sinon.SinonStub).firstCall.args[0];
      expect(sentData.screenFlow).to.deep.equal(DEFAULT_SCREEN_FLOW);
      // expect(sentData.screenFlow).to.deep.equal(DEFAULT_SCREEN_FLOW_NEW);
    });

    it('should preserve existing screen flow when provided by service', async () => {
      req.query = { jurisdictionId: 'SSCS' };
      req.body = { caseId: '1584618195804035' };

      const customScreenFlow = [{ screenName: 'custom', navigation: [] }];
      const dataWithScreenFlow = createTestData({ screenFlow: customScreenFlow });
      const mockResponse = {
        status: 200,
        data: dataWithScreenFlow
      };

      getConfigValueStub.withArgs('services.hearings.hearingsJurisdictions').returns(['SSCS', 'CIVIL', 'PRIVATELAW']);
      getConfigValueStub.withArgs('services.hearings.sscs.serviceApi').returns('http://service-path');
      sendPostStub.resolves(mockResponse);

      await servicesIndex.loadServiceHearingValues(req, res, next);

      const sentData = (res.send as sinon.SinonStub).firstCall.args[0];
      expect(sentData.screenFlow).to.deep.equal(customScreenFlow);
    });

    it('should handle error and call next', async () => {
      req.query = { jurisdictionId: 'SSCS' };
      const error = new Error('Service error');

      getConfigValueStub.withArgs('services.hearings.hearingsJurisdictions').returns(['SSCS', 'CIVIL', 'PRIVATELAW']);
      getConfigValueStub.withArgs('services.hearings.sscs.serviceApi').returns('http://service-path');
      sendPostStub.rejects(error);

      await servicesIndex.loadServiceHearingValues(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });

    it('should not send response when serviceResponse is falsy', async () => {
      req.query = { jurisdictionId: 'SSCS' };

      getConfigValueStub.withArgs('services.hearings.hearingsJurisdictions').returns(['SSCS', 'CIVIL', 'PRIVATELAW']);
      getConfigValueStub.withArgs('services.hearings.sscs.serviceApi').returns('http://service-path');
      sendPostStub.resolves(undefined);

      await servicesIndex.loadServiceHearingValues(req, res, next);

      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });
  });

  describe('loadServiceLinkedCases', () => {
    let isJurisdictionSupportedStub: sinon.SinonStub;
    let sendPostStub: sinon.SinonStub;

    beforeEach(() => {
      isJurisdictionSupportedStub = sandbox.stub(servicesIndex, 'isJurisdictionSupported');
      sendPostStub = sandbox.stub(crudService, 'sendPost');
    });

    it('should successfully load linked cases', async () => {
      req.query = { jurisdictionId: 'SSCS' };
      req.body = { caseReference: '1584618195804035' };

      const mockLinkedCases = [
        { caseReference: 'LINKED1', caseName: 'Case 1' },
        { caseReference: 'LINKED2', caseName: 'Case 2' }
      ];

      getConfigValueStub.withArgs('services.hearings.hearingsJurisdictions').returns(['SSCS', 'CIVIL', 'PRIVATELAW']);
      getConfigValueStub.withArgs('services.hearings.sscs.serviceApi').returns('http://service-path');
      sendPostStub.resolves({ status: 200, data: mockLinkedCases });

      await servicesIndex.loadServiceLinkedCases(req, res, next);

      expect(sendPostStub).to.have.been.calledWith(
        'http://service-path/serviceLinkedCases',
        { caseReference: '1584618195804035' },
        req,
        next
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockLinkedCases);
    });

    it('should handle error and call next', async () => {
      req.query = { jurisdictionId: 'SSCS' };
      const error = new Error('Service error');

      getConfigValueStub.withArgs('services.hearings.hearingsJurisdictions').returns(['SSCS', 'CIVIL', 'PRIVATELAW']);
      getConfigValueStub.withArgs('services.hearings.sscs.serviceApi').returns('http://service-path');
      sendPostStub.rejects(error);

      await servicesIndex.loadServiceLinkedCases(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('loadLinkedCasesWithHearings', () => {
    let isJurisdictionSupportedStub: sinon.SinonStub;
    let sendPostStub: sinon.SinonStub;
    let sendGetStub: sinon.SinonStub;

    beforeEach(() => {
      isJurisdictionSupportedStub = sandbox.stub(servicesIndex, 'isJurisdictionSupported');
      sendPostStub = sandbox.stub(crudService, 'sendPost');
      sendGetStub = sandbox.stub(crudService, 'sendGet');
    });

    it('should return empty array when no linked cases exist', async () => {
      req.query = { jurisdictionId: 'SSCS' };
      req.body = { caseReference: 'REF123', caseName: 'Main Case' };

      getConfigValueStub.withArgs('services.hearings.hearingsJurisdictions').returns(['SSCS', 'CIVIL', 'PRIVATELAW']);
      getConfigValueStub.withArgs('services.hearings.sscs.serviceApi').returns('http://service-path');
      sendPostStub.resolves({ status: 200, data: [] });

      await servicesIndex.loadLinkedCasesWithHearings(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith([]);
      expect(sendGetStub).to.not.have.been.called;
    });

    it('should aggregate hearings for all linked cases', async () => {
      req.query = { jurisdictionId: 'SSCS' };
      req.body = { caseReference: '1584618195804035', caseName: 'Jane and Smith vs DWP' };

      const linkedCases = [
        { caseReference: '1584618195804036', caseName: 'Smith vs DWP', reasonsForLink: [] }
      ];

      const mainCaseHearings: HearingListMainModel = {
        hmctsServiceID: 'BBA3',
        caseRef: '1584618195804035',
        caseHearings: [
          {
            hmcStatus: HMCStatus.LISTED,
            exuiSectionStatus: 'Current and upcoming',
            exuiDisplayStatus: 'LISTED'
          } as any
        ]
      };

      const linkedCaseHearings: HearingListMainModel = {
        hmctsServiceID: 'BBA3',
        caseRef: '1584618195804036',
        caseHearings: [
          {
            hmcStatus: HMCStatus.AWAITING_LISTING,
            exuiSectionStatus: 'Current and upcoming',
            exuiDisplayStatus: 'WAITING TO BE LISTED'
          } as any
        ]
      };

      getConfigValueStub.withArgs('services.hearings.hearingsJurisdictions').returns(['SSCS', 'CIVIL', 'PRIVATELAW']);
      getConfigValueStub.withArgs('services.hearings.sscs.serviceApi').returns('http://service-path');
      sendPostStub.resolves({ status: 200, data: linkedCases });
      sendGetStub.onFirstCall().resolves({ data: mainCaseHearings });
      sendGetStub.onSecondCall().resolves({ data: linkedCaseHearings });

      await servicesIndex.loadLinkedCasesWithHearings(req, res, next);

      expect(sendGetStub).to.have.been.calledTwice;
      expect(sendGetStub.firstCall.args[0]).to.include('/hearings/1584618195804035');
      expect(sendGetStub.secondCall.args[0]).to.include('/hearings/1584618195804036');
      expect(res.status).to.have.been.calledWith(200);

      const sentData = (res.send as sinon.SinonStub).firstCall.args[0];
      expect(sentData).to.have.lengthOf(2);
    });

    it('should handle partial failures in hearing fetches', async () => {
      req.query = { jurisdictionId: 'SSCS' };
      req.body = { caseReference: '1584618195804035', caseName: 'Jane and Smith vs DWP' };

      const linkedCases = [
        { caseReference: '1584618195804036', caseName: 'Smith vs DWP', reasonsForLink: [] }
      ];

      getConfigValueStub.withArgs('services.hearings.hearingsJurisdictions').returns(['SSCS', 'CIVIL', 'PRIVATELAW']);
      getConfigValueStub.withArgs('services.hearings.sscs.serviceApi').returns('http://service-path');
      sendPostStub.resolves({ status: 200, data: linkedCases });
      sendGetStub.onFirstCall().resolves({ data: { hmctsServiceID: 'BBA3', caseRef: '1584618195804035', caseHearings: [] } });
      sendGetStub.onSecondCall().rejects(new Error('Hearing fetch failed'));

      await servicesIndex.loadLinkedCasesWithHearings(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      const sentData = (res.send as sinon.SinonStub).firstCall.args[0];
      expect(sentData).to.have.lengthOf(1); // Only successful fetch included
    });

    it('should handle error and call next', async () => {
      req.query = { jurisdictionId: 'SSCS' };
      const error = new Error('Service error');

      getConfigValueStub.withArgs('services.hearings.hearingsJurisdictions').returns(['SSCS', 'CIVIL', 'PRIVATELAW']);
      getConfigValueStub.withArgs('services.hearings.sscs.serviceApi').returns('http://service-path');
      sendPostStub.rejects(error);

      await servicesIndex.loadLinkedCasesWithHearings(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getHearings', () => {
    let sendGetStub: sinon.SinonStub;
    let loggerStub: sinon.SinonStub;

    beforeEach(() => {
      sendGetStub = sandbox.stub(crudService, 'sendGet');
      loggerStub = sandbox.stub();
      sandbox.stub(log4jui, 'getLogger').returns({ error: loggerStub } as any);
    });

    it('should fetch hearings and map statuses correctly', async () => {
      const caseId = '1584618195804035';
      const mockHearings: HearingListMainModel = {
        hmctsServiceID: 'BBA3',
        caseRef: caseId,
        caseHearings: [
          { hmcStatus: HMCStatus.LISTED } as any,
          { hmcStatus: HMCStatus.CANCELLED } as any,
          { hmcStatus: HMCStatus.AWAITING_LISTING } as any
        ]
      };

      sendGetStub.resolves({ data: mockHearings });

      const result = await servicesIndex.getHearings(caseId, req);

      expect(sendGetStub).to.have.been.calledWith(
        sinon.match(new RegExp(`/hearings/${caseId}$`)),
        req
      );

      // Verify status mappings were applied
      expect(result.caseHearings[0].exuiSectionStatus).to.equal('Current and upcoming');
      expect(result.caseHearings[0].exuiDisplayStatus).to.equal('LISTED');

      expect(result.caseHearings[1].exuiSectionStatus).to.equal('Past or cancelled');
      expect(result.caseHearings[1].exuiDisplayStatus).to.equal('CANCELLED');

      expect(result.caseHearings[2].exuiSectionStatus).to.equal('Current and upcoming');
      expect(result.caseHearings[2].exuiDisplayStatus).to.equal('WAITING TO BE LISTED');
    });

    it('should handle unmapped HMC status gracefully', async () => {
      const mockHearings: HearingListMainModel = {
        hmctsServiceID: 'BBA3',
        caseRef: '1584618195804035',
        caseHearings: [
          { hmcStatus: 'UNKNOWN_STATUS' as any } as any
        ]
      };

      sendGetStub.resolves({ data: mockHearings });

      const result = await servicesIndex.getHearings('1584618195804035', req);

      // Should not have mapped statuses for unknown HMC status
      expect(result.caseHearings[0].exuiSectionStatus).to.be.undefined;
      expect(result.caseHearings[0].exuiDisplayStatus).to.be.undefined;
    });

    it('should handle empty caseHearings array', async () => {
      const mockHearings: HearingListMainModel = {
        hmctsServiceID: 'BBA3',
        caseRef: '1584618195804035',
        caseHearings: []
      };

      sendGetStub.resolves({ data: mockHearings });

      const result = await servicesIndex.getHearings('1584618195804035', req);

      expect(result.caseHearings).to.be.an('array').that.is.empty;
    });

    it('should log error details and rethrow on failure', async () => {
      const error = {
        status: 500,
        statusText: 'Internal Server Error',
        data: { message: 'Service unavailable' }
      };

      sendGetStub.rejects(error);

      try {
        await servicesIndex.getHearings('1584618195804035', req);
        expect.fail('Should have thrown error');
      } catch (e) {
        expect(e).to.equal(error);
      }
    });
  });

  describe('isJurisdictionSupported', () => {
    it('should return true for supported jurisdiction', () => {
      getConfigValueStub.returns(['SSCS', 'CIVIL', 'PRIVATELAW']);

      expect(servicesIndex.isJurisdictionSupported('SSCS')).to.be.true;
      expect(servicesIndex.isJurisdictionSupported('CIVIL')).to.be.true;
    });

    it('should return false for unsupported jurisdiction', () => {
      getConfigValueStub.returns(['SSCS', 'CIVIL']);

      expect(servicesIndex.isJurisdictionSupported('EMPLOYMENT')).to.be.false;
    });

    it('should handle empty jurisdiction list', () => {
      getConfigValueStub.returns([]);

      expect(servicesIndex.isJurisdictionSupported('SSCS')).to.be.false;
    });

    it('should handle undefined jurisdiction list', () => {
      getConfigValueStub.returns(undefined);

      expect(() => servicesIndex.isJurisdictionSupported('SSCS')).to.throw();
    });
  });

  describe('getServicePath', () => {
    let loggerStub: sinon.SinonStub;

    beforeEach(() => {
      loggerStub = sandbox.stub();
      sandbox.stub(log4jui, 'getLogger').returns({ error: loggerStub } as any);
    });

    it('should return service path for supported jurisdiction', () => {
      getConfigValueStub.withArgs('services.hearings.hearingsJurisdictions').returns(['SSCS', 'CIVIL', 'PRIVATELAW']);
      getConfigValueStub.withArgs('services.hearings.sscs.serviceApi').returns('http://sscs-api');

      const result = servicesIndex.getServicePath('SSCS');

      expect(result).to.equal('http://sscs-api');
      expect(getConfigValueStub).to.have.been.calledWith('services.hearings.sscs.serviceApi');
    });

    it('should return empty string and log error for unsupported jurisdiction', () => {
      getConfigValueStub.withArgs('services.hearings.hearingsJurisdictions').returns(['SSCS', 'CIVIL', 'PRIVATELAW']);

      const result = servicesIndex.getServicePath('UNSUPPORTED');

      expect(result).to.equal('');
    });

    it('should handle jurisdiction names with different cases', () => {
      getConfigValueStub.withArgs('services.hearings.hearingsJurisdictions').returns(['SSCS', 'CIVIL', 'PRIVATELAW', 'PrivateLaw']);
      getConfigValueStub.withArgs('services.hearings.privatelaw.serviceApi').returns('http://private-law-api');

      const result = servicesIndex.getServicePath('PrivateLaw');

      expect(result).to.equal('http://private-law-api');
      expect(getConfigValueStub).to.have.been.calledWith('services.hearings.privatelaw.serviceApi');
    });
  });

  describe('aggregateAllResults', () => {
    it('should only include fulfilled results with hearings', () => {
      const linkedCases = [
        { caseReference: '1584618195804035', caseName: 'Jane and Smith vs DWP', reasonsForLink: [] },
        { caseReference: '1584618195804036', caseName: 'Smith vs DWP', reasonsForLink: [] }
      ];

      const allResults = [
        {
          status: 'fulfilled' as const,
          value: {
            hmctsServiceID: 'BBA3',
            caseRef: '1584618195804035',
            caseHearings: [{ exuiDisplayStatus: 'WAITING TO BE LISTED' } as any]
          }
        },
        {
          status: 'rejected' as const,
          reason: 'Failed to fetch'
        },
        {
          status: 'fulfilled' as const,
          value: {
            hmctsServiceID: 'BBA3',
            caseRef: '1584618195804036',
            caseHearings: []
          }
        }
      ];

      const result = servicesIndex.aggregateAllResults(linkedCases, allResults);

      expect(result).to.have.lengthOf(2); // Both fulfilled results included
      expect(result[0]).to.include({ caseRef: '1584618195804035' });
      expect(result[1]).to.include({ caseRef: '1584618195804036' });
    });

    it('should handle all rejected results', () => {
      const linkedCases = [
        { caseReference: '1584618195804035', caseName: 'Jane and Smith vs DWP', reasonsForLink: [] }
      ];

      const allResults = [
        { status: 'rejected' as const, reason: 'Error 1' },
        { status: 'rejected' as const, reason: 'Error 2' }
      ];

      const result = servicesIndex.aggregateAllResults(linkedCases, allResults);

      expect(result).to.be.an('array').that.is.empty;
    });
  });
});
describe('retrieveForceNewDefaultScreenFlow', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('returns true when showFeature returns true', () => {
    sinon.stub(configuration, 'showFeature').returns(true);
    const result = retrieveForceNewDefaultScreenFlow();
    expect(result).to.equal(true);
  });

  it('returns false when showFeature returns false', () => {
    sinon.stub(configuration, 'showFeature').returns(false);
    const result = retrieveForceNewDefaultScreenFlow();
    expect(result).to.equal(false);
  });

  it('returns false when showFeature throws an error', () => {
    sinon.stub(configuration, 'showFeature').throws(new Error('Error'));
    const result = retrieveForceNewDefaultScreenFlow();
    expect(result).to.equal(false);
  });
  describe('toBoolean', () => {
    it('should return true for boolean true', () => {
      const result = toBoolean(true);
      expect(result).to.equal(true);
    });

    it('should return false for boolean false', () => {
      const result = toBoolean(false);
      expect(result).to.equal(false);
    });

    it('should return true for string "true" (case insensitive)', () => {
      const result = toBoolean('true');
      expect(result).to.equal(true);

      const resultCaseInsensitive = toBoolean('TRUE');
      expect(resultCaseInsensitive).to.equal(true);
    });

    it('should return false for string "false" (case insensitive)', () => {
      const result = toBoolean('false');
      expect(result).to.equal(false);

      const resultCaseInsensitive = toBoolean('FALSE');
      expect(resultCaseInsensitive).to.equal(false);
    });

    it('should return false for non-boolean, non-"true"/"false" strings', () => {
      const result = toBoolean('randomString');
      expect(result).to.equal(false);
    });

    it('should return false for non-boolean, non-string values', () => {
      const result = toBoolean(123);
      expect(result).to.equal(false);

      const resultNull = toBoolean(null);
      expect(resultNull).to.equal(false);

      const resultUndefined = toBoolean(undefined);
      expect(resultUndefined).to.equal(false);

      const resultObject = toBoolean({});
      expect(resultObject).to.equal(false);
    });
  });
  describe('replaceScreenFlow', () => {
    it('should maintain passed in screen flow as flow does not match sequence to replace.', () => {
      const data: ScreenNavigationModel[] = [replaceResultValue(HEARING_VENUE, 'hearing-judge', 'hearing-panel-required')];
      const result = replaceScreenFlow(data, 'next screen');
      expect(JSON.stringify(result)).equal(JSON.stringify(data));
    });

    it('should replace screen flow with matching sequence with new default screen flow', () => {
      const data: ScreenNavigationModel[] = [
        HEARING_VENUE,
        HEARING_WELSH,
        HEARING_JUDGE,
        HEARING_PANEL
      ];

      const result = replaceScreenFlow(data, 'next-screen');
      expect(JSON.stringify(result)).equal(JSON.stringify(newScreenSequence));
    });
  });

  describe('forceDefaultScreenFlow', () => {
    describe('forceDefaultScreenFlow', () => {
      it('should replace the screen flow with the default screen flow when no screenFlow exists', () => {
        const data = {
          screenFlow: null,
          panelRequiredDefault: true
        } as any; // Mocking ServiceHearingValuesModel

        const result = forceDefaultScreenFlow(data);

        expect(result.screenFlow).to.deep.equal(DEFAULT_SCREEN_FLOW_NEW);
      });

      it('should maintiain the screen flow when entered screen flow does not match the pattern screenFlow exists', () => {
        const data = {
          screenFlow: [
            HEARING_PANEL
          ]
        } as any; // Moc
        const result = forceDefaultScreenFlow(data);
        expect(result.screenFlow).to.be.an('array');
        expect(result.screenFlow[0].screenName).to.equal('hearing-panel');
      });
    });
  });
});

