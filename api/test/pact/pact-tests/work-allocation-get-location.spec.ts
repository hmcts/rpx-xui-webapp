import { Pact } from '@pact-foundation/pact'
import { assert, expect } from 'chai'
import * as getPort from 'get-port'
import * as path from 'path'

import { EnhancedRequest } from '../../../lib/models'
import { handleLocationGet } from '../../../workAllocation/locationService'
import { Assignee } from './../../../workAllocation/interfaces/task'

// TODO: Not needed for location?
interface Payload {
  behaviour?: string,
  assignee: Assignee
}

// TODO: Rename to something more granular
describe('Work Allocation API', () => {

  let mockServerPort: number
  let provider: Pact

  const ASSIGNEE: Assignee = { id: '987654', userName: 'bob' }
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
      consumer: 'xui_work_allocation_get_location',
      provider: 'WorkAllocation_api_location', // TODO: Need to clarify naming conventions here, as we're using different ones.
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

  // TODO: SHould this be a .well-known-endpoint or something else.
  describe('should return location when locationId is sent in via params.', () => {
    before(() =>
      provider.addInteraction({
        state: 'location is given',
        uponReceiving: 'a request for location',
        withRequest: {
          method: 'GET',
          path: '/location/42',
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: {
            test: 'testBody',
          },
        }
      })
    )

    it('returns success with a 200', async () => {
      const locationPath: string = `${provider.mockService.baseUrl}/location/42`
      // const payload: any = getPayload(BEHAVIOURS.SUCCESS)
      // const locationId = '42'
      const { status } = await handleLocationGet(locationPath, {} as EnhancedRequest)
      expect(status).equal(200)
    })
  })

  // describe('when requested to assign a task that is already assign', () => {
  //   before(() =>
  //     provider.addInteraction({
  //       state: 'task was already assign',
  //       uponReceiving: 'a request for completion when already assign',
  //       withRequest: {
  //         method: 'POST',
  //         path: '/task/123456/assign',
  //         body: getPayload(BEHAVIOURS.ALREADY_DONE)
  //       },
  //       willRespondWith: {
  //         status: 204,
  //         headers: {'Content-Type': 'application/json'}
  //       }
  //     })
  //   )
  //
  //   it('returns success but with a 204', async () => {
  //     const taskUrl: string = `${provider.mockService.baseUrl}/task/123456/assign`
  //     const payload: any = getPayload(BEHAVIOURS.ALREADY_DONE)
  //     const { status } = await handleTaskPost(taskUrl, payload, {} as EnhancedRequest)
  //     expect(status).equal(204)
  //   })
  // })

  // describe('when making a bad request to assign a task', () => {
  //   before(() =>
  //     provider.addInteraction({
  //       state: 'a bad request was made',
  //       uponReceiving: 'a bad request for completion',
  //       withRequest: {
  //         method: 'POST',
  //         path: '/task/123456/assign',
  //         body: getPayload(BEHAVIOURS.BAD_REQUEST)
  //       },
  //       willRespondWith: {
  //         status: 400,
  //         headers: {'Content-Type': 'application/json'}
  //       }
  //     })
  //   )
  //
  //   it('returns failure with a 400', async () => {
  //     const taskUrl: string = `${provider.mockService.baseUrl}/task/123456/assign`
  //     const payload: any = getPayload(BEHAVIOURS.BAD_REQUEST)
  //     let response: { status: number }
  //     try {
  //       response = await handleTaskPost(taskUrl, payload, {} as EnhancedRequest)
  //     } catch (err) {
  //       response = err
  //     }
  //     assert.isDefined(response)
  //     expect(response.status).equal(400)
  //   })
  // })

  // describe('when making a request to assign a forbidden task', () => {
  //   before(() =>
  //     provider.addInteraction({
  //       state: 'completion of this task is was forbidden',
  //       uponReceiving: 'a request for completion of a forbidden task',
  //       withRequest: {
  //         method: 'POST',
  //         path: '/task/123456/assign',
  //         body: getPayload(BEHAVIOURS.FORBIDDEN)
  //       },
  //       willRespondWith: {
  //         status: 403,
  //         headers: {'Content-Type': 'application/json'}
  //       }
  //     })
  //   )
  //
  //   it('returns failure with a 403', async () => {
  //     const taskUrl: string = `${provider.mockService.baseUrl}/task/123456/assign`
  //     const payload: any = getPayload(BEHAVIOURS.FORBIDDEN)
  //     let response: { status: number }
  //     try {
  //       response = await handleTaskPost(taskUrl, payload, {} as EnhancedRequest)
  //     } catch (err) {
  //       response = err
  //     }
  //     assert.isDefined(response)
  //     expect(response.status).equal(403)
  //   })
  // })

  // describe('when making a request to assign a task but it is unsupported', () => {
  //   before(() =>
  //     provider.addInteraction({
  //       state: 'this action is unsupported',
  //       uponReceiving: 'a request for completion but it is unsupported',
  //       withRequest: {
  //         method: 'POST',
  //         path: '/task/123456/assign',
  //         body: getPayload(BEHAVIOURS.UNSUPPORTED)
  //       },
  //       willRespondWith: {
  //         status: 415,
  //         headers: {'Content-Type': 'application/json'}
  //       }
  //     })
  //   )
  //
  //   it('returns failure with a 415', async () => {
  //     const taskUrl: string = `${provider.mockService.baseUrl}/task/123456/assign`
  //     const payload: any = getPayload(BEHAVIOURS.UNSUPPORTED)
  //     let response: { status: number }
  //     try {
  //       response = await handleTaskPost(taskUrl, payload, {} as EnhancedRequest)
  //     } catch (err) {
  //       response = err
  //     }
  //     assert.isDefined(response)
  //     expect(response.status).equal(415)
  //   })
  // })

  // describe('when making a request to assign a task and the server falls over', () => {
  //   before(() =>
  //     provider.addInteraction({
  //       state: 'the server had an internal error',
  //       uponReceiving: 'a request for completion and the server falls over',
  //       withRequest: {
  //         method: 'POST',
  //         path: '/task/123456/assign',
  //         body: getPayload(BEHAVIOURS.SERVER_ERROR)
  //       },
  //       willRespondWith: {
  //         status: 500,
  //         headers: {'Content-Type': 'application/json'}
  //       }
  //     })
  //   )
  //
  //   it('returns failure with a 500', async () => {
  //     const taskUrl: string = `${provider.mockService.baseUrl}/task/123456/assign`
  //     const payload: any = getPayload(BEHAVIOURS.SERVER_ERROR)
  //     let response: { status: number }
  //     try {
  //       response = await handleTaskPost(taskUrl, payload, {} as EnhancedRequest)
  //     } catch (err) {
  //       response = err
  //     }
  //     assert.isDefined(response)
  //     expect(response.status).equal(500)
  //   })
  // })

})
