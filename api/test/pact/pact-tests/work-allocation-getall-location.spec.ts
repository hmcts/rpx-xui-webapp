import { Pact } from '@pact-foundation/pact'
import { assert } from 'chai'
import * as getPort from 'get-port'
import * as path from 'path'
import { EnhancedRequest } from '../../../lib/models'
import { handleLocationGetAll } from '../../../workAllocation/locationService'

describe('Work Allocation Location API', () => {

    let MOCK_SERVER_PORT
    let workallocationUrl
    let provider
    const mockResponse = [
        {
            "id": "string",
            "locationName": "string",
            "services": []
        }
      ]

    before(async () => {
        MOCK_SERVER_PORT = await getPort()
        workallocationUrl = `http://localhost:${MOCK_SERVER_PORT}`
        provider = new Pact({
          consumer: 'xui_get_work_allocation_location',
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

    describe('when a request to get location', () => {
        before(() =>
          provider.addInteraction({
            state: '.well-known endpoint',
            uponReceiving: 'a request for configuration',
            withRequest: {
              method: 'GET',
              path: '/location',
            },
            willRespondWith: {
              status: 200,
              headers: {'Content-Type': 'application/json'},
              body: mockResponse,
            },
          })
        )

        it('returns locations', async () => {
            const locationUrl = `${provider.mockService.baseUrl}/location`
            assert.isDefined(handleLocationGetAll(locationUrl, {} as EnhancedRequest))
        })
    })
})
