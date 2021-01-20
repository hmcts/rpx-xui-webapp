import { Pact } from '@pact-foundation/pact';
import { assert } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';
import { EnhancedRequest } from '../../../../lib/models';
import { handleCaseWorkerForLocationAndService } from '../../../../workAllocation/caseWorkerService';
import { CASEWORKERS_BY_SERVICE } from '../../constants/work-allocation/caseworkers.spec';


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

  describe('when request to get caseworkers for service A', () => {
    before(() =>
      provider.addInteraction({
        state: 'all the caseworkers for service A are returned',
        uponReceiving: 'a request for service A caseworkers',
        withRequest: {
          method: 'GET',
          path: '/caseworker/service/a',
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: CASEWORKERS_BY_SERVICE.A
        }
      })
    )

    it('returns caseworkers for service a', async () => {
      const caseworkerUrl = `${provider.mockService.baseUrl}/caseworker/service/a`
      assert.isDefined(handleCaseWorkerForLocationAndService(caseworkerUrl, {} as EnhancedRequest))
    })
  })

  describe('when request to get caseworkers for service B', () => {
    before(() =>
      provider.addInteraction({
        state: 'all the caseworkers for service B are returned',
        uponReceiving: 'a request for service B caseworkers',
        withRequest: {
          method: 'GET',
          path: '/caseworker/service/b',
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: CASEWORKERS_BY_SERVICE.B
        }
      })
    )

    it('returns caseworkers for service b', async () => {
      const caseworkerUrl = `${provider.mockService.baseUrl}/caseworker/service/b`
      assert.isDefined(handleCaseWorkerForLocationAndService(caseworkerUrl, {} as EnhancedRequest))
    })
  })
})
