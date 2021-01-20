import { Pact } from '@pact-foundation/pact';
import { assert } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';
import { EnhancedRequest } from '../../../../lib/models';
import { handleCaseWorkerForLocation } from '../../../../workAllocation/caseWorkerService';
import { CASEWORKERS_BY_LOCATION } from '../../constants/work-allocation/caseworkers.spec';


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

  describe('when requested to get caseworkers at Location A', () => {
    before(() =>
      provider.addInteraction({
        state: 'all the caseworkers at Location A are retrieved',
        uponReceiving: 'a request for Location A caseworkers',
        withRequest: {
          method: 'GET',
          path: '/caseworker/location/a',
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: CASEWORKERS_BY_LOCATION.A
        },
      })
    )

    it('returns caseworkers for Location A', async () => {
        const caseworkerUrl = `${provider.mockService.baseUrl}/caseworker/location/a`;
        assert.isDefined(handleCaseWorkerForLocation(caseworkerUrl, {} as EnhancedRequest));
    })
  })

  describe('when requested to get caseworkers at Location B', () => {
    before(() =>
      provider.addInteraction({
        state: 'all the caseworkers at Location B are retrieved',
        uponReceiving: 'a request for Location B caseworkers',
        withRequest: {
          method: 'GET',
          path: '/caseworker/location/b',
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: CASEWORKERS_BY_LOCATION.B
        },
      })
    )

    it('returns caseworkers for Location B', async () => {
        const caseworkerUrl = `${provider.mockService.baseUrl}/caseworker/location/b`;
        assert.isDefined(handleCaseWorkerForLocation(caseworkerUrl, {} as EnhancedRequest));
    })
  })
})
