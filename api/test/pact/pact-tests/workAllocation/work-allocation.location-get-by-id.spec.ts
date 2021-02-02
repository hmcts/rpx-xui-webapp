import { Pact } from '@pact-foundation/pact';
import { expect } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';
import { EnhancedRequest } from '../../../../lib/models';
import { handleLocationGet } from '../../../../workAllocation/locationService';
import { SERVER_ERROR } from '../../constants/work-allocation/behaviours.spec';
import { LOCATIONS } from '../../constants/work-allocation/locations.spec';


describe('Work Allocation Location API', () => {

  let mockServerPort: number
  let provider: Pact

  before(async () => {
    mockServerPort = await getPort();
    provider = new Pact({
      consumer: 'xui_work_allocation_location_get_by_id',
      provider: 'WorkAllocation_api_location', // TODO: Need to clarify naming conventions here, as we're using different ones.
      dir: path.resolve(__dirname, '../../pacts'),
      log: path.resolve(__dirname, '../logs', 'work-allocation.log'),
      logLevel: 'info',
      port: mockServerPort,
      spec: 2
    });
    return provider.setup();
  });

  // Write Pact when all tests done
  after(() => provider.finalize());

  describe('request to get a location with id of a', () => {
    before(() =>
      provider.addInteraction({
        state: 'Location A is returned',
        uponReceiving: 'a request for location with an id of a',
        withRequest: {
          method: 'GET',
          path: '/location/a'
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: LOCATIONS.A,
        }
      })
    )

    it('returns Location A', async () => {
      const locationPath: string = `${provider.mockService.baseUrl}/location/a`;
      const { status } = await handleLocationGet(locationPath, {} as EnhancedRequest);

      expect(status).equal(200);
    });
  })


  describe('request to get a location with id of b', () => {
    before(() =>
      provider.addInteraction({
        state: 'Location B is returned',
        uponReceiving: 'a request for location with an id of b',
        withRequest: {
          method: 'GET',
          path: '/location/b'
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: LOCATIONS.B,
        }
      })
    )

    it('returns Location B', async () => {
      const locationPath: string = `${provider.mockService.baseUrl}/location/b`;
      const { status } = await handleLocationGet(locationPath, {} as EnhancedRequest);

      expect(status).equal(200);
    });
  })

  describe('Should return server error', () => {

    before(() =>
      provider.addInteraction({
        state: 'the server had an internal error',
        uponReceiving: 'a request for completion and the server falls over',
        withRequest: {
          method: 'GET',
          path: '/location/error500',
        },
        willRespondWith: {
          status: 500,
          body: SERVER_ERROR,
          headers: {'Content-Type': 'application/json'}
        }
      })
    )

    /**
     * A random url, has no interaction with PACT therefore it returns a 500 error.
     *
     * Therefore testing that response.data returns BEHAVIOURS.SERVER_ERROR.
     */
    it('returns failure with a 500', async () => {

      const locationPath: string = `${provider.mockService.baseUrl}/location/error500`;

      let response: { status: number, data: object };

      try {
        response = await handleLocationGet(locationPath, {} as EnhancedRequest);
      } catch (err) {
        response = err;
      }

      expect(response.data).deep.equal(SERVER_ERROR);
      expect(response.status).equal(500);
    });
  });
});
