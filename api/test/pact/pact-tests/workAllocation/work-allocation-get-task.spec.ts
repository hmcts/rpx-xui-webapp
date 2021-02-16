import { Pact } from '@pact-foundation/pact'
import { assert } from 'chai'
import * as getPort from 'get-port'
import * as path from 'path'
import { EnhancedRequest } from '../../../../lib/models'
import { handleTaskGet } from '../../../../workAllocation/taskService'

describe('Work Allocation API', () => {

    let MOCK_SERVER_PORT
    let workallocationUrl
    let provider
    const mockResponse = {
      "task": {
        "assignee": "string",
        "auto_assigned": true,
        "case_category": "string",
        "case_id": "string",
        "case_name": "string",
        "case_type_id": "string",
        "created_date": "2020-09-05T14:47:01.250542+01:00",
        "due_date": "2020-09-05T14:47:01.250542+01:00",
        "execution_type": "string",
        "id": "string",
        "jurisdiction": "string",
        "location": "string",
        "location_name": "string",
        "name": "string",
        "region": "string",
        "security_classification": "string",
        "task_state": "string",
        "task_system": "string",
        "task_title": "string",
        "type": "string",
      },
    }

    before(async () => {
        MOCK_SERVER_PORT = await getPort()
        workallocationUrl = `http://localhost:${MOCK_SERVER_PORT}`
        provider = new Pact({
          consumer: 'xui_get_work_allocation_task',
          dir: path.resolve(__dirname, '../../pacts'),
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

    describe('when a request to get Task', () => {
        before(() =>
          provider.addInteraction({
            state: '.well-known endpoint',
            uponReceiving: 'a request for configuration',
            withRequest: {
              method: 'GET',
              path: '/task/123456',
            },
            willRespondWith: {
              status: 200,
              headers: {'Content-Type': 'application/json'},
              body: mockResponse,
            },
          })
        )

        it('returns task', async () => {
            const taskUrl = `${provider.mockService.baseUrl}/task/123456`
            assert.isDefined(handleTaskGet(taskUrl, {} as EnhancedRequest))
        })
    })
})
