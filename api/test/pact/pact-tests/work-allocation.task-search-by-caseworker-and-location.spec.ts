import { Pact } from '@pact-foundation/pact';
import { expect } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';

import { EnhancedRequest } from '../../../lib/models';
import { SearchTaskRequest } from '../../../workAllocation/interfaces/taskSearchParameter';
import { handleTaskSearch } from '../../../workAllocation/taskService';
import { ALL_CASEWORKERS } from '../constants/work-allocation/caseworkers.spec';
import { LOCATIONS } from '../constants/work-allocation/locations.spec';
import { filterByLocations, SORTABLE_FIELDS, sortTasks, TASKS_ARRAY } from '../constants/work-allocation/tasks.spec';
import { filterByAssignee } from './../constants/work-allocation/tasks.spec';

describe('Work Allocation API', () => {

  let mockServerPort: number;
  let provider: Pact;

  before(async () => {
    mockServerPort = await getPort();
    provider = new Pact({
      consumer: 'xui_work_allocation_task_search_by_caseworker_and_location',
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

  const operator = 'manager';
  for (const caseworker of ALL_CASEWORKERS) {
    const caseworkerName = `${caseworker.firstName} ${caseworker.lastName}`;
    const baseTasks = filterByAssignee(TASKS_ARRAY, caseworkerName);

    // Create an end point for each group of sorted tasks.
    for (const key of SORTABLE_FIELDS) {
      for (const locationKey in LOCATIONS) {
        const location = LOCATIONS[locationKey];
        let values = [ location.locationName ];
        // Don't do this for ALL as we already have that one.
        if (location === LOCATIONS.ALL) {
          continue;
        }
        // Do one for each of ascending and descending.
        for (const order of ['ascending', 'descending']) {
          const request: SearchTaskRequest = {
            search_parameters: [
              { key, operator, values: [ order ] },
              { key: 'location', operator: 'IN', values },
              { key: 'assignee', operator: 'IN', values: [ caseworkerName ] }
            ]
          };
          const tasks = sortTasks(filterByLocations(baseTasks, values), key, order);
  
          describe(`when requested to search for ${caseworkerName}'s tasks at ${location.locationName} in ${order} order of ${key}`, () => {
            before(() =>
              provider.addInteraction({
                state: 'a list of appropriate tasks are returned',
                uponReceiving: `a valid request to search for ${caseworkerName}'s tasks at ${location.locationName} in ${order} order of ${key}`,
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
  }
});
