import { Pact } from '@pact-foundation/pact';
import { assert, expect } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';

import { EnhancedRequest } from '../../../lib/models';
import { handleTaskPost } from '../../../workAllocation/taskService';

describe("Work Allocation API", () => {

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
      provider: 'WorkAllocation_api_complete',
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

  describe('when making a bad request to complete a task', () => {
    before(() =>
      provider.addInteraction({
        state: 'a bad request was made',
        uponReceiving: 'a bad request for completion',
        withRequest: {
          method: 'POST',
          path: '/task/123456/complete',
          body: BEHAVIOURS.BAD_REQUEST
        },
        willRespondWith: {
          status: 400,
          headers: {'Content-Type': 'application/json'}
        }
      })
    );

    it('returns failure with a 400', async () => {
      const taskUrl: string = `${provider.mockService.baseUrl}/task/123456/complete`;
      let response: { status: number };
      try {
        response = await handleTaskPost(taskUrl, BEHAVIOURS.BAD_REQUEST, {} as EnhancedRequest);
      } catch (err) {
        response = err;
      }
      assert.isDefined(response);
      expect(response.status).equal(400);
    });
  });

  describe('when making a request to complete a forbidden task', () => {
    before(() =>
      provider.addInteraction({
        state: 'completion of this task is was forbidden',
        uponReceiving: 'a request for completion of a forbidden task',
        withRequest: {
          method: 'POST',
          path: '/task/123456/complete',
          body: BEHAVIOURS.FORBIDDEN
        },
        willRespondWith: {
          status: 403,
          headers: {'Content-Type': 'application/json'}
        }
      })
    );

    it('returns failure with a 403', async () => {
      const taskUrl: string = `${provider.mockService.baseUrl}/task/123456/complete`;
      let response: { status: number };
      try {
        response = await handleTaskPost(taskUrl, BEHAVIOURS.FORBIDDEN, {} as EnhancedRequest);
      } catch (err) {
        response = err;
      }
      assert.isDefined(response);
      expect(response.status).equal(403);
    });
  });

  describe('when making a request to complete a task but it is unsupported', () => {
    before(() =>
      provider.addInteraction({
        state: 'this action is unsupported',
        uponReceiving: 'a request for completion but it is unsupported',
        withRequest: {
          method: 'POST',
          path: '/task/123456/complete',
          body: BEHAVIOURS.UNSUPPORTED
        },
        willRespondWith: {
          status: 415,
          headers: {'Content-Type': 'application/json'}
        }
      })
    );

    it('returns failure with a 415', async () => {
      const taskUrl: string = `${provider.mockService.baseUrl}/task/123456/complete`;
      let response: { status: number };
      try {
        response = await handleTaskPost(taskUrl, BEHAVIOURS.UNSUPPORTED, {} as EnhancedRequest);
      } catch (err) {
        response = err;
      }
      assert.isDefined(response);
      expect(response.status).equal(415);
    });
  });

  describe('when making a request to complete a task and the server falls over', () => {
    before(() =>
      provider.addInteraction({
        state: 'the server had an internal error',
        uponReceiving: 'a request for completion and the server falls over',
        withRequest: {
          method: 'POST',
          path: '/task/123456/complete',
          body: BEHAVIOURS.SERVER_ERROR
        },
        willRespondWith: {
          status: 500,
          headers: {'Content-Type': 'application/json'}
        }
      })
    );

    it('returns failure with a 500', async () => {
      const taskUrl: string = `${provider.mockService.baseUrl}/task/123456/complete`;
      let response: { status: number };
      try {
        response = await handleTaskPost(taskUrl, BEHAVIOURS.SERVER_ERROR, {} as EnhancedRequest);
      } catch (err) {
        response = err;
      }
      assert.isDefined(response);
      expect(response.status).equal(500);
    });
  });

});
