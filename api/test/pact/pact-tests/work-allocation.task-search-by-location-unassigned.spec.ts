import { Pact } from '@pact-foundation/pact';
import { expect } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';

import { EnhancedRequest } from '../../../lib/models';
import { SearchTaskRequest } from '../../../workAllocation/interfaces/taskSearchParameter';
import { handleTaskSearch } from '../../../workAllocation/taskService';
import { LOCATION_COMBINATIONS } from '../constants/work-allocation/locations.spec';
import { filterByLocations, getUnassignedTasks, SORTABLE_FIELDS, sortTasks } from '../constants/work-allocation/tasks.spec';

describe('Work Allocation API', () => {

  let mockServerPort: number;
  let provider: Pact;

  before(async () => {
    mockServerPort = await getPort();
    provider = new Pact({
      consumer: 'xui_work_allocation_task_search_by_locations_unassigned',
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

  const baseTasks = [ ...getUnassignedTasks() ];
  
  // Create an end point for each group of sorted tasks.
  for (const key of SORTABLE_FIELDS) {
    for (const combination of LOCATION_COMBINATIONS) {
      const values = combination.map(l => l.locationName).sort();
      // Do one for each of ascending and descending.
      for (const order of ['ascending', 'descending']) {
        const request: SearchTaskRequest = {
          search_parameters: [
            { key, operator: 'sort', values: [ order ] },
            { key: 'location', operator: 'IN', values },
            { key: 'assignee', operator: 'IN', values: [] }
          ]
        };
        const tasks = sortTasks(filterByLocations(baseTasks, values), key, order);

        describe(`when requested to search for unassigned tasks at any of [${values.join(', ')}] in ${order} order of ${key}`, () => {
          before(() =>
            provider.addInteraction({
              state: 'a list of appropriate tasks are returned',
              uponReceiving: `a valid request to search for unassigned tasks at any of [${values.join(', ')}] in ${order} order of ${key}`,
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
