import { test, expect } from './fixtures';
import { expectStatus } from './utils/apiTestUtils';
import { createWorkAllocationActionFixture } from './utils/workAllocationActionFixture';
import { runSeededAction } from './utils/workAllocationUtils';

const OWNED_TASK_ACTION_TEST_TIMEOUT_MS = 10 * 60_000;

test.describe('Work allocation owned task actions', { tag: ['@svc-work-allocation', '@wa-action'] }, () => {
  test('supports the owned task action lifecycle for a newly provisioned task', async ({}, testInfo) => {
    testInfo.setTimeout(OWNED_TASK_ACTION_TEST_TIMEOUT_MS);
    const fixture = await createWorkAllocationActionFixture();
    const errors: unknown[] = [];
    const deps = {
      apiClient: fixture.client,
      expectedAssignee: fixture.actorId,
      withXsrfFn: async (_role: string, fn: (headers: Record<string, string>) => Promise<void>) => fn(fixture.headers),
    };
    try {
      const cancelResponse = await fixture.client.post(`workallocation/task/${fixture.taskId}/cancel`, {
        data: {},
        headers: fixture.headers,
        throwOnError: false,
      });
      expectStatus(cancelResponse.status, [403]);
      const afterCancel = await fixture.client.get(`workallocation/task/${fixture.taskId}`, { throwOnError: false });
      expectStatus(afterCancel.status, [200]);
      expect(afterCancel.data.task?.task_state).toBe('unassigned');

      await runSeededAction('claim', () => fixture.taskId, deps);
      await runSeededAction('unclaim', () => fixture.taskId, deps);
      await runSeededAction('assign', () => fixture.taskId, deps);
      await runSeededAction('unassign', () => fixture.taskId, deps);
      await runSeededAction('claim', () => fixture.taskId, deps);
      await runSeededAction('complete', () => fixture.taskId, deps);
    } catch (error) {
      errors.push(error);
    }
    try {
      await fixture.cleanup();
    } catch (cleanupError) {
      errors.push(cleanupError);
    } finally {
      try {
        await fixture.dispose();
      } catch (disposeError) {
        errors.push(disposeError);
      }
    }
    if (errors.length > 1) throw new AggregateError(errors, 'WA action lifecycle and owned fixture cleanup failed');
    if (errors.length === 1) throw errors[0];
  });
});
