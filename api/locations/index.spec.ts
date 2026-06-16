import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { http } from '../lib/http';
import { filterOutResults, getLocations, getLocationsById, getServiceIdsByService, isValidServiceId } from './index';
import { LocationTypeEnum } from './data/locationType.enum';
import { mockLocations } from './locationTestData.spec';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
describe('Fee Pay Judge', () => {
  const GET = 'get';

  let sandbox: sinon.SinonSandbox;

  let spy: sinon.SinonStub;
  const res = mockRes({ status: 200, data: mockLocations });
  let next: any;

  const cloneLocations = () => mockLocations.map((location) => ({ ...location }));

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.stub();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getLocations', () => {
    it('should return the location for user base location based on search term', async () => {
      spy = sandbox.stub(http, GET).resolves(res);
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['IA', 'CIVIL', 'SSCS', 'BHA1', 'ABA1', 'AAA1'],
          locationType: 'hearing',
          userLocations: [
            { service: 'IA', locations: [{ id: '1234' }] },
            { service: 'CIVIL', locations: [{ id: '2345' }] },
          ],
          bookingLocations: ['1234', '2343'],
        },
      });

      const response = mockRes({
        data: mockLocations,
      });

      try {
        await getLocations(req, response, next);
        // should equal 3, two for the two user base locations, one for the SSCS locations
        expect(response.data.results.length).to.equal(3);
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });

    it('should return all locations if there is no base location', async () => {
      spy = sandbox.stub(http, GET).resolves(res);
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['IA', 'CIVIL', 'SSCS', 'BHA1', 'ABA1', 'AAA1'],
          locationType: 'hearing',
          userLocations: [],
          bookingLocations: ['1234', '2343'],
        },
      });

      const response = mockRes({
        data: mockLocations,
      });

      try {
        await getLocations(req, response, next);
        // expect all locations to be given
        expect(response.data.results.length).to.equal(mockLocations.length);
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });

    it('should return no locations if there is no base location within user locations', async () => {
      spy = sandbox.stub(http, GET).resolves(res);
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['IA', 'CIVIL', 'BHA1', 'ABA1', 'AAA1'],
          locationType: 'hearing',
          userLocations: [{ service: 'IA', locations: [] }],
          bookingLocations: [],
        },
      });

      const response = mockRes({
        data: mockLocations,
      });

      try {
        await getLocations(req, response, next);
        // expect all civil locations, no IA locations to be given
        expect(response.data.results.length).to.equal(2);
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });

    it('should return locations for regions if there is region information', async () => {
      spy = sandbox.stub(http, GET).resolves(res);
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['IA', 'CIVIL', 'BHA1', 'ABA1', 'AAA1'],
          locationType: 'hearing',
          userLocations: [{ service: 'IA', locations: [{ regionId: '11' }] }],
          bookingLocations: [],
        },
      });

      const response = mockRes({
        data: mockLocations,
      });

      try {
        await getLocations(req, response, next);
        // expect all civil locations, no IA locations to be given
        expect(response.data.results.length).to.equal(3);
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });

    it('should return no locations if there is no base location within user locations', async () => {
      spy = sandbox.stub(http, GET).resolves(res);
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['IA', 'CIVIL', 'BHA1', 'ABA1', 'AAA1'],
          locationType: 'hearing',
          userLocations: [{ service: 'IA', locations: [] }],
          bookingLocations: [],
        },
      });

      const response = mockRes({
        data: mockLocations,
      });

      try {
        await getLocations(req, response, next);
        // expect all civil locations, no IA locations to be given
        expect(response.data.results.length).to.equal(2);
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });

    it('should return locations for regions if there is region information', async () => {
      spy = sandbox.stub(http, GET).resolves(res);
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['IA', 'CIVIL', 'BHA1', 'ABA1', 'AAA1'],
          locationType: 'hearing',
          userLocations: [{ service: 'IA', locations: [{ regionId: '11' }] }],
          bookingLocations: [],
        },
      });

      const response = mockRes({
        data: mockLocations,
      });

      try {
        await getLocations(req, response, next);
        // expect all civil locations, no IA locations to be given
        expect(response.data.results.length).to.equal(3);
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });

    it('should return the possible locations for bookable filter', async () => {
      spy = sandbox.stub(http, GET).resolves(res);
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['IA', 'CIVIL', 'SCSS', 'BHA1', 'ABA1', 'AAA1'],
          locationType: 'hearing',
          userLocations: [{ service: 'IA', locations: [{ id: '1234' }] }],
          bookingLocations: null,
        },
      });

      const response = mockRes({
        data: mockLocations,
      });

      try {
        await getLocations(req, response, next);
        // should equal 4, only getting base location for IA
        expect(response.data.results.length).to.equal(3);
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });

    it('should return empty locations without calling location API when service ids are empty', async () => {
      spy = sandbox.stub(http, GET);
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: [],
          userLocations: [{ service: 'IA', locations: [{ id: '1234' }] }],
        },
      });
      const response = mockRes();

      await getLocations(req, response, next);

      expect(spy).not.to.have.been.called;
      expect(response.status).to.have.been.calledWith(200);
      expect(response.send).to.have.been.calledWith([]);
    });

    it('should split comma separated service ids before building the court type query', async () => {
      const locations = cloneLocations();
      spy = sandbox.stub(http, GET).resolves({ status: 200, data: locations });
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: 'IA,CIVIL',
          locationType: LocationTypeEnum.HEARING,
          userLocations: [],
        },
      });
      const response = mockRes();

      await getLocations(req, response, next);

      expect(spy.firstCall.args[0]).to.contain('court-type-id=4,23,10');
      expect(response.send.firstCall.args[0].map((location) => location.epimms_id)).to.deep.equal([
        '1234',
        '231596',
        '2345',
        '3456',
      ]);
    });

    it('should filter case management locations by location type', async () => {
      const locations = [
        {
          ...mockLocations[0],
          epimms_id: 'hearing-only',
          is_case_management_location: 'N',
          is_hearing_location: 'Y',
        },
        {
          ...mockLocations[1],
          epimms_id: 'case-management-only',
          is_case_management_location: 'Y',
          is_hearing_location: 'N',
        },
      ];
      spy = sandbox.stub(http, GET).resolves({ status: 200, data: locations });
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['IA'],
          locationType: LocationTypeEnum.CASE_MANAGEMENT,
          userLocations: [],
        },
      });
      const response = mockRes();

      await getLocations(req, response, next);

      expect(response.send.firstCall.args[0].map((location) => location.epimms_id)).to.deep.equal(['case-management-only']);
    });

    it('should filter hearing locations by location type', async () => {
      const locations = [
        {
          ...mockLocations[0],
          epimms_id: 'hearing-only',
          is_case_management_location: 'N',
          is_hearing_location: 'Y',
        },
        {
          ...mockLocations[1],
          epimms_id: 'case-management-only',
          is_case_management_location: 'Y',
          is_hearing_location: 'N',
        },
      ];
      spy = sandbox.stub(http, GET).resolves({ status: 200, data: locations });
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['IA'],
          locationType: LocationTypeEnum.HEARING,
          userLocations: [],
        },
      });
      const response = mockRes();

      await getLocations(req, response, next);

      expect(response.send.firstCall.args[0].map((location) => location.epimms_id)).to.deep.equal(['hearing-only']);
    });

    it('should remove duplicate locations by epimms id', async () => {
      const locations = [
        { ...mockLocations[0], site_name: 'First Glasgow location' },
        { ...mockLocations[0], site_name: 'Duplicate Glasgow location' },
        { ...mockLocations[2] },
      ];
      spy = sandbox.stub(http, GET).resolves({ status: 200, data: locations });
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['IA', 'CIVIL'],
          locationType: LocationTypeEnum.HEARING,
          userLocations: [],
        },
      });
      const response = mockRes();

      await getLocations(req, response, next);

      expect(response.send.firstCall.args[0].map((location) => location.epimms_id)).to.deep.equal(['1234', '2345']);
    });

    it('should pass location API errors to next', async () => {
      const error = new Error('Location API failed');
      spy = sandbox.stub(http, GET).rejects(error);
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['IA'],
          locationType: LocationTypeEnum.HEARING,
          userLocations: [],
        },
      });
      const response = mockRes();

      await getLocations(req, response, next);

      expect(next).to.have.been.calledWith(error);
      expect(response.send).not.to.have.been.called;
    });
  });

  describe('filterOutResults', () => {
    it('should keep non-restricted court types and allowed locations or regions', () => {
      const locations = cloneLocations();

      const result = filterOutResults(locations, ['1234'], ['2'], ['23']);

      expect(result.map((location) => location.epimms_id)).to.deep.equal(['1234', '231596', '2345', '3456', '4567']);
    });

    it('should remove restricted court type locations when no location or region is allowed', () => {
      const locations = cloneLocations();

      const result = filterOutResults(locations, [], [], ['23']);

      expect(result.map((location) => location.epimms_id)).to.deep.equal(['2345', '3456', '4567']);
    });
  });

  describe('getServiceIdsByService', () => {
    it('should return mapped service codes without duplicates', () => {
      const result = getServiceIdsByService(['IA', 'CIVIL', 'IA']);

      expect(result).to.deep.equal(['BFA1', 'AAA6', 'AAA7']);
    });

    it('should return an empty service code placeholder when no services are mapped', () => {
      const result = getServiceIdsByService(['UNKNOWN']);

      expect(result).to.deep.equal(['']);
    });
  });

  describe('isValidServiceId', () => {
    it('should identify existing service codes', () => {
      expect(isValidServiceId('BFA1')).to.equal(true);
      expect(isValidServiceId(' AAA6 ')).to.equal(true);
    });

    it('should reject jurisdiction names and malformed service codes', () => {
      expect(isValidServiceId('CIVIL')).to.equal(false);
      expect(isValidServiceId('BFA12')).to.equal(false);
      expect(isValidServiceId(undefined as unknown as string)).to.equal(false);
    });
  });

  describe('getLocationsById', () => {
    it('should use the first mapped service code when building the specific location URL', async () => {
      spy = sandbox.stub(http, GET).resolves({ status: 200, data: mockLocations });
      const req = mockReq({
        body: {
          locations: [{ locationId: '2345', services: ['CIVIL'] }],
        },
      });
      const response = mockRes();

      await getLocationsById(req, response, next);

      expect(spy.firstCall.args[0]).to.contain('/refdata/location/court-venues?epimms_id=2345&service_code=AAA6');
      expect(response.status).to.have.been.calledWith(200);
      expect(response.status.calledBefore(response.send)).to.equal(true);
      expect(response.send).to.have.been.calledWith([mockLocations[2]]);
    });

    it('should pass through an existing service code when building the specific location URL', async () => {
      spy = sandbox.stub(http, GET).resolves({ status: 200, data: mockLocations });
      const req = mockReq({
        body: {
          locations: [{ locationId: '2345', services: ['BFA1'] }],
        },
      });
      const response = mockRes();

      await getLocationsById(req, response, next);

      expect(spy.firstCall.args[0]).to.contain('/refdata/location/court-venues?epimms_id=2345&service_code=BFA1');
      expect(response.send).to.have.been.calledWith([mockLocations[2]]);
    });

    it('should request each location and return each matching venue', async () => {
      spy = sandbox.stub(http, GET);
      spy.onFirstCall().resolves({ status: 200, data: mockLocations });
      spy.onSecondCall().resolves({ status: 206, data: mockLocations });
      const req = mockReq({
        body: {
          locations: [
            { locationId: '1234', services: ['IA'] },
            { locationId: '2345', services: ['CIVIL'] },
          ],
        },
      });
      const response = mockRes();

      await getLocationsById(req, response, next);

      expect(spy).to.have.been.calledTwice;
      expect(spy.firstCall.args[0]).to.contain('/refdata/location/court-venues?epimms_id=1234&service_code=BFA1');
      expect(spy.secondCall.args[0]).to.contain('/refdata/location/court-venues?epimms_id=2345&service_code=AAA6');
      expect(response.status).to.have.been.calledWith(206);
      expect(response.send).to.have.been.calledWith([mockLocations[0], mockLocations[2]]);
    });

    it('should omit the service code query parameter when no service is available', async () => {
      spy = sandbox.stub(http, GET).resolves({ status: 200, data: mockLocations });
      const req = mockReq({
        body: {
          locations: [{ locationId: '2345', services: [] }],
        },
      });
      const response = mockRes();

      await getLocationsById(req, response, next);

      expect(spy.firstCall.args[0]).to.contain('/refdata/location/court-venues?epimms_id=2345');
      expect(spy.firstCall.args[0]).not.to.contain('service_code=');
      expect(response.send).to.have.been.calledWith([mockLocations[2]]);
    });

    it('should return an empty result when no locations are requested', async () => {
      spy = sandbox.stub(http, GET);
      const req = mockReq({
        body: {
          locations: [],
        },
      });
      const response = mockRes();

      await getLocationsById(req, response, next);

      expect(spy).not.to.have.been.called;
      expect(response.status).to.have.been.calledWith(200);
      expect(response.send).to.have.been.calledWith([]);
    });

    it('should pass location lookup errors to next', async () => {
      const error = new Error('Specific location lookup failed');
      spy = sandbox.stub(http, GET).rejects(error);
      const req = mockReq({
        body: {
          locations: [{ locationId: '2345', services: ['CIVIL'] }],
        },
      });
      const response = mockRes();

      await getLocationsById(req, response, next);

      expect(next).to.have.been.calledWith(error);
      expect(response.send).not.to.have.been.called;
    });
  });
});
