import { Pact } from '@pact-foundation/pact';
import { assert } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';
import { EnhancedRequest } from '../../../lib/models';
import { handleCaseWorkerForLocationAndService } from '../../../workAllocation/caseWorkerService';
import { CASEWORKERS_BY_SERVICE } from '../constants/work-allocation/caseworkers.spec';
import { SERVICES } from '../constants/work-allocation/services.spec';

describe('Work Allocation for service Caseworker API', () => {

  let mockServerPort: number;
  let provider: Pact;

  before(async () => {
    mockServerPort = await getPort()
    provider = new Pact({
      consumer: 'xui_work-allocation_caseworker_get_by_service',
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

  for (const key in SERVICES) {
    const service = SERVICES[key];
    describe(`when request to get caseworkers for 'service ${service}'`, () => {
      before(() =>
        provider.addInteraction({
          state: `all the caseworkers for 'service ${service}' are returned`,
          uponReceiving: `a request for 'service ${service}' caseworkers`,
          withRequest: {
            method: 'GET',
            path: `/caseworker/service/${service}`,
          },
          willRespondWith: {
            status: 200,
            headers: {'Content-Type': 'application/json'},
            body: CASEWORKERS_BY_SERVICE[key]
          }
        })
      )
  
      it('returns caseworkers for service a', async () => {
        const url = `${provider.mockService.baseUrl}/caseworker/service/${service}`
        assert.isDefined(handleCaseWorkerForLocationAndService(url, {} as EnhancedRequest))
      })
    })
  }
})
