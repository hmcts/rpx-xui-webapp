import { Pact } from '@pact-foundation/pact';
import { expect } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';

import { EnhancedRequest } from '../../../lib/models';
import { handlePostSearch } from '../../../workAllocation/caseWorkerService';
import { SUCCESS } from './../constants/work-allocation/behaviours.spec';
import { CASEWORKERS } from './../constants/work-allocation/caseworkers.spec';

describe('Case worker API', () => {

  let mockServerPort: number;
  let provider: Pact;

  const SEARCH_TERM: string = 'term'


  before(async () => {
    mockServerPort = await getPort()
    provider = new Pact({
      consumer: 'xui_work_allocation_caseworker_post_search',
      provider: 'WorkAllocation_api_caseworker',
      dir: path.resolve(__dirname, '../pacts'),
      log: path.resolve(__dirname, '../logs', 'work-allocation.log'),
      logLevel: 'info',
      port: mockServerPort,
      spec: 2
    })
    return provider.setup()
  })

  // Write Pact when all tests done
  after(() => provider.finalize())

  describe('when requested to search caseworker', () => {
    before(() =>
      provider.addInteraction({
        state: 'caseworker search',
        uponReceiving: 'a request for cancellation',
        withRequest: {
          method: 'POST',
          path: `/caseworker/search/${SEARCH_TERM}`,
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: CASEWORKERS.JOHN_SMITH
        }
      })
    )

    it('returns success with a 200', async () => {
      const searchUrl: string = `${provider.mockService.baseUrl}/caseworker/search/${SEARCH_TERM}`
      const payload: any = SUCCESS;
      const { status } = await handlePostSearch(searchUrl, payload, {} as EnhancedRequest)
      expect(status).equal(200)
    })
  })

})
