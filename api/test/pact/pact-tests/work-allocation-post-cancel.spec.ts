import { Pact } from '@pact-foundation/pact'
import { assert, expect } from 'chai'
import * as getPort from 'get-port'
import * as path from 'path'
import { EnhancedRequest } from '../../../lib/models'
import { handleTaskPost } from '../../../workAllocation/taskService'


interface Payload {
  behaviour?: string,
  assignee: any
}

describe('Work Allocation API', () => {

  let mockServerPort: number
  let provider: Pact

  const ASSIGNEE: any = { id: '987654', userName: 'bob' }
  const BEHAVIOURS = {
    SUCCESS: {},
    ALREADY_DONE: { behaviour: 'already-done' },
    BAD_REQUEST: { behaviour: 'bad-request' },
    FORBIDDEN: { behaviour: 'forbidden' },
    UNSUPPORTED: { behaviour: 'unsupported' },
    SERVER_ERROR: { behaviour: 'unsupported' }
  }

  function getPayload(behaviour: { behaviour?: string }): Payload {
    return { ...behaviour, assignee: { ...ASSIGNEE } }
  }

  before(async () => {
    mockServerPort = await getPort()
    provider = new Pact({
      consumer: 'xui_work_allocation_task_cancel',
      provider: 'WorkAllocation_api',
      dir: path.resolve(__dirname, '../../pacts'),
      log: path.resolve(__dirname, '../logs', 'work-allocation.log'),
      logLevel: 'info',
      port: mockServerPort,
      spec: 2
    })
    return provider.setup()
  })

  // Write Pact when all tests done
  after(() => provider.finalize())

  describe('when requested to cancel a task', () => {
    before(() =>
      provider.addInteraction({
        state: 'task is cancelled',
        uponReceiving: 'a request for cancellation',
        withRequest: {
          method: 'POST',
          path: '/task/123456/cancel',
          body: getPayload(BEHAVIOURS.SUCCESS)
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'}
        }
      })
    )

    it('returns success with a 200', async () => {
      const taskUrl: string = `${provider.mockService.baseUrl}/task/123456/cancel`
      const payload: any = getPayload(BEHAVIOURS.SUCCESS)
      const { status } = await handleTaskPost(taskUrl, payload, {} as EnhancedRequest)
      expect(status).equal(200)
    })
  })

  describe('when requested to cancel a task that is already cancel', () => {
    before(() =>
      provider.addInteraction({
        state: 'task was already cancel',
        uponReceiving: 'a request for cancellation when already cancel',
        withRequest: {
          method: 'POST',
          path: '/task/123456/cancel',
          body: getPayload(BEHAVIOURS.ALREADY_DONE)
        },
        willRespondWith: {
          status: 204,
          headers: {'Content-Type': 'application/json'}
        }
      })
    )

    it('returns success but with a 204', async () => {
      const taskUrl: string = `${provider.mockService.baseUrl}/task/123456/cancel`
      const payload: any = getPayload(BEHAVIOURS.ALREADY_DONE)
      const { status } = await handleTaskPost(taskUrl, payload, {} as EnhancedRequest)
      expect(status).equal(204)
    })
  })
})
