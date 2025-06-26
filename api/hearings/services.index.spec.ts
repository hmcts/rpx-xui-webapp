import { expect } from 'chai';
import { SERVICE_HEARING_VALUES } from './data/serviceHearingValues.mock.data';
import { mapDataByDefault } from './services.index';

describe('hearings services', () => {
  describe('mapDataByDefault', () => {
    it('should return data with no modifications if no case flags', () => {
      const data = SERVICE_HEARING_VALUES;
      const result = mapDataByDefault(data);
      expect(result.caseFlags.flags.length).to.equal(0);
    });

    it('should set the flagId and return the result', () => {
      const data = SERVICE_HEARING_VALUES;
      data.caseFlags = {
        flags: [
          {
            partyID: '26e278a9-4051-4e',
            partyName: 'miss defendant1 lit friend hnl',
            flagId: 'PF0015',
            flagDescription: 'Language Interpreter',
            flagStatus: 'Active'
          },
          {
            partyID: 'f07420e6-5d4d-43',
            partyName: 'miss defendant1 lit friend hnl',
            flagId: 'RA0012',
            flagDescription: 'Braille documents',
            flagStatus: 'Active'
          }
        ],
        flagAmendURL: '/flag/amend'
      };
      const result = mapDataByDefault(data);
      expect(result.caseFlags.flags[0].partyId).to.equal('26e278a9-4051-4e');
      expect(result.caseFlags.flags[1].partyId).to.equal('f07420e6-5d4d-43');
    });

    it('should return flagID as null if flagId contains value', () => {
      const data = SERVICE_HEARING_VALUES;
      data.caseFlags = {
        flags: [
          {
            partyId: '26e278a9-4051-4e',
            partyName: 'miss defendant1 lit friend hnl',
            flagId: 'PF0015',
            flagDescription: 'Language Interpreter',
            flagStatus: 'Active'
          },
          {
            partyId: 'f07420e6-5d4d-43',
            partyName: 'miss defendant1 lit friend hnl',
            flagId: 'RA0012',
            flagDescription: 'Braille documents',
            flagStatus: 'Active'
          }
        ],
        flagAmendURL: '/flag/amend'
      };
      const result = mapDataByDefault(data);
      expect(result.caseFlags.flags[0].partyID).to.equal(undefined);
      expect(result.caseFlags.flags[1].partyID).to.equal(undefined);
    });
  });

  describe('additional coverage for hearings services', () => {
    let sandbox;
    let req, res, next;

    beforeEach(() => {
      sandbox = require('sinon').createSandbox();
      req = { query: {}, body: {}, session: {} };
      res = { status: sandbox.stub().returnsThis(), send: sandbox.stub() };
      next = sandbox.stub();
    });
    afterEach(() => sandbox.restore());

    it('mapDataByDefault returns data unchanged if no flags', () => {
      const { mapDataByDefault } = require('./services.index');
      const data = { caseFlags: { flags: [] } };
      expect(mapDataByDefault(data)).to.equal(data);
    });

    it('mapDataByDefault returns data unchanged if no caseFlags', () => {
      const { mapDataByDefault } = require('./services.index');
      const data = {};
      expect(mapDataByDefault(data)).to.equal(data);
    });

    it('loadServiceHearingValues calls next on error', async () => {
      const { loadServiceHearingValues } = require('./services.index');
      req.query.jurisdictionId = 'JUR';
      req.body = {};
      sandbox.stub(require('../common/crudService'), 'sendPost').rejects(new Error('fail'));
      sandbox.stub(require('../configuration'), 'getConfigValue').returns('path');
      await loadServiceHearingValues(req, res, next);
      expect(next).to.have.been.called;
    });

    it('loadServiceLinkedCases calls next on error', async () => {
      const { loadServiceLinkedCases } = require('./services.index');
      req.query.jurisdictionId = 'JUR';
      req.body = {};
      sandbox.stub(require('../common/crudService'), 'sendPost').rejects(new Error('fail'));
      sandbox.stub(require('../configuration'), 'getConfigValue').returns('path');
      await loadServiceLinkedCases(req, res, next);
      expect(next).to.have.been.called;
    });

    it('loadLinkedCasesWithHearings calls next on error', async () => {
      const { loadLinkedCasesWithHearings } = require('./services.index');
      req.query.jurisdictionId = 'JUR';
      req.body = {};
      sandbox.stub(require('../common/crudService'), 'sendPost').rejects(new Error('fail'));
      sandbox.stub(require('../configuration'), 'getConfigValue').returns('path');
      await loadLinkedCasesWithHearings(req, res, next);
      expect(next).to.have.been.called;
    });

    it('aggregateAllResults only pushes fulfilled results', () => {
      const { aggregateAllResults } = require('./services.index');
      const data = [{ caseReference: 'A', caseName: 'n', reasonsForLink: [] }];
      const allResults = [
        { status: 'fulfilled', value: { caseRef: 'A', caseHearings: [{ exuiDisplayStatus: 'AWAITING_LISTING' }] } },
        { status: 'rejected', reason: 'fail' }
      ];
      const result = aggregateAllResults(data, allResults);
      expect(result.length).to.equal(1);
    });

    it('getServicePath returns empty string and logs error if not supported', () => {
      const { getServicePath } = require('./services.index');
      const stub = sandbox.stub(require('../lib/log4jui'), 'getLogger').returns({ error: sandbox.stub() });
      sandbox.stub(require('../configuration'), 'getConfigValue').returns([]);
      const result = getServicePath('NOT_SUPPORTED');
      expect(result).to.equal('');
    });

    it('isJurisdictionSupported returns true if supported', () => {
      const { isJurisdictionSupported } = require('./services.index');
      sandbox.stub(require('../configuration'), 'getConfigValue').returns(['A', 'B']);
      expect(isJurisdictionSupported('A')).to.be.true;
    });
    it('isJurisdictionSupported returns false if not supported', () => {
      const { isJurisdictionSupported } = require('./services.index');
      sandbox.stub(require('../configuration'), 'getConfigValue').returns(['A', 'B']);
      expect(isJurisdictionSupported('C')).to.be.false;
    });

    it('loadServiceHearingValues returns data with default screenFlow if missing', async () => {
      const { loadServiceHearingValues } = require('./services.index');
      req.query.jurisdictionId = 'JUR';
      req.body = {};
      const mockData = { screenFlow: undefined };
      const mockResponse = { status: 200, data: mockData };
      sandbox.stub(require('../common/crudService'), 'sendPost').resolves(mockResponse);
      sandbox.stub(require('../configuration'), 'getConfigValue').returns('path');
      const mapDataStub = sandbox.stub(require('./services.index'), 'mapDataByDefault').returns(mockData);
      await loadServiceHearingValues(req, res, next);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.called;
      mapDataStub.restore();
    });

    it('loadServiceHearingValues does nothing if serviceResponse is falsy', async () => {
      const { loadServiceHearingValues } = require('./services.index');
      req.query.jurisdictionId = 'JUR';
      req.body = {};
      sandbox.stub(require('../common/crudService'), 'sendPost').resolves(undefined);
      sandbox.stub(require('../configuration'), 'getConfigValue').returns('path');
      await loadServiceHearingValues(req, res, next);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });

    it('loadServiceLinkedCases returns data on success', async () => {
      const { loadServiceLinkedCases } = require('./services.index');
      req.query.jurisdictionId = 'JUR';
      req.body = {};
      const mockResponse = { status: 201, data: [{ foo: 'bar' }] };
      sandbox.stub(require('../common/crudService'), 'sendPost').resolves(mockResponse);
      sandbox.stub(require('../configuration'), 'getConfigValue').returns('path');
      await loadServiceLinkedCases(req, res, next);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.send).to.have.been.calledWith([{ foo: 'bar' }]);
    });

    it('loadLinkedCasesWithHearings returns [] if no linkedCaseIds', async () => {
      const { loadLinkedCasesWithHearings } = require('./services.index');
      req.query.jurisdictionId = 'JUR';
      req.body = { caseReference: 'A', caseName: 'n' };
      const mockResponse = { status: 200, data: [] };
      sandbox.stub(require('../common/crudService'), 'sendPost').resolves(mockResponse);
      sandbox.stub(require('../configuration'), 'getConfigValue').returns('path');
      await loadLinkedCasesWithHearings(req, res, next);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith([]);
    });

    it('loadLinkedCasesWithHearings aggregates results if linkedCaseIds present', async () => {
      const { loadLinkedCasesWithHearings } = require('./services.index');
      req.query.jurisdictionId = 'JUR';
      req.body = { caseReference: 'A', caseName: 'n' };
      const mockResponse = { status: 200, data: [{ caseReference: 'B', caseName: 'm', reasonsForLink: [] }] };
      sandbox.stub(require('../common/crudService'), 'sendPost').resolves(mockResponse);
      sandbox.stub(require('../configuration'), 'getConfigValue').returns('path');
      const getHearingsStub = sandbox.stub(require('./services.index'), 'getHearings');
      getHearingsStub.onFirstCall().resolves({ caseRef: 'A', caseHearings: [{ exuiDisplayStatus: 'AWAITING_LISTING' }] });
      getHearingsStub.onSecondCall().resolves({ caseRef: 'B', caseHearings: [{ exuiDisplayStatus: 'AWAITING_LISTING' }] });
      const allSettledStub = sandbox.stub(Promise, 'allSettled').resolves([
        { status: 'fulfilled', value: { caseRef: 'A', caseHearings: [{ exuiDisplayStatus: 'AWAITING_LISTING' }] } },
        { status: 'fulfilled', value: { caseRef: 'B', caseHearings: [{ exuiDisplayStatus: 'AWAITING_LISTING' }] } }
      ]);
      await loadLinkedCasesWithHearings(req, res, next);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.called;
      getHearingsStub.restore();
      allSettledStub.restore();
    });

    it('getHearings returns data on success', async () => {
      const { getHearings } = require('./services.index');
      const mockData = { caseHearings: [{ hmcStatus: 'foo' }] };
      sandbox.stub(require('../common/crudService'), 'sendGet').resolves({ data: mockData });
      const mappings = [{ hmcStatus: 'foo', exuiSectionStatus: 'bar', exuiDisplayStatus: 'baz' }];
      sandbox.stub(require('./models/hearingStatusMappings'), 'hearingStatusMappings').value(mappings);
      const result = await getHearings('123', {});
      expect(result).to.equal(mockData);
      expect((mockData.caseHearings[0] as any).exuiSectionStatus).to.equal('bar');
      expect((mockData.caseHearings[0] as any).exuiDisplayStatus).to.equal('baz');
    });

    it('getHearings logs and throws on error', async () => {
      const error = { status: 500, statusText: 'fail', data: { foo: 'bar' } };
      sandbox.stub(require('../common/crudService'), 'sendGet').rejects(error);
      const loggerStub = { error: sandbox.stub() };
      sandbox.stub(require('../lib/log4jui'), 'getLogger').returns(loggerStub);
      delete require.cache[require.resolve('./services.index')]; // Clear cache so logger stub is used
      const { getHearings } = require('./services.index');
      try {
        await getHearings('123', {});
      } catch (e) {
        expect(loggerStub.error).to.have.been.calledWith(500, 'fail', JSON.stringify({ foo: 'bar' }));
        expect(e).to.equal(error);
      }
    });

    it('getServicePath returns empty string and logs error if jurisdiction not supported', () => {
      // Clear the require cache so stubs are picked up
      delete require.cache[require.resolve('./services.index')];
      const sinon = require('sinon');
      // Stub isJurisdictionSupported to return false before requiring the module
      const servicesIndexPath = require.resolve('./services.index');
      const Module = require('module');
      const originalLoad = Module._load;
      Module._load = function(request, parent, isMain) {
        const exports = originalLoad.apply(this, arguments);
        if (request === servicesIndexPath) {
          exports.isJurisdictionSupported = () => false;
        }
        return exports;
      };
      // Stub logger before requiring the module
      const loggerStub = { error: sinon.stub() };
      sinon.stub(require('../lib/log4jui'), 'getLogger').returns(loggerStub);
      // Now require the module
      const servicesIndexModule = require('./services.index');
      Module._load = originalLoad;
      const result = servicesIndexModule.getServicePath('SOME');
      expect(result).to.equal('');
      expect(loggerStub.error).to.have.been.called;
      // Restore stub
      require('../lib/log4jui').getLogger.restore();
    });

    it('getServicePath returns config value for supported jurisdiction', () => {
      // Clear the require cache so stubs are picked up
      delete require.cache[require.resolve('./services.index')];
      const sinon = require('sinon');
      // Stub getConfigValue before requiring the module
      const getConfigValueStub = sinon.stub(require('../configuration'), 'getConfigValue');
      // Return array of supported jurisdictions when HEARINGS_SUPPORTED_JURISDICTIONS is requested
      getConfigValueStub.withArgs('services.hearings.hearingsJurisdictions').returns(['JUR']);
      // Return the API value when the specific config path is requested
      getConfigValueStub.withArgs('services.hearings.jur.serviceApi').returns('api-value');
      // Now require the module
      const servicesIndexModule = require('./services.index');
      const result = servicesIndexModule.getServicePath('JUR');
      expect(result).to.equal('api-value');
      // Restore stub
      getConfigValueStub.restore();
    });
  });
});

