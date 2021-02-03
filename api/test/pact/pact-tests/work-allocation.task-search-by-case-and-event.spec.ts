import { Pact } from '@pact-foundation/pact';
import { somethingLike } from '@pact-foundation/pact/dsl/matchers';
import { expect } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';

import { EnhancedRequest } from '../../../lib/models';
import { handleTaskSearch } from '../../../workAllocation/taskService';
import { TASKS } from '../constants/work-allocation/tasks.spec';

describe('Work Allocation API', () => {

  let mockServerPort: number;
  let provider: Pact;

  before(async () => {
    mockServerPort = await getPort();
    provider = new Pact({
      consumer: 'xui_work_allocation_task_search_by_case_and_event',
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

  // Return no tasks on "solicitorCreateApplication".
  describe(`when requested to search for tasks with event "solicitorCreateApplication"`, () => {
    const parameters = {
      eventId: 'solicitorCreateApplication',
      state: ['Open']
    };
    before(() =>
      provider.addInteraction({
        state: 'no tasks are returned',
        uponReceiving: `a valid request to search for tasks for any case with event "solicitorCreateApplication"`,
        withRequest: {
          method: 'POST',
          path: '/task',
          body: {
            parameters: [{
              ccdId: somethingLike('1'),
              ...parameters
            }]
          }
        },
        willRespondWith: {
          body: { tasks: [] },
          headers: {'Content-Type': 'application/json'},
          status: 200
        }
      })
    );

    it('returns success with a 200', async () => {
      const taskUrl: string = `${provider.mockService.baseUrl}/task`;
      const thisRequest = {
        parameters: [{
          ccdId: '1',
          ...parameters
        }]
      }
      const { status } = await handleTaskSearch(taskUrl, thisRequest, {} as EnhancedRequest);
      expect(status).equal(200);
    });
  });


  // Return multiple tasks on "solicitorUpdateApplication".
  describe(`when requested to search for tasks with event "solicitorUpdateApplication"`, () => {
    const parameters = {
      eventId: 'solicitorUpdateApplication',
      state: ['Open']
    };
    before(() =>
      provider.addInteraction({
        state: 'multiple tasks are returned',
        uponReceiving: `a valid request to search for tasks for any case with event "solicitorUpdateApplication"`,
        withRequest: {
          method: 'POST',
          path: '/task',
          body: {
            parameters: [{
              ccdId: somethingLike('1'),
              ...parameters
            }]
          }
        },
        willRespondWith: {
          body: {
            tasks: [ TASKS.KILI_MUSO, TASKS.BOB_CRATCHITT ]
          },
          headers: {'Content-Type': 'application/json'},
          status: 200
        }
      })
    );

    it('returns success with a 200', async () => {
      const taskUrl: string = `${provider.mockService.baseUrl}/task`;
      const thisRequest = {
        parameters: [{
          ccdId: '1',
          ...parameters
        }]
      }
      const { status } = await handleTaskSearch(taskUrl, thisRequest, {} as EnhancedRequest);
      expect(status).equal(200);
    });
  });

  // Return multiple tasks on "solicitorUpdateProbate".
  describe(`when requested to search for tasks with event "solicitorUpdateProbate"`, () => {
    const parameters = {
      eventId: 'solicitorUpdateProbate',
      state: ['Open']
    };
    before(() =>
      provider.addInteraction({
        state: 'one task is returned',
        uponReceiving: `a valid request to search for tasks for any case with event "solicitorUpdateProbate"`,
        withRequest: {
          method: 'POST',
          path: '/task',
          body: {
            parameters: [{
              ccdId: somethingLike('1'),
              ...parameters
            }]
          }
        },
        willRespondWith: {
          body: {
            tasks: [ TASKS.KILI_MUSO ]
          },
          headers: {'Content-Type': 'application/json'},
          status: 200
        }
      })
    );

    it('returns success with a 200', async () => {
      const taskUrl: string = `${provider.mockService.baseUrl}/task`;
      const thisRequest = {
        parameters: [{
          ccdId: '1',
          ...parameters
        }]
      }
      const { status } = await handleTaskSearch(taskUrl, thisRequest, {} as EnhancedRequest);
      expect(status).equal(200);
    });
  });
});
