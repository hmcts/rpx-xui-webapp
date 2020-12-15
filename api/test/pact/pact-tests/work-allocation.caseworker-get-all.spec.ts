import { Pact } from '@pact-foundation/pact';
import { assert } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';

import { EnhancedRequest } from '../../../lib/models';
import { handleCaseWorkerGetAll } from '../../../workAllocation/caseWorkerService';
import { CASEWORKERS_BY_LOCATION } from './../constants/work-allocation/caseworkers.spec';

describe('Work Allocation Caseworker API', () => {

  let mockServerPort: number;
  let provider: Pact;

  before(async () => {
    mockServerPort = await getPort()
    provider = new Pact({
      consumer: 'xui_work_allocation_caseworker_get_all',
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

  describe('when requested to get all caseworkers', () => {
    before(() =>
      provider.addInteraction({
        state: 'all caseworkers are returned',
        uponReceiving: 'a request for all caseworkers',
        withRequest: {
          method: 'GET',
          path: '/caseworker',
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: CASEWORKERS_BY_LOCATION.ALL
        }
      })
    )

    it('returns caseworkers', async () => {
      const caseworkerUrl = `${provider.mockService.baseUrl}/caseworker`;
      assert.isDefined(handleCaseWorkerGetAll(caseworkerUrl, {} as EnhancedRequest));
    })
  })
})
