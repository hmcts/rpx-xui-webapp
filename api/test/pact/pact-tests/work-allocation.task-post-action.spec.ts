import { Pact } from '@pact-foundation/pact';
import { assert, expect } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';

import { EnhancedRequest } from '../../../lib/models';
import { handleTaskPost } from '../../../workAllocation/taskService';
import { ACTIONS } from './../constants/work-allocation/actions.spec';
import { BAD_TASKS, TASKS } from './../constants/work-allocation/tasks.spec';

describe('Work Allocation API', () => {

  let mockServerPort: number
  let provider: Pact

  before(async () => {
    mockServerPort = await getPort()
    provider = new Pact({
      consumer: 'xui_work_allocation_task_action',
      provider: 'WorkAllocation_api_task',
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

  for (const actionKey in ACTIONS) {
    const action = ACTIONS[actionKey];
    // Don't do this for the assign function - we have that handled separately.
    if (action === ACTIONS.ASSIGN) {
      continue;
    }
    // First the good tasks.
    for (const taskKey in TASKS) {
      const task = TASKS[taskKey];
      describe(`when requested to ${actionKey} task '${task.caseName}'`, () => {
        before(() =>
          provider.addInteraction({
            state: `${actionKey} is successful for task '${task.caseName}'`,
            uponReceiving: `a request to ${actionKey} task '${task.caseName}'`,
            withRequest: {
              method: 'POST',
              path: `/task/${task.id}/${action.id}`,
              body: {}
            },
            willRespondWith: {
              status: 200,
              headers: {'Content-Type': 'application/json'}
            }
          })
        )

        it('returns success with a 200', async () => {
          const baseUrl = provider.mockService.baseUrl;
          const url: string = `${baseUrl}/task/${task.id}/${action.id}`;
          const { status } = await handleTaskPost(url, {}, {} as EnhancedRequest);
          expect(status).equal(200);
        })
      })
    }

    // And now the bad tasks.
    for (const taskKey in BAD_TASKS) {
      const task = BAD_TASKS[taskKey];
      const status: number = parseInt(task.id);
      describe(`when requested to ${actionKey} task '${task.caseName}'`, () => {
        before(() =>
          provider.addInteraction({
            state: `${actionKey} reports status ${status} for task '${task.caseName}'`,
            uponReceiving: `a squiffy request to ${actionKey} task '${task.caseName}'`,
            withRequest: {
              method: 'POST',
              path: `/task/${task.id}/${action.id}`,
              body: {}
            },
            willRespondWith: {
              status,
              headers: {'Content-Type': 'application/json'}
            }
          })
        )

        it(`returns a ${status} status`, async () => {
          const baseUrl = provider.mockService.baseUrl;
          const url: string = `${baseUrl}/task/${task.id}/${action.id}`;
          let response: { status: number }
          try {
            response = await handleTaskPost(url, {}, {} as EnhancedRequest);
          } catch (err) {
            response = err
          }
          assert.isDefined(response)
          expect(response.status).equal(status)
        })
      })
    }
  }

})
