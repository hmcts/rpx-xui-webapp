import { Pact } from '@pact-foundation/pact';
import { assert, expect } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';

import { EnhancedRequest } from '../../../lib/models';
import { Assignee } from '../../../workAllocation/interfaces/task';
import { handleTaskPost } from '../../../workAllocation/taskService';
import { ACTIONS } from '../constants/work-allocation/actions.spec';
import { CASEWORKERS } from '../constants/work-allocation/caseworkers.spec';
import { BAD_TASKS } from '../constants/work-allocation/tasks.spec';

describe('Work Allocation API', () => {

  // Get an Assignee from a caseworker.
  function getAssignee(caseworker: { idamId: string, firstName: string, lastName: string }): Assignee {
    return {
      id: caseworker.idamId,
      userName: `${caseworker.firstName} ${caseworker.lastName}`
    };
  }

  let mockServerPort: number
  let provider: Pact

  before(async () => {
    mockServerPort = await getPort()
    provider = new Pact({
      consumer: 'xui_work_allocation_task_assign_bad',
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

  const actionKey = 'ASSIGN';
  const action = ACTIONS.ASSIGN;
  for (const taskKey in BAD_TASKS) {
    const task = BAD_TASKS[taskKey];
    const status: number = parseInt(task.id);
    for (const caseworkerKey in CASEWORKERS) {
      const caseworker = CASEWORKERS[caseworkerKey];
      const assignee = getAssignee(caseworker);
      describe(`when requested to ${actionKey} task '${task.caseName}' to/for ${assignee.userName}`, () => {
        before(() =>
          provider.addInteraction({
            state: `${actionKey} reports status ${status} for task '${task.caseName}' to/for ${assignee.userName}`,
            uponReceiving: `a squiffy request to ${actionKey} task '${task.caseName}' to/for ${assignee.userName}`,
            withRequest: {
              method: 'POST',
              path: `/task/${task.id}/${action.id}`,
              body: { assignee }
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
            response = await handleTaskPost(url, { assignee }, {} as EnhancedRequest);
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
