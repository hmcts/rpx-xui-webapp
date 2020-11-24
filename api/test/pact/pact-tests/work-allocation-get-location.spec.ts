import { Pact } from '@pact-foundation/pact';
import { assert, expect } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';

import { EnhancedRequest } from '../../../lib/models';
import { handleLocationGet } from '../../../workAllocation/locationService';
import { SERVER_ERROR, SUCCESS} from '../constants/behaviours.spec';

describe('Work Allocation Location API', () => {

  let mockServerPort: number
  let provider: Pact

  before(async () => {
    mockServerPort = await getPort();
    provider = new Pact({
      consumer: 'xui_work_allocation_get_location',
      provider: 'WorkAllocation_api_location', // TODO: Need to clarify naming conventions here, as we're using different ones.
      dir: path.resolve(__dirname, '../pacts'),
      log: path.resolve(__dirname, '../logs', 'work-allocation.log'),
      logLevel: 'info',
      port: mockServerPort,
      spec: 2
    });
    return provider.setup();
  });

  // Write Pact when all tests done
  after(() => provider.finalize());

  // TODO: SHould this be a .well-known-endpoint or something else.
  describe('should return location when locationId is sent in via params.', () => {
    before(() =>
      provider.addInteraction({
        state: 'location is given',
        uponReceiving: 'a request for location',
        withRequest: {
          method: 'GET',
          path: '/location/42',
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: SUCCESS,
        }
      })
    )

    it('returns success with a 200', async () => {

      const locationPath: string = `${provider.mockService.baseUrl}/location/42`;
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
