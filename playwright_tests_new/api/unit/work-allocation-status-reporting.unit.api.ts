import { expect, test } from '@playwright/test';
import { loadTaskNamesTest } from '../utils/workAllocationSpecProbe';

test.describe('Authenticated work allocation status reporting', { tag: '@svc-internal' }, () => {
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
              return { status, data: status === 200 ? ['test'] : undefined };
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
