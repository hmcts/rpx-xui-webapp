import { Pact } from '@pact-foundation/pact';
import { assert } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';

import { EnhancedRequest } from '../../../lib/models';
import { handleTaskGet } from '../../../workAllocation/taskService';
import {TASKS, ALL_TASKS} from './../constants/work-allocation/tasks.spec';

describe('Work Allocation API', () => {

  let mockServerPort: number;
  let provider: Pact;

  before(async () => {
    mockServerPort = await getPort();
    provider = new Pact({
      consumer: 'xui_work_allocation_task_get_by_id',
      dir: path.resolve(__dirname, '../pacts'),
      log: path.resolve(__dirname, '../logs', 'work-allocation.log'),
      logLevel: 'info',
      port: mockServerPort,
      provider: 'WorkAllocation_api_task',
      spec: 2
    });
    return provider.setup();
  })

  // Write Pact when all tests done
  after(() => provider.finalize());

  // Loop through the tasks and test each one.
  for (const key in ALL_TASKS) {
    const task = ALL_TASKS[key];
    describe(`when requested to get task with id ${task.id}`, () => {
      before(() =>
        provider.addInteraction({
          state: 'appropriate task is returned',
          uponReceiving: `a request for task with id ${task.id}`,
          withRequest: {
            method: 'GET',
            path: `/task/${task.id}`
          },
          willRespondWith: {
            status: 200,
            headers: {'Content-Type': 'application/json'},
            body: { task }
          }
        })
      )

      it('returns appropriate task', async () => {
        const taskUrl = `${provider.mockService.baseUrl}/task/${task.id}`;
        const data = handleTaskGet(taskUrl, {} as EnhancedRequest);
        assert.isDefined(data);
      })
    })
  }
});
