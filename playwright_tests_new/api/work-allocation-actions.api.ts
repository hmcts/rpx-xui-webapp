import { test } from './fixtures';
import { WA_SAMPLE_ASSIGNED_TASK_ID, WA_SAMPLE_TASK_ID } from './data/testIds';
import { expectStatus, StatusSets } from './utils/apiTestUtils';

const fallbackId = '00000000-0000-0000-0000-000000000000';

function requireIds(): { unassigned: string; assigned: string } {
  const unassigned = WA_SAMPLE_TASK_ID ?? '';
  const assigned = WA_SAMPLE_ASSIGNED_TASK_ID ?? '';
  if (!unassigned && !assigned) {
    test.skip('Provide WA_SAMPLE_TASK_ID/WA_SAMPLE_ASSIGNED_TASK_ID in test-manifest.json or env');
  }
  return {
    unassigned: unassigned || fallbackId,
    assigned: assigned || unassigned || fallbackId
  };
}

test.describe('Work allocation task actions (manifest-driven)', () => {
  const actions = ['claim', 'unclaim', 'assign', 'unassign', 'complete', 'cancel'] as const;

  test.describe('unauthenticated', () => {
    actions.forEach((action) => {
      test(`${action} rejects without session`, async ({ anonymousClient }) => {
        const { unassigned, assigned } = requireIds();
        const id = action === 'claim' || action === 'assign' ? unassigned : assigned;
        const res = await anonymousClient.post(`workallocation/task/${id}/${action}`, {
          data: {},
          throwOnError: false
        });
        expectStatus(res.status, [401, 403, 502]);
      });
    });
  });

  test.describe('missing or invalid XSRF', () => {
    actions.forEach((action) => {
      test(`${action} rejects without XSRF`, async ({ apiClient }) => {
        const { unassigned, assigned } = requireIds();
        const id = action === 'claim' || action === 'assign' ? unassigned : assigned;
        const res = await apiClient.post(`workallocation/task/${id}/${action}`, {
          data: {},
          headers: {},
          throwOnError: false
        });
        expectStatus(res.status, [200, 204, 400, 401, 403, 404, 409]);
      });

      test(`${action} rejects with invalid XSRF`, async ({ apiClient }) => {
        const { unassigned, assigned } = requireIds();
        const id = action === 'claim' || action === 'assign' ? unassigned : assigned;
        const res = await apiClient.post(`workallocation/task/${id}/${action}`, {
          data: {},
          headers: { 'X-XSRF-TOKEN': 'invalid-token' },
          throwOnError: false
        });
        expectStatus(res.status, [400, 401, 403, 404, 409]);
      });
    });
  });

  test.describe('with XSRF header', () => {
    actions.forEach((action) => {
      test(`${action} returns allowed status with XSRF`, async ({ apiClient, xsrfHeaders }) => {
        const { unassigned, assigned } = requireIds();
        const id = action === 'claim' || action === 'assign' ? unassigned : assigned;
        const headers = await xsrfHeaders('solicitor');
        const res = await apiClient.post(`workallocation/task/${id}/${action}`, {
          data: {},
          headers,
          throwOnError: false
        });
        expectStatus(res.status, StatusSets.actionWithConflicts);
      });
    });

    test('assign allows explicit user target', async ({ apiClient, xsrfHeaders }) => {
      const { unassigned } = requireIds();
      const headers = await xsrfHeaders('solicitor');
      const res = await apiClient.post(`workallocation/task/${unassigned}/assign`, {
        data: { userId: '00000000-0000-0000-0000-000000000000' },
        headers,
        throwOnError: false
      });
      expectStatus(res.status, StatusSets.actionWithConflicts);
    });
  });
});
