import { test, expect } from './fixtures';
import { expectStatus, StatusSets, withXsrf } from './utils/apiTestUtils';
import { fetchFirstTask } from './utils/workAllocationUtils';

const fallbackTaskId = '00000000-0000-0000-0000-000000000000';
let taskId = fallbackTaskId;

const cancellationProcessMatrix = [
  {
    label: 'valid cancellation_process',
    value: 'EXUI_USER_CANCELLATION',
  },
  {
    label: 'invalid cancellation_process',
    value: 'INVALID_PROCESS',
  },
] as const;

test.describe('Work allocation cancellation API coverage', () => {
  test.beforeAll(async ({ apiClient }) => {
    const firstTask = await fetchFirstTask(apiClient, undefined, ['assigned', 'unassigned'], 'AllWork');
    taskId = firstTask?.id ?? fallbackTaskId;
  });

  test('POST /workallocation/task/:id/cancel accepts the UI manual cancellation payload', async ({ apiClient, apiLogs }, testInfo) => {
    const endpoint = `workallocation/task/${taskId}/cancel`;
    const startLogIndex = apiLogs.length;

    const response = await withXsrf('solicitor', (headers) =>
      apiClient.post(endpoint, {
        data: { hasNoAssigneeOnComplete: false },
        headers,
        throwOnError: false,
      })
    );

    expectStatus(response.status, StatusSets.actionWithConflicts);

    const cancelRequestLogs = apiLogs.slice(startLogIndex).filter((entry) => {
      return entry.method === 'POST' && entry.url.includes(`/workallocation/task/${taskId}/cancel`);
    });

    expect(cancelRequestLogs.length).toBeGreaterThan(0);
    const latestCancelCall = cancelRequestLogs[cancelRequestLogs.length - 1];
    const actualUrl = latestCancelCall.url;
    const expectedPath = `/workallocation/task/${taskId}/cancel`;

    await testInfo.attach('EXUI-3662-node-endpoint-expected-vs-actual.json', {
      body: JSON.stringify(
        {
          expectation: {
            pathContains: expectedPath,
            queryMustExclude: ['completion_process='],
          },
          actual: {
            url: actualUrl,
            includesCompletionProcess: actualUrl.includes('completion_process='),
          },
        },
        null,
        2
      ),
      contentType: 'application/json',
    });

    expect(
      actualUrl.includes('completion_process='),
      `Expected node endpoint URL to exclude completion_process; actual url="${actualUrl}"`
    ).toBeFalsy();
  });

  for (const processCase of cancellationProcessMatrix) {
    test(`POST /workallocation/task/:id/cancel tolerates optional ${processCase.label} query`, async ({ apiClient, apiLogs }, testInfo) => {
      const endpoint = `workallocation/task/${taskId}/cancel?cancellation_process=${processCase.value}`;
      const startLogIndex = apiLogs.length;

      const response = await withXsrf('solicitor', (headers) =>
        apiClient.post(endpoint, {
          data: { hasNoAssigneeOnComplete: false },
          headers,
          throwOnError: false,
        })
      );

      expectStatus(response.status, StatusSets.actionWithConflicts);

      const cancelRequestLogs = apiLogs.slice(startLogIndex).filter((entry) => {
        return entry.method === 'POST' && entry.url.includes(`/workallocation/task/${taskId}/cancel`);
      });

      expect(cancelRequestLogs.length).toBeGreaterThan(0);
      const latestCancelCall = cancelRequestLogs[cancelRequestLogs.length - 1];
      const actualUrl = latestCancelCall.url;
      const expectedQueryPart = `cancellation_process=${processCase.value}`;

      await testInfo.attach(`EXUI-3662-optional-query-${processCase.value}-expected-vs-actual.json`, {
        body: JSON.stringify(
          {
            expectation: {
              urlMustContain: expectedQueryPart,
            },
            actual: {
              url: actualUrl,
              containsExpectedQuery: actualUrl.includes(expectedQueryPart),
            },
          },
          null,
          2
        ),
        contentType: 'application/json',
      });

      expect(
        actualUrl.includes(expectedQueryPart),
        `Expected URL to include "${expectedQueryPart}"; actual url="${actualUrl}"`
      ).toBeTruthy();
    });
  }
});
