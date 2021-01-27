import { Pact } from '@pact-foundation/pact';
import { assert, expect } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';
import { EnhancedRequest } from '../../../lib/models';
import { handleTaskPost } from '../../../workAllocation/taskService';


describe('Work Allocation API', () => {

  let mockServerPort: number;
  let provider: Pact;

  const BEHAVIOURS = {
    SUCCESS: {},
    ALREADY_DONE: { behaviour: 'already-done' },
    BAD_REQUEST: { behaviour: 'bad-request' },
    FORBIDDEN: { behaviour: 'forbidden' },
    UNSUPPORTED: { behaviour: 'unsupported' },
    SERVER_ERROR: { behaviour: 'unsupported' }
  };

  before(async () => {
    mockServerPort = await getPort();
    provider = new Pact({
      consumer: 'xui_work_allocation_task_complete',
      provider: 'WorkAllocation_api',
      dir: path.resolve(__dirname, '../../pacts'),
      log: path.resolve(__dirname, '../logs', 'work-allocation.log'),
      logLevel: 'info',
      port: mockServerPort,
      spec: 2
    });
    return provider.setup();
  });

  // Write Pact when all tests done
  after(() => provider.finalize());

  describe('when requested to complete a task', () => {
    before(() =>
      provider.addInteraction({
        state: 'task is completed',
        uponReceiving: 'a request for completion',
        withRequest: {
          method: 'POST',
          path: '/task/123456/complete',
          body: BEHAVIOURS.SUCCESS
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'}
        }
      })
    );

    it('returns success with a 200', async () => {
      const taskUrl: string = `${provider.mockService.baseUrl}/task/123456/complete`
      const { status } = await handleTaskPost(taskUrl, BEHAVIOURS.SUCCESS, {} as EnhancedRequest);
      expect(status).equal(200);
    });
  });

  describe('when requested to complete a task that is already complete', () => {
    before(() =>
      provider.addInteraction({
        state: 'task was already complete',
        uponReceiving: 'a request for completion when already complete',
        withRequest: {
          method: 'POST',
          path: '/task/123456/complete',
          body: BEHAVIOURS.ALREADY_DONE
        },
        willRespondWith: {
          status: 204,
          headers: {'Content-Type': 'application/json'}
        }
      })
    );

    it('returns success but with a 204', async () => {
      const taskUrl: string = `${provider.mockService.baseUrl}/task/123456/complete`
      const { status } = await handleTaskPost(taskUrl, BEHAVIOURS.ALREADY_DONE, {} as EnhancedRequest);
      expect(status).equal(204);
    });
  });
});
