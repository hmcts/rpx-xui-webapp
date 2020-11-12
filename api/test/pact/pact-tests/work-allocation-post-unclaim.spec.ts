import { Pact } from '@pact-foundation/pact'
import { assert, expect } from 'chai'
import * as getPort from 'get-port'
import * as path from 'path'

import { EnhancedRequest } from '../../../lib/models'
import { handleUnClaimPost } from '../../../workAllocation/taskService'

describe("Work Allocation API", () => {

  let mockServerPort: number
  let provider: Pact

  before(async () => {
    mockServerPort = await getPort()
    provider = new Pact({
      consumer: 'xui_work_allocation_task_unclaim',
      provider: 'WorkAllocation_api_unclaim',
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

  describe('when requested to unclaim a task', () => {
    before(() =>
      provider.addInteraction({
        state: 'task is unclaimd',
        uponReceiving: 'a request for completion',
        withRequest: {
          method: 'POST',
          path: '/task/200/unclaim'
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'}
        }
      })
    )

    it('returns success with a 200', async () => {
      const taskUrl: string = `${provider.mockService.baseUrl}/task/200/unclaim`
      const { status } = await handleUnClaimPost(taskUrl, {} as EnhancedRequest)
      expect(status).equal(200)
    })
  })

  describe('when requested to unclaim a task that is already unclaim', () => {
    before(() =>
      provider.addInteraction({
        state: 'task was already unclaim',
        uponReceiving: 'a request for completion when already unclaim',
        withRequest: {
          method: 'POST',
          path: '/task/204/unclaim',
        },
        willRespondWith: {
          status: 204,
          headers: {'Content-Type': 'application/json'}
        }
      })
    )

    it('returns success but with a 204', async () => {
      const taskUrl: string = `${provider.mockService.baseUrl}/task/204/unclaim`
      const { status } = await handleUnClaimPost(taskUrl, {} as EnhancedRequest)
      expect(status).equal(204)
    })
  })

  describe('when making a bad request to unclaim a task', () => {
    before(() =>
      provider.addInteraction({
        state: 'a bad request was made',
        uponReceiving: 'a bad request for completion',
        withRequest: {
          method: 'POST',
          path: '/task/400/unclaim'
        },
        willRespondWith: {
          status: 400,
          headers: {'Content-Type': 'application/json'}
        }
      })
    )

    it('returns failure with a 400', async () => {
      const taskUrl: string = `${provider.mockService.baseUrl}/task/400/unclaim`
      let response: { status: number }
      try {
        response = await handleUnClaimPost(taskUrl, {} as EnhancedRequest)
      } catch (err) {
        response = err
      }
      assert.isDefined(response)
      expect(response.status).equal(400)
    })
  })

  describe('when making a request to unclaim a forbidden task', () => {
    before(() =>
      provider.addInteraction({
        state: 'completion of this task is was forbidden',
        uponReceiving: 'a request for completion of a forbidden task',
        withRequest: {
          method: 'POST',
          path: '/task/403/unclaim'
        },
        willRespondWith: {
          status: 403,
          headers: {'Content-Type': 'application/json'}
        }
      })
    )

    it('returns failure with a 403', async () => {
      const taskUrl: string = `${provider.mockService.baseUrl}/task/403/unclaim`
      let response: { status: number }
      try {
        response = await handleUnClaimPost(taskUrl, {} as EnhancedRequest)
      } catch (err) {
        response = err
      }
      assert.isDefined(response)
      expect(response.status).equal(403)
    })
  })

  describe('when making a request to unclaim a task but it is unsupported', () => {
    before(() =>
      provider.addInteraction({
        state: 'this action is unsupported',
        uponReceiving: 'a request for completion but it is unsupported',
        withRequest: {
          method: 'POST',
          path: '/task/415/unclaim'
        },
        willRespondWith: {
          status: 415,
          headers: {'Content-Type': 'application/json'}
        }
      })
    )

    it('returns failure with a 415', async () => {
      const taskUrl: string = `${provider.mockService.baseUrl}/task/415/unclaim`
      let response: { status: number }
      try {
        response = await handleUnClaimPost(taskUrl, {} as EnhancedRequest)
      } catch (err) {
        response = err
      }
      assert.isDefined(response)
      expect(response.status).equal(415)
    })
  })

  describe('when making a request to unclaim a task and the server falls over', () => {
    before(() =>
      provider.addInteraction({
        state: 'the server had an internal error',
        uponReceiving: 'a request for completion and the server falls over',
        withRequest: {
          method: 'POST',
          path: '/task/500/unclaim'
        },
        willRespondWith: {
          status: 500,
          headers: {'Content-Type': 'application/json'}
        }
      })
    )

    it('returns failure with a 500', async () => {
      const taskUrl: string = `${provider.mockService.baseUrl}/task/500/unclaim`
      let response: { status: number }
      try {
        response = await handleUnClaimPost(taskUrl, {} as EnhancedRequest)
      } catch (err) {
        response = err
      }
      assert.isDefined(response)
      expect(response.status).equal(500)
    })
  })
})
