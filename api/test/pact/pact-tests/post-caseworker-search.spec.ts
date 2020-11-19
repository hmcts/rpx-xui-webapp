import { Pact } from '@pact-foundation/pact'
import { assert, expect } from 'chai'
import * as getPort from 'get-port'
import * as path from 'path'

import { EnhancedRequest } from '../../../lib/models'
import { handlePostSearch } from '../../../workAllocation/caseWorkerService'

describe("Case worker API", () => {

  let mockServerPort: number
  let provider: Pact

  const SEARCH_TERM: string = 'term'
  const ALREADY_DONE_TERM: string = 'already done term'
  const BAD_REQUEST_TERM: string = 'bad request term'
  const FORBIDDEN_TERM: string = 'forbidden term'
  const UNSUPPORTED_TERM: string = 'unsupported term'
  const SERVER_ERROR_TERM: string = 'server error term'

  const BEHAVIOURS = {
    SUCCESS: {},
    ALREADY_DONE: SEARCH_TERM,
    BAD_REQUEST: { behaviour: 'bad-request' },
    FORBIDDEN: { behaviour: 'forbidden' },
    UNSUPPORTED: { behaviour: 'unsupported' },
    SERVER_ERROR: { behaviour: 'unsupported' }
  }

  before(async () => {
    mockServerPort = await getPort()
    provider = new Pact({
      consumer: 'xui_caseworker_search',
      provider: 'WorkAllocation_api_cancel',
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
          headers: {'Content-Type': 'application/json'}
        }
      })
    )

    it('returns success with a 200', async () => {
      const searchUrl: string = `${provider.mockService.baseUrl}/caseworker/search/${SEARCH_TERM}`
      const payload: any = BEHAVIOURS.SUCCESS
      const { status } = await handlePostSearch(searchUrl, payload, {} as EnhancedRequest)
      expect(status).equal(200)
    })
  })

})
