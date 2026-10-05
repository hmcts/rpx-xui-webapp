import { expect, test } from '@playwright/test';
import { assertStateTransition, runSeededAction } from '../utils/workAllocationUtils';

const unassigned = { task_state: 'unassigned', assignee: '' };
const assigned = { task_state: 'assigned', assignee: 'actor' };

test.describe('WA action contracts', { tag: '@svc-internal' }, () => {
  test('rejects absent, alias-only, incorrect and unchanged task state', () => {
    for (const after of [
      undefined,
      {},
      { state: 'assigned', assigned_to: 'actor' },
      unassigned,
      { ...assigned, task_state: 'configured' },
    ]) {
      expect(() =>
        assertStateTransition('claim', unassigned, after as Parameters<typeof assertStateTransition>[2], 'actor')
      ).toThrow();
    }
    expect(() => assertStateTransition('claim', undefined, assigned, 'actor')).toThrow();
    expect(() => assertStateTransition('claim', assigned, assigned, 'actor')).toThrow();
    expect(() => assertStateTransition('assign', assigned, assigned, 'actor')).toThrow();
    expect(() => assertStateTransition('complete', assigned, { ...assigned, task_state: 'closed' })).toThrow();
    expect(() => assertStateTransition('cancel', assigned, unassigned)).toThrow();
  });

  test('requires the intended actor and proves assignment or its removal', () => {
    expect(() => assertStateTransition('claim', unassigned, assigned)).toThrow();
    expect(() => assertStateTransition('claim', unassigned, assigned, 'someone-else')).toThrow();
    expect(() => assertStateTransition('claim', unassigned, { task_state: 'assigned' }, 'actor')).toThrow();
    assertStateTransition('claim', { task_state: 'unassigned' }, assigned, 'actor');
    assertStateTransition('unclaim', assigned, { task_state: 'unassigned' });
    assertStateTransition('claim', unassigned, assigned, 'actor');
    assertStateTransition('assign', assigned, { ...assigned, assignee: 'new-actor' }, 'new-actor');
    assertStateTransition('unclaim', assigned, unassigned);
    assertStateTransition('unassign', assigned, unassigned, 'operator');
    for (const action of ['complete', 'cancel']) {
      assertStateTransition(action, assigned, { ...assigned, task_state: action === 'complete' ? 'completed' : 'cancelled' });
    }
  });

  test('seeded actions reject missing ids and failed or absent readbacks without mutation', async () => {
    let posts = 0;
    const apiClient = {
      get: async () => ({ status: 503, data: { task: unassigned } }),
      post: async () => {
        posts++;
        return { status: 204 };
      },
    } as unknown as Parameters<typeof runSeededAction>[2]['apiClient'];
    for (const id of ['', '00000000-0000-0000-0000-000000000000']) {
      await expect(runSeededAction('claim', () => id, { apiClient, expectedAssignee: 'actor' })).rejects.toThrow();
    }
    await expect(runSeededAction('claim', () => 'task', { apiClient, expectedAssignee: 'actor' })).rejects.toThrow();
    expect(posts).toBe(0);
  });

  test('seeded actions prove readback transition and reject HTTP-only success', async () => {
    for (const after of [assigned, unassigned, undefined, { ...assigned, assignee: 'wrong' }]) {
      let reads = 0;
      const paths: string[] = [];
      const apiClient = {
        get: async (path: string) => {
          paths.push(path);
          return { status: 200, data: { task: reads++ === 0 ? unassigned : after } };
        },
        post: async (path: string) => {
          paths.push(path);
          return { status: 204 };
        },
      } as unknown as Parameters<typeof runSeededAction>[2]['apiClient'];
      const result = runSeededAction('claim', () => 'task', {
        apiClient,
        expectedAssignee: 'actor',
        withXsrfFn: async (_role, fn) => fn({}),
      });
      if (after === assigned) await expect(result).resolves.toBe(true);
      else await expect(result).rejects.toThrow();
      expect(paths).toEqual(['workallocation/task/task', 'workallocation/task/task/claim', 'workallocation/task/task']);
    }
  });
  test('rejects failed mutation and failed readback without retry', async () => {
    for (const [postStatus, afterStatus] of [
      [500, 200],
      [204, 500],
    ]) {
      let reads = 0;
      let posts = 0;
      const apiClient = {
        get: async () => ({ status: reads++ === 0 ? 200 : afterStatus, data: { task: reads === 1 ? unassigned : assigned } }),
        post: async () => {
          posts++;
          return { status: postStatus };
        },
      } as unknown as Parameters<typeof runSeededAction>[2]['apiClient'];
      await expect(
        runSeededAction('claim', () => 'task', {
          apiClient,
          expectedAssignee: 'actor',
          withXsrfFn: async (_role, fn) => fn({}),
        })
      ).rejects.toThrow();
      expect(posts).toBe(1);
      expect(reads).toBe(postStatus === 500 ? 1 : 2);
    }
  });
  test('assign sends the intended actor in the provider payload', async () => {
    let reads = 0;
    const apiClient = {
      get: async () => ({ status: 200, data: { task: reads++ === 0 ? unassigned : assigned } }),
      post: async (_path: string, options: { data: unknown }) => {
        expect(options.data).toEqual({ userId: 'actor' });
        return { status: 204 };
      },
    } as unknown as Parameters<typeof runSeededAction>[2]['apiClient'];
    await expect(
      runSeededAction('assign', () => 'task', {
        apiClient,
        expectedAssignee: 'actor',
        withXsrfFn: async (_role, fn) => fn({}),
      })
    ).resolves.toBe(true);
  });
  test('unassign uses assign with a null user and requires another assignee', async () => {
    for (const assignee of ['other-actor', 'operator']) {
      let reads = 0;
      let posts = 0;
      const apiClient = {
        get: async () => ({ status: 200, data: { task: reads++ === 0 ? { task_state: 'assigned', assignee } : unassigned } }),
        post: async (path: string, options: { data: unknown }) => {
          posts++;
          expect(path).toBe('workallocation/task/task/assign');
          expect(options.data).toEqual({ userId: null });
          return { status: 204 };
        },
      } as unknown as Parameters<typeof runSeededAction>[2]['apiClient'];
      const result = runSeededAction('unassign', () => 'task', {
        apiClient,
        expectedAssignee: 'operator',
        withXsrfFn: async (_role, fn) => fn({}),
      });
      if (assignee === 'operator') {
        await expect(result).rejects.toThrow();
        expect(posts).toBe(0);
      } else {
        await expect(result).resolves.toBe(true);
        expect(posts).toBe(1);
      }
    }
    expect(() => assertStateTransition('unassign', assigned, unassigned, 'actor')).toThrow();
    expect(() => assertStateTransition('unassign', assigned, unassigned)).toThrow();
  });
});
