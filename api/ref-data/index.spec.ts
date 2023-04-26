import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { getConfigValue } from '../configuration';
import { SERVICES_LOCATION_REF_API_URL } from '../configuration/references';
import { http } from '../lib/http';
import { getLocations, getLocationsByServiceCode, getRegions } from './index';
import { LocationByServiceCodeResponse } from './models/ref-data-location-response.model';
import { RefDataLocation } from './models/ref-data-location.model';
import { RefDataRegion } from './models/ref-data-region.model';

const baseLocationRefUrl = getConfigValue(SERVICES_LOCATION_REF_API_URL);

chai.use(sinonChai);
describe('RefDataEndpoint', () => {
  let sandbox: sinon.SinonSandbox;
  let next: any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.spy();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getRegions', () => {
    let spy: sinon.SinonStub;
    beforeEach(() => {
      const regions: RefDataRegion[] = [
        {
          region_id: '1',
          description: 'Region 1'
        },
        {
          region_id: '2',
          description: 'Region 2'
        }
      ];
      spy = sandbox.stub(http, 'get').resolves({ status: 200, data: regions });
    });

    it('should make a get request and respond appropriately', async () => {
      const req = mockReq();
      const response = mockRes();
      await getRegions(req, response, next);

      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(`${baseLocationRefUrl}/refdata/location/regions?regionId=ALL`);
      expect(response.send).to.have.been.calledWith(sinon.match(spy));
    });
  });

  describe('getLocationsByServiceCode', () => {
    let spy: sinon.SinonStub;
    let dummyLocations: RefDataLocation[];
    let locationByServiceCodeResponse: LocationByServiceCodeResponse;

    beforeEach(() => {
      dummyLocations = [{
        closed_date: '2021-01-01',
        cluster_id: '1',
        cluster_name: 'Cluster 1',
        court_address: 'Court Address 1',
        court_location_code: 'Court Location Code 1',
        court_name: 'Court Name 1',
        court_open_date: '2021-01-01',
        court_status: 'Court Status 1',
        court_type: 'Court Type 1',
        court_type_id: '1',
        court_venue_id: '1',
        dx_address: 'DX Address 1',
        epimms_id: '1',
        is_case_management_location: '1',
        is_hearing_location: '1',
        open_for_public: '1',
        phone_number: 'Phone Number 1',
        postcode: 'Postcode 1',
        region: 'Region 1',
        region_id: '1',
        site_name: 'Site Name 1',
        venue_name: 'Venue Name 1',
        welsh_court_address: 'Welsh Court Address 1',
        welsh_site_name: 'Welsh Site Name 1'
      },
      {
        closed_date: '2021-01-01',
        cluster_id: '2',
        cluster_name: 'Cluster 2',
        court_address: 'Court Address 2',
        court_location_code: 'Court Location Code 2',
        court_name: 'Court Name 2',
        court_open_date: '2021-01-01',
        court_status: 'Court Status 2',
        court_type: 'Court Type 2',
        court_type_id: '2',
        court_venue_id: '2',
        dx_address: 'DX Address 2',
        epimms_id: '2',
        is_case_management_location: '2',
        is_hearing_location: '2',
        open_for_public: '2',
        phone_number: 'Phone Number 2',
        postcode: 'Postcode 2',
        region: 'Region 2',
        region_id: '2',
        site_name: 'Site Name 2',
        venue_name: 'Venue Name 2',
        welsh_court_address: 'Welsh Court Address 2',
        welsh_site_name: 'Welsh Site Name 2'
      }];

      locationByServiceCodeResponse = {
        court_type: 'Court Type 1',
        court_type_id: '1',
        court_venues: dummyLocations,
        service_code: 'Service Code 1',
        welsh_court_type: 'Welsh Court Type 1'
      };
      spy = sandbox.stub(http, 'get').resolves({ status: 200, data: locationByServiceCodeResponse });
    });

    it('should make a get request when calling getLocationsByServiceCode, ' +
      'pass the query params and respond appropriately', async () => {
      const req = mockReq({
        query: { service_code: 'AAA7' }
      });
      const response = mockRes();
      await getLocationsByServiceCode(req, response, next);

      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(`${baseLocationRefUrl}/refdata/location/court-venues/services?service_code=AAA7`);
      expect(response.send).to.have.been.calledWith(sinon.match(spy));
    });
  });

  describe('getLocations', () => {
    let spy: sinon.SinonStub;
    let dummyLocations: RefDataLocation[];

    beforeEach(() => {
      dummyLocations = [{
        closed_date: '2021-01-01',
        cluster_id: '1',
        cluster_name: 'Cluster 1',
        court_address: 'Court Address 1',
        court_location_code: 'Court Location Code 1',
        court_name: 'Court Name 1',
        court_open_date: '2021-01-01',
        court_status: 'Court Status 1',
        court_type: 'Court Type 1',
        court_type_id: '1',
        court_venue_id: '1',
        dx_address: 'DX Address 1',
        epimms_id: '1',
        is_case_management_location: '1',
        is_hearing_location: '1',
        open_for_public: '1',
        phone_number: 'Phone Number 1',
        postcode: 'Postcode 1',
        region: 'Region 1',
        region_id: '1',
        site_name: 'Site Name 1',
        venue_name: 'Venue Name 1',
        welsh_court_address: 'Welsh Court Address 1',
        welsh_site_name: 'Welsh Site Name 1'
      },
      {
        closed_date: '2021-01-01',
        cluster_id: '2',
        cluster_name: 'Cluster 2',
        court_address: 'Court Address 2',
        court_location_code: 'Court Location Code 2',
        court_name: 'Court Name 2',
        court_open_date: '2021-01-01',
        court_status: 'Court Status 2',
        court_type: 'Court Type 2',
        court_type_id: '2',
        court_venue_id: '2',
        dx_address: 'DX Address 2',
        epimms_id: '2',
        is_case_management_location: '2',
        is_hearing_location: '2',
        open_for_public: '2',
        phone_number: 'Phone Number 2',
        postcode: 'Postcode 2',
        region: 'Region 2',
        region_id: '2',
        site_name: 'Site Name 2',
        venue_name: 'Venue Name 2',
        welsh_court_address: 'Welsh Court Address 2',
        welsh_site_name: 'Welsh Site Name 2'
      }];
      spy = sandbox.stub(http, 'get').resolves({ status: 200, data: dummyLocations });
    });

    it('should make a get request when calling getLocations, ' +
      'pass the query params and respond appropriately', async () => {
      const req = mockReq({
        query: { location_type: 'locationType1' }
      });
      const res = mockRes();
      await getLocations(req, res, next);

      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(`${baseLocationRefUrl}/refdata/location/court-venues?location_type=locationType1`);
      expect(res.send).to.have.been.calledWith(sinon.match(spy));
    });
  });
});
