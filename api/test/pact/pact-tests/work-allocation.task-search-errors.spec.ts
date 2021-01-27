import { Pact } from '@pact-foundation/pact';
import { assert, expect } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';

import { EnhancedRequest } from '../../../lib/models';
import { handleTaskSearch } from '../../../workAllocation/taskService';
import { BEHAVIOURS } from '../constants/work-allocation/behaviours.spec';

describe('Work Allocation API', () => {

  let mockServerPort: number;
  let provider: Pact;

  before(async () => {
    mockServerPort = await getPort();
    provider = new Pact({
      consumer: 'xui_work_allocation_task_search_errors',
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

  describe('when making a request task and the server falls over', () => {
    before(() =>
      provider.addInteraction({
        state: 'the server had an internal error',
        uponReceiving: 'a request to server falls over',
        withRequest: {
          method: 'POST',
          path: '/task',
          body: BEHAVIOURS.SERVER_ERROR
        },
        willRespondWith: {
          status: 500,
          headers: {'Content-Type': 'application/json'}
        }
      })
    );
  });
});
