import { Pact } from '@pact-foundation/pact';
import { expect } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';

import { EnhancedRequest } from '../../../lib/models';
import { handleTaskSearch } from '../../../workAllocation/taskService';
import { ALL_CASEWORKERS } from '../constants/work-allocation/caseworkers.spec';
import { filterByAssignee, SORTABLE_FIELDS, sortTasks, TASKS_ARRAY } from '../constants/work-allocation/tasks.spec';

describe('Work Allocation API', () => {

  let mockServerPort: number;
  let provider: Pact;

  before(async () => {
    mockServerPort = await getPort();
    provider = new Pact({
      consumer: 'xui_work_allocation_task_search_by_caseworker',
      provider: 'WorkAllocation_api_task',
      dir: path.resolve(__dirname, '../pacts'),
      log: path.resolve(__dirname, '../logs', 'work-allocation.log'),
      logLevel: 'info',
      port: mockServerPort,
      spec: 2
    });
    return provider.setup();
  });

  // Write Pact when all tests done
  after(() => provider.finalize());

  // Create an end point for each group of sorted tasks.
  for (const key of SORTABLE_FIELDS) {
    for (const caseworker of ALL_CASEWORKERS) {
      const caseworkerName = `${caseworker.firstName} ${caseworker.lastName}`;
      const values = [ caseworkerName ];
      // Do one for each of ascending and descending.
      for (const order of ['ascending', 'descending']) {
        const request: any = {
          search_parameters: [
            { key, operator: 'sort', values: [ order ] },
            { key: 'assignee', operator: 'IN', values }
          ]
        };
        const tasks = sortTasks(filterByAssignee(TASKS_ARRAY, [ caseworkerName ]), key, order);

        describe(`when requested to search for all tasks for ${caseworkerName} in ${order} order of ${key}`, () => {
          before(() =>
            provider.addInteraction({
              state: 'a list of appropriate tasks are returned',
              uponReceiving: `a valid request to search for all tasks for ${caseworkerName} in ${order} order of ${key}`,
              withRequest: {
                method: 'POST',
                path: '/task',
                body: request
              },
              willRespondWith: {
                body: { tasks },
                headers: {'Content-Type': 'application/json'},
                status: 200
              }
            })
          );
      
          it('returns success with a 200', async () => {
            const taskUrl: string = `${provider.mockService.baseUrl}/task`;
            const { status } = await handleTaskSearch(taskUrl, request, {} as EnhancedRequest);
            expect(status).equal(200);
          });
        });
      }
    }
  }
});
