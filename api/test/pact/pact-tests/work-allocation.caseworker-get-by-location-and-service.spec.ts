import { Pact } from '@pact-foundation/pact';
import { assert } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';

import { EnhancedRequest } from '../../../lib/models';
import { handleCaseWorkerForLocationAndService } from '../../../workAllocation/caseWorkerService';
import { CASEWORKERS_BY_LOCATION_AND_SERVICE } from './../constants/work-allocation/caseworkers.spec';

describe('Work Allocation for location and service Caseworker API', () => {

  let mockServerPort: number;
  let provider: Pact;

  before(async () => {
    mockServerPort = await getPort()
    provider = new Pact({
      consumer: 'xui_work-allocation_caseworker_get_by_location_and_service',
      dir: path.resolve(__dirname, '../pacts'),
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

  describe('when request to get caseworkers for location A and service A', () => {
    before(() =>
      provider.addInteraction({
        state: 'all the caseworkers for location A and service A are returned',
        uponReceiving: 'a request for location A and service A caseworkers',
        withRequest: {
          method: 'GET',
          path: '/caseworker/location/a/service/a',
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: CASEWORKERS_BY_LOCATION_AND_SERVICE.A_A
        }
      })
    )

    it('returns caseworkers for location A and service A', async () => {
      const caseworkerUrl = `${provider.mockService.baseUrl}/caseworker/location/a/service/a`
      assert.isDefined(handleCaseWorkerForLocationAndService(caseworkerUrl, {} as EnhancedRequest))
    })
  })

  describe('when request to get caseworkers for location A and service B', () => {
    before(() =>
      provider.addInteraction({
        state: 'all the caseworkers for location A and service B are returned',
        uponReceiving: 'a request for location A and service B caseworkers',
        withRequest: {
          method: 'GET',
          path: '/caseworker/location/a/service/b',
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: CASEWORKERS_BY_LOCATION_AND_SERVICE.A_B
        }
      })
    )

    it('returns caseworkers for location A and service B', async () => {
      const caseworkerUrl = `${provider.mockService.baseUrl}/caseworker/location/a/service/b`
      assert.isDefined(handleCaseWorkerForLocationAndService(caseworkerUrl, {} as EnhancedRequest))
    })
  })

  describe('when request to get caseworkers for location B and service A', () => {
    before(() =>
      provider.addInteraction({
        state: 'all the caseworkers for location B and service A are returned',
        uponReceiving: 'a request for location B and service A caseworkers',
        withRequest: {
          method: 'GET',
          path: '/caseworker/location/b/service/a',
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: CASEWORKERS_BY_LOCATION_AND_SERVICE.B_A
        }
      })
    )

    it('returns caseworkers for location B and service A', async () => {
      const caseworkerUrl = `${provider.mockService.baseUrl}/caseworker/location/b/service/a`
      assert.isDefined(handleCaseWorkerForLocationAndService(caseworkerUrl, {} as EnhancedRequest))
    })
  })

  describe('when request to get caseworkers for location B and service B', () => {
    before(() =>
      provider.addInteraction({
        state: 'all the caseworkers for location B and service B are returned',
        uponReceiving: 'a request for location B and service B caseworkers',
        withRequest: {
          method: 'GET',
          path: '/caseworker/location/b/service/b',
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: CASEWORKERS_BY_LOCATION_AND_SERVICE.B_B
        }
      })
    )

    it('returns caseworkers for location B and service B', async () => {
      const caseworkerUrl = `${provider.mockService.baseUrl}/caseworker/location/b/service/b`
      assert.isDefined(handleCaseWorkerForLocationAndService(caseworkerUrl, {} as EnhancedRequest))
    })
  })
})
