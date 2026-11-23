import { expect, test } from '@playwright/test';
import { loadMyWorkTest, loadTaskNamesTest } from '../utils/workAllocationSpecProbe';

test.describe('Authenticated work allocation status reporting', { tag: '@svc-internal' }, () => {
  test('the my-work tests reject malformed HTTP 200 dashboards and totals', async () => {
    for (const endpoint of ['workallocation/my-work/cases', 'workallocation/my-work/myaccess']) {
      const dashboardTest = loadMyWorkTest(endpoint);
      const fakeClient = (data: unknown) => ({
        apiClientFor: async () => ({ post: async () => ({ status: 200, data }) }),
      });
      await expect(dashboardTest(fakeClient({ other: [] }))).rejects.toThrow();
      if (endpoint.endsWith('/cases')) {
        await expect(dashboardTest(fakeClient({ cases: [], total_records: 'bad' }))).rejects.toThrow();
      }
      await dashboardTest(fakeClient({ cases: [], total_records: 0 }));
    }
  });

  test('the task names test rejects malformed HTTP 200 catalogues', async () => {
    const taskNamesTest = loadTaskNamesTest();
    for (const data of [{ task_names: [] }, ['task'], [{ id: 'type-1' }]]) {
      await expect(
        Promise.resolve(
          taskNamesTest({
            apiClient: { get: async () => ({ status: 200, data }) },
          })
        )
      ).rejects.toThrow();
    }
  });

  for (const status of [200, 401, 403]) {
    test(`the task names test reports HTTP ${status} accurately`, async () => {
      const annotations = test.info().annotations;
      const before = annotations.length;
      const requests: string[] = [];
      try {
        const taskNamesTest = loadTaskNamesTest();
        await taskNamesTest({
          apiClient: {
            get: async (url) => {
              requests.push(url);
              return { status, data: status === 200 ? [{ id: 'test', name: 'Test task' }] : undefined };
            },
          },
        });
        expect(requests).toEqual(['workallocation/taskNames']);
        expect(annotations.slice(before)).toEqual(
          status === 200 ? [] : [{ type: 'status-tolerated', description: `actual=${status} allowed=200,401,403,500,502,504` }]
        );
      } finally {
        annotations.splice(before);
      }
    });
  }
});
