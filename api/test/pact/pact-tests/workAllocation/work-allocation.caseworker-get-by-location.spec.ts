import { Pact } from '@pact-foundation/pact';
import { assert } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';
import { EnhancedRequest } from '../../../../lib/models';
import { handleCaseWorkerForLocation } from '../../../../workAllocation/caseWorkerService';
import { CASEWORKERS_BY_LOCATION } from '../../constants/work-allocation/caseworkers.spec';
import { LOCATIONS } from '../../constants/work-allocation/locations.spec';


describe('Work Allocation for location Caseworker API', () => {

  let mockServerPort: number;
  let provider: Pact;

  before(async () => {
    mockServerPort = await getPort()
    provider = new Pact({
      consumer: 'xui_work_allocation_caseworker_get_by_location',
      dir: path.resolve(__dirname, '../../pacts'),
      log: path.resolve(__dirname, '../logs', 'work-allocation.log'),
      logLevel: 'info',
      port: mockServerPort,
      provider: 'WorkAllocation_api_caseworker',
      spec: 2,
    })
    return provider.setup()
  })

  // Write Pact when all tests done
  after(() => provider.finalize())

  for (const key in LOCATIONS) {
    const loc = LOCATIONS[key];
    let path = `/caseworker/location/${loc.id}`;
    if (loc === LOCATIONS.ALL) {
      path = '/caseworker';
    }
    describe(`when requested to get caseworkers at ${loc.locationName}`, () => {
      before(() =>
        provider.addInteraction({
          state: `all the caseworkers at ${loc.locationName} are retrieved`,
          uponReceiving: `a request for ${loc.locationName} caseworkers`,
          withRequest: {
            method: 'GET',
            path
          },
          willRespondWith: {
            status: 200,
            headers: {'Content-Type': 'application/json'},
            body: CASEWORKERS_BY_LOCATION[key]
          }
        })
      )
  
      it(`returns caseworkers for ${loc.locationName}`, async () => {
        const url = `${provider.mockService.baseUrl}/${path}`;
        assert.isDefined(handleCaseWorkerForLocation(url, {} as EnhancedRequest));
      })
    })
  }
})
