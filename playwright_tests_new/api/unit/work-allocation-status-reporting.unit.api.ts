import { expect, test } from '@playwright/test';
import { loadMyWorkTest, loadTaskNamesTest } from '../utils/workAllocationSpecProbe';

test.describe('Authenticated work allocation status reporting', { tag: '@svc-internal' }, () => {
  test('the my-work tests reject malformed HTTP 200 dashboards and totals', async () => {
    for (const endpoint of ['workallocation/my-work/cases', 'workallocation/my-work/myaccess']) {
      const dashboardTest = loadMyWorkTest(endpoint, expect);
      const fakeClient = (data: unknown) => ({
        apiClientFor: async () => ({ post: async () => ({ status: 200, data }) }),
      });
      await expect(dashboardTest(fakeClient({ other: [] }))).rejects.toThrow();
      await expect(
        dashboardTest({ apiClientFor: async () => ({ post: async () => ({ status: 500, data: undefined }) }) })
      ).rejects.toThrow();
      if (endpoint.endsWith('/cases')) {
        await expect(dashboardTest(fakeClient({ cases: [], total_records: 'bad' }))).rejects.toThrow();
      }
      await dashboardTest(fakeClient({ cases: [], total_records: 0 }));
    }
  });

  test('the task names test rejects malformed HTTP 200 catalogues', async () => {
    const taskNamesTest = loadTaskNamesTest(expect);
    for (const data of [{ task_names: [] }, ['task'], [{ task_type: { task_type_id: 'type-1' } }]]) {
      await expect(
        Promise.resolve(
          taskNamesTest({
            apiClient: { get: async () => ({ status: 200, data }) },
          })
        )
      ).rejects.toThrow();
    }
  });

  for (const status of [200, 401, 403, 500]) {
    test(`the task names test ${status === 200 ? 'accepts' : 'rejects'} HTTP ${status}`, async () => {
      const requests: Array<{ url: string; options: unknown }> = [];
      const taskNamesTest = loadTaskNamesTest(expect);
      const response = taskNamesTest({
        apiClient: {
          get: async (url, options) => {
            requests.push({ url, options });
            return {
              status,
              data: status === 200 ? [{ task_type: { task_type_id: 'test', task_type_name: 'Test task' } }] : undefined,
            };
          },
        },
      });
      if (status === 200) await response;
      else await expect(Promise.resolve(response)).rejects.toThrow();
      expect(requests).toEqual(
        Array(status === 500 ? 3 : 1).fill({
          url: 'workallocation/taskNames',
          options: expect.objectContaining({ data: { service: 'IA' } }),
        })
      );
    });
  }
});
