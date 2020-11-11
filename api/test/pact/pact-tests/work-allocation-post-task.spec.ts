import { Pact } from '@pact-foundation/pact'
import { assert, expect } from 'chai'
import * as getPort from 'get-port'
import * as path from 'path'

import { EnhancedRequest } from '../../../lib/models'
import { SearchTaskRequest } from '../../../workAllocation/interfaces/taskSearchParameter'
import { taskPost } from '../../../workAllocation/taskService'

describe("Work Allocation API", () => {

  let mockServerPort: number
  let provider: Pact
  const mockRequest = {
    search_parameters: [
        {
          key: 'key1',
          operator: 'operator1',
          values: [
            'value1',
          ],
        },
      ],
    }
  const mockResponse = {
    "tasks": [
        {
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
      ],
  }

  before(async () => {
    mockServerPort = await getPort()
    provider = new Pact({
      consumer: 'xui_work_allocation_post_task',
      provider: 'WorkAllocation_api_post',
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

  describe('when requested to post a task', () => {
    before(() =>
      provider.addInteraction({
        state: '.well-known endpoint',
        uponReceiving: 'a request for completion',
        willRespondWith: {
            body: mockResponse,
            headers: {'Content-Type': 'application/json'},
            status: 200,
          },
          withRequest: {
              method: 'POST',
              path: '/task',
          },
      })
    )

    it('returns success with a 200', async () => {
      const taskUrl: string = `${provider.mockService.baseUrl}/task`
      const { status } = await taskPost(taskUrl, mockRequest as SearchTaskRequest, {} as EnhancedRequest)
      expect(status).equal(200)
    })
    })
})
