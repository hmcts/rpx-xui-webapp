import { Pact } from '@pact-foundation/pact';
import { assert, expect } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';

import { EnhancedRequest } from '../../../lib/models';
import { handleLocationGet } from '../../../workAllocation/locationService';

describe('Work Allocation Location API', () => {

  let mockServerPort: number
  let provider: Pact

  before(async () => {
    mockServerPort = await getPort();
    provider = new Pact({
      consumer: 'xui_work_allocation_get_locations',
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

  /**
   * Note that the location body is yet to be defined, by us or WA Allocation team.
   */
  describe('should return locations.', () => {

    const LOCATION_BODY = ['location', 'location'];

    before(() =>
      provider.addInteraction({
        state: 'locations are given',
        uponReceiving: 'a request for locations',
        withRequest: {
          method: 'GET',
          path: '/location',
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: LOCATION_BODY,
        }
      })
    )

    it('returns success with a 200', async () => {

      const locationPath: string = `${provider.mockService.baseUrl}/location`;
      const response = await handleLocationGet(locationPath, {} as EnhancedRequest);

      expect(response.data).deep.equal(LOCATION_BODY);
      expect(response.status).equal(200);
    });
  });
});
