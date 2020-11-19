import { Pact } from '@pact-foundation/pact'
import { assert } from 'chai'
import * as getPort from 'get-port'
import * as path from 'path'
import { EnhancedRequest } from '../../../lib/models'
import { handleCaseWorketGetAll } from '../../../workAllocation/caseWorkerService'

describe("Work Allocation Caseworker API", () => {

    let MOCK_SERVER_PORT
    let workallocationUrl
    let provider
    const mockResponse = [
        {
          "firstName": "string",
          "lastName": "string",
          "idamId": "string",
          "location": "Location",
        }
      ]

    before(async () => {
        MOCK_SERVER_PORT = await getPort()
        workallocationUrl = `http://localhost:${MOCK_SERVER_PORT}`
        provider = new Pact({
          consumer: 'xui_get_work_allocation_caseworker',
          dir: path.resolve(__dirname, '../pacts'),
          log: path.resolve(__dirname, '../logs', 'work-allocation.log'),
          logLevel: 'info',
          port: MOCK_SERVER_PORT,
          provider: 'WorkAllocation_api',
          spec: 2,
        })
        return provider.setup()
      })

    // Write Pact when all tests done
    after(() => provider.finalize())

      // verify with Pact, and reset expectations
    // afterEach(() => provider.verify())

    describe('when a request to get caseworker', () => {
        before(() =>
          provider.addInteraction({
            state: '.well-known endpoint',
            uponReceiving: 'a request for configuration',
            withRequest: {
              method: 'GET',
              path: '/caseworker',
            },
            willRespondWith: {
              status: 200,
              headers: {'Content-Type': 'application/json'},
              body: mockResponse,
            },
          })
        )

        it('returns caseworkers', async () => {
            const caseworkerUrl = `${provider.mockService.baseUrl}/caseworker`
            assert.isDefined(handleCaseWorketGetAll(caseworkerUrl, {} as EnhancedRequest))
        })
    })
})
