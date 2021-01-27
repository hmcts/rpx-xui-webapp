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

})
