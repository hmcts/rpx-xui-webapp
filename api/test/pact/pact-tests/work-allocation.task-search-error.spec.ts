import { Pact } from '@pact-foundation/pact';
import { assert, expect } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';

import { EnhancedRequest } from '../../../lib/models';
import { SearchTaskRequest } from '../../../workAllocation/interfaces/taskSearchParameter';
import { handleTaskSearch } from '../../../workAllocation/taskService';
import { UNAVAILABLE_TASKS } from './../constants/work-allocation/tasks.spec';

describe('Work Allocation API', () => {

  let mockServerPort: number
  let provider: Pact

  before(async () => {
    mockServerPort = await getPort();
    provider = new Pact({
      consumer: 'xui_work_allocation_task_search_error',
      provider: 'WorkAllocation_api_task',
      dir: path.resolve(__dirname, '../pacts'),
      log: path.resolve(__dirname, '../logs', 'work-allocation.log'),
      logLevel: 'info',
      port: mockServerPort,
      spec: 2
    });
    return provider.setup();
  })

  // Write Pact when all tests done
  after(() => provider.finalize())

  // Create an end point for each group of sorted tasks.
  for (const key in UNAVAILABLE_TASKS) {
    let body: any;
    let status = UNAVAILABLE_TASKS[key];
    if (typeof(status) !== 'number') {
      body = { tasks: [ ...UNAVAILABLE_TASKS[key] ] };
      status = 200;
    }
    // Do one for each of ascending and descending.
    for (const order of ['ascending', 'descending']) {
      const operator = 'unavailable'
      const request: SearchTaskRequest = {
        search_parameters: [
          { key, operator, values: [ order ] },
        ]
      };
      if (order === 'descending' && body) {
        body.tasks = [ ...body.tasks.reverse() ];
      }
      describe(`when requested to search for ${operator} tasks in ${order} order of ${key}`, () => {
        before(() =>
          provider.addInteraction({
            state: 'a list of appropriate tasks are returned',
            uponReceiving: `a valid request to search for ${operator} tasks in ${order} order of ${key}`,
            withRequest: {
              method: 'POST',
              path: '/task',
              body: request
            },
            willRespondWith: {
              headers: {'Content-Type': 'application/json'},
              status,
              body
            }
          })
        )
    
        it(`returns a ${status} status`, async () => {
          const taskUrl: string = `${provider.mockService.baseUrl}/task`;
          let response: { status: number };
          try {
            response = await handleTaskSearch(taskUrl, request, {} as EnhancedRequest);
          } catch (err) {
            response = err;
          }
          assert.isDefined(response);
          expect(response.status).equal(status);
        })
      })
    }
  }
})
