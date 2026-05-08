import { type ApiClient as PlaywrightApiClient } from '@hmcts/playwright-common';
import type { TestInfo } from '@playwright/test';

import { test, expect, type ApiFixtures } from './fixtures';
import { WA_SAMPLE_ASSIGNED_TASK_ID, WA_SAMPLE_TASK_ID } from './data/testIds';
import { expectStatus, StatusSets, withXsrf } from './utils/apiTestUtils';
import { fetchFirstTask, resolveTaskIdWithEnvFallback } from './utils/workAllocationUtils';

const fallbackTaskId = '00000000-0000-0000-0000-000000000000';
const waSolicitorRole = 'waSolicitor';
type TaskSource = 'dynamic' | 'env-assigned' | 'env-unassigned' | 'none';
type TaskResolution = { liveLookupRequired: boolean; liveLookupUsed: boolean; taskId: string; taskSource: TaskSource };
type ApiClientFactory = ApiFixtures['apiClientFor'];
type WaRuntime = {
  client: PlaywrightApiClient;
  xsrfHeaders: Record<string, string>;
  hasDedicatedWaSolicitor: boolean;
  task: TaskResolution;
};

let taskResolutionPromise: Promise<TaskResolution> | undefined;

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

function isTruthy(value: string | undefined): boolean {
  return ['1', 'true', 'yes', 'on'].includes((value ?? '').trim().toLowerCase());
}

function hasDedicatedWaSolicitorCredentials(): boolean {
  return Boolean(process.env.WA_SOLICITOR_USERNAME?.trim() && process.env.WA_SOLICITOR_PASSWORD?.trim());
}

function shouldLookupLiveWaTask(hasDedicatedWaSolicitor: boolean): boolean {
  if (hasDedicatedWaSolicitor) {
    return true;
  }
  return isTruthy(process.env.API_WA_CANCELLATION_LOOKUP_TASK);
}

async function resolveTask(client: PlaywrightApiClient, hasDedicatedWaSolicitor: boolean): Promise<TaskResolution> {
  if (!taskResolutionPromise) {
    taskResolutionPromise = (async () => {
      const liveLookupUsed = shouldLookupLiveWaTask(hasDedicatedWaSolicitor);
      const configuredResolution = resolveTaskIdWithEnvFallback(
        undefined,
        WA_SAMPLE_ASSIGNED_TASK_ID,
        WA_SAMPLE_TASK_ID,
        fallbackTaskId
      );
      if (!liveLookupUsed) {
        return {
          liveLookupRequired: false,
          liveLookupUsed,
          taskId: configuredResolution.taskId,
          taskSource: configuredResolution.source,
        };
      }

      const firstTask = await fetchFirstTask(client, undefined, ['assigned', 'unassigned'], 'AllWork', {
        failOnRequestError: hasDedicatedWaSolicitor,
        retries: 0,
        timeoutMs: 10_000,
      });
      const resolution = resolveTaskIdWithEnvFallback(
        firstTask?.id,
        WA_SAMPLE_ASSIGNED_TASK_ID,
        WA_SAMPLE_TASK_ID,
        fallbackTaskId
      );
      return {
        liveLookupRequired: hasDedicatedWaSolicitor,
        liveLookupUsed,
        taskId: resolution.taskId,
        taskSource: resolution.source,
      };
    })();
  }
  return taskResolutionPromise;
}

async function createWaRuntime({ apiClientFor }: { apiClientFor: ApiClientFactory }): Promise<WaRuntime> {
  const hasDedicatedWaSolicitor = hasDedicatedWaSolicitorCredentials();
  const client = await apiClientFor(waSolicitorRole);
  return {
    client,
    xsrfHeaders: await withXsrf(waSolicitorRole, async (headers) => headers),
    hasDedicatedWaSolicitor,
    task: await resolveTask(client, hasDedicatedWaSolicitor),
  };
}

function annotateTaskFallback(testInfo: TestInfo, runtime: WaRuntime): void {
  const { task } = runtime;
  testInfo.annotations.push({
    type: 'notice',
    description: runtime.hasDedicatedWaSolicitor
      ? 'Using dedicated WA solicitor credentials from WA_SOLICITOR_USERNAME/PASSWORD. Live AllWork lookup is required for this run.'
      : 'Using degraded waSolicitor fallback credentials. Set WA_SOLICITOR_USERNAME/PASSWORD to the dashboard-created low-assignment solicitor for full WA lookup coverage.',
  });
  if (task.liveLookupUsed && task.taskSource === 'dynamic') {
    testInfo.annotations.push({
      type: 'notice',
      description: 'Resolved cancellation task id from live AllWork lookup.',
    });
  }
  if (task.liveLookupUsed && task.taskSource !== 'dynamic') {
    testInfo.annotations.push({
      type: task.liveLookupRequired ? 'warning' : 'notice',
      description: task.liveLookupRequired
        ? 'Live AllWork lookup completed without timeout for the dedicated WA solicitor but returned no task; using fallback task id for cancellation endpoint coverage.'
        : 'Optional live AllWork lookup returned no task; using fallback task id for cancellation endpoint coverage.',
    });
  }
  if (task.taskSource === 'env-assigned' || task.taskSource === 'env-unassigned') {
    testInfo.annotations.push({
      type: 'notice',
      description: `Using ${task.taskSource} task id from WA_SAMPLE_* because AllWork search returned no tasks.`,
    });
  }
  if (task.taskSource === 'none') {
    testInfo.annotations.push({
      type: 'notice',
      description:
        'Using deterministic fallback task id (00000000-0000-0000-0000-000000000000) because no live or WA_SAMPLE_* task id was available.',
    });
  }
}

test.describe('Work allocation cancellation API coverage', { tag: ['@svc-work-allocation'] }, () => {
  test.describe.configure({ mode: 'serial' });

  test('POST /workallocation/task/:id/cancel accepts the UI manual cancellation payload', async ({
    apiClientFor,
    apiLogs,
  }, testInfo) => {
    const runtime = await createWaRuntime({ apiClientFor });
    annotateTaskFallback(testInfo, runtime);
    const taskId = runtime.task.taskId;
    const endpoint = `workallocation/task/${taskId}/cancel`;
    const startLogIndex = apiLogs.length;

    const response = await runtime.client.post(endpoint, {
      data: { hasNoAssigneeOnComplete: false },
      headers: runtime.xsrfHeaders,
      throwOnError: false,
    });

    expectStatus(response.status, StatusSets.actionWithConflicts);

    const cancelRequestLogs = apiLogs.slice(startLogIndex).filter((entry) => {
      return entry.method === 'POST' && entry.url.includes(`/workallocation/task/${taskId}/cancel`);
    });

    expect(cancelRequestLogs.length).toBeGreaterThan(0);
    const latestCancelCall = cancelRequestLogs.at(-1);
    expect(latestCancelCall, 'Expected at least one cancel request log entry').toBeTruthy();
    if (!latestCancelCall) {
      throw new Error('No cancel request logs captured for cancellation coverage.');
    }
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
    test(`POST /workallocation/task/:id/cancel tolerates optional ${processCase.label} query`, async ({
      apiClientFor,
      apiLogs,
    }, testInfo) => {
      const runtime = await createWaRuntime({ apiClientFor });
      annotateTaskFallback(testInfo, runtime);
      const taskId = runtime.task.taskId;
      const endpoint = `workallocation/task/${taskId}/cancel?cancellation_process=${processCase.value}`;
      const startLogIndex = apiLogs.length;

      const response = await runtime.client.post(endpoint, {
        data: { hasNoAssigneeOnComplete: false },
        headers: runtime.xsrfHeaders,
        throwOnError: false,
      });

      expectStatus(response.status, StatusSets.actionWithConflicts);

      const cancelRequestLogs = apiLogs.slice(startLogIndex).filter((entry) => {
        return entry.method === 'POST' && entry.url.includes(`/workallocation/task/${taskId}/cancel`);
      });

      expect(cancelRequestLogs.length).toBeGreaterThan(0);
      const latestCancelCall = cancelRequestLogs.at(-1);
      expect(latestCancelCall, 'Expected at least one cancel request log entry').toBeTruthy();
      if (!latestCancelCall) {
        throw new Error('No cancel request logs captured for cancellation coverage.');
      }
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
