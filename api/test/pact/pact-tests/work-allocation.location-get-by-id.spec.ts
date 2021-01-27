import { Pact } from '@pact-foundation/pact';
import { expect } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';
import { EnhancedRequest } from '../../../lib/models';
import { handleLocationGet } from '../../../workAllocation/locationService';
import { SERVER_ERROR } from '../constants/work-allocation/behaviours.spec';
import { LOCATIONS } from '../constants/work-allocation/locations.spec';


describe('Work Allocation Location API', () => {

  let mockServerPort: number
  let provider: Pact

  before(async () => {
    mockServerPort = await getPort();
    provider = new Pact({
      consumer: 'xui_work_allocation_location_get_by_id',
      provider: 'WorkAllocation_api', // TODO: Need to clarify naming conventions here, as we're using different ones.
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

  for (const key in LOCATIONS) {
    const location = LOCATIONS[key];
    if (location === LOCATIONS.ALL) {
      continue;
    }
    describe(`request to get a location with id of ${location.id}`, () => {
      before(() =>
        provider.addInteraction({
          state: `${location.locationName} is returned`,
          uponReceiving: `a request for location with an id of ${location.id}`,
          withRequest: {
            method: 'GET',
            path: `/location/${location.id}`
          },
          willRespondWith: {
            status: 200,
            headers: {'Content-Type': 'application/json'},
            body: location
          }
        })
      )
  
      it(`returns ${location.locationName}`, async () => {
        const path: string = `${provider.mockService.baseUrl}/location/${location.id}`;
        const { status } = await handleLocationGet(path, {} as EnhancedRequest);
        expect(status).equal(200);
      });
    })
  }
});
