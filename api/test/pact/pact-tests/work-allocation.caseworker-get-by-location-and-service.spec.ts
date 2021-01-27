import { Pact } from '@pact-foundation/pact';
import { assert } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';
import { EnhancedRequest } from '../../../lib/models';
import { handleCaseWorkerForLocationAndService } from '../../../workAllocation/caseWorkerService';
import { CASEWORKERS_BY_LOCATION_AND_SERVICE } from '../constants/work-allocation/caseworkers.spec';
import { LOCATIONS } from '../constants/work-allocation/locations.spec';
import { SERVICES } from '../constants/work-allocation/services.spec';

describe('Work Allocation for location and service Caseworker API', () => {

  let mockServerPort: number;
  let provider: Pact;

  before(async () => {
    mockServerPort = await getPort()
    provider = new Pact({
      consumer: 'xui_work-allocation_caseworker_get_by_location_and_service',
      dir: path.resolve(__dirname, '../../pacts'),
      log: path.resolve(__dirname, '../logs', 'work-allocation.log'),
      logLevel: 'info',
      port: mockServerPort,
      provider: 'WorkAllocation_api',
      spec: 2,
    })
    return provider.setup()
  })

  // Write Pact when all tests done
  after(() => provider.finalize())

  for (const key in CASEWORKERS_BY_LOCATION_AND_SERVICE) {
    const [ loc, svc ] = key.split('_');
    const location = LOCATIONS[loc], service = SERVICES[svc];
    describe(`when request to get caseworkers for location ${loc} and service ${svc}`, () => {
      before(() =>
        provider.addInteraction({
          state: `all the caseworkers for location ${loc} and service ${svc} are returned`,
          uponReceiving: `a request for location ${loc} and service ${svc} caseworkers`,
          withRequest: {
            method: 'GET',
            path: `/caseworker/location/${location.id}/service/${service}`,
          },
          willRespondWith: {
            status: 200,
            headers: {'Content-Type': 'application/json'},
            body: CASEWORKERS_BY_LOCATION_AND_SERVICE[key]
          }
        })
      )
  
      it(`returns caseworkers for location ${loc} and service ${svc}`, async () => {
        const url = `${provider.mockService.baseUrl}/caseworker/location/${location.id}/service/${service}`;
        assert.isDefined(handleCaseWorkerForLocationAndService(url, {} as EnhancedRequest));
      })
    })
  }
})
